import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Key, Phone, ShieldAlert, Award } from 'lucide-react';

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
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Form Fields
  const [loginId, setLoginId] = useState<string>('');
  const [loginPass, setLoginPass] = useState<string>('');

  const [signupName, setSignupName] = useState<string>('');
  const [signupMobile, setSignupMobile] = useState<string>('');
  const [signupId, setSignupId] = useState<string>('');
  const [signupPass, setSignupPass] = useState<string>('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const firebase = (window as any).firebase;
    if (!firebase) {
      setError('Firebase SDK not found on window object.');
      return;
    }

    const trimmedId = loginId.trim();
    if (!trimmedId || !loginPass) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    const email = `${trimmedId.toLowerCase()}@studyworld.app`;

    try {
      const cred = await firebase.auth().signInWithEmailAndPassword(email, loginPass);
      onSuccess(cred.user);
      onClose();
    } catch (err: any) {
      let msg = 'Login failed. Check your UserID and password.';
      if (err.code === 'auth/user-not-found') msg = 'UserID not found. Please sign up.';
      else if (err.code === 'auth/wrong-password') msg = 'Incorrect password.';
      else if (err.code === 'auth/invalid-email') msg = 'Invalid UserID format.';
      else if (err.code === 'auth/invalid-credential') msg = 'Invalid UserID or password.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const firebase = (window as any).firebase;
    if (!firebase) {
      setError('Firebase SDK not found on window object.');
      return;
    }

    const trimmedName = signupName.trim();
    const trimmedMobile = signupMobile.trim();
    const trimmedId = signupId.trim();

    if (!trimmedName || !trimmedMobile || !trimmedId || !signupPass) {
      setError('Please fill in all fields');
      return;
    }

    if (signupPass.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(trimmedId)) {
      setError('UserID can only contain letters, numbers, and underscores');
      return;
    }

    setLoading(true);
    setError('');

    const email = `${trimmedId.toLowerCase()}@studyworld.app`;

    try {
      const cred = await firebase.auth().createUserWithEmailAndPassword(email, signupPass);
      
      try {
        await cred.user.updateProfile({ displayName: trimmedName });
      } catch (profileErr) {
        console.warn('Profile displayName update failed:', profileErr);
      }

      localStorage.setItem('userName', trimmedName);

      // Sync mobile number to backend database if present
      if (trimmedMobile) {
        try {
          const token = await cred.user.getIdToken(true);
          const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
          await fetch(`${host}/api/user/sync`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ mobile: trimmedMobile })
          });
        } catch (syncErr) {
          console.warn('Mobile sync failed:', syncErr);
        }
      }

      onSuccess(cred.user);
      onClose();
    } catch (err: any) {
      let msg = 'Signup failed. Please try again.';
      if (err.code === 'auth/email-already-in-use') msg = 'UserID already taken. Try another.';
      else if (err.code === 'auth/weak-password') msg = 'Password is too weak.';
      else if (err.code === 'auth/invalid-email') msg = 'Invalid UserID format.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-md flex items-center justify-center p-4 z-[9999] overflow-y-auto">
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
              {isSignUp ? 'Create Account' : 'Security Log In'}
            </h3>
            <span className="text-[10px] font-black uppercase text-saffron-border bg-saffron-dim/40 px-2 py-0.5 rounded border border-saffron-border/30">
              {isSignUp ? 'Sign Up' : 'Secure'}
            </span>
          </div>

          {/* Validation Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/25 rounded-md flex items-start gap-2.5 text-xs text-redL"
            >
              <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Forms */}
          {!isSignUp ? (
            /* Log In Form */
            <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Study UserID</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your UserID"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-md outline-none transition-colors"
                  />
                  <User className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Secret Password</label>
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
            <form onSubmit={handleSignUp} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Aspirant Name</label>
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
                <label className="text-[10px] font-black uppercase text-text-muted">Mobile Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Enter mobile number"
                    value={signupMobile}
                    onChange={(e) => setSignupMobile(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-md outline-none transition-colors"
                  />
                  <Phone className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Create Study UserID</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. abhi_123 (letters, numbers, _)"
                    value={signupId}
                    onChange={(e) => setSignupId(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-md outline-none transition-colors"
                  />
                  <User className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-text-muted">Secret Password</label>
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
                {loading ? 'Creating Account...' : 'Register & Start'}
              </button>
            </form>
          )}

          {/* Toggle */}
          <div className="text-center mt-1 text-xs">
            <span className="text-text-muted">
              {isSignUp ? 'Already have an account? ' : 'First time studying here? '}
            </span>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-saffron font-bold hover:underline cursor-pointer"
            >
              {isSignUp ? 'Log In' : 'Create Account'}
            </button>
          </div>

          <div className="flex items-center gap-2 text-text-muted my-1">
            <div className="h-[1px] bg-border/80 flex-1" />
            <span className="text-[10px] font-black uppercase">OR</span>
            <div className="h-[1px] bg-border/80 flex-1" />
          </div>

          {/* Guest Action */}
          <button
            onClick={onGuest}
            disabled={loading}
            className="w-full py-3 bg-bg-s3 hover:bg-bg-s3/80 border border-border text-xs font-black uppercase text-text rounded-md tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4 text-saffron" />
            <span>Continue as Guest</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
