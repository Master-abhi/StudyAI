import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Shield, Award, Calendar, 
  TrendingUp, RefreshCw, Smartphone, Mail, Flame, Trophy,
  UserX, Trash2, ShieldAlert, Lock, Unlock, Eye, Edit,
  BookOpen, Clock, Target, X
} from 'lucide-react';

interface UserProfile {
  uid: string;
  email: string;
  displayId: string;
  displayName: string;
  createdAt: string;
  lastSignInTime: string;
  isAdmin: boolean;
  disabled: boolean;
  mobile: string;
  username?: string;
  points: number;
  streak: number;
  mcqsSolved: number;
  testResultsCount: number;
  isPaid: boolean;
  plan: string;
  isStaff: boolean;
  roles: string[];
}

interface AdminUsersProps {
  currentUser: any;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<'all' | 'paid' | 'free'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');
  
  // Action triggers
  const [togglingUid, setTogglingUid] = useState<string | null>(null);
  const [updatingStatusUid, setUpdatingStatusUid] = useState<string | null>(null);
  const [deletingUid, setDeletingUid] = useState<string | null>(null);

  // Overlay Dialog States
  const [userToConfirmDelete, setUserToConfirmDelete] = useState<UserProfile | null>(null);
  const [userToConfirmStatus, setUserToConfirmStatus] = useState<UserProfile | null>(null);
  
  // Promote User State
  const [userToPromote, setUserToPromote] = useState<UserProfile | null>(null);
  const [promoteRoles, setPromoteRoles] = useState<string[]>([]);
  const [promoting, setPromoting] = useState<boolean>(false);

  // Full User Details Viewer Modal States
  const [viewingUser, setViewingUser] = useState<UserProfile | null>(null);
  const [userDetailsData, setUserDetailsData] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  const [detailsTab, setDetailsTab] = useState<'overview' | 'tests' | 'typing' | 'syllabus'>('overview');

  // Edit User Profile Modal (Name, Email, Mobile, Username)
  const [userToEditProfile, setUserToEditProfile] = useState<UserProfile | null>(null);
  const [editDisplayName, setEditDisplayName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editMobile, setEditMobile] = useState<string>('');
  const [editUsername, setEditUsername] = useState<string>('');
  const [savingProfile, setSavingProfile] = useState<boolean>(false);

    const getApiUrl = (path: string) => {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || 
                    hostname === '127.0.0.1' || 
                    hostname === '[::1]' ||
                    hostname.startsWith('192.168.');
    if (isLocal && window.location.port !== '3000') {
      return `http://localhost:3000${path}`;
    }
    if (hostname.endsWith('.web.app') || hostname.endsWith('.firebaseapp.com')) {
      return `https://study-ai-olive.vercel.app${path}`;
    }
    return path;
  };

  const fetchUsers = async () => {
    if (!currentUser) return;
    setLoading(true);
    setError('');
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/users'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error('Failed to fetch users list');
      }
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      console.error('[Fetch Users Error]:', err);
      setError(err.message || 'Error listing users. Verify admin authentication claims.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUser]);

  const handleToggleTier = async (uid: string, currentPlan: string) => {
    if (!currentUser) return;
    setTogglingUid(uid);
    const newPlan = currentPlan === 'paid' ? 'free' : 'paid';
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/users/${uid}/tier`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ plan: newPlan })
      });

      if (!res.ok) {
        throw new Error('Failed to update tier status');
      }

      const result = await res.json();
      if (result.success) {
        setUsers(prev => prev.map(u => {
          if (u.uid === uid) {
            return { ...u, plan: newPlan, isPaid: newPlan === 'paid' };
          }
          return u;
        }));
      }
    } catch (err: any) {
      console.error('[Toggle Tier Error]:', err);
      alert(err.message || 'Failed to toggle tier status');
    } finally {
      setTogglingUid(null);
    }
  };

  const handleToggleStatus = async (user: UserProfile) => {
    if (!currentUser) return;
    setUpdatingStatusUid(user.uid);
    const newDisabled = !user.disabled;
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/users/${user.uid}/status`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ disabled: newDisabled })
      });

      if (!res.ok) {
        throw new Error('Failed to update user active status');
      }

      const result = await res.json();
      if (result.success) {
        setUsers(prev => prev.map(u => {
          if (u.uid === user.uid) {
            return { ...u, disabled: newDisabled };
          }
          return u;
        }));
        setUserToConfirmStatus(null);
      }
    } catch (err: any) {
      console.error('[Toggle Status Error]:', err);
      alert(err.message || 'Failed to toggle account active status');
    } finally {
      setUpdatingStatusUid(null);
    }
  };

  const handleDeleteUser = async (uid: string) => {
    if (!currentUser) return;
    setDeletingUid(uid);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/users/${uid}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to delete user account');
      }

      const result = await res.json();
      if (result.success) {
        setUsers(prev => prev.filter(u => u.uid !== uid));
        setUserToConfirmDelete(null);
      }
    } catch (err: any) {
      console.error('[Delete User Error]:', err);
      alert(err.message || 'Failed to permanently delete user account');
    } finally {
      setDeletingUid(null);
    }
  };

  const handleOpenUserDetails = async (user: UserProfile) => {
    setViewingUser(user);
    setUserDetailsData(null);
    setLoadingDetails(true);
    setDetailsTab('overview');
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/users/${user.uid}/details`), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error('Failed to load user complete details');
      }
      const data = await res.json();
      setUserDetailsData(data);
    } catch (err: any) {
      console.error('[Open User Details Error]:', err);
      alert(err.message || 'Failed to load user details.');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleOpenEditProfile = (user: UserProfile) => {
    setUserToEditProfile(user);
    setEditDisplayName(user.displayName || '');
    setEditEmail(user.email || '');
    setEditMobile(user.mobile || '');
    setEditUsername(user.username || '');
  };

  const handleSaveUserProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !userToEditProfile) return;
    setSavingProfile(true);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/users/${userToEditProfile.uid}/profile`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          displayName: editDisplayName.trim(),
          email: editEmail.trim(),
          mobile: editMobile.trim(),
          username: editUsername.trim()
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update user profile');
      }

      const result = await res.json();
      if (result.success) {
        setUsers(prev => prev.map(u => {
          if (u.uid === userToEditProfile.uid) {
            return {
              ...u,
              displayName: editDisplayName.trim() || u.displayName,
              email: editEmail.trim() || u.email,
              mobile: editMobile.trim(),
              username: editUsername.trim()
            };
          }
          return u;
        }));

        // Also update viewed user if open
        if (viewingUser && viewingUser.uid === userToEditProfile.uid) {
          setViewingUser(prev => prev ? {
            ...prev,
            displayName: editDisplayName.trim() || prev.displayName,
            email: editEmail.trim() || prev.email,
            mobile: editMobile.trim(),
            username: editUsername.trim()
          } : null);
          if (userDetailsData) {
            setUserDetailsData((prev: any) => ({
              ...prev,
              auth: prev?.auth ? { ...prev.auth, displayName: editDisplayName.trim(), email: editEmail.trim() } : prev?.auth,
              firestore: {
                ...prev?.firestore,
                displayName: editDisplayName.trim(),
                email: editEmail.trim(),
                mobile: editMobile.trim(),
                username: editUsername.trim()
              }
            }));
          }
        }

        setUserToEditProfile(null);
        alert('User profile updated successfully!');
      }
    } catch (err: any) {
      console.error('[Save User Profile Error]:', err);
      alert(err.message || 'Failed to update user profile');
    } finally {
      setSavingProfile(false);
    }
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      user.displayName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.mobile.includes(searchLower) ||
      (user.username && user.username.toLowerCase().includes(searchLower)) ||
      user.displayId.toLowerCase().includes(searchLower);

    const matchesTier = 
      tierFilter === 'all' ? true :
      tierFilter === 'paid' ? user.plan === 'paid' : user.plan === 'free';

    const matchesRole =
      roleFilter === 'all' ? true :
      roleFilter === 'admin' ? user.isAdmin : !user.isAdmin;

    const matchesStatus =
      statusFilter === 'all' ? true :
      statusFilter === 'active' ? !user.disabled : user.disabled;

    return matchesSearch && matchesTier && matchesRole && matchesStatus;
  });

  // Calculate metrics
  const totalCount = users.length;
  const paidCount = users.filter(u => u.plan === 'paid').length;
  const freeCount = users.filter(u => u.plan === 'free').length;
  const blockedCount = users.filter(u => u.disabled).length;

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full text-text relative">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-bg-s2 to-bg-s3 border border-border p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase text-saffron tracking-widest flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>User Management</span>
          </span>
          <h2 className="text-lg font-black text-text">Registered Aspirants Database</h2>
          <p className="text-xs text-text-muted max-w-xl">
            Monitor registered users, track learning achievements, verify mobile sync details, toggle Premium tier, and manage account statuses (Delete/Block/Activate).
          </p>
        </div>
        <button 
          onClick={fetchUsers}
          disabled={loading}
          className="px-3.5 py-2 bg-bg-s3 border border-border hover:border-saffron/40 hover:bg-bg-s2 text-xs font-black uppercase tracking-wider text-text flex items-center gap-2 rounded-lg cursor-pointer transition-colors shadow disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-saffron ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Database</span>
        </button>
      </div>

      {/* 2. Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex items-center gap-4 hover:border-saffron-border/30 transition-colors">
          <div className="w-12 h-12 bg-saffron/10 border border-saffron-border/20 rounded-lg flex items-center justify-center text-saffron shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">Total Registered</span>
            <span className="text-2xl font-black text-text mt-1">{loading ? '...' : totalCount}</span>
            <span className="text-[10px] text-text-muted mt-0.5">Aspirants registered</span>
          </div>
        </div>

        <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex items-center gap-4 hover:border-saffron-border/30 transition-colors">
          <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-500 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">Paid Courses</span>
            <span className="text-2xl font-black text-yellow-500 mt-1">{loading ? '...' : paidCount}</span>
            <span className="text-[10px] text-text-muted mt-0.5">Premium subscription active</span>
          </div>
        </div>

        <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex items-center gap-4 hover:border-saffron-border/30 transition-colors">
          <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">Free Courses</span>
            <span className="text-2xl font-black text-text mt-1">{loading ? '...' : freeCount}</span>
            <span className="text-[10px] text-text-muted mt-0.5">Standard access profile</span>
          </div>
        </div>

        <div className="p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex items-center gap-4 hover:border-saffron-border/30 transition-colors">
          <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center text-red-400 shrink-0">
            <UserX className="w-6 h-6" />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">Blocked Accounts</span>
            <span className="text-2xl font-black text-red-500 mt-1">{loading ? '...' : blockedCount}</span>
            <span className="text-[10px] text-text-muted mt-0.5">Deactivated credentials</span>
          </div>
        </div>
      </div>

      {/* 3. Filters Area */}
      <div className="p-4 bg-bg-s2 border border-border rounded-xl flex flex-col xl:flex-row gap-4 items-stretch xl:items-center justify-between shadow-md">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search users by Name, Email, Mobile or UserID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron pl-9 pr-4 py-2.5 rounded-lg outline-none transition-colors"
          />
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">Course Tier:</span>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as any)}
              className="bg-bg-s3 text-xs text-text border border-border rounded-lg px-3 py-2 outline-none focus:border-saffron"
            >
              <option value="all">All Access profiles</option>
              <option value="paid">Paid (Premium)</option>
              <option value="free">Free (Standard)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="bg-bg-s3 text-xs text-text border border-border rounded-lg px-3 py-2 outline-none focus:border-saffron"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins only</option>
              <option value="user">Students only</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-bg-s3 text-xs text-text border border-border rounded-lg px-3 py-2 outline-none focus:border-saffron"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active only</option>
              <option value="blocked">Blocked only</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Users Table / List */}
      <div className="bg-bg-s2 border border-border rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-text-muted">
            <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold uppercase tracking-wider">Syncing User Accounts...</span>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-redL flex flex-col items-center gap-2">
            <Shield className="w-8 h-8" />
            <span className="text-xs font-bold">{error}</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-text-muted text-xs font-bold uppercase tracking-wide">
            No registered users found matching filter queries.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/80 bg-bg-s3/40 text-[9px] font-black uppercase text-text-muted tracking-wider">
                  <th className="py-4 px-5 w-8">#</th>
                  <th className="py-4 px-4">Aspirant Profile</th>
                  <th className="py-4 px-4">Contact Info</th>
                  <th className="py-4 px-4 text-center">Plan Tier Status</th>
                  <th className="py-4 px-4">Metrics</th>
                  <th className="py-4 px-4">Activity Log</th>
                  <th className="py-4 px-4 text-right">Account Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs">
                {filteredUsers.map((user, idx) => (
                  <tr 
                    key={user.uid}
                    className={`hover:bg-bg-s3/15 transition-colors group ${user.disabled ? 'bg-red-500/5' : ''}`}
                  >
                    {/* Row Index */}
                    <td className="py-4 px-5 text-text-muted font-black w-8">{idx + 1}</td>
                    {/* Name & ID */}
                    <td className="py-4 px-4">
                      <div 
                        onClick={() => handleOpenUserDetails(user)}
                        className="flex items-center gap-3 cursor-pointer group/user"
                        title="Click to view full user activity & details"
                      >
                        <div className={`w-9 h-9 rounded-full font-black flex items-center justify-center text-xs select-none border transition-transform group-hover/user:scale-105 ${
                          user.disabled 
                            ? 'bg-red-500/10 border-red-500/30 text-redL' 
                            : 'bg-saffron-dim/30 border-saffron-border/30 text-saffron'
                        }`}>
                          {user.displayName ? user.displayName.substring(0, 2).toUpperCase() : 'U'}
                        </div>
                        <div className="flex flex-col gap-0.5 truncate max-w-[180px]">
                          <div className="font-bold text-text group-hover/user:text-saffron transition-colors flex items-center gap-1.5 flex-wrap">
                            <span className="truncate underline-offset-2 group-hover/user:underline">{user.displayName}</span>
                            {user.isAdmin && (
                              <span className="text-[7px] font-black uppercase bg-purple-500/25 border border-purple-500/40 text-purple-300 px-1 rounded">
                                Admin
                              </span>
                            )}
                            {user.isStaff && (
                              <span className="text-[7px] font-black uppercase bg-saffron/25 border border-saffron-border/30 text-saffron px-1 rounded">
                                Staff
                              </span>
                            )}
                            {user.disabled && (
                              <span className="text-[7px] font-black uppercase bg-red-500/25 border border-red-500/40 text-redL px-1 rounded flex items-center gap-0.5">
                                <Lock className="w-1.5 h-1.5" /> Blocked
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-text-muted font-mono truncate">ID: {user.displayId}</span>
                          {user.username && (
                            <span className="text-[10px] text-saffron font-bold truncate">@{user.username}</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 text-[11px] text-text-muted">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-saffron shrink-0" />
                          <span className="truncate max-w-[150px]">{user.email}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Smartphone className="w-3 h-3 text-greenL shrink-0" />
                          <span>{user.mobile || 'Not Synced'}</span>
                        </span>
                      </div>
                    </td>

                    {/* Subscription Plan Tier */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        {user.plan === 'paid' ? (
                          <span className="px-2.5 py-1 bg-saffron/10 border border-saffron-border/40 text-saffron rounded text-[10px] font-black uppercase tracking-wider">
                            Paid Course
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-bg-s3 border border-border text-text-muted rounded text-[10px] font-black uppercase tracking-wider">
                            Free Course
                          </span>
                        )}

                        <button
                          disabled={togglingUid !== null || user.disabled}
                          onClick={() => handleToggleTier(user.uid, user.plan)}
                          className="px-2 py-0.5 bg-bg-s3 hover:bg-bg-s2 border border-border/80 text-[8px] font-bold text-text hover:text-saffron rounded uppercase tracking-wider cursor-pointer disabled:opacity-50 transition-colors shadow-sm"
                        >
                          {togglingUid === user.uid ? 'Updating...' : `Toggle to ${user.plan === 'paid' ? 'Free' : 'Paid'}`}
                        </button>
                      </div>
                    </td>

                    {/* Stats metrics */}
                    <td className="py-4 px-4">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span className="font-bold text-text">{user.streak}</span>
                          <span className="text-[9px] text-text-muted">streak</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Trophy className="w-3.5 h-3.5 text-saffron shrink-0" />
                          <span className="font-bold text-text">{user.points}</span>
                          <span className="text-[9px] text-text-muted">XP</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-greenL shrink-0" />
                          <span className="font-bold text-text">{user.mcqsSolved}</span>
                          <span className="text-[9px] text-text-muted">MCQs</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span className="font-bold text-text">{user.testResultsCount}</span>
                          <span className="text-[9px] text-text-muted">tests</span>
                        </span>
                      </div>
                    </td>

                    {/* Activity dates */}
                    <td className="py-4 px-4 text-text-muted text-[10px]">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1" title="Registration Date">
                          <Calendar className="w-3 h-3 text-saffron shrink-0" />
                          <span>Reg: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Unknown'}</span>
                        </span>
                        <span className="flex items-center gap-1" title="Last Sign-in Date">
                          <Calendar className="w-3 h-3 text-purple-400 shrink-0" />
                          <span>Last: {user.lastSignInTime ? new Date(user.lastSignInTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Never'}</span>
                        </span>
                      </div>
                    </td>

                    {/* Actions: Block/Active, Promote, Edit & Delete */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Full Data */}
                        <button
                          onClick={() => handleOpenUserDetails(user)}
                          className="p-1.5 bg-saffron-dim/20 border border-saffron-border/30 text-saffron hover:bg-saffron hover:text-bg-s1 rounded-lg cursor-pointer transition-colors shadow-sm flex items-center justify-center"
                          title="View Full User Activity & History (सम्पूर्ण डेटा)"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit Profile (Name, Email, Mobile, Username) */}
                        <button
                          onClick={() => handleOpenEditProfile(user)}
                          className="p-1.5 bg-blue-500/10 border border-blue-500/25 text-blue-400 hover:bg-blue-500 hover:text-bg-s1 rounded-lg cursor-pointer transition-colors shadow-sm flex items-center justify-center"
                          title="Edit User Profile (नाम, ईमेल, फ़ोन नंबर, यूज़रनेम बदलें)"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        {/* Promote to Staff */}
                        {!user.isAdmin && !user.isStaff && (
                          <button
                            onClick={() => {
                              setUserToPromote(user);
                              setPromoteRoles([]);
                            }}
                            className="p-1.5 bg-purple-500/10 border border-purple-500/25 text-purple-400 hover:bg-purple-500 hover:text-bg-s1 rounded-lg cursor-pointer transition-colors shadow-sm flex items-center justify-center"
                            title="Promote Student to Staff"
                          >
                            <Shield className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Block/Activate Toggle */}
                        <button
                          disabled={updatingStatusUid !== null}
                          onClick={() => setUserToConfirmStatus(user)}
                          className={`p-1.5 border rounded-lg cursor-pointer transition-colors shadow-sm flex items-center justify-center ${
                            user.disabled
                              ? 'bg-greenL/10 border-greenL/25 text-greenL hover:bg-greenL hover:text-bg-s1'
                              : 'bg-orange-500/10 border-orange-500/25 text-orange-400 hover:bg-orange-500 hover:text-bg-s1'
                          }`}
                          title={user.disabled ? 'Activate User Account' : 'Block User Account'}
                        >
                          {user.disabled ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        </button>

                        {/* Permanent Delete */}
                        <button
                          disabled={deletingUid !== null}
                          onClick={() => setUserToConfirmDelete(user)}
                          className="p-1.5 bg-red-500/10 border border-red-500/25 text-redL hover:bg-red-500 hover:text-bg-s1 rounded-lg cursor-pointer transition-colors shadow-sm flex items-center justify-center"
                          title="Permanently Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CONFIRM STATUS MODAL OVERLAY */}
      {userToConfirmStatus && (
        <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-sm flex items-center justify-center p-4 z-[99999] animate-fade-in">
          <div className="w-full max-w-md bg-bg-s2 border border-border rounded-xl shadow-2xl overflow-hidden p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-orange-500 pb-1 border-b border-border">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <h3 className="text-sm font-black uppercase tracking-wider text-text">
                {userToConfirmStatus.disabled ? 'Activate Account' : 'Block User Account'}
              </h3>
            </div>
            
            <p className="text-xs text-text-muted leading-relaxed">
              Are you sure you want to {userToConfirmStatus.disabled ? 'reactivate' : 'deactivate/block'} the account of 
              <strong className="text-text"> {userToConfirmStatus.displayName} </strong> (ID: {userToConfirmStatus.displayId})?
              <br /><br />
              {userToConfirmStatus.disabled 
                ? 'The user will immediately regain credentials to log in, review chapters, and practice AI tests.' 
                : 'The user will be immediately blocked from signing into the application. Their active tokens will become invalid upon expiry.'
              }
            </p>

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                disabled={updatingStatusUid !== null}
                onClick={() => setUserToConfirmStatus(null)}
                className="px-4 py-2 border border-border hover:bg-bg-s3 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={updatingStatusUid !== null}
                onClick={() => handleToggleStatus(userToConfirmStatus)}
                className={`px-4 py-2 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 ${
                  userToConfirmStatus.disabled
                    ? 'bg-greenL text-bg-s1 hover:bg-green-500'
                    : 'bg-orange-500 text-bg-s1 hover:bg-orange-600'
                }`}
              >
                {updatingStatusUid === userToConfirmStatus.uid 
                  ? 'Updating...' 
                  : userToConfirmStatus.disabled ? 'Activate Student' : 'Confirm Block'
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL OVERLAY */}
      {userToConfirmDelete && (
        <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-sm flex items-center justify-center p-4 z-[99999] animate-fade-in">
          <div className="w-full max-w-md bg-bg-s2 border border-border rounded-xl shadow-2xl overflow-hidden p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-redL pb-1 border-b border-border">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <h3 className="text-sm font-black uppercase tracking-wider text-text">
                ⚠️ Permanent Deletion
              </h3>
            </div>
            
            <p className="text-xs text-text-muted leading-relaxed">
              You are about to permanently delete <strong className="text-text">{userToConfirmDelete.displayName}</strong> (ID: {userToConfirmDelete.displayId}).
              <br /><br />
              <strong className="text-redL font-bold">This action is irreversible.</strong> It will delete the user account from Firebase Authentication and purge their points, streaks, mock performance history, and all study metrics from the database.
            </p>

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                disabled={deletingUid !== null}
                onClick={() => setUserToConfirmDelete(null)}
                className="px-4 py-2 border border-border hover:bg-bg-s3 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={deletingUid !== null}
                onClick={() => handleDeleteUser(userToConfirmDelete.uid)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors"
              >
                {deletingUid === userToConfirmDelete.uid ? 'Purging Profile...' : 'Confirm Permanent Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROMOTE USER TO STAFF MODAL OVERLAY */}
      {userToPromote && (
        <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-sm flex items-center justify-center p-4 z-[99999] animate-fade-in">
          <div className="w-full max-w-md bg-bg-s2 border border-border rounded-xl shadow-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-saffron pb-2 border-b border-border">
              <Shield className="w-5 h-5 shrink-0" />
              <h3 className="text-sm font-black uppercase tracking-wider text-text">
                Promote Student to Staff
              </h3>
            </div>
            
            <p className="text-xs text-text-muted leading-relaxed">
              Allocate operational boundaries to promote <strong className="text-text">{userToPromote.displayName}</strong> (ID: {userToPromote.displayId}) to a staff account.
            </p>

            <div className="flex flex-col gap-3 py-2">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">Access Scope Checkboxes</span>
              <div className="flex flex-col gap-2.5 bg-bg-s3/60 border border-border/80 p-4 rounded-xl">
                {[
                  { key: 'tests', label: 'MCQ Tests', desc: 'Allows generating practice quiz papers (5 questions) or full mock mock tests (25 questions)' },
                  { key: 'news', label: 'News & Alerts', desc: 'Allows refreshing general board news and translation caches.' },
                  { key: 'syllabus', label: 'Syllabus & PDF', desc: 'Allows uploading text-extracted reference notes and syllabus configs.' }
                ].map(role => {
                  const isChecked = promoteRoles.includes(role.key);
                  return (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => {
                        if (isChecked) {
                          setPromoteRoles(promoteRoles.filter(r => r !== role.key));
                        } else {
                          setPromoteRoles([...promoteRoles, role.key]);
                        }
                      }}
                      className="flex items-center gap-3 text-xs text-text hover:text-saffron transition-colors text-left"
                    >
                      <span className="shrink-0 text-saffron text-lg">
                        {isChecked ? '☑️' : '⬛'}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-bold">{role.label}</span>
                        <span className="text-[9px] text-text-muted">{role.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                disabled={promoting}
                onClick={() => setUserToPromote(null)}
                className="px-4 py-2 border border-border hover:bg-bg-s3 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={promoting || promoteRoles.length === 0}
                onClick={async () => {
                  setPromoting(true);
                  try {
                    const token = await currentUser.getIdToken();
                    const res = await fetch(getApiUrl(`/api/admin/users/${userToPromote.uid}/promote`), {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify({ roles: promoteRoles })
                    });
                    if (!res.ok) {
                      const errData = await res.json();
                      throw new Error(errData.error || 'Failed to promote user');
                    }
                    const result = await res.json();
                    if (result.success) {
                      setUsers(prev => prev.map(u => {
                        if (u.uid === userToPromote.uid) {
                          return { ...u, isStaff: true, roles: promoteRoles };
                        }
                        return u;
                      }));
                      setUserToPromote(null);
                    }
                  } catch (e: any) {
                    console.error('[Promote User Error]:', e);
                    alert(e.message || 'Failed to promote user to staff.');
                  } finally {
                    setPromoting(false);
                  }
                }}
                className="px-4 py-2 bg-saffron hover:bg-saffron-hover text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors disabled:opacity-50"
              >
                {promoting ? 'Promoting...' : 'Confirm Promotion'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT USER PROFILE MODAL (Name, Email, Mobile, Username) */}
      {userToEditProfile && (
        <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-sm flex items-center justify-center p-4 z-[99999] animate-fade-in">
          <form onSubmit={handleSaveUserProfile} className="w-full max-w-lg bg-bg-s2 border border-border rounded-xl shadow-2xl overflow-hidden p-6 flex flex-col gap-4 font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2.5 text-blue-400">
                <Edit className="w-5 h-5 shrink-0" />
                <h3 className="text-sm font-black uppercase tracking-wider text-text">
                  Edit User Profile Credentials
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setUserToEditProfile(null)}
                className="text-text-muted hover:text-text cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
              Full authority to update account details for <strong className="text-text">{userToEditProfile.displayName}</strong> (UID: {userToEditProfile.uid}).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-wider">Full Name (नाम)</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Patel"
                  value={editDisplayName}
                  onChange={(e) => setEditDisplayName(e.target.value)}
                  required
                  disabled={savingProfile}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none transition-colors"
                />
              </div>

              {/* Username */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-wider">Username (@यूज़रनेम)</label>
                <input
                  type="text"
                  placeholder="e.g. ramesh_cg"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  disabled={savingProfile}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none transition-colors"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-wider">Email ID (ईमेल)</label>
                <input
                  type="email"
                  placeholder="e.g. user@gmail.com"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                  disabled={savingProfile}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none transition-colors"
                />
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-wider">Phone / Mobile (मोबाइल नंबर)</label>
                <input
                  type="text"
                  placeholder="e.g. 9876543210"
                  value={editMobile}
                  onChange={(e) => setEditMobile(e.target.value)}
                  disabled={savingProfile}
                  className="w-full bg-bg-s3 text-xs text-text border border-border focus:border-saffron px-3 py-2.5 rounded-lg outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-3 pt-3 border-t border-border/80">
              <button
                type="button"
                disabled={savingProfile}
                onClick={() => setUserToEditProfile(null)}
                className="px-4 py-2 border border-border hover:bg-bg-s3 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingProfile}
                className="px-5 py-2 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors disabled:opacity-50 shadow-md"
              >
                {savingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FULL USER DETAILS & ACTIVITY VIEWER MODAL */}
      {viewingUser && (
        <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 z-[99999] animate-fade-in">
          <div className="w-full max-w-4xl max-h-[90vh] bg-bg-s2 border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans">
            
            {/* Modal Header */}
            <div className="p-5 md:p-6 bg-gradient-to-r from-bg-s2 to-bg-s3 border-b border-border flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-full bg-saffron-dim/20 border border-saffron-border/30 flex items-center justify-center text-saffron text-base font-black shrink-0">
                  {viewingUser.displayName ? viewingUser.displayName.substring(0, 2).toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-black text-text leading-tight truncate">
                      {viewingUser.displayName}
                    </h3>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-saffron text-bg-s1">
                      {viewingUser.plan === 'paid' ? 'Pro pass' : 'Free Tier'}
                    </span>
                    {viewingUser.disabled && (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-red-500/20 text-redL border border-red-500/30">
                        Blocked
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-text-muted mt-0.5 font-mono truncate">
                    UID: {viewingUser.uid} • {viewingUser.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEditProfile(viewingUser)}
                  className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500 hover:text-white border border-blue-500/30 text-blue-400 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </button>
                <button
                  onClick={() => setViewingUser(null)}
                  className="p-2 text-text-muted hover:text-text hover:bg-bg-s3 rounded-lg cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 px-5 pt-3 border-b border-border bg-bg-s3/30 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview & Stats', icon: Trophy },
                { id: 'tests', label: `Test History (${userDetailsData?.firestore?.testResults?.length || viewingUser.testResultsCount || 0})`, icon: Target },
                { id: 'typing', label: `Typing History (${userDetailsData?.firestore?.typingResults?.length || 0})`, icon: Clock },
                { id: 'syllabus', label: 'Syllabus & Devices', icon: BookOpen }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = detailsTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDetailsTab(tab.id as any)}
                    className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                      isActive 
                        ? 'border-saffron text-saffron bg-saffron/5' 
                        : 'border-transparent text-text-muted hover:text-text'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body / Tab Content */}
            <div className="p-5 md:p-6 overflow-y-auto flex-1">
              {loadingDetails ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-text-muted">
                  <RefreshCw className="w-6 h-6 animate-spin text-saffron" />
                  <span className="text-xs font-bold uppercase tracking-wider">Fetching User Complete Database Records...</span>
                </div>
              ) : !userDetailsData ? (
                <div className="text-center py-12 text-xs text-text-muted">No data records available.</div>
              ) : (
                <>
                  {/* TAB 1: OVERVIEW */}
                  {detailsTab === 'overview' && (
                    <div className="flex flex-col gap-6">
                      {/* Metric Stat Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3.5 bg-bg-s3 border border-border rounded-xl flex flex-col items-center text-center">
                          <Flame className="w-5 h-5 text-orange-500 mb-1" />
                          <span className="text-lg font-black text-text">{userDetailsData.firestore?.streak?.count ?? viewingUser.streak}</span>
                          <span className="text-[9px] font-black uppercase text-text-muted mt-0.5">Study Streak</span>
                        </div>
                        <div className="p-3.5 bg-bg-s3 border border-border rounded-xl flex flex-col items-center text-center">
                          <Trophy className="w-5 h-5 text-saffron mb-1" />
                          <span className="text-lg font-black text-text">{userDetailsData.firestore?.points ?? viewingUser.points}</span>
                          <span className="text-[9px] font-black uppercase text-text-muted mt-0.5">XP Points</span>
                        </div>
                        <div className="p-3.5 bg-bg-s3 border border-border rounded-xl flex flex-col items-center text-center">
                          <Award className="w-5 h-5 text-greenL mb-1" />
                          <span className="text-lg font-black text-text">{userDetailsData.firestore?.mcqsSolved ?? viewingUser.mcqsSolved}</span>
                          <span className="text-[9px] font-black uppercase text-text-muted mt-0.5">MCQs Solved</span>
                        </div>
                        <div className="p-3.5 bg-bg-s3 border border-border rounded-xl flex flex-col items-center text-center">
                          <Target className="w-5 h-5 text-blue-400 mb-1" />
                          <span className="text-lg font-black text-text">{userDetailsData.firestore?.testResults?.length ?? viewingUser.testResultsCount}</span>
                          <span className="text-[9px] font-black uppercase text-text-muted mt-0.5">Mock Tests</span>
                        </div>
                      </div>

                      {/* Profile Field Details */}
                      <div className="p-4 bg-bg-s3/60 border border-border rounded-xl flex flex-col gap-3">
                        <h4 className="text-xs font-black uppercase text-text tracking-wider border-b border-border/80 pb-2 flex items-center justify-between">
                          <span>User Identity & Metadata</span>
                          <button
                            onClick={() => handleOpenEditProfile(viewingUser)}
                            className="text-[10px] text-saffron hover:underline font-bold uppercase flex items-center gap-1 cursor-pointer"
                          >
                            <Edit className="w-3 h-3" /> Edit Credentials
                          </button>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-text-muted text-[10px] block uppercase font-bold">Display Name</span>
                            <span className="font-bold text-text">{userDetailsData.firestore?.displayName || viewingUser.displayName}</span>
                          </div>
                          <div>
                            <span className="text-text-muted text-[10px] block uppercase font-bold">Email Address</span>
                            <span className="font-bold text-text">{userDetailsData.auth?.email || viewingUser.email}</span>
                          </div>
                          <div>
                            <span className="text-text-muted text-[10px] block uppercase font-bold">Mobile Phone</span>
                            <span className="font-bold text-text">{userDetailsData.firestore?.mobile || 'Not set'}</span>
                          </div>
                          <div>
                            <span className="text-text-muted text-[10px] block uppercase font-bold">Username</span>
                            <span className="font-bold text-text">@{userDetailsData.firestore?.username || 'none'}</span>
                          </div>
                          <div>
                            <span className="text-text-muted text-[10px] block uppercase font-bold">Selected Target Exam</span>
                            <span className="font-bold text-saffron uppercase">{userDetailsData.firestore?.selectedExam || 'cgpsc'}</span>
                          </div>
                          <div>
                            <span className="text-text-muted text-[10px] block uppercase font-bold">Account Registration Date</span>
                            <span className="font-bold text-text">{userDetailsData.auth?.creationTime ? new Date(userDetailsData.auth.creationTime).toLocaleString('en-IN') : 'Unknown'}</span>
                          </div>
                          <div>
                            <span className="text-text-muted text-[10px] block uppercase font-bold">Last Sign-in Time</span>
                            <span className="font-bold text-text">{userDetailsData.auth?.lastSignInTime ? new Date(userDetailsData.auth.lastSignInTime).toLocaleString('en-IN') : 'Never'}</span>
                          </div>
                          <div>
                            <span className="text-text-muted text-[10px] block uppercase font-bold">Email Verified</span>
                            <span className={`font-bold ${userDetailsData.auth?.emailVerified ? 'text-greenL' : 'text-redL'}`}>
                              {userDetailsData.auth?.emailVerified ? 'Verified' : 'Unverified'}
                            </span>
                          </div>
                          <div>
                            <span className="text-text-muted text-[10px] block uppercase font-bold">Subscription Plan & Validity</span>
                            {userDetailsData.firestore?.plan === 'paid' || viewingUser.plan === 'paid' ? (
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-black text-emerald-400">Pro pass Active</span>
                                {userDetailsData.firestore?.planExpiresAt && (
                                  <span className="text-text-muted font-bold text-[10px]">
                                    (Valid till: {new Date(
                                      userDetailsData.firestore.planExpiresAt._seconds 
                                        ? userDetailsData.firestore.planExpiresAt._seconds * 1000 
                                        : userDetailsData.firestore.planExpiresAt
                                    ).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })})
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="font-bold text-text-muted">Free Plan</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: TEST PERFORMANCE HISTORY */}
                  {detailsTab === 'tests' && (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between border-b border-border pb-2">
                        <span className="text-xs font-black uppercase text-text tracking-wider">
                          Mock & Practice Test Attempts
                        </span>
                        <span className="text-[10px] font-bold text-text-muted">
                          {userDetailsData.firestore?.testResults?.length || 0} Records
                        </span>
                      </div>

                      {(!userDetailsData.firestore?.testResults || userDetailsData.firestore.testResults.length === 0) ? (
                        <div className="text-center py-12 text-xs text-text-muted">No test results recorded yet.</div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {[...userDetailsData.firestore.testResults].reverse().map((test: any, idx: number) => (
                            <div key={idx} className="p-3 bg-bg-s3 border border-border rounded-lg flex items-center justify-between text-xs gap-3">
                              <div className="flex flex-col min-w-0">
                                <span className="font-bold text-text truncate">
                                  {test.subject || test.exam || 'Practice Quiz'}
                                </span>
                                <span className="text-[10px] text-text-muted mt-0.5 uppercase font-semibold">
                                  Mode: {test.mode || 'quiz'} • Correct: {test.correct ?? test.score ?? 0} • Wrong: {test.wrong ?? 0} • Total: {test.total ?? 5}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <span className={`font-black ${
                                  (test.percent || 0) >= 75 ? 'text-greenL' :
                                  (test.percent || 0) >= 55 ? 'text-saffron' :
                                  'text-redL'
                                }`}>
                                  {test.percent || 0}%
                                </span>
                                <span className="text-[10px] text-text-muted">
                                  {test.timestamp || test.date ? new Date(test.timestamp || test.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : ''}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: TYPING PERFORMANCE HISTORY */}
                  {detailsTab === 'typing' && (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between border-b border-border pb-2">
                        <span className="text-xs font-black uppercase text-text tracking-wider">
                          Typing Test Records
                        </span>
                        <span className="text-[10px] font-bold text-text-muted">
                          {userDetailsData.firestore?.typingResults?.length || 0} Tests
                        </span>
                      </div>

                      {(!userDetailsData.firestore?.typingResults || userDetailsData.firestore.typingResults.length === 0) ? (
                        <div className="text-center py-12 text-xs text-text-muted">No typing test attempts recorded yet.</div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {[...userDetailsData.firestore.typingResults].reverse().map((typeLog: any, idx: number) => (
                            <div key={idx} className="p-3 bg-bg-s3 border border-border rounded-lg flex items-center justify-between text-xs gap-3">
                              <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-text truncate">{typeLog.topicTitle || 'Typing Practice'}</span>
                                  <span className="text-[8px] px-1.5 py-0.2 bg-saffron/15 text-saffron border border-saffron-border/30 rounded font-black uppercase">
                                    {typeLog.language === 'krutidev' ? 'कृत्तिदेव 010' : 'English'}
                                  </span>
                                </div>
                                <span className="text-[10px] text-text-muted mt-1 uppercase font-semibold">
                                  Net: {typeLog.netWpm || 0} WPM • Gross: {typeLog.grossWpm || 0} WPM • Accuracy: {typeLog.accuracy || 0}%
                                </span>
                              </div>
                              <span className="text-[10px] text-text-muted shrink-0">
                                {typeLog.date ? new Date(typeLog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: SYLLABUS PROGRESS & ACTIVE DEVICES */}
                  {detailsTab === 'syllabus' && (
                    <div className="flex flex-col gap-5">
                      {/* Active Logged-in Devices */}
                      <div className="p-4 bg-bg-s3/60 border border-border rounded-xl flex flex-col gap-2.5">
                        <h4 className="text-xs font-black uppercase text-text tracking-wider border-b border-border/80 pb-2">
                          Active Logged-in Devices (डिवाइस सत्र)
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-bg-s2 border border-border rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <Smartphone className="w-4 h-4 text-saffron" />
                              <div className="flex flex-col">
                                <span className="font-bold text-text">Mobile Slot</span>
                                <span className="text-[10px] text-text-muted">
                                  {userDetailsData.firestore?.activeDevices?.mobile?.deviceName || 'No mobile logged in'}
                                </span>
                              </div>
                            </div>
                            {userDetailsData.firestore?.activeDevices?.mobile && (
                              <span className="text-[8px] bg-greenL/15 text-greenL border border-greenL/30 px-1.5 py-0.5 rounded font-black uppercase">
                                Active
                              </span>
                            )}
                          </div>

                          <div className="p-3 bg-bg-s2 border border-border rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <Users className="w-4 h-4 text-blue-400" />
                              <div className="flex flex-col">
                                <span className="font-bold text-text">Computer / Tablet Slot</span>
                                <span className="text-[10px] text-text-muted">
                                  {userDetailsData.firestore?.activeDevices?.desktop?.deviceName || 'No PC logged in'}
                                </span>
                              </div>
                            </div>
                            {userDetailsData.firestore?.activeDevices?.desktop && (
                              <span className="text-[8px] bg-greenL/15 text-greenL border border-greenL/30 px-1.5 py-0.5 rounded font-black uppercase">
                                Active
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Topic Progress count */}
                      <div className="p-4 bg-bg-s3/60 border border-border rounded-xl flex flex-col gap-2.5">
                        <h4 className="text-xs font-black uppercase text-text tracking-wider border-b border-border/80 pb-2">
                          Syllabus Topic Progress
                        </h4>
                        {userDetailsData.firestore?.topicProgress ? (
                          <div className="text-xs text-text">
                            <span>Topics Tracked: </span>
                            <strong className="text-saffron">{Object.keys(userDetailsData.firestore.topicProgress).length} Topics</strong>
                          </div>
                        ) : (
                          <div className="text-xs text-text-muted">No topic progress tracked yet.</div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-bg-s3/40 border-t border-border flex items-center justify-between">
              <span className="text-[10px] text-text-muted">
                Admin Data Inspection Panel
              </span>
              <button
                onClick={() => setViewingUser(null)}
                className="px-4 py-2 bg-bg-s2 hover:bg-bg-s3 border border-border text-xs font-black uppercase rounded-lg cursor-pointer transition-colors"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
