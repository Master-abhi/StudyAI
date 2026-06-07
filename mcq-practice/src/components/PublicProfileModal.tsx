import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Flame, Trophy, Star, BookOpen, UserPlus, UserCheck, X } from 'lucide-react';

interface PublicProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
  currentUser: any;
  getApiUrl: (path: string) => string;
}

interface PublicProfileData {
  uid: string;
  displayName: string;
  photoURL: string;
  points: number;
  streak: number;
  mcqsSolved: number;
  testsCount: number;
  isFollowing: boolean;
  followersCount: number;
  followingCount: number;
  plan?: string;
}

export const PublicProfileModal: React.FC<PublicProfileModalProps> = ({
  isOpen,
  onClose,
  uid,
  currentUser,
  getApiUrl
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [profile, setProfile] = useState<PublicProfileData | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !uid || !currentUser) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const token = await currentUser.getIdToken();
        const res = await fetch(getApiUrl(`/api/user/profile/${uid}`), {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error('Failed to load user profile');
        }
        const data = await res.json();
        setProfile(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isOpen, uid, currentUser, getApiUrl]);

  const handleFollowToggle = async () => {
    if (!profile || !currentUser || actionLoading) return;
    setActionLoading(true);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/user/follow'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ targetUid: uid })
      });
      if (!res.ok) {
        throw new Error('Failed to update follow status');
      }
      const data = await res.json();
      setProfile(prev => {
        if (!prev) return null;
        return {
          ...prev,
          isFollowing: data.isFollowing,
          followersCount: data.isFollowing ? prev.followersCount + 1 : Math.max(0, prev.followersCount - 1)
        };
      });
    } catch (err: any) {
      alert(err.message || 'An error occurred.');
    } finally {
      setActionLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0B0E14]/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-bg-s2 border border-border/70 rounded-2xl shadow-2xl p-6 flex flex-col gap-5 font-sans relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-bg-s3 hover:bg-bg-s3/80 flex items-center justify-center text-xs text-text-muted hover:text-text cursor-pointer transition-all"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-text-muted font-bold tracking-wide">Loading Profile...</span>
          </div>
        ) : error || !profile ? (
          <div className="text-center py-10 flex flex-col gap-3">
            <p className="text-xs text-redL font-bold">{error || 'Failed to load profile details.'}</p>
            <button
              onClick={onClose}
              className="py-2 px-4 bg-bg-s3 border border-border text-xs text-text font-black uppercase rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Header Hero */}
            <div className="flex flex-col items-center text-center gap-3">
              {profile.photoURL ? (
                <img 
                  src={profile.photoURL} 
                  alt="" 
                  className="w-20 h-20 border border-saffron-border/30 rounded-full object-cover shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-tr from-saffron to-orange-500 border border-saffron-border/30 rounded-full flex items-center justify-center text-3xl text-bg-s1 shadow-lg">
                  <User className="w-10 h-10 text-bg-s1" />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <h3 className="text-base font-black text-text leading-tight">{profile.displayName}</h3>
                <span className="text-[9px] font-black uppercase text-bg-s1 bg-saffron px-2.5 py-0.5 rounded shadow-sm self-center">
                  Aspirant
                </span>
              </div>

              {/* Followers count display */}
              <div className="flex gap-4 text-xs font-bold text-text-muted mt-1">
                <div>
                  <span className="text-text font-black">{profile.followersCount}</span> Followers
                </div>
                <div className="w-px h-4 bg-border/40" />
                <div>
                  <span className="text-text font-black">{profile.followingCount}</span> Following
                </div>
              </div>
            </div>

            {/* Follow Action Button */}
            <button
              onClick={handleFollowToggle}
              disabled={actionLoading}
              className={`w-full py-2.5 rounded-lg text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98] ${
                profile.isFollowing
                  ? 'bg-bg-s3 hover:bg-bg-s2 border border-border text-text'
                  : 'bg-gradient-to-r from-saffron to-orange-500 hover:brightness-110 text-bg-s1 shadow-md'
              }`}
            >
              {actionLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : profile.isFollowing ? (
                <>
                  <UserCheck className="w-4 h-4 text-greenL" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Follow</span>
                </>
              )}
            </button>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 border-t border-border/40 pt-4">
              <div className="p-3 bg-bg-s3/45 border border-border/40 rounded-xl flex items-center gap-3">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500/10 shrink-0" />
                <div className="flex flex-col truncate">
                  <span className="text-[8px] font-black text-text-muted uppercase leading-none">Streak</span>
                  <span className="text-sm font-black text-text mt-1">{profile.streak}</span>
                </div>
              </div>

              <div className="p-3 bg-bg-s3/45 border border-border/40 rounded-xl flex items-center gap-3">
                <Trophy className="w-5 h-5 text-saffron fill-saffron/10 shrink-0" />
                <div className="flex flex-col truncate">
                  <span className="text-[8px] font-black text-text-muted uppercase leading-none">Tests</span>
                  <span className="text-sm font-black text-text mt-1">{profile.testsCount}</span>
                </div>
              </div>

              <div className="p-3 bg-bg-s3/45 border border-border/40 rounded-xl flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-greenL fill-greenL/10 shrink-0" />
                <div className="flex flex-col truncate">
                  <span className="text-[8px] font-black text-text-muted uppercase leading-none">MCQs</span>
                  <span className="text-sm font-black text-text mt-1">{profile.mcqsSolved}</span>
                </div>
              </div>

              <div className="p-3 bg-bg-s3/45 border border-border/40 rounded-xl flex items-center gap-3">
                <Star className="w-5 h-5 text-blue-400 fill-blue-400/10 shrink-0" />
                <div className="flex flex-col truncate">
                  <span className="text-[8px] font-black text-text-muted uppercase leading-none">XP Points</span>
                  <span className="text-sm font-black text-text mt-1">{profile.points}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
