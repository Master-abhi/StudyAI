import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Shield, Award, Calendar, 
  TrendingUp, RefreshCw, Smartphone, Mail, Flame, Trophy,
  UserX, Trash2, ShieldAlert, Lock, Unlock
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

  const getApiUrl = (path: string) => {
    const host = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3000' : '';
    return `${host}${path}`;
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

  // Filter users
  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      user.displayName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.mobile.includes(searchLower) ||
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
                  <th className="py-4 px-5">Aspirant Profile</th>
                  <th className="py-4 px-4">Contact Info</th>
                  <th className="py-4 px-4 text-center">Plan Tier Status</th>
                  <th className="py-4 px-4">Metrics</th>
                  <th className="py-4 px-4">Activity Log</th>
                  <th className="py-4 px-4 text-right">Account Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs">
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.uid}
                    className={`hover:bg-bg-s3/15 transition-colors group ${user.disabled ? 'bg-red-500/5' : ''}`}
                  >
                    {/* Name & ID */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full font-black flex items-center justify-center text-xs select-none border ${
                          user.disabled 
                            ? 'bg-red-500/10 border-red-500/30 text-redL' 
                            : 'bg-saffron-dim/30 border-saffron-border/30 text-saffron'
                        }`}>
                          {user.displayName ? user.displayName.substring(0, 2).toUpperCase() : 'U'}
                        </div>
                        <div className="flex flex-col gap-0.5 truncate max-w-[180px]">
                          <div className="font-bold text-text group-hover:text-saffron transition-colors flex items-center gap-1.5 flex-wrap">
                            <span className="truncate">{user.displayName}</span>
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

                    {/* Actions: Block/Active, Promote & Delete */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Promote to Staff */}
                        {!user.isAdmin && !user.isStaff && (
                          <button
                            onClick={() => {
                              setUserToPromote(user);
                              setPromoteRoles([]);
                            }}
                            className="p-1.5 bg-saffron/10 border border-saffron-border/25 text-saffron hover:bg-saffron hover:text-bg-s1 rounded-lg cursor-pointer transition-colors shadow-sm flex items-center justify-center"
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
                  { key: 'tests', label: 'AI MCQ Tests', desc: 'Allows generating practice quiz papers (5 questions) or full mock mock tests (25 questions)' },
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

    </div>
  );
};
