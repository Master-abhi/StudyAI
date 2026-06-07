import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Key, ShieldAlert, Award, ShieldCheck, Mail, Phone, AtSign } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
  onGuest: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onGuest
}) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Form Fields
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPass, setLoginPass] = useState<string>('');

  const [signupName, setSignupName] = useState<string>('');
  const [signupUsername, setSignupUsername] = useState<string>('');
  const [signupPhone, setSignupPhone] = useState<string>('');
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [signupPass, setSignupPass] = useState<string>('');

  // Email Verification Pending States
  const [isEmailPending, setIsEmailPending] = useState<boolean>(false);
  const [pendingVerifyEmail, setPendingVerifyEmail] = useState<string>('');

  // Poll Firebase to check when user verifies their email
  useEffect(() => {
    let intervalId: any;

    if (isEmailPending && isOpen) {
      const firebase = (window as any).firebase;
      intervalId = setInterval(async () => {
        const user = firebase?.auth().currentUser;
        if (user) {
          try {
            await user.reload();
            const freshUser = firebase.auth().currentUser;
            if (freshUser && freshUser.emailVerified) {
              clearInterval(intervalId);
              
              // Sync user profile to Firestore
              const token = await freshUser.getIdToken(true);
              const host = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' || 
                           window.location.hostname === '[::1]' ||
                           window.location.hostname.startsWith('192.168.')
                           ? (window.location.port !== '3000' ? 'http://localhost:3000' : '')
                           : '';

              await fetch(`${host}/api/user/sync`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  displayName: freshUser.displayName || 'Aspirant',
                  email: freshUser.email || ''
                })
              }).catch(err => console.warn('[Auto Sync on verification] Failed:', err));

              onSuccess(freshUser);
              onClose();
            }
          } catch (e) {
            console.error('Error polling email verification status:', e);
          }
        }
      }, 2500); // Poll every 2.5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isEmailPending, isOpen]);



  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const firebase = (window as any).firebase;
    if (!firebase) {
      setError('Firebase SDK not found on window object.');
      return;
    }

    const trimmedEmail = loginEmail.trim();
    if (!trimmedEmail || !loginPass) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const cred = await firebase.auth().signInWithEmailAndPassword(trimmedEmail, loginPass);
      
      // Reload user to sync status if needed
      await cred.user.reload();
      const freshUser = firebase.auth().currentUser;

      if (!freshUser) {
        throw new Error('User session not found.');
      }

      onSuccess(freshUser);
      onClose();
    } catch (err: any) {
      console.error('[Login Error]:', err);
      let msg = err.message || 'Login failed. Check your email and password.';
      if (err.code === 'auth/user-not-found') msg = 'Account not found. Please sign up.';
      else if (err.code === 'auth/wrong-password') msg = 'Incorrect password.';
      else if (err.code === 'auth/invalid-email') msg = 'Invalid email address format.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const firebase = (window as any).firebase;
    if (!firebase) {
      setError('Firebase SDK not found on window object.');
      return;
    }

    const trimmedEmail = loginEmail.trim();
    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await firebase.auth().sendPasswordResetEmail(trimmedEmail);
      setError('Password reset link sent successfully! Check your inbox (and Spam folder).');
    } catch (err: any) {
      console.error('[Password Reset Error]:', err);
      let msg = err.message || 'Failed to send password reset link.';
      if (err.code === 'auth/user-not-found') msg = 'No account found with this email address.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const firebase = (window as any).firebase;
    if (!firebase) {
      setError('Firebase SDK not found on window object.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const cred = await firebase.auth().signInWithPopup(provider);
      
      const token = await cred.user.getIdToken(true);
      const host = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1' || 
                   window.location.hostname === '[::1]' ||
                   window.location.hostname.startsWith('192.168.')
                   ? (window.location.port !== '3000' ? 'http://localhost:3000' : '')
                   : '';

      const syncRes = await fetch(`${host}/api/user/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          displayName: cred.user.displayName || 'Aspirant',
          email: cred.user.email || ''
        })
      });

      if (!syncRes.ok) {
        const syncData = await syncRes.json();
        throw new Error(syncData.error || 'Failed to sync account info.');
      }

      onSuccess(cred.user);
      onClose();
    } catch (err: any) {
      console.error('[Google Sign In Error]:', err);
      setError(err.message || 'Google Sign-In failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInitiateSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const firebase = (window as any).firebase;
    if (!firebase) {
      setError('Firebase SDK not found on window object.');
      return;
    }

    const trimmedName = signupName.trim();
    const trimmedUsername = signupUsername.trim();
    const trimmedPhone = signupPhone.trim();
    const trimmedEmail = signupEmail.trim();

    if (!trimmedName || !trimmedUsername || !trimmedPhone || !trimmedEmail || !signupPass) {
      setError('Please fill in all fields');
      return;
    }

    if (signupPass.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!/^\d{10}$/.test(trimmedPhone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    let createdUser: any = null;

    try {
      // 1. Create email/password user directly
      const cred = await firebase.auth().createUserWithEmailAndPassword(trimmedEmail, signupPass);
      createdUser = cred.user;

      // 2. Update displayName
      try {
        await createdUser.updateProfile({ displayName: trimmedName });
      } catch (profileErr) {
        console.warn('Profile displayName update failed:', profileErr);
      }

      localStorage.setItem('userName', trimmedName);

      // 3. Sync registration details (name, username, phone, email) to backend Firestore immediately
      try {
        const token = await createdUser.getIdToken(true);
        const host = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' || 
                     window.location.hostname === '[::1]' ||
                     window.location.hostname.startsWith('192.168.')
                     ? (window.location.port !== '3000' ? 'http://localhost:3000' : '')
                     : '';

        const syncRes = await fetch(`${host}/api/user/sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            displayName: trimmedName,
            username: trimmedUsername,
            mobile: trimmedPhone,
            email: trimmedEmail
          })
        });

        if (!syncRes.ok) {
          const syncData = await syncRes.json();
          throw new Error(syncData.error || 'Failed to sync registration details.');
        }
      } catch (syncErr: any) {
        console.warn('Initial user registration sync failed:', syncErr);
        throw syncErr;
      }

      // 4. Send Email Verification Link (best effort)
      try {
        await createdUser.sendEmailVerification();
      } catch (verifErr) {
        console.warn('Failed to send verification email on signup:', verifErr);
      }

      // 5. Log in immediately
      setPendingVerifyEmail(trimmedEmail);
      onSuccess(createdUser);
      onClose();
    } catch (err: any) {
      console.error('[Signup/Verification Error]:', err);
      
      // Clean up newly created user if verification email sending failed or sync failed
      if (createdUser) {
        try {
          await createdUser.delete();
        } catch (deleteErr) {
          console.warn('Failed to clean up user after failure:', deleteErr);
        }
      }

      let msg = err.message || 'Registration failed. Please try again.';
      if (err.code === 'auth/email-already-in-use') msg = 'Email address already taken. Try another.';
      else if (err.code === 'auth/weak-password') msg = 'Password is too weak.';
      else if (err.code === 'auth/invalid-email') msg = 'Invalid email format.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };


  const handleResendVerification = async () => {
    const firebase = (window as any).firebase;
    if (!firebase) return;
    setLoading(true);
    setError('');

    const targetEmail = signupEmail.trim() || loginEmail.trim();
    const targetPass = signupPass || loginPass;

    if (!targetEmail || !targetPass) {
      setError('To resend, please enter your email and password in the login/register forms.');
      setLoading(false);
      return;
    }

    try {
      const cred = await firebase.auth().signInWithEmailAndPassword(targetEmail, targetPass);
      await cred.user.sendEmailVerification();
      await firebase.auth().signOut();
      setError('Verification email link sent successfully! Check your inbox.');
    } catch (resendErr: any) {
      setError('Failed to resend verification email: ' + resendErr.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md flex items-center justify-center p-4 z-[9999] overflow-y-auto">
      {/* Hidden container for Firebase invisible reCAPTCHA */}
      <div id="recaptcha-container" className="hidden"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-bg-s2 border border-border rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Banner */}
        <div className="bg-gradient-to-r from-saffron to-orange-600 p-6 text-center text-bg-s1 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <Award className="w-12 h-12 mx-auto mb-2 text-bg-s1 animate-bounce" />
          <h2 className="text-xl font-black uppercase tracking-wider">CG Guru — Exam Prep</h2>
          <p className="text-xs font-semibold opacity-90 mt-1">Smart AI-powered Government Exam Coaching</p>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-border pb-1">
            <h3 className="text-base font-black uppercase text-text">
              {isEmailPending 
                ? 'Email Verification' 
                : isForgotPassword
                  ? 'Reset Password'
                  : isSignUp 
                    ? 'Create Account' 
                    : 'Security Log In'}
            </h3>
            <span className="text-[10px] font-black uppercase text-saffron-border bg-saffron-dim/40 px-2 py-0.5 rounded border border-saffron-border/30">
              {isEmailPending 
                ? 'Verification Link' 
                : isForgotPassword
                  ? 'Reset Link'
                  : isSignUp 
                    ? 'Sign Up' 
                    : 'Secure'}
            </span>
          </div>

          {/* Validation Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/25 rounded-md flex flex-col gap-2 text-xs text-redL"
            >
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
              {error.includes('verify your email') && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="text-left text-xs font-bold text-saffron hover:underline mt-1 cursor-pointer pl-6"
                >
                  {loading ? 'Resending Link...' : 'Resend Verification Link now'}
                </button>
              )}
            </motion.div>
          )}

          {/* Forms */}
          {isEmailPending ? (
            /* Email Verification Pending View */
            <div className="flex flex-col gap-4 text-center my-1.5">
              <div className="p-4 bg-saffron-dim/10 border border-saffron-border/35 rounded-xl flex flex-col gap-2.5 items-center">
                <div className="w-12 h-12 rounded-full bg-saffron/10 border border-saffron/30 flex items-center justify-center text-saffron">
                  <ShieldCheck className="w-6 h-6 animate-pulse" />
                </div>
                <h4 className="text-sm font-black text-text uppercase tracking-wider">Verification Link Sent</h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  We have sent a verification link to your email address:
                </p>
                <strong className="text-xs text-saffron font-bold break-all select-all">{pendingVerifyEmail}</strong>
              </div>

              <p className="text-[10px] text-text-muted leading-relaxed">
                Please check your Inbox (and Spam/Junk folders) and click the verification link. Once verified, you will be able to log in.
              </p>

              <div className="flex flex-col gap-3 mt-1.5">
                <button
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="w-full py-3 bg-saffron hover:bg-orange-500 disabled:bg-saffron/50 text-xs font-black uppercase text-bg-s1 rounded-md tracking-wider transition-colors cursor-pointer"
                >
                  {loading ? 'Sending...' : 'Resend Verification Link'}
                </button>

                <button
                  onClick={async () => {
                    const firebase = (window as any).firebase;
                    if (firebase) {
                      try {
                        await firebase.auth().signOut();
                      } catch (e) {
                        console.warn('Sign out error on back to login:', e);
                      }
                    }
                    setIsEmailPending(false);
                    setIsSignUp(false);
                    setError('');
                  }}
                  className="w-full py-3 bg-bg-s3 hover:bg-bg-s3/80 border border-border text-xs font-black uppercase text-text rounded-md tracking-wider transition-all cursor-pointer"
                >
                  Back to Log In
                </button>
              </div>
            </div>
          ) : isForgotPassword ? (
            /* Forgot Password Form */
            <form onSubmit={handleResetPassword} className="flex flex-col gap-3.5">
              <p className="text-xs text-text-muted leading-relaxed">
                Enter your registered email address below. We will send you a link to reset your password.
              </p>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-md outline-none transition-colors"
                  />
                  <Mail className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-saffron hover:bg-orange-500 disabled:bg-saffron/50 text-xs font-black uppercase text-bg-s1 rounded-md tracking-wider transition-colors cursor-pointer"
              >
                {loading ? 'Sending link...' : 'Send Password Reset Link'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setError('');
                }}
                className="w-full py-3 bg-bg-s3 hover:bg-bg-s3/80 border border-border text-xs font-black uppercase text-text rounded-md tracking-wider transition-all cursor-pointer text-center"
              >
                Back to Log In
              </button>
            </form>
          ) : !isSignUp ? (
            /* Log In Form */
            <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-md outline-none transition-colors"
                  />
                  <Mail className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase text-text-muted">Secret Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setError('');
                    }}
                    className="text-[10px] font-bold text-saffron hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-md outline-none transition-colors"
                  />
                  <Key className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-saffron hover:bg-orange-500 disabled:bg-saffron/50 text-xs font-black uppercase text-bg-s1 rounded-md tracking-wider transition-colors cursor-pointer"
              >
                {loading ? 'Authenticating...' : 'Sign In Now'}
              </button>
            </form>
          ) : (
            /* Sign Up Form */
            <form onSubmit={handleInitiateSignUp} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-md outline-none transition-colors"
                  />
                  <User className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">User Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter unique username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-md outline-none transition-colors"
                  />
                  <AtSign className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Enter 10-digit phone number"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-md outline-none transition-colors"
                  />
                  <Phone className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Email ID</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="e.g. student@gmail.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-md outline-none transition-colors"
                  />
                  <Mail className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Min 6 characters"
                    value={signupPass}
                    onChange={(e) => setSignupPass(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-md outline-none transition-colors"
                  />
                  <Key className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-saffron hover:bg-orange-500 disabled:bg-saffron/50 text-xs font-black uppercase text-bg-s1 rounded-md tracking-wider transition-colors cursor-pointer"
              >
                {loading ? 'Registering...' : 'Register & Verify'}
              </button>
            </form>
          )}

          {/* Toggle */}
          {!isForgotPassword && (
            <div className="text-center mt-1 text-xs">
              <span className="text-text-muted">
                {isSignUp ? 'Already have an account? ' : 'First time studying here? '}
              </span>
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setIsEmailPending(false);
                }}
                className="text-saffron font-bold hover:underline cursor-pointer"
              >
                {isSignUp ? 'Log In' : 'Create Account'}
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 text-text-muted my-1">
            <div className="h-[1px] bg-border/80 flex-1" />
            <span className="text-[10px] font-black uppercase">OR</span>
            <div className="h-[1px] bg-border/80 flex-1" />
          </div>

          {/* Google Sign In Button */}
          {!isEmailPending && !isForgotPassword && (
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 bg-[#121620] hover:bg-[#161B28] border border-border text-xs font-black uppercase text-text rounded-md tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              <span>Sign In with Google</span>
            </button>
          )}

          {/* Guest Action */}
          {!isEmailPending && !isForgotPassword && (
            <button
              onClick={onGuest}
              disabled={loading}
              className="w-full py-3 bg-bg-s3 hover:bg-bg-s3/80 border border-border text-xs font-black uppercase text-text rounded-md tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-saffron" />
              <span>Continue as Guest</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
