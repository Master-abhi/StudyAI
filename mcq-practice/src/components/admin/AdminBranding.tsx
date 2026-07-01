import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Upload, Link, CheckCircle, AlertCircle, RefreshCw, Eye } from 'lucide-react';

interface AdminBrandingProps {
  currentUser: any;
  configApiUrl: (path: string) => string;
}

export const AdminBranding: React.FC<AdminBrandingProps> = ({ currentUser, configApiUrl }) => {
  const [websiteLogo, setWebsiteLogo] = useState<string>('');
  const [appLogo, setAppLogo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [uploadingWeb, setUploadingWeb] = useState<boolean>(false);
  const [uploadingApp, setUploadingApp] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const webFileInputRef = useRef<HTMLInputElement>(null);
  const appFileInputRef = useRef<HTMLInputElement>(null);

  const fetchBranding = async () => {
    setLoading(true);
    try {
      const res = await fetch(configApiUrl('/api/admin/config/branding'));
      if (res.ok) {
        const data = await res.json();
        setWebsiteLogo(data.websiteLogo || '');
        setAppLogo(data.appLogo || '');
      } else {
        throw new Error('Failed to fetch branding config');
      }
    } catch (e: any) {
      console.error(e);
      setMessage({ type: 'error', text: 'Failed to load branding configurations.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranding();
  }, [currentUser]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, target: 'web' | 'app') => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image file (PNG, JPG, SVG).' });
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image size should be less than 3MB.' });
      return;
    }

    const setUploading = target === 'web' ? setUploadingWeb : setUploadingApp;
    setUploading(true);
    setMessage(null);

    try {
      const token = await currentUser.getIdToken();
      const formData = new FormData();
      formData.append('logoFile', file);

      const res = await fetch(configApiUrl('/api/admin/config/branding/upload'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Upload failed');
      }

      const data = await res.json();
      if (target === 'web') {
        setWebsiteLogo(data.url);
      } else {
        setAppLogo(data.url);
      }
      setMessage({ type: 'success', text: `Logo uploaded successfully for ${target === 'web' ? 'Website' : 'App'}!` });
    } catch (e: any) {
      console.error(e);
      setMessage({ type: 'error', text: e.message || 'Image upload failed.' });
    } finally {
      setUploading(false);
      // Reset file input value
      event.target.value = '';
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(configApiUrl('/api/admin/config/branding'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ websiteLogo, appLogo })
      });

      if (!res.ok) {
        throw new Error('Failed to save branding configurations.');
      }

      setMessage({ type: 'success', text: 'Branding logo configurations saved successfully! 🎉' });
    } catch (e: any) {
      console.error(e);
      setMessage({ type: 'error', text: e.message || 'Failed to save configuration.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#a0aec0]">
        <RefreshCw className="w-10 h-10 animate-spin mb-4 text-[#4299e1]" />
        <p className="text-sm font-medium">Loading Branding Configuration...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a202c]/60 backdrop-blur-md rounded-2xl border border-white/5 p-6 md:p-8 max-w-4xl mx-auto shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
        <div className="p-3 bg-[#3182ce]/20 rounded-xl text-[#63b3ed]">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Branding & Logo Settings</h2>
          <p className="text-[#a0aec0] text-sm">Upload and set website and mobile application logos</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 border ${
          message.type === 'success' 
            ? 'bg-[#2f855a]/10 border-[#48bb78]/20 text-[#48bb78]' 
            : 'bg-[#9b2c2c]/10 border-[#e53e3e]/20 text-[#fc8181]'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Website Logo Section */}
          <div className="space-y-4 bg-[#2d3748]/30 p-5 rounded-2xl border border-white/5">
            <h3 className="text-md font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4299e1]"></span>
              Website Logo Config
            </h3>
            <p className="text-[#a0aec0] text-xs">Used as header branding for Web app layout.</p>
            
            {/* Preview Box */}
            <div className="h-32 bg-[#1a202c]/80 rounded-xl border border-dashed border-white/10 flex items-center justify-center p-4 relative overflow-hidden group">
              {websiteLogo ? (
                <>
                  <img src={websiteLogo} alt="Website Logo Preview" className="max-h-full max-w-full object-contain" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      type="button" 
                      onClick={() => window.open(websiteLogo, '_blank')} 
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-[#718096]">
                  <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <span className="text-xs">No image uploaded</span>
                </div>
              )}
            </div>

            {/* Input Options */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <input 
                  type="file" 
                  ref={webFileInputRef} 
                  onChange={(e) => handleFileUpload(e, 'web')}
                  accept="image/*" 
                  className="hidden" 
                />
                <button
                  type="button"
                  onClick={() => webFileInputRef.current?.click()}
                  disabled={uploadingWeb}
                  className="flex-1 py-2 px-3 bg-[#2b6cb0] hover:bg-[#3182ce] disabled:bg-[#2b6cb0]/40 disabled:text-[#a0aec0] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {uploadingWeb ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  Upload Image
                </button>
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#718096]">
                  <Link className="w-3.5 h-3.5" />
                </span>
                <input 
                  type="url" 
                  value={websiteLogo}
                  onChange={(e) => setWebsiteLogo(e.target.value)}
                  placeholder="Or paste direct image URL..." 
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#1a202c] border border-white/10 rounded-lg text-white placeholder-[#718096] focus:border-[#4299e1] focus:ring-1 focus:ring-[#4299e1] outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* App Logo Section */}
          <div className="space-y-4 bg-[#2d3748]/30 p-5 rounded-2xl border border-white/5">
            <h3 className="text-md font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#48bb78]"></span>
              Mobile App Logo Config
            </h3>
            <p className="text-[#a0aec0] text-xs">Used as header branding for Mobile viewports.</p>

            {/* Preview Box */}
            <div className="h-32 bg-[#1a202c]/80 rounded-xl border border-dashed border-white/10 flex items-center justify-center p-4 relative overflow-hidden group">
              {appLogo ? (
                <>
                  <img src={appLogo} alt="App Logo Preview" className="max-h-full max-w-full object-contain" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      type="button" 
                      onClick={() => window.open(appLogo, '_blank')} 
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-[#718096]">
                  <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <span className="text-xs">No image uploaded</span>
                </div>
              )}
            </div>

            {/* Input Options */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <input 
                  type="file" 
                  ref={appFileInputRef} 
                  onChange={(e) => handleFileUpload(e, 'app')}
                  accept="image/*" 
                  className="hidden" 
                />
                <button
                  type="button"
                  onClick={() => appFileInputRef.current?.click()}
                  disabled={uploadingApp}
                  className="flex-1 py-2 px-3 bg-[#2f855a] hover:bg-[#38a169] disabled:bg-[#2f855a]/40 disabled:text-[#a0aec0] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {uploadingApp ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  Upload Image
                </button>
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#718096]">
                  <Link className="w-3.5 h-3.5" />
                </span>
                <input 
                  type="url" 
                  value={appLogo}
                  onChange={(e) => setAppLogo(e.target.value)}
                  placeholder="Or paste direct image URL..." 
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#1a202c] border border-white/10 rounded-lg text-white placeholder-[#718096] focus:border-[#48bb78] focus:ring-1 focus:ring-[#48bb78] outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/5">
          <button
            type="submit"
            disabled={saving || uploadingWeb || uploadingApp}
            className="px-6 py-2.5 bg-gradient-to-r from-[#3182ce] to-[#319795] hover:from-[#4299e1] hover:to-[#4fd1c5] disabled:from-[#3182ce]/50 disabled:to-[#319795]/50 disabled:text-[#a0aec0] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Saving Config...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Save Branding Configuration
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
