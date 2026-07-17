import React, { useState, useEffect } from 'react';
import { 
  Keyboard, Plus, Edit2, Trash2, Save, 
  RefreshCw, Loader2, CheckCircle, ShieldAlert, Award
} from 'lucide-react';
import { TYPING_TOPICS } from '../TypingTest';
import type { Topic } from '../TypingTest';

interface AdminTypingProps {
  currentUser: any;
}

export const AdminTyping: React.FC<AdminTypingProps> = ({ currentUser: _currentUser }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Form States
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState<string>('');
  const [formDifficulty, setFormDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [formEnglishText, setFormEnglishText] = useState<string>('');
  const [formHindiUnicode, setFormHindiUnicode] = useState<string>('');
  const [formHindiKrutidev, setFormHindiKrutidev] = useState<string>('');

  const firebase = (window as any).firebase;

  const fetchTopics = async () => {
    setLoading(true);
    setErrorMsg('');
    if (!firebase) {
      setErrorMsg('Firebase Client SDK is not initialized.');
      setLoading(false);
      return;
    }
    try {
      const snapshot = await firebase.firestore().collection('typing_topics').get();
      const loaded: Topic[] = [];
      snapshot.forEach((doc: any) => {
        const data = doc.data();
        loaded.push({
          id: doc.id,
          title: data.title || '',
          difficulty: data.difficulty || 'easy',
          englishText: data.englishText || '',
          hindiUnicodeText: data.hindiUnicodeText || '',
          hindiKrutidevText: data.hindiKrutidevText || ''
        });
      });
      // Sort alphabetically
      loaded.sort((a, b) => a.title.localeCompare(b.title));
      setTopics(loaded);
    } catch (err: any) {
      console.error('[AdminTyping] Load Error:', err);
      setErrorMsg(err.message || 'Failed to load typing topics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // Seeding tool helper
  const handleSeedDefaultTopics = async () => {
    if (!firebase) return;
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const batch = firebase.firestore().batch();
      const collectionRef = firebase.firestore().collection('typing_topics');

      TYPING_TOPICS.forEach((topic) => {
        const docRef = collectionRef.doc(topic.id);
        batch.set(docRef, {
          title: topic.title,
          difficulty: topic.difficulty,
          englishText: topic.englishText,
          hindiUnicodeText: topic.hindiUnicodeText,
          hindiKrutidevText: topic.hindiKrutidevText,
          createdAt: new Date().toISOString()
        });
      });

      await batch.commit();
      setSuccessMsg('Successfully seeded default topics to Firestore!');
      await fetchTopics();
    } catch (err: any) {
      console.error('[AdminTyping] Seed Error:', err);
      setErrorMsg(err.message || 'Failed to seed default topics.');
    } finally {
      setSaving(false);
    }
  };

  // Open Create Form
  const handleOpenCreate = () => {
    setIsNew(true);
    setEditingTopic({
      id: '',
      title: '',
      difficulty: 'easy',
      englishText: '',
      hindiUnicodeText: '',
      hindiKrutidevText: ''
    });
    setFormTitle('');
    setFormDifficulty('easy');
    setFormEnglishText('');
    setFormHindiUnicode('');
    setFormHindiKrutidev('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  // Open Edit Form
  const handleOpenEdit = (topic: Topic) => {
    setIsNew(false);
    setEditingTopic(topic);
    setFormTitle(topic.title);
    setFormDifficulty(topic.difficulty);
    setFormEnglishText(topic.englishText);
    setFormHindiUnicode(topic.hindiUnicodeText);
    setFormHindiKrutidev(topic.hindiKrutidevText);
    setErrorMsg('');
    setSuccessMsg('');
  };

  // Save changes
  const handleSaveTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTopic || !firebase) return;

    if (!formTitle.trim()) {
      setErrorMsg('Topic title is required.');
      return;
    }
    if (!formEnglishText.trim()) {
      setErrorMsg('English text is required.');
      return;
    }
    if (!formHindiUnicode.trim()) {
      setErrorMsg('Hindi Unicode text is required.');
      return;
    }
    if (!formHindiKrutidev.trim()) {
      setErrorMsg('Hindi Krutidev text is required.');
      return;
    }

    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const collectionRef = firebase.firestore().collection('typing_topics');
      
      const payload = {
        title: formTitle.trim(),
        difficulty: formDifficulty,
        englishText: formEnglishText.trim(),
        hindiUnicodeText: formHindiUnicode.trim(),
        hindiKrutidevText: formHindiKrutidev.trim(),
        updatedAt: new Date().toISOString()
      };

      if (isNew) {
        // Create new
        const newDocId = formTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
        const docRef = collectionRef.doc(newDocId || undefined);
        await docRef.set({
          ...payload,
          createdAt: new Date().toISOString()
        });
        setSuccessMsg(`Created new topic: "${formTitle}"`);
      } else {
        // Update existing
        await collectionRef.doc(editingTopic.id).update(payload);
        setSuccessMsg(`Updated topic: "${formTitle}"`);
      }

      setEditingTopic(null);
      await fetchTopics();
    } catch (err: any) {
      console.error('[AdminTyping] Save Error:', err);
      setErrorMsg(err.message || 'Failed to save topic.');
    } finally {
      setSaving(false);
    }
  };

  // Delete topic
  const handleDeleteTopic = async (id: string, title: string) => {
    if (!firebase) return;
    if (!window.confirm(`Are you sure you want to delete the typing topic: "${title}"?`)) return;

    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await firebase.firestore().collection('typing_topics').doc(id).delete();
      setSuccessMsg(`Deleted topic: "${title}"`);
      await fetchTopics();
    } catch (err: any) {
      console.error('[AdminTyping] Delete Error:', err);
      setErrorMsg(err.message || 'Failed to delete topic.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full text-text">
      
      {/* Header Panel */}
      <div className="bg-bg-s2 border border-border p-5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-saffron-dim/20 rounded-xl flex items-center justify-center text-saffron shrink-0 border border-saffron-border/30">
            <Keyboard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-text uppercase tracking-wide">Typing Test Config</h3>
            <p className="text-xs text-text-muted">Add, edit, or delete topics for English and Krutidev 010 typing tests.</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={fetchTopics}
            className="p-2.5 bg-bg-s3/40 border border-border hover:bg-bg-s3/85 rounded-lg text-text hover:text-saffron transition-colors cursor-pointer"
            title="Refresh Topics List"
          >
            <RefreshCw className="w-4.5 h-4.5" />
          </button>
          
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow shadow-saffron-dim"
          >
            <Plus className="w-4 h-4" />
            <span>Add Topic</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-redL rounded-xl flex items-center gap-2.5 text-xs">
          <ShieldAlert className="w-4.5 h-4.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
      {successMsg && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 text-greenL rounded-xl flex items-center gap-2.5 text-xs">
          <CheckCircle className="w-4.5 h-4.5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Area */}
      {loading ? (
        <div className="bg-bg-s2 border border-border rounded-xl p-10 flex flex-col items-center justify-center gap-2 text-text-muted">
          <Loader2 className="w-8 h-8 text-saffron animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider">Loading typing topics...</span>
        </div>
      ) : editingTopic ? (
        
        /* ADD / EDIT TOPIC FORM */
        <form onSubmit={handleSaveTopic} className="bg-bg-s2 border border-border rounded-xl p-5 md:p-6 flex flex-col gap-5">
          <h4 className="text-sm font-black uppercase text-text border-b border-border/60 pb-2.5 flex items-center gap-1.5">
            <Edit2 className="w-4 h-4 text-saffron" />
            <span>{isNew ? 'Create New Typing Topic' : 'Edit Typing Topic'}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Title field */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">Topic Title</label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. भारतीय संविधान / Constitution of India"
                className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-3 py-2 text-xs font-semibold text-text outline-none transition-colors"
                disabled={saving}
              />
            </div>

            {/* Difficulty field */}
            <div className="md:col-span-1 flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">Difficulty Level / कठिनाई</label>
              <select
                value={formDifficulty}
                onChange={(e) => setFormDifficulty(e.target.value as any)}
                className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg px-2.5 py-2 text-xs font-semibold text-text outline-none cursor-pointer"
                disabled={saving}
              >
                <option value="easy">Easy / आसान</option>
                <option value="medium">Medium / मध्यम</option>
                <option value="hard">Hard / कठिन</option>
              </select>
            </div>

            {/* English Textarea */}
            <div className="md:col-span-3 flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">English Text (for English Test)</label>
              <textarea
                value={formEnglishText}
                onChange={(e) => setFormEnglishText(e.target.value)}
                rows={3}
                placeholder="Type the English paragraph here..."
                className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg p-3 text-xs font-semibold text-text outline-none resize-y transition-colors font-sans leading-relaxed"
                disabled={saving}
              />
            </div>

            {/* Hindi Unicode Textarea */}
            <div className="md:col-span-3 flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">Hindi Unicode Text (Readable Hindi translation for review)</label>
              <textarea
                value={formHindiUnicode}
                onChange={(e) => setFormHindiUnicode(e.target.value)}
                rows={3}
                placeholder="यहाँ हिंदी यूनिकोड (readable) पैराग्राफ टाइप करें..."
                className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg p-3 text-xs font-semibold text-text outline-none resize-y transition-colors font-sans leading-relaxed"
                disabled={saving}
              />
            </div>

            {/* Hindi Krutidev Textarea */}
            <div className="md:col-span-3 flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-text-muted">Hindi Krutidev ASCII Text (for Remington Krutidev 010 Typing test)</label>
              <textarea
                value={formHindiKrutidev}
                onChange={(e) => setFormHindiKrutidev(e.target.value)}
                rows={3}
                placeholder="यहाँ कृत्तिदेव 010 कोड (जैसे: Hkkjr dk lafo/kku...) टाइप करें..."
                className="w-full bg-bg-s3 border border-border focus:border-saffron/50 rounded-lg p-3 text-xs font-semibold text-text outline-none resize-y transition-colors font-sans leading-relaxed"
                disabled={saving}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 border-t border-border pt-4 mt-2">
            <button
              type="button"
              onClick={() => setEditingTopic(null)}
              className="px-4 py-2.5 bg-bg-s3/40 border border-border hover:bg-bg-s3 hover:text-text text-text-muted text-xs font-black uppercase rounded-lg transition-colors cursor-pointer"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow disabled:opacity-70"
              disabled={saving}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Topic</span>
            </button>
          </div>
        </form>

      ) : topics.length === 0 ? (
        
        /* EMPTY STATE - SEEDING OPTION */
        <div className="bg-bg-s2 border border-border rounded-xl p-8 text-center flex flex-col items-center gap-4">
          <div className="w-14 h-14 bg-bg-s3 rounded-full flex items-center justify-center text-text-muted">
            <Keyboard className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1 max-w-sm mx-auto">
            <h4 className="text-sm font-bold text-text">No Custom Topics Found</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              There are no typing test topics stored in your Firestore database yet. Click below to seed the database with 10 high-quality pre-designed default topics.
            </p>
          </div>
          
          <button
            onClick={handleSeedDefaultTopics}
            className="px-5 py-3 bg-saffron hover:bg-orange-500 text-bg-s1 text-xs font-black uppercase rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow disabled:opacity-60"
            disabled={saving}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Award className="w-4 h-4" />}
            <span>Seed Default Topics</span>
          </button>
        </div>

      ) : (

        /* TOPICS LISTING GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((topic) => (
            <div 
              key={topic.id}
              className="bg-bg-s2 border border-border hover:border-saffron-border/20 rounded-xl p-4.5 flex flex-col justify-between gap-4 transition-all relative group"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-start gap-4">
                  <h4 className="text-xs font-black text-text leading-snug line-clamp-1">{topic.title}</h4>
                  <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-bg-s3/80 border border-border select-none shrink-0">
                    {topic.difficulty}
                  </span>
                </div>
                
                {/* Previews */}
                <div className="flex flex-col gap-2 mt-1">
                  {/* English preview */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[7.5px] font-black text-text-muted uppercase tracking-wider">English preview:</span>
                    <p className="text-[10.5px] text-text-muted/80 line-clamp-2 leading-relaxed font-sans">{topic.englishText}</p>
                  </div>
                  {/* Hindi preview */}
                  <div className="flex flex-col gap-0.5 border-t border-border/30 pt-1.5">
                    <span className="text-[7.5px] font-black text-text-muted uppercase tracking-wider">Hindi Unicode preview:</span>
                    <p className="text-[10.5px] text-text-muted/80 line-clamp-1 leading-relaxed italic">{topic.hindiUnicodeText}</p>
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="flex justify-end gap-2 border-t border-border/40 pt-3 mt-1 shrink-0">
                <button
                  onClick={() => handleOpenEdit(topic)}
                  className="px-3 py-1.5 bg-bg-s3/40 hover:bg-bg-s3/85 border border-border rounded text-[9px] font-black uppercase text-text hover:text-saffron flex items-center gap-1 transition-all cursor-pointer"
                  disabled={saving}
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteTopic(topic.id, topic.title)}
                  className="px-3 py-1.5 bg-redL/5 hover:bg-redL/10 border border-redL/20 rounded text-[9px] font-black uppercase text-redL flex items-center gap-1 transition-all cursor-pointer"
                  disabled={saving}
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      )}

    </div>
  );
};
