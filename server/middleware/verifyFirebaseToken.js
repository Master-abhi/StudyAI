const { authAdmin } = require('../firebase-admin');

/**
 * Middleware: verify Firebase ID token for any authenticated user.
 */
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decoded = await authAdmin.verifyIdToken(idToken);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('[Auth] Token verification failed:', err.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

/**
 * Middleware: verify Firebase ID token AND check admin custom claim.
 * Grant admin claim via Firebase Admin SDK: authAdmin.setCustomUserClaims(uid, { admin: true })
 */
const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decoded = await authAdmin.verifyIdToken(idToken);
    if (!decoded.admin) {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error('[Auth] Admin token verification failed:', err.message);
    return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
  }
};

module.exports = { verifyFirebaseToken, verifyAdmin };
