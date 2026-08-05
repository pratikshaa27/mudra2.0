import React, { useState } from 'react';
import { useCMS } from '../CMSContext';
import { Layout, Image, Bell, BarChart3, Star, Plus, Trash2, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';

export default function HomepageCMS() {
  const {
    cmsData,
    updateBanners,
    updateAnnouncements,
    updateImpactStats,
    updateSuccessStories,
    resetToDefaults
  } = useCMS();

  const [activeSubTab, setActiveSubTab] = useState('banners');
  const [successMsg, setSuccessMsg] = useState('');

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // State for Banners
  const [banners, setBanners] = useState(cmsData.banners || []);
  const [newBanner, setNewBanner] = useState({
    title: '',
    subtitle: '',
    badge: 'MUDRA 2.0 Feature',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Apply Now',
    ctaLink: '/EntrepreneurOnboarding',
    secondaryCtaText: 'Learn More',
    secondaryCtaLink: '#schemes',
    highlightTag: 'Instant'
  });

  // State for Announcements
  const [announcements, setAnnouncements] = useState(cmsData.announcements || []);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    category: 'Policy Notice',
    date: 'Aug 2026',
    link: '#',
    urgent: false
  });

  // State for Impact Stats
  const [impactStats, setImpactStats] = useState(cmsData.impactStats || {});

  // State for Success Stories
  const [stories, setStories] = useState(cmsData.successStories || []);
  const [newStory, setNewStory] = useState({
    name: '',
    venture: '',
    location: '',
    category: 'Micro Enterprise',
    loanCategory: 'Kishore (₹3 Lakhs)',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    quote: '',
    impact: '',
    videoUrl: ''
  });

  // Save Banner Changes
  const handleSaveBanners = () => {
    updateBanners(banners);
    showNotification('Homepage Banners updated successfully!');
  };

  const handleAddBanner = (e) => {
    e.preventDefault();
    if (!newBanner.title) return;
    const updated = [...banners, { ...newBanner, id: 'b_' + Date.now() }];
    setBanners(updated);
    updateBanners(updated);
    setNewBanner({
      title: '',
      subtitle: '',
      badge: 'MUDRA 2.0 Feature',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
      ctaText: 'Apply Now',
      ctaLink: '/EntrepreneurOnboarding',
      secondaryCtaText: 'Learn More',
      secondaryCtaLink: '#schemes',
      highlightTag: 'New'
    });
    showNotification('New Banner Added!');
  };

  const handleDeleteBanner = (id) => {
    const updated = banners.filter(b => b.id !== id);
    setBanners(updated);
    updateBanners(updated);
    showNotification('Banner deleted');
  };

  // Save Announcement Changes
  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncement.title) return;
    const updated = [{ ...newAnnouncement, id: 'ann_' + Date.now() }, ...announcements];
    setAnnouncements(updated);
    updateAnnouncements(updated);
    setNewAnnouncement({ title: '', category: 'Policy Notice', date: 'Aug 2026', link: '#', urgent: false });
    showNotification('New announcement posted to homepage ticker!');
  };

  const handleDeleteAnnouncement = (id) => {
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    updateAnnouncements(updated);
    showNotification('Announcement removed');
  };

  // Save Impact Stats
  const handleSaveImpactStats = (e) => {
    e.preventDefault();
    updateImpactStats(impactStats);
    showNotification('Homepage Impact Highlights metrics saved!');
  };

  // Save Success Story
  const handleAddStory = (e) => {
    e.preventDefault();
    if (!newStory.name || !newStory.venture) return;
    const updated = [...stories, { ...newStory, id: 's_' + Date.now() }];
    setStories(updated);
    updateSuccessStories(updated);
    setNewStory({
      name: '',
      venture: '',
      location: '',
      category: 'Micro Enterprise',
      loanCategory: 'Kishore (₹3 Lakhs)',
      photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
      quote: '',
      impact: '',
      videoUrl: ''
    });
    showNotification('Success Story published to Homepage!');
  };

  const handleDeleteStory = (id) => {
    const updated = stories.filter(s => s.id !== id);
    setStories(updated);
    updateSuccessStories(updated);
    showNotification('Success story removed');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" /> CMS Engine v2.0
          </div>
          <h2 className="text-2xl font-bold">Homepage Dynamic Content Manager</h2>
          <p className="text-xs text-slate-300 mt-1">
            Real-time management of Homepage Banners, News Ticker, Impact Counters, and Success Stories.
          </p>
        </div>

        <button
          onClick={() => {
            resetToDefaults();
            setBanners(cmsData.banners);
            setAnnouncements(cmsData.announcements);
            setImpactStats(cmsData.impactStats);
            setStories(cmsData.successStories);
            showNotification('Reset all Homepage content to default baseline!');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Reset CMS Defaults
        </button>
      </div>

      {/* Notification Toast */}
      {successMsg && (
        <div className="bg-emerald-500 text-slate-950 px-4 py-3 text-xs font-bold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {successMsg}
          </span>
          <span className="text-[10px] opacity-80">Synced with Homepage Live</span>
        </div>
      )}

      {/* Subtabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 pt-4 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('banners')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold transition-all ${
            activeSubTab === 'banners'
              ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Image className="w-4 h-4" /> Hero Banners ({banners.length})
        </button>
        <button
          onClick={() => setActiveSubTab('announcements')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold transition-all ${
            activeSubTab === 'announcements'
              ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bell className="w-4 h-4" /> News Ticker ({announcements.length})
        </button>
        <button
          onClick={() => setActiveSubTab('impact')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold transition-all ${
            activeSubTab === 'impact'
              ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Impact Counters
        </button>
        <button
          onClick={() => setActiveSubTab('stories')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold transition-all ${
            activeSubTab === 'stories'
              ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Star className="w-4 h-4" /> Success Stories ({stories.length})
        </button>
      </div>

      <div className="p-6">
        {/* BANNERS TAB */}
        {activeSubTab === 'banners' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Existing Banners */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-indigo-600" /> Active Homepage Banners
                </h3>
                <div className="space-y-4">
                  {banners.map((b, idx) => (
                    <div key={b.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                      <img src={b.image} alt={b.title} className="w-24 h-20 object-cover rounded-lg border border-slate-300" />
                      <div className="flex-1 min-w-0">
                        <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                          {b.badge}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 truncate mt-1">{b.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{b.subtitle}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 font-mono">CTA: {b.ctaText}</span>
                          <button
                            onClick={() => handleDeleteBanner(b.id)}
                            className="text-red-600 hover:text-red-800 text-xs font-semibold flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Banner Form */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-indigo-600" /> Add New Hero Banner
                </h3>
                <form onSubmit={handleAddBanner} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Banner Title</label>
                    <input
                      type="text"
                      value={newBanner.title}
                      onChange={e => setNewBanner({ ...newBanner, title: e.target.value })}
                      placeholder="e.g. Empowering Next-Gen Entrepreneurs"
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Subtitle / Description</label>
                    <textarea
                      rows={2}
                      value={newBanner.subtitle}
                      onChange={e => setNewBanner({ ...newBanner, subtitle: e.target.value })}
                      placeholder="e.g. Get collateral-free credit up to ₹20 Lakhs..."
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={newBanner.badge}
                        onChange={e => setNewBanner({ ...newBanner, badge: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Highlight Pill</label>
                      <input
                        type="text"
                        value={newBanner.highlightTag}
                        onChange={e => setNewBanner({ ...newBanner, highlightTag: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Image URL</label>
                    <input
                      type="url"
                      value={newBanner.image}
                      onChange={e => setNewBanner({ ...newBanner, image: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg font-mono text-[11px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Primary CTA Text</label>
                      <input
                        type="text"
                        value={newBanner.ctaText}
                        onChange={e => setNewBanner({ ...newBanner, ctaText: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Primary Link</label>
                      <input
                        type="text"
                        value={newBanner.ctaLink}
                        onChange={e => setNewBanner({ ...newBanner, ctaLink: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-colors"
                  >
                    Publish Banner to Homepage
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS TAB */}
        {activeSubTab === 'announcements' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-600" /> Active News Ticker Announcements
                </h3>
                <div className="space-y-3">
                  {announcements.map((a) => (
                    <div key={a.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            a.urgent ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {a.category}
                          </span>
                          <span className="text-[10px] text-slate-400">{a.date}</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-900 mt-1">{a.title}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteAnnouncement(a.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-indigo-600" /> Post New Breaking Announcement
                </h3>
                <form onSubmit={handleAddAnnouncement} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Announcement Headline</label>
                    <input
                      type="text"
                      value={newAnnouncement.title}
                      onChange={e => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                      placeholder="e.g. Special 100% Subvention for Handloom Clusters"
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Category Tag</label>
                      <input
                        type="text"
                        value={newAnnouncement.category}
                        onChange={e => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Date Tag</label>
                      <input
                        type="text"
                        value={newAnnouncement.date}
                        onChange={e => setNewAnnouncement({ ...newAnnouncement, date: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      id="urgentCheck"
                      checked={newAnnouncement.urgent}
                      onChange={e => setNewAnnouncement({ ...newAnnouncement, urgent: e.target.checked })}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <label htmlFor="urgentCheck" className="text-slate-800 font-semibold">
                      Mark as Urgent / Breaking Ticker Alert
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-md transition-colors"
                  >
                    Publish to Homepage Ticker
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* IMPACT COUNTERS TAB */}
        {activeSubTab === 'impact' && (
          <form onSubmit={handleSaveImpactStats} className="max-w-2xl space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" /> Edit Homepage Key Impact Metrics
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 border rounded-xl">
                <label className="block text-slate-700 font-semibold mb-1">Total Disbursed Amount</label>
                <input
                  type="text"
                  value={impactStats.totalDisbursed || ''}
                  onChange={e => setImpactStats({ ...impactStats, totalDisbursed: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-bold text-indigo-700 text-sm"
                />
              </div>

              <div className="p-3 bg-slate-50 border rounded-xl">
                <label className="block text-slate-700 font-semibold mb-1">Sanctioned Accounts Count</label>
                <input
                  type="text"
                  value={impactStats.totalAccounts || ''}
                  onChange={e => setImpactStats({ ...impactStats, totalAccounts: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-bold text-indigo-700 text-sm"
                />
              </div>

              <div className="p-3 bg-slate-50 border rounded-xl">
                <label className="block text-slate-700 font-semibold mb-1">Women Beneficiaries %</label>
                <input
                  type="text"
                  value={impactStats.womenBeneficiaries || ''}
                  onChange={e => setImpactStats({ ...impactStats, womenBeneficiaries: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-bold text-indigo-700 text-sm"
                />
              </div>

              <div className="p-3 bg-slate-50 border rounded-xl">
                <label className="block text-slate-700 font-semibold mb-1">First-Time Entrepreneurs</label>
                <input
                  type="text"
                  value={impactStats.newEntrepreneurs || ''}
                  onChange={e => setImpactStats({ ...impactStats, newEntrepreneurs: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-bold text-indigo-700 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md transition-colors"
            >
              Save Impact Metrics
            </button>
          </form>
        )}

        {/* SUCCESS STORIES TAB */}
        {activeSubTab === 'stories' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" /> Published Success Stories
                </h3>
                <div className="space-y-4">
                  {stories.map(s => (
                    <div key={s.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                      <img src={s.photo} alt={s.name} className="w-16 h-16 rounded-full object-cover border border-slate-300" />
                      <div className="flex-1 min-w-0">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {s.loanCategory}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 mt-1">{s.name} ({s.venture})</h4>
                        <p className="text-[11px] text-slate-500 italic mt-1 font-serif">"{s.quote}"</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">📍 {s.location}</span>
                          <button
                            onClick={() => handleDeleteStory(s.id)}
                            className="text-red-600 hover:text-red-800 text-xs font-semibold flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-indigo-600" /> Add New Entrepreneur Story
                </h3>
                <form onSubmit={handleAddStory} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Entrepreneur Name</label>
                      <input
                        type="text"
                        value={newStory.name}
                        onChange={e => setNewStory({ ...newStory, name: e.target.value })}
                        placeholder="e.g. Ramesh Patel"
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Venture Name</label>
                      <input
                        type="text"
                        value={newStory.venture}
                        onChange={e => setNewStory({ ...newStory, venture: e.target.value })}
                        placeholder="e.g. Solar Cold Storage"
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Location</label>
                      <input
                        type="text"
                        value={newStory.location}
                        onChange={e => setNewStory({ ...newStory, location: e.target.value })}
                        placeholder="e.g. Ahmedabad, Gujarat"
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Loan Category</label>
                      <input
                        type="text"
                        value={newStory.loanCategory}
                        onChange={e => setNewStory({ ...newStory, loanCategory: e.target.value })}
                        placeholder="e.g. Tarun (₹9 Lakhs)"
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Photo URL</label>
                    <input
                      type="url"
                      value={newStory.photo}
                      onChange={e => setNewStory({ ...newStory, photo: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Entrepreneur Quote</label>
                    <textarea
                      rows={2}
                      value={newStory.quote}
                      onChange={e => setNewStory({ ...newStory, quote: e.target.value })}
                      placeholder="e.g. MUDRA loan allowed me to setup..."
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Key Impact Statement</label>
                    <input
                      type="text"
                      value={newStory.impact}
                      onChange={e => setNewStory({ ...newStory, impact: e.target.value })}
                      placeholder="e.g. Created 15 jobs & empowered local farmers"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-colors"
                  >
                    Publish Success Story
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
