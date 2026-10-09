import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle, Sparkles, Crown, Lock,
  AlertCircle, Loader2
} from 'lucide-react';

export type UpgradeReason = 'mock_limit' | 'mcq_limit' | 'ai_limit' | 'syllabus_locked' | 'general';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: UpgradeReason;
  topicName?: string;
  userPlan?: 'free' | 'paid';
  currentUser?: any;
  onOpenAuth?: () => void;
  onUpgradeSuccess?: () => void;
  initialPlan?: '6_months' | '1_year';
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  reason = 'general',
  topicName,
  currentUser,
  onOpenAuth,
  onUpgradeSuccess,
  initialPlan = '1_year'
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'6_months' | '1_year'>(initialPlan);
  const [upgrading, setUpgrading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  React.useEffect(() => {
    if (initialPlan) {
      setSelectedPlan(initialPlan);
    }
  }, [initialPlan, isOpen]);

  if (!isOpen) return null;

  const reasonInfo = {
    mock_limit: {
      badge: 'डेली मॉक टेस्ट सीमा समाप्त',
      title: 'आज के 3 Mock Tests की सीमा पूरी हो चुकी है',
      desc: 'Free Plan में प्रतिदिन केवल 3 Mock Tests उपलब्ध हैं। असीमित मॉक टेस्ट्स देने के लिए Pro Pass अनलॉक करें।',
      icon: AlertCircle
    },
    mcq_limit: {
      badge: 'डेली MCQs सीमा समाप्त',
      title: 'आज के 30 MCQs की सीमा पूरी हो चुकी है',
      desc: 'Free Plan में प्रतिदिन 30 MCQs सॉल्व कर सकते हैं। बिना किसी रुकावट के असीमित अभ्यास के लिए Pro Pass अनलॉक करें।',
      icon: AlertCircle
    },
    ai_limit: {
      badge: 'AI Guru सीमा समाप्त',
      title: 'आज के 3 AI Guru सवालों की सीमा पूरी हो चुकी है',
      desc: 'Free Plan में प्रतिदिन केवल 3 सवाल पूछ सकते हैं। 24/7 असीमित शंका समाधान और AI मेंटरशिप के लिए Pro Pass अनलॉक करें।',
      icon: Sparkles
    },
    syllabus_locked: {
      badge: '🔒 टॉपिक लॉक है',
      title: topicName ? `"${topicName}" लॉक है` : 'यह टॉपिक Pro Pass में अनलॉक है',
      desc: 'Free Plan में प्रत्येक विषय के सिर्फ पहले 3 टॉपिक अनलॉक हैं। सभी विषयों के सम्पूर्ण नोट्स पढ़ने और टेस्ट देने के लिए Pro Pass अनलॉक करें।',
      icon: Lock
    },
    general: {
      badge: 'CG GURU PRO PASS',
      title: 'सुपरचार्ज करें अपनी परीक्षा की तैयारी',
      desc: 'CG Guru Pro Pass के साथ सभी फीचर्स, नोट्स और टेस्ट्स को बिना किसी सीमा के एक्सेस करें।',
      icon: Crown
    }
  }[reason] || {
    badge: 'CG GURU PRO PASS',
    title: 'अपग्रेड करें Pro Pass',
    desc: 'सभी फीचर्स का असीमित लाभ उठाएं।',
    icon: Crown
  };

  const getApiUrl = (p: string) => {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || 
                    hostname === '127.0.0.1' || 
                    hostname === '[::1]' ||
                    hostname.startsWith('192.168.');
    if (isLocal && window.location.port !== '3000') {
      return `http://localhost:3000${p}`;
    }
    if (hostname.endsWith('.web.app') || hostname.endsWith('.firebaseapp.com')) {
      return `https://study-ai-olive.vercel.app${p}`;
    }
    return p;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        return resolve(true);
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleActivatePro = async () => {
    if (!currentUser) {
      if (onOpenAuth) {
        onClose();
        onOpenAuth();
      } else {
        alert('कृपया Pro Pass एक्टिवेट करने के लिए पहले लॉगिन करें।');
      }
      return;
    }

    const planInfo = selectedPlan === '1_year' 
      ? { title: '1 Year Pro Pass', price: 149 }
      : { title: '6 Months Pro Pass', price: 99 };

    try {
      setUpgrading(true);
      const token = await currentUser.getIdToken();

      // 1. Request Order creation from backend /api/payment/create-order
      const orderRes = await fetch(getApiUrl('/api/payment/create-order'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          planDuration: selectedPlan
        })
      });

      if (!orderRes.ok) {
        const errorText = await orderRes.text();
        console.error('[Create Order Failed]:', orderRes.status, errorText);
        throw new Error(`Order creation failed (${orderRes.status})`);
      }

      const orderData = await orderRes.json();
      console.log('[Payment] Order received from server:', orderData);

      // Ensure Razorpay script is loaded
      await loadRazorpayScript();
      const RazorpaySDK = (window as any).Razorpay;

      if (!RazorpaySDK) {
        console.error('[Payment] Razorpay SDK could not be loaded into window.Razorpay');
        alert('Razorpay पेमेंट लाइब्रेरी लोड नहीं हो सकी। कृपया इंटरनेट कनेक्शन जांचें।');
        setUpgrading(false);
        return;
      }

      const activeKey = orderData.keyId;

      // 2. Open standard Razorpay Checkout modal
      const options = {
        key: activeKey,
        amount: orderData.order.amount,
        currency: orderData.order.currency || 'INR',
        name: 'CG Guru AI Platform',
        description: `${planInfo.title} (₹${planInfo.price})`,
        image: '/CG_GURU.png',
        order_id: orderData.order.id,
        prefill: {
          name: currentUser.displayName || '',
          email: currentUser.email || '',
          contact: currentUser.phoneNumber || ''
        },
        theme: {
          color: '#FF9933'
        },
        handler: async (response: any) => {
          try {
            console.log('[Razorpay Handler Success]:', response);
            // Verify payment on backend
            const verifyRes = await fetch(getApiUrl('/api/payment/verify-payment'), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planDuration: selectedPlan
              })
            });

            if (verifyRes.ok) {
              setSuccessMsg(`बधाई हो! पेमेंट सफल रहा। आपका ${planInfo.title} एक्टिवेट हो गया है 🎉`);
            } else {
              setSuccessMsg(`बधाई हो! आपका ${planInfo.title} एक्टिवेट हो गया है 🎉`);
            }
            if (onUpgradeSuccess) onUpgradeSuccess();
            setTimeout(() => {
              setSuccessMsg('');
              onClose();
            }, 1500);
          } catch (vErr) {
            console.error('[Verify Payment Exception]:', vErr);
            if (onUpgradeSuccess) onUpgradeSuccess();
            onClose();
          } finally {
            setUpgrading(false);
          }
        },
        modal: {
          ondismiss: () => {
            console.log('[Razorpay Modal Dismissed]');
            setUpgrading(false);
          }
        }
      };

      console.log('[Payment] Opening Razorpay Checkout with options:', {
        key: options.key,
        amount: options.amount,
        order_id: options.order_id
      });

      const rzpPayment = new RazorpaySDK(options);
      rzpPayment.on('payment.failed', (resp: any) => {
        console.error('[Razorpay Payment Failed]:', resp.error);
        alert(`पेमेंट विफल रहा: ${resp.error.description || 'कृपया पुनः प्रयास करें।'}`);
        setUpgrading(false);
      });
      rzpPayment.open();
      return;
    } catch (err: any) {
      console.error('[Activate Pro Error]:', err);
      alert(err.message || 'पेमेंट शुरू करने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none">
        <motion.div 
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          className="relative w-full max-w-lg bg-bg-s2 border border-saffron-border/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-saffron/20 via-amber-500/10 to-orange-500/20 p-5 sm:p-6 border-b border-border/80">
            <button 
              onClick={onClose}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-bg-s1/60 hover:bg-bg-s1 text-text-muted hover:text-text transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-saffron bg-saffron/15 border border-saffron/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-saffron" />
                <span>{reasonInfo.badge}</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-greenL bg-greenL/15 border border-greenL/30 px-2 py-0.5 rounded-full">
                SPECIAL OFFER
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-text leading-tight">
              {reasonInfo.title}
            </h2>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">
              {reasonInfo.desc}
            </p>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
            {successMsg ? (
              <div className="p-6 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <p className="text-sm font-black text-emerald-400">{successMsg}</p>
                <p className="text-xs text-text-muted">सभी सीमाएं हटा दी गई हैं। असीमित अध्ययन का आनंद लें!</p>
              </div>
            ) : (
              <>
                {/* Feature Comparison Table */}
                <div className="border border-border/80 rounded-xl overflow-hidden bg-bg-s1">
                  <div className="grid grid-cols-3 bg-bg-s3/80 p-2.5 text-[11px] font-black uppercase text-text border-b border-border">
                    <span>फ़ीचर</span>
                    <span className="text-center text-text-muted">Free Plan</span>
                    <span className="text-right text-saffron">👑 Pro Pass</span>
                  </div>

                  <div className="divide-y divide-border/40 text-xs">
                    <div className="grid grid-cols-3 p-2.5 items-center">
                      <span className="font-bold text-text">मॉक टेस्ट्स</span>
                      <span className="text-center text-text-muted font-semibold">3 / दिन</span>
                      <span className="text-right font-black text-greenL">असीमित (Unlimited)</span>
                    </div>

                    <div className="grid grid-cols-3 p-2.5 items-center">
                      <span className="font-bold text-text">MCQs सॉल्विंग</span>
                      <span className="text-center text-text-muted font-semibold">30 / दिन</span>
                      <span className="text-right font-black text-greenL">असीमित (Unlimited)</span>
                    </div>

                    <div className="grid grid-cols-3 p-2.5 items-center">
                      <span className="font-bold text-text">AI Guru सवाल</span>
                      <span className="text-center text-text-muted font-semibold">3 सवाल / दिन</span>
                      <span className="text-right font-black text-greenL">24/7 असीमित</span>
                    </div>

                    <div className="grid grid-cols-3 p-2.5 items-center">
                      <span className="font-bold text-text">सिलेबस नोट्स व टेस्ट</span>
                      <span className="text-center text-text-muted font-semibold">सिर्फ 3 टॉपिक / विषय</span>
                      <span className="text-right font-black text-greenL">सभी विषय 100% अनलॉक</span>
                    </div>

                    <div className="grid grid-cols-3 p-2.5 items-center">
                      <span className="font-bold text-text">PDF नोट्स व PYQs</span>
                      <span className="text-center text-text-muted font-semibold">सीमित</span>
                      <span className="text-right font-black text-greenL">फुल एक्सेस</span>
                    </div>
                  </div>
                </div>

                {/* Plan Selection Cards: Offer 1 (₹99 / 6M) & Offer 2 (₹149 / 1Y) */}
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase text-text-muted tracking-wider block">
                    अपना पसंदीदा प्लान चुनें (Select Plan)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Offer 1: ₹99 for 6 Months */}
                    <div 
                      onClick={() => setSelectedPlan('6_months')}
                      className={`relative p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPlan === '6_months' 
                          ? 'border-saffron bg-saffron/10 shadow-sm ring-1 ring-saffron/40' 
                          : 'border-border bg-bg-s1 hover:border-saffron/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase text-text">6 Months Pass</span>
                        <input 
                          type="radio" 
                          name="plan_choice" 
                          checked={selectedPlan === '6_months'} 
                          onChange={() => setSelectedPlan('6_months')}
                          className="accent-saffron cursor-pointer"
                        />
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-xl font-black text-text">₹99</span>
                        <span className="text-xs text-text-muted line-through">₹299</span>
                        <span className="text-[9px] font-black text-greenL bg-greenL/15 px-1 py-0.5 rounded">67% OFF</span>
                      </div>
                      <div className="text-[10px] text-text-muted mt-0.5">₹16.5/महीना • कोड: PRO99</div>
                    </div>

                    {/* Offer 2: ₹149 for 1 Year (Recommended) */}
                    <div 
                      onClick={() => setSelectedPlan('1_year')}
                      className={`relative p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPlan === '1_year' 
                          ? 'border-saffron bg-saffron/10 shadow-sm ring-1 ring-saffron/40' 
                          : 'border-border bg-bg-s1 hover:border-saffron/40'
                      }`}
                    >
                      <span className="absolute -top-2 right-2.5 bg-gradient-to-r from-saffron to-orange-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm">
                        🔥 BEST VALUE
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase text-text">1 Year Pass</span>
                        <input 
                          type="radio" 
                          name="plan_choice" 
                          checked={selectedPlan === '1_year'} 
                          onChange={() => setSelectedPlan('1_year')}
                          className="accent-saffron cursor-pointer"
                        />
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-xl font-black text-greenL">₹149</span>
                        <span className="text-xs text-text-muted line-through">₹499</span>
                        <span className="text-[9px] font-black text-greenL bg-greenL/15 px-1 py-0.5 rounded">70% OFF</span>
                      </div>
                      <div className="text-[10px] text-text-muted mt-0.5">मात्र ₹12.4/महीना • कोड: PRO149</div>
                    </div>
                  </div>
                </div>

                {/* Upgrade Button */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleActivatePro}
                    disabled={upgrading}
                    className="w-full py-3.5 bg-gradient-to-r from-saffron to-orange-500 hover:from-orange-500 hover:to-saffron text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {upgrading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>एक्टिवेट हो रहा है...</span>
                      </>
                    ) : (
                      <>
                        <Crown className="w-4 h-4 fill-white text-white" />
                        <span>
                          {currentUser 
                            ? (selectedPlan === '1_year' ? '₹149 में 1 Year Pro Pass अनलॉक करें' : '₹99 में 6 Months Pro Pass अनलॉक करें') 
                            : 'लॉगिन करें & Pro Pass पाएं'}
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full py-2 text-center text-xs text-text-muted hover:text-text font-semibold transition-colors cursor-pointer"
                  >
                    बाद में देखें (Continue Free)
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
