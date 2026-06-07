import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, LogOut, Trash2, Globe, BookOpen, 
  Lock, Mail, Key, Eye, EyeOff, Pencil, Smartphone 
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeExamName: string;
  onChangeExam: () => void;
  language: 'hi' | 'en';
  onLanguageChange: (lang: 'hi' | 'en') => void;
  onLogout: () => void;
  onClearProgress: () => void;
  currentUser?: any;
  userMobile: string;
  onMobileChange: (mobile: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  activeExamName,
  onChangeExam,
  language,
  onLanguageChange,
  onLogout,
  onClearProgress,
  currentUser,
  userMobile,
  onMobileChange
}) => {
  const [clearingChat, setClearingChat] = useState<boolean>(false);
  
  // Password fields visibility states
  const [showPasswordNew, setShowPasswordNew] = useState<boolean>(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState<boolean>(false);

  // Security Credentials states
  const firebase = (window as any).firebase;
  const firebaseUser = firebase?.auth().currentUser || currentUser;
  const userEmail = firebaseUser?.email || '';
  
  const [activeCredentialTab, setActiveCredentialTab] = useState<'email' | 'password' | 'mobile' | null>(null);
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newMobile, setNewMobile] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [credLoading, setCredLoading] = useState<boolean>(false);
  const [credError, setCredError] = useState<string>('');
  const [credSuccess, setCredSuccess] = useState<string>('');

  const isPasswordProvider = firebaseUser?.providerData && firebaseUser.providerData.some((p: any) => p.providerId === 'password');
  const showSecuritySection = firebaseUser && userEmail && userEmail !== 'guest@studyworld.app';

  if (!isOpen) return null;



  const reauthenticateUser = async (pass: string) => {
    if (!firebaseUser || !firebaseUser.email) {
      throw new Error('User email not found. Please log in again.');
    }
    const credential = firebase.auth.EmailAuthProvider.credential(firebaseUser.email, pass);
    await firebaseUser.reauthenticateWithCredential(credential);
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredLoading(true);
    setCredError('');
    setCredSuccess('');
    try {
      const trimmedEmail = newEmail.trim();
      if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        throw new Error('Please enter a valid new email address.');
      }
      if (!currentPassword) {
        throw new Error('Please enter your current password to confirm your identity.');
      }

      await reauthenticateUser(currentPassword);
      await firebaseUser.updateEmail(trimmedEmail);

      const token = await firebaseUser.getIdToken(true);
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
        body: JSON.stringify({ email: trimmedEmail })
      }).catch(err => console.warn('[Email Sync on Update] Failed:', err));

      setCredSuccess('Email ID updated successfully!');
      setNewEmail('');
      setCurrentPassword('');
      setActiveCredentialTab(null);
    } catch (err: any) {
      console.error('[Change Email Error]:', err);
      setCredError(err.message || 'Failed to update email ID.');
    } finally {
      setCredLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredLoading(true);
    setCredError('');
    setCredSuccess('');
    try {
      if (newPassword.length < 6) {
        throw new Error('New password must be at least 6 characters long.');
      }
      if (!currentPassword) {
        throw new Error('Please enter your current password to confirm your identity.');
      }

      await reauthenticateUser(currentPassword);
      await firebaseUser.updatePassword(newPassword);

      setCredSuccess('Password updated successfully!');
      setNewPassword('');
      setCurrentPassword('');
      setActiveCredentialTab(null);
    } catch (err: any) {
      console.error('[Change Password Error]:', err);
      setCredError(err.message || 'Failed to update password.');
    } finally {
      setCredLoading(false);
    }
  };

  const handleChangeMobile = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredLoading(true);
    setCredError('');
    setCredSuccess('');
    try {
      const trimmedMobile = newMobile.trim();
      if (!/^\d{10}$/.test(trimmedMobile)) {
        throw new Error('Please enter a valid 10-digit phone number.');
      }

      const token = await firebaseUser.getIdToken(true);
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
        body: JSON.stringify({ mobile: trimmedMobile })
      });

      if (!syncRes.ok) {
        const syncData = await syncRes.json();
        throw new Error(syncData.error || 'Failed to update phone number.');
      }

      onMobileChange(trimmedMobile);
      setCredSuccess('Phone number updated successfully!');
      setNewMobile('');
      setActiveCredentialTab(null);
    } catch (err: any) {
      console.error('[Change Phone Error]:', err);
      setCredError(err.message || 'Failed to update phone number.');
    } finally {
      setCredLoading(false);
    }
  };

  const handleSetEmailAndPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredLoading(true);
    setCredError('');
    setCredSuccess('');
    try {
      const trimmedEmail = newEmail.trim();
      if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        throw new Error('Please enter a valid email address.');
      }
      if (newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      const credential = firebase.auth.EmailAuthProvider.credential(trimmedEmail, newPassword);
      await firebaseUser.linkWithCredential(credential);

      const token = await firebaseUser.getIdToken(true);
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
        body: JSON.stringify({ email: trimmedEmail })
      }).catch(err => console.warn('[Email Sync on Link] Failed:', err));

      setCredSuccess('Email and Password set successfully! You can now log in with these credentials.');
      setNewEmail('');
      setNewPassword('');
      setActiveCredentialTab(null);
    } catch (err: any) {
      console.error('[Set Email/Pass Error]:', err);
      setCredError(err.message || 'Failed to set email and password.');
    } finally {
      setCredLoading(false);
    }
  };

  const handleClearChatHistory = () => {
    if (window.confirm('Delete all stored AI Guru chat conversation logs?')) {
      setClearingChat(true);
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('cg_chat_history_')) {
          localStorage.removeItem(key);
        }
      });
      setTimeout(() => {
        setClearingChat(false);
        alert('Chat histories cleared successfully!');
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0B0E14]/90 backdrop-blur-md z-[999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-bg-s2 border border-border/70 rounded-2xl shadow-2xl p-6 flex flex-col gap-5 font-sans max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-border"
      >
        {/* Header section */}
        <div className="flex justify-between items-center border-b border-border pb-3 shrink-0">
          <h3 className="text-sm font-black uppercase tracking-wider text-text flex items-center gap-2">
            <Settings className="w-5 h-5 text-saffron" />
            <span>Settings</span>
          </h3>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-bg-s3 hover:bg-bg-s3/80 flex items-center justify-center text-xs text-text-muted hover:text-text cursor-pointer transition-all duration-200"
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        {/* 1. General Settings Group */}
        <div className="flex flex-col gap-4">
          <span className="text-[9px] font-black uppercase text-text-muted tracking-widest">General</span>
          
          {/* Target Exam */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black uppercase text-text-muted flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-saffron" />
              <span>Target Exam</span>
            </label>
            <button
              onClick={() => {
                onChangeExam();
                onClose();
              }}
              className="p-3 bg-bg-s3 hover:bg-bg-s3/80 border border-border/80 rounded-xl text-left text-xs font-bold text-text flex justify-between items-center cursor-pointer transition-all group hover:scale-[1.01]"
            >
              <span className="truncate">{activeExamName || 'Select target exam'}</span>
              <span className="text-[9px] text-saffron bg-saffron-dim/15 border border-saffron-border/30 px-2 py-0.5 rounded font-black uppercase group-hover:bg-saffron group-hover:text-bg-s1 transition-colors">
                Change
              </span>
            </button>
          </div>

          {/* Language select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black uppercase text-text-muted flex items-center gap-1">
              <Globe className="w-3 h-3 text-saffron" />
              <span>Language</span>
            </label>
            <div className="grid grid-cols-2 gap-2 mt-0.5 bg-bg-s3/60 p-1 border border-border/70 rounded-xl">
              <button
                onClick={() => onLanguageChange('hi')}
                className={`py-2 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-saffron text-bg-s1 border-saffron shadow-md scale-[1.02]'
                    : 'text-text-muted hover:text-text hover:bg-bg-s3/30'
                }`}
              >
                हिं Hindi
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`py-2 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-saffron text-bg-s1 border-saffron shadow-md scale-[1.02]'
                    : 'text-text-muted hover:text-text hover:bg-bg-s3/30'
                }`}
              >
                EN English
              </button>
            </div>
          </div>
        </div>

        {/* 2. Security Section */}
        {showSecuritySection && (
          <div className="flex flex-col gap-4 border-t border-border/40 pt-4">
            <span className="text-[9px] font-black uppercase text-text-muted tracking-widest flex items-center gap-1">
              <Lock className="w-3 h-3 text-saffron" />
              <span>Account Security</span>
            </span>

            {credError && (
              <p className="text-[10px] text-redL bg-redL/5 border border-redL/10 px-3 py-2 rounded-lg font-semibold leading-relaxed">
                {credError}
              </p>
            )}

            {credSuccess && (
              <p className="text-[10px] text-greenL bg-greenL/5 border border-greenL/10 px-3 py-2 rounded-lg font-semibold leading-relaxed">
                {credSuccess}
              </p>
            )}

            {!isPasswordProvider ? (
              /* Link Email & Password Form */
              <form onSubmit={handleSetEmailAndPassword} className="flex flex-col gap-3">
                <p className="text-[10px] text-text-muted leading-relaxed">
                  Your account does not have password credentials. Set an email & password to enable standard secure login.
                </p>
                
                {/* Email input */}
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-black uppercase text-text-muted">Email Address</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-4 h-4 text-text-muted" />
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      required
                      disabled={credLoading}
                      className="pl-9 w-full bg-bg-s3 text-xs text-text border border-border/80 focus:border-saffron focus:ring-1 focus:ring-saffron/20 py-2 rounded-lg outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Password input */}
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-black uppercase text-text-muted">Choose Password (Min 6 chars)</label>
                  <div className="relative flex items-center">
                    <Key className="absolute left-3 w-4 h-4 text-text-muted" />
                    <input
                      type={showPasswordNew ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      disabled={credLoading}
                      className="pl-9 pr-10 w-full bg-bg-s3 text-xs text-text border border-border/80 focus:border-saffron focus:ring-1 focus:ring-saffron/20 py-2 rounded-lg outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordNew(!showPasswordNew)}
                      className="absolute right-3 text-text-muted hover:text-text cursor-pointer transition-colors"
                    >
                      {showPasswordNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={credLoading}
                  className="w-full py-2.5 bg-gradient-to-r from-saffron to-orange-500 hover:brightness-110 active:scale-[0.98] disabled:bg-saffron/50 text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer transition-all shadow-md flex items-center justify-center gap-1 shrink-0"
                >
                  {credLoading ? 'Linking...' : 'Link Email & Password'}
                </button>
              </form>
            ) : activeCredentialTab === null ? (
              /* Normal email, phone, password view with Edit icons */
              <div className="flex flex-col gap-3.5 p-3.5 bg-bg-s3/65 border border-border/80 rounded-xl">
                {/* Email Row */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/40">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8px] font-black uppercase text-text-muted flex items-center gap-1">
                      <Mail className="w-3 h-3 text-saffron" />
                      <span>Registered Email</span>
                    </span>
                    <span className="text-xs text-text font-bold truncate mt-0.5">{userEmail}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCredentialTab('email');
                      setCredError('');
                      setCredSuccess('');
                      setCurrentPassword('');
                      setNewEmail('');
                    }}
                    className="p-2 bg-bg-s2 hover:bg-bg-s1 border border-border/80 rounded-lg text-saffron hover:text-orange-500 cursor-pointer transition-all hover:scale-[1.05]"
                    title="Change Email"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Phone Row */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/40">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8px] font-black uppercase text-text-muted flex items-center gap-1">
                      <Smartphone className="w-3 h-3 text-saffron" />
                      <span>Phone Number</span>
                    </span>
                    <span className="text-xs text-text font-bold truncate mt-0.5">{userMobile || 'Not Set'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCredentialTab('mobile');
                      setCredError('');
                      setCredSuccess('');
                      setNewMobile(userMobile);
                    }}
                    className="p-2 bg-bg-s2 hover:bg-bg-s1 border border-border/80 rounded-lg text-saffron hover:text-orange-500 cursor-pointer transition-all hover:scale-[1.05]"
                    title="Change Phone Number"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Password Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8px] font-black uppercase text-text-muted flex items-center gap-1">
                      <Lock className="w-3 h-3 text-saffron" />
                      <span>Password</span>
                    </span>
                    <span className="text-xs text-text-muted font-bold tracking-widest mt-1">••••••••</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCredentialTab('password');
                      setCredError('');
                      setCredSuccess('');
                      setCurrentPassword('');
                      setNewPassword('');
                    }}
                    className="p-2 bg-bg-s2 hover:bg-bg-s1 border border-border/80 rounded-lg text-saffron hover:text-orange-500 cursor-pointer transition-all hover:scale-[1.05]"
                    title="Change Password"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : activeCredentialTab === 'email' ? (
              /* Change Email Form */
              <form onSubmit={handleChangeEmail} className="flex flex-col gap-3 p-3 bg-bg-s3/35 border border-border/60 rounded-xl">
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-black uppercase text-text-muted">New Email Address</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-4 h-4 text-text-muted" />
                    <input
                      type="email"
                      placeholder="Enter new email address"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      required
                      disabled={credLoading}
                      className="pl-9 w-full bg-bg-s3 text-xs text-text border border-border/80 focus:border-saffron focus:ring-1 focus:ring-saffron/20 py-2 rounded-lg outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-black uppercase text-text-muted">Current Password (To Confirm)</label>
                  <div className="relative flex items-center">
                    <Key className="absolute left-3 w-4 h-4 text-text-muted" />
                    <input
                      type={showPasswordCurrent ? "text" : "password"}
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      disabled={credLoading}
                      className="pl-9 pr-10 w-full bg-bg-s3 text-xs text-text border border-border/80 focus:border-saffron focus:ring-1 focus:ring-saffron/20 py-2 rounded-lg outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordCurrent(!showPasswordCurrent)}
                      className="absolute right-3 text-text-muted hover:text-text cursor-pointer transition-colors"
                    >
                      {showPasswordCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2.5 mt-1">
                  <button
                    type="submit"
                    disabled={credLoading}
                    className="flex-1 py-2 bg-saffron hover:bg-orange-500 active:scale-[0.98] disabled:bg-saffron/50 text-bg-s1 text-[10px] font-black uppercase rounded-lg cursor-pointer transition-all shadow"
                  >
                    {credLoading ? 'Updating...' : 'Update'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveCredentialTab(null)}
                    disabled={credLoading}
                    className="py-2 px-3.5 bg-bg-s3 hover:bg-bg-s2 border border-border text-text text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : activeCredentialTab === 'password' ? (
              /* Change Password Form */
              <form onSubmit={handleChangePassword} className="flex flex-col gap-3 p-3 bg-bg-s3/35 border border-border/60 rounded-xl">
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-black uppercase text-text-muted">New Password (Min 6 chars)</label>
                  <div className="relative flex items-center">
                    <Key className="absolute left-3 w-4 h-4 text-text-muted" />
                    <input
                      type={showPasswordNew ? "text" : "password"}
                      placeholder="Min 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      disabled={credLoading}
                      className="pl-9 pr-10 w-full bg-bg-s3 text-xs text-text border border-border/80 focus:border-saffron focus:ring-1 focus:ring-saffron/20 py-2 rounded-lg outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordNew(!showPasswordNew)}
                      className="absolute right-3 text-text-muted hover:text-text cursor-pointer transition-colors"
                    >
                      {showPasswordNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-black uppercase text-text-muted">Current Password (To Confirm)</label>
                  <div className="relative flex items-center">
                    <Key className="absolute left-3 w-4 h-4 text-text-muted" />
                    <input
                      type={showPasswordCurrent ? "text" : "password"}
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      disabled={credLoading}
                      className="pl-9 pr-10 w-full bg-bg-s3 text-xs text-text border border-border/80 focus:border-saffron focus:ring-1 focus:ring-saffron/20 py-2 rounded-lg outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordCurrent(!showPasswordCurrent)}
                      className="absolute right-3 text-text-muted hover:text-text cursor-pointer transition-colors"
                    >
                      {showPasswordCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2.5 mt-1">
                  <button
                    type="submit"
                    disabled={credLoading}
                    className="flex-1 py-2 bg-saffron hover:bg-orange-500 active:scale-[0.98] disabled:bg-saffron/50 text-bg-s1 text-[10px] font-black uppercase rounded-lg cursor-pointer transition-all shadow"
                  >
                    {credLoading ? 'Updating...' : 'Update'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveCredentialTab(null)}
                    disabled={credLoading}
                    className="py-2 px-3.5 bg-bg-s3 hover:bg-bg-s2 border border-border text-text text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* Change Phone Number Form */
              <form onSubmit={handleChangeMobile} className="flex flex-col gap-3 p-3 bg-bg-s3/35 border border-border/60 rounded-xl">
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-black uppercase text-text-muted">New Phone Number</label>
                  <div className="relative flex items-center">
                    <Smartphone className="absolute left-3 w-4 h-4 text-text-muted" />
                    <input
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      value={newMobile}
                      onChange={(e) => setNewMobile(e.target.value)}
                      required
                      disabled={credLoading}
                      className="pl-9 w-full bg-bg-s3 text-xs text-text border border-border/80 focus:border-saffron focus:ring-1 focus:ring-saffron/20 py-2 rounded-lg outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-2.5 mt-1">
                  <button
                    type="submit"
                    disabled={credLoading}
                    className="flex-1 py-2 bg-saffron hover:bg-orange-500 active:scale-[0.98] disabled:bg-saffron/50 text-bg-s1 text-[10px] font-black uppercase rounded-lg cursor-pointer transition-all shadow"
                  >
                    {credLoading ? 'Updating...' : 'Update'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveCredentialTab(null)}
                    disabled={credLoading}
                    className="py-2 px-3.5 bg-bg-s3 hover:bg-bg-s2 border border-border text-text text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 3. Destructive Action Buttons */}
        <div className="flex flex-col gap-2 border-t border-border/40 pt-4 mt-1.5">
          <button
            onClick={handleClearChatHistory}
            disabled={clearingChat}
            className="w-full py-2.5 bg-bg-s3 hover:bg-red-500/10 border border-border text-redL text-[10px] font-black uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{clearingChat ? 'Clearing...' : 'Clear Chat History'}</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Erase all of your locally saved syllabus progress rates? This action is irreversible.')) {
                onClearProgress();
                onClose();
              }
            }}
            className="w-full py-2.5 bg-bg-s3 hover:bg-red-500/10 border border-border text-redL text-[10px] font-black uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Study Progress</span>
          </button>

          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full py-3 mt-1.5 bg-gradient-to-r from-red-600 to-red-500 hover:brightness-110 active:scale-[0.98] text-white text-[10px] font-black uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-md"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out Session</span>
          </button>
        </div>

        <div className="text-center text-[8px] text-text-muted mt-0.5 leading-normal font-sans font-medium uppercase tracking-widest border-t border-border/20 pt-3">
          CG Guru v1.2 • Built for serious aspirants
        </div>
      </motion.div>
    </div>
  );
};
