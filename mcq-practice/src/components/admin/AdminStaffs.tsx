import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, UserPlus, Trash2, Edit2, RefreshCw, 
  AlertTriangle, Shield, CheckSquare, Square
} from 'lucide-react';

interface StaffProfile {
  uid: string;
  staffId: string;
  email: string;
  roles: string[];
  createdAt: string;
}

interface AdminStaffsProps {
  currentUser: any;
}

export const AdminStaffs: React.FC<AdminStaffsProps> = ({ currentUser }) => {
  const [staffs, setStaffs] = useState<StaffProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Form state
  const [newStaffId, setNewStaffId] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newRoles, setNewRoles] = useState<string[]>([]);
  const [creating, setCreating] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  // Action states
  const [editingStaff, setEditingStaff] = useState<StaffProfile | null>(null);
  const [editRoles, setEditRoles] = useState<string[]>([]);
  const [updatingRoles, setUpdatingRoles] = useState<boolean>(false);
  const [deletingUid, setDeletingUid] = useState<string | null>(null);
  const [staffToConfirmDelete, setStaffToConfirmDelete] = useState<StaffProfile | null>(null);

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

  const fetchStaffs = async () => {
    if (!currentUser) return;
    setLoading(true);
    setError('');
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/staffs'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error('Failed to fetch staff accounts list');
      }
      const data = await res.json();
      setStaffs(data);
    } catch (err: any) {
      console.error('[Fetch Staffs Error]:', err);
      setError(err.message || 'Error listing staff accounts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, [currentUser]);

  const handleRoleToggle = (role: string, currentRoles: string[], setRolesFn: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentRoles.includes(role)) {
      setRolesFn(currentRoles.filter(r => r !== role));
    } else {
      setRolesFn([...currentRoles, role]);
    }
  };

  const handleGenerateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setFormError('');

    const trimmedId = newStaffId.trim();
    if (!trimmedId) {
      setFormError('Staff User ID is required.');
      return;
    }
    if (newPassword.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }
    if (newRoles.length === 0) {
      setFormError('Please select at least one role/permission.');
      return;
    }

    setCreating(true);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/staff/generate'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          staffId: trimmedId,
          password: newPassword,
          roles: newRoles
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to generate staff account');
      }

      const result = await res.json();
      if (result.success && result.staff) {
        setStaffs(prev => [result.staff, ...prev]);
        // Reset form
        setNewStaffId('');
        setNewPassword('');
        setNewRoles([]);
      }
    } catch (err: any) {
      console.error('[Generate Staff Error]:', err);
      setFormError(err.message || 'Failed to generate staff account.');
    } finally {
      setCreating(false);
    }
  };

  const handleOpenEditRoles = (staff: StaffProfile) => {
    setEditingStaff(staff);
    setEditRoles(staff.roles);
  };

  const handleUpdateRoles = async () => {
    if (!currentUser || !editingStaff) return;
    setUpdatingRoles(true);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/staffs/${editingStaff.uid}/roles`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ roles: editRoles })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update roles');
      }

      const result = await res.json();
      if (result.success) {
        setStaffs(prev => prev.map(s => {
          if (s.uid === editingStaff.uid) {
            return { ...s, roles: editRoles };
          }
          return s;
        }));
        setEditingStaff(null);
      }
    } catch (err: any) {
      console.error('[Update Roles Error]:', err);
      alert(err.message || 'Failed to update staff roles.');
    } finally {
      setUpdatingRoles(false);
    }
  };

  const handleDeleteStaff = async (uid: string) => {
    if (!currentUser) return;
    setDeletingUid(uid);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl(`/api/admin/staffs/${uid}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to delete staff account');
      }

      const result = await res.json();
      if (result.success) {
        setStaffs(prev => prev.filter(s => s.uid !== uid));
        setStaffToConfirmDelete(null);
      }
    } catch (err: any) {
      console.error('[Delete Staff Error]:', err);
      alert(err.message || 'Failed to delete staff account.');
    } finally {
      setDeletingUid(null);
    }
  };

  const availableRoles = [
    { key: 'tests', label: 'AI MCQ Tests' },
    { key: 'news', label: 'News & Alerts' },
    { key: 'syllabus', label: 'Syllabus & PDF' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full text-text relative">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-bg-s2 to-bg-s3 border border-border p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-dim/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase text-saffron tracking-widest flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Staff Administration</span>
          </span>
          <h2 className="text-lg font-black text-text">Staff Control Panel</h2>
          <p className="text-xs text-text-muted max-w-xl">
            Generate credentials for your staff members and allocate precise operational boundaries (Tests management, News boards, or Syllabus configuration).
          </p>
        </div>
        <button 
          onClick={fetchStaffs}
          disabled={loading}
          className="px-3.5 py-2 bg-bg-s3 border border-border hover:border-saffron/40 hover:bg-bg-s2 text-xs font-black uppercase tracking-wider text-text flex items-center gap-2 rounded-lg cursor-pointer transition-colors shadow disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-saffron ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh List</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* 2. Staff Generator Form */}
        <div className="lg:col-span-1 p-5 bg-bg-s2 border border-border rounded-xl shadow-md flex flex-col gap-4">
          <h3 className="text-xs font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5 border-b border-border/60 pb-3">
            <UserPlus className="w-4 h-4 text-saffron" />
            <span>Generate Staff Account</span>
          </h3>

          <form onSubmit={handleGenerateStaff} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-wider">User ID / Username</label>
              <input
                type="text"
                placeholder="e.g. staff_rawat"
                value={newStaffId}
                onChange={(e) => setNewStaffId(e.target.value.replace(/\s+/g, ''))}
                className="bg-bg-s3 text-xs text-text border border-border focus:border-saffron p-2.5 rounded-lg outline-none transition-colors"
                required
              />
              <span className="text-[9px] text-text-muted mt-0.5">Will log in using: <code>{newStaffId.toLowerCase() || 'id'}@studyworld.app</code></span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-wider">Auth Password</label>
              <input
                type="password"
                placeholder="Min 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-bg-s3 text-xs text-text border border-border focus:border-saffron p-2.5 rounded-lg outline-none transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-wider">Roles & Permissions</label>
              <div className="flex flex-col gap-2 bg-bg-s3/40 border border-border/80 p-3 rounded-lg">
                {availableRoles.map(role => {
                  const isChecked = newRoles.includes(role.key);
                  return (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => handleRoleToggle(role.key, newRoles, setNewRoles)}
                      className="flex items-center gap-2.5 text-xs text-text hover:text-saffron transition-colors text-left"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-saffron shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-text-muted shrink-0" />
                      )}
                      <span>{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {formError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-redL rounded-lg flex items-center gap-2 text-[11px]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={creating}
              className="mt-2 w-full py-2.5 bg-saffron hover:bg-saffron-hover text-bg-s1 text-xs font-black uppercase tracking-wider rounded-lg cursor-pointer transition-colors shadow active:scale-[0.98] disabled:opacity-50"
            >
              {creating ? 'Generating Account...' : 'Create Staff Member'}
            </button>
          </form>
        </div>

        {/* 3. Staff accounts list table */}
        <div className="lg:col-span-2 bg-bg-s2 border border-border rounded-xl shadow-lg overflow-hidden">
          <h3 className="text-xs font-black uppercase text-text-muted tracking-wider p-5 border-b border-border/60 flex items-center gap-1.5 bg-bg-s3/10">
            <Shield className="w-4 h-4 text-saffron" />
            <span>Active Staff Registries</span>
          </h3>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-text-muted">
              <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold uppercase tracking-wider">Syncing Staff Members...</span>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-redL flex flex-col items-center gap-2">
              <AlertTriangle className="w-8 h-8 animate-bounce" />
              <span className="text-xs font-bold">{error}</span>
            </div>
          ) : staffs.length === 0 ? (
            <div className="p-16 text-center text-text-muted text-xs font-bold uppercase tracking-wide">
              No staff accounts generated yet. Use the control panel to add staff.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/80 bg-bg-s3/40 text-[9px] font-black uppercase text-text-muted tracking-wider">
                    <th className="py-4 px-5">Staff Identity</th>
                    <th className="py-4 px-4">Internal Email</th>
                    <th className="py-4 px-4">Authorized Roles</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-xs">
                  {staffs.map((staff) => (
                    <tr 
                      key={staff.uid}
                      className="hover:bg-bg-s3/15 transition-colors group"
                    >
                      {/* Name & ID */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-saffron-dim/30 border border-saffron-border/30 text-saffron font-black flex items-center justify-center text-xs select-none">
                            {staff.staffId ? staff.staffId.substring(0, 2).toUpperCase() : 'ST'}
                          </div>
                          <div className="flex flex-col gap-0.5 truncate max-w-[150px]">
                            <span className="font-bold text-text group-hover:text-saffron transition-colors truncate">
                              {staff.staffId}
                            </span>
                            <span className="text-[9px] text-text-muted font-mono truncate">
                              UID: {staff.uid.substring(0, 8)}...
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Internal Login Email */}
                      <td className="py-4 px-4">
                        <span className="text-[11px] text-text-muted font-mono">{staff.email}</span>
                      </td>

                      {/* Active Permissions / Roles */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {staff.roles.map(r => (
                            <span 
                              key={r}
                              className="px-2 py-0.5 bg-saffron-dim/15 border border-saffron-border/30 text-saffron text-[9px] font-bold uppercase rounded"
                            >
                              {r === 'tests' ? 'Tests' : r === 'news' ? 'News' : r === 'syllabus' ? 'Syllabus' : r}
                            </span>
                          ))}
                          {staff.roles.length === 0 && (
                            <span className="text-[9px] text-text-muted italic">No Permissions Granted</span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditRoles(staff)}
                            className="p-1.5 bg-bg-s3 border border-border text-text hover:border-saffron/40 hover:text-saffron rounded-lg cursor-pointer transition-colors shadow-sm flex items-center justify-center"
                            title="Edit Staff Access Roles"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          
                          <button
                            disabled={deletingUid !== null}
                            onClick={() => setStaffToConfirmDelete(staff)}
                            className="p-1.5 bg-red-500/10 border border-red-500/25 text-redL hover:bg-red-500 hover:text-bg-s1 rounded-lg cursor-pointer transition-colors shadow-sm flex items-center justify-center"
                            title="De-register Staff Member"
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

      </div>

      {/* 4. Edit roles modal overlay */}
      {editingStaff && (
        <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-sm flex items-center justify-center p-4 z-[99999] animate-fade-in">
          <div className="w-full max-w-md bg-bg-s2 border border-border rounded-xl shadow-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-saffron pb-2 border-b border-border">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <h3 className="text-sm font-black uppercase tracking-wider text-text">
                Manage Staff Access Bounds
              </h3>
            </div>
            
            <div className="flex flex-col gap-1 text-xs">
              <span className="text-text-muted">Staff Member: <strong className="text-text">{editingStaff.staffId}</strong></span>
              <span className="text-[10px] text-text-muted font-mono">UID: {editingStaff.uid}</span>
            </div>

            <div className="flex flex-col gap-3 py-2">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">Access Scope Checkboxes</span>
              <div className="flex flex-col gap-2.5 bg-bg-s3/60 border border-border/80 p-4 rounded-xl">
                {availableRoles.map(role => {
                  const isChecked = editRoles.includes(role.key);
                  return (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => handleRoleToggle(role.key, editRoles, setEditRoles)}
                      className="flex items-center gap-3 text-xs text-text hover:text-saffron transition-colors text-left"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4.5 h-4.5 text-saffron shrink-0" />
                      ) : (
                        <Square className="w-4.5 h-4.5 text-text-muted shrink-0" />
                      )}
                      <div className="flex flex-col">
                        <span className="font-bold">{role.label}</span>
                        <span className="text-[9px] text-text-muted">
                          {role.key === 'tests' ? 'Allows AI MCQ test generation & edit tools' : 
                           role.key === 'news' ? 'Allows scraping & updating general news cache' : 
                           'Allows uploading PDFs and tweaking syllabus structure'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                disabled={updatingRoles}
                onClick={() => setEditingStaff(null)}
                className="px-4 py-2 border border-border hover:bg-bg-s3 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={updatingRoles}
                onClick={handleUpdateRoles}
                className="px-4 py-2 bg-saffron hover:bg-saffron-hover text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors"
              >
                {updatingRoles ? 'Updating Permissions...' : 'Save Scope Permissions'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Delete staff modal overlay */}
      {staffToConfirmDelete && (
        <div className="fixed inset-0 bg-[#0B0E14]/85 backdrop-blur-sm flex items-center justify-center p-4 z-[99999] animate-fade-in">
          <div className="w-full max-w-md bg-bg-s2 border border-border rounded-xl shadow-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-redL pb-2 border-b border-border">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="text-sm font-black uppercase tracking-wider text-text">
                Revoke Staff Access
              </h3>
            </div>
            
            <p className="text-xs text-text-muted leading-relaxed">
              Are you sure you want to permanently delete the staff credentials of 
              <strong className="text-text"> {staffToConfirmDelete.staffId}</strong> (UID: {staffToConfirmDelete.uid.substring(0, 8)}...)?
              <br /><br />
              This will immediately sign them out, delete their credentials from Firebase Authentication, and remove their record from the staff registries.
            </p>

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                disabled={deletingUid !== null}
                onClick={() => setStaffToConfirmDelete(null)}
                className="px-4 py-2 border border-border hover:bg-bg-s3 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={deletingUid !== null}
                onClick={() => handleDeleteStaff(staffToConfirmDelete.uid)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-bg-s1 text-xs font-black uppercase rounded-lg cursor-pointer transition-colors"
              >
                {deletingUid === staffToConfirmDelete.uid ? 'Deleting...' : 'Confirm Revoke Access'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
