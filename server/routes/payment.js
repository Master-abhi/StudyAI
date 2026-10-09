const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Razorpay = require('razorpay');
const { admin, db } = require('../firebase-admin');
const { verifyFirebaseToken } = require('../middleware/verifyFirebaseToken');

// Initialize Razorpay client with fallback mock mode if keys not yet supplied in .env
const getRazorpayInstance = () => {
  const keyId = (process.env.RAZORPAY_KEY_ID || '').trim();
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || '').trim();

  if (!keyId || !keySecret || keyId === 'rzp_test_placeholder') {
    return null;
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });
};

/**
 * Public route to get public Razorpay Key ID
 */
router.get('/config', (req, res) => {
  const keyId = (process.env.RAZORPAY_KEY_ID || '').trim() || 'rzp_test_placeholder';
  const isLive = Boolean(keyId && !keyId.includes('placeholder'));
  res.json({
    keyId,
    configured: isLive
  });
});

/**
 * Protected: Create Razorpay Order
 * POST /api/payment/create-order
 * Body: { planDuration: '6_months' | '1_year' }
 */
router.post('/create-order', verifyFirebaseToken, async (req, res) => {
  try {
    const { planDuration = '1_year' } = req.body || {};
    const uid = req.user.uid;

    const planConfig = planDuration === '6_months' 
      ? { price: 99, name: 'CG Guru 6 Months Pro Pass', duration: '6_months' }
      : { price: 149, name: 'CG Guru 1 Year Pro Pass', duration: '1_year' };

    const amountInPaise = Math.round(planConfig.price * 100);
    const receipt = `rcpt_${uid.substring(0, 8)}_${Date.now()}`;

    const rzp = getRazorpayInstance();

    // If Razorpay API credentials are not yet configured in .env, generate simulated order
    if (!rzp) {
      console.warn('[Payment] RAZORPAY_KEY_ID/SECRET not configured in .env. Creating simulated order.');
      const simulatedOrder = {
        id: `order_sim_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        entity: 'order',
        amount: amountInPaise,
        currency: 'INR',
        receipt,
        status: 'created',
        notes: {
          uid,
          planDuration: planConfig.duration,
          planPrice: planConfig.price,
          isSimulated: 'true'
        }
      };

      // Record in firestore orders
      await db.collection('orders').doc(simulatedOrder.id).set({
        orderId: simulatedOrder.id,
        uid,
        amount: planConfig.price,
        amountInPaise,
        currency: 'INR',
        receipt,
        status: 'created',
        planDuration: planConfig.duration,
        isSimulated: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return res.json({
        success: true,
        order: simulatedOrder,
        keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        isSimulated: true,
        plan: planConfig
      });
    }

    // Create live Razorpay order
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt,
      notes: {
        uid,
        email: req.user.email || '',
        planDuration: planConfig.duration,
        planPrice: String(planConfig.price)
      }
    };

    const order = await rzp.orders.create(options);

    // Save order in Firestore
    await db.collection('orders').doc(order.id).set({
      orderId: order.id,
      uid,
      amount: planConfig.price,
      amountInPaise,
      currency: order.currency,
      receipt,
      status: order.status,
      planDuration: planConfig.duration,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({
      success: true,
      order,
      keyId: process.env.RAZORPAY_KEY_ID,
      isSimulated: false,
      plan: planConfig
    });

  } catch (err) {
    console.error('[Create Razorpay Order Error]:', err);
    res.status(500).json({ error: 'Failed to create payment order', details: err.message });
  }
});

/**
 * Protected: Verify Razorpay Payment Signature and activate Pro Pass
 * POST /api/payment/verify-payment
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, planDuration }
 */
router.post('/verify-payment', verifyFirebaseToken, async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      planDuration = '1_year' 
    } = req.body || {};

    const uid = req.user.uid;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ error: 'Order ID and Payment ID are required' });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const isSimulated = razorpay_order_id.startsWith('order_sim_');

    if (!isSimulated) {
      if (!keySecret) {
        return res.status(500).json({ error: 'Payment gateway configuration missing' });
      }

      // Generate expected signature
      const hmac = crypto.createHmac('sha256', keySecret);
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generatedSignature = hmac.digest('hex');

      if (generatedSignature !== razorpay_signature) {
        console.error('[Payment Verification Failed] Signature mismatch:', {
          received: razorpay_signature,
          expected: generatedSignature
        });
        return res.status(400).json({ error: 'Invalid payment signature. Verification failed.' });
      }
    }

    // Determine plan validity and pricing
    const planPrice = planDuration === '6_months' ? 99 : 149;
    const now = new Date();
    const expiryDate = new Date();
    if (planDuration === '6_months') {
      expiryDate.setMonth(now.getMonth() + 6);
    } else {
      expiryDate.setFullYear(now.getFullYear() + 1);
    }

    // 1. Update order record in Firestore
    await db.collection('orders').doc(razorpay_order_id).set({
      paymentId: razorpay_payment_id,
      signature: razorpay_signature || 'simulated',
      status: 'paid',
      verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      planDuration,
      price: planPrice
    }, { merge: true });

    // 2. Activate Pro Pass on user profile
    await db.collection('users').doc(uid).set({
      plan: 'paid',
      isPaid: true,
      planDuration,
      planPrice,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      planActivatedAt: admin.firestore.FieldValue.serverTimestamp(),
      planExpiresAt: admin.firestore.Timestamp.fromDate(expiryDate)
    }, { merge: true });

    console.log(`[Payment Success] User ${uid} activated Pro Pass (${planDuration}, ₹${planPrice}) via Payment ID: ${razorpay_payment_id} ✅`);

    res.json({
      success: true,
      message: 'Payment verified and Pro Pass activated successfully!',
      plan: 'paid',
      isPaid: true,
      planDuration,
      planExpiresAt: expiryDate
    });

  } catch (err) {
    console.error('[Verify Payment Error]:', err);
    res.status(500).json({ error: 'Failed to verify payment', details: err.message });
  }
});

/**
 * Razorpay Webhook listener (for asynchronous server-to-server confirmation)
 * POST /api/payment/webhook
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(req.body)
        .digest('hex');

      if (expectedSignature !== signature) {
        console.warn('[Razorpay Webhook] Invalid signature');
        return res.status(400).send('Invalid webhook signature');
      }
    }

    const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (event && event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const uid = payment.notes && payment.notes.uid;
      const planDuration = (payment.notes && payment.notes.planDuration) || '1_year';
      const price = (payment.notes && Number(payment.notes.planPrice)) || (planDuration === '6_months' ? 99 : 149);

      if (uid) {
        const expiryDate = new Date();
        if (planDuration === '6_months') {
          expiryDate.setMonth(expiryDate.getMonth() + 6);
        } else {
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        }

        await db.collection('users').doc(uid).set({
          plan: 'paid',
          isPaid: true,
          planDuration,
          planPrice: price,
          paymentId: payment.id,
          orderId: payment.order_id,
          planActivatedAt: admin.firestore.FieldValue.serverTimestamp(),
          planExpiresAt: admin.firestore.Timestamp.fromDate(expiryDate)
        }, { merge: true });

        console.log(`[Razorpay Webhook] Webhook captured Pro Pass for ${uid}`);
      }
    }

    res.json({ status: 'ok' });
  } catch (err) {
    console.error('[Razorpay Webhook Error]:', err.message);
    res.status(500).send('Webhook handler error');
  }
});

module.exports = router;
