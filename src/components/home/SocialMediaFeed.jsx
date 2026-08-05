import React, { useState } from 'react';
import { useCMS } from '../CMSContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Youtube, Linkedin, Heart, Share2, Play, ExternalLink, Sparkles, X } from 'lucide-react';

export default function SocialMediaFeed({ theme = 'mockup1' }) {
  const { cmsData } = useCMS();
  const posts = cmsData.socialPosts || [];
  const [activeTab, setActiveTab] = useState('all');
  const [activeHashtag, setActiveHashtag] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [likesMap, setLikesMap] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const filteredPosts = posts.filter(post => {
    const matchesTab = activeTab === 'all' || post.platform === activeTab;
    const matchesHashtag = !activeHashtag || post.content.toLowerCase().includes(activeHashtag.toLowerCase());
    return matchesTab && matchesHashtag;
  });

  const handleLike = (id, baseLikes) => {
    setLikesMap(prev => ({
      ...prev,
      [id]: (prev[id] || baseLikes) + 1
    }));
  };

  const handleShare = (id) => {
    setCopiedId(id);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isMockup1 = theme === 'mockup1';

  return (
    <section className="py-16 px-4 relative overflow-hidden bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-50 text-slate-900 border-t border-slate-200">
      {/* Background glowing accents */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
              isMockup1 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-indigo-100 text-indigo-800'
            }`}>
              <Sparkles className="w-3.5 h-3.5" /> Real-time Social Connect
            </div>
            <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${
              isMockup1 ? 'text-white' : 'text-slate-900'
            }`}>
              MUDRA Live Social Media Hub
            </h2>
            <p className={`mt-2 text-sm max-w-xl ${isMockup1 ? 'text-slate-400' : 'text-slate-600'}`}>
              Stay updated with official announcements, videos, success stories & policy updates directly from MUDRA India channels.
            </p>
          </div>

          {/* Social Platform Tabs */}
          <div className={`flex items-center p-1.5 rounded-xl border backdrop-blur-md ${
            isMockup1 ? 'bg-slate-800/80 border-slate-700' : 'bg-white shadow-md border-slate-200'
          }`}>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? isMockup1 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-indigo-600 text-white'
                  : isMockup1 ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Feeds
            </button>
            <button
              onClick={() => setActiveTab('twitter')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'twitter'
                  ? isMockup1 ? 'bg-sky-500 text-white' : 'bg-sky-600 text-white'
                  : isMockup1 ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Twitter className="w-3.5 h-3.5" /> X (Twitter)
            </button>
            <button
              onClick={() => setActiveTab('youtube')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'youtube'
                  ? 'bg-red-600 text-white'
                  : isMockup1 ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Youtube className="w-3.5 h-3.5" /> YouTube
            </button>
            <button
              onClick={() => setActiveTab('linkedin')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'linkedin'
                  ? 'bg-blue-600 text-white'
                  : isMockup1 ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </button>
          </div>
        </div>

        {/* Popular Hashtags */}
        <div className="flex items-center flex-wrap gap-2 mb-8 text-xs">
          <span className={`font-semibold ${isMockup1 ? 'text-slate-400' : 'text-slate-500'}`}>Trending Tags:</span>
          {['#MUDRA2', '#AtmanirbharBharat', '#WomenEntrepreneurs', '#SkillIndia', '#MSMEIndia'].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveHashtag(activeHashtag === tag ? '' : tag)}
              className={`px-3 py-1 rounded-full border transition-all ${
                activeHashtag === tag
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold border-cyan-400'
                  : isMockup1
                    ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm'
              }`}
            >
              {tag}
            </button>
          ))}
          {activeHashtag && (
            <button
              onClick={() => setActiveHashtag('')}
              className="text-red-400 hover:text-red-300 font-medium ml-2 underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Grid of Feed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const currentLikes = likesMap[post.id] || post.likes;
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 ${
                  isMockup1
                    ? 'bg-white border-teal-200/80 shadow-md hover:shadow-xl hover:border-teal-400'
                    : 'bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-indigo-300'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 p-0.5 object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-sm leading-snug text-slate-900">
                          {post.author}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {post.handle} • {post.date}
                        </p>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50">
                      {post.platform === 'twitter' && <Twitter className="w-4 h-4 text-sky-400" />}
                      {post.platform === 'youtube' && <Youtube className="w-4 h-4 text-red-500" />}
                      {post.platform === 'linkedin' && <Linkedin className="w-4 h-4 text-blue-500" />}
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className={`text-xs md:text-sm leading-relaxed mb-4 whitespace-pre-line ${
                    isMockup1 ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {post.content}
                  </p>

                  {/* Media / Video Thumbnail */}
                  {post.platform === 'youtube' ? (
                    <div
                      onClick={() => setSelectedVideo(post)}
                      className="relative rounded-xl overflow-hidden cursor-pointer group mb-4 border border-slate-700"
                    >
                      <img
                        src={post.thumbnail || post.media}
                        alt={post.videoTitle || 'YouTube Video'}
                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                        {post.videoDuration || 'VIDEO'}
                      </div>
                    </div>
                  ) : post.media ? (
                    <div className="rounded-xl overflow-hidden mb-4 border border-slate-700/50">
                      <img
                        src={post.media}
                        alt="Post media"
                        className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : null}
                </div>

                {/* Footer Engagement Actions */}
                <div className={`pt-3 border-t flex items-center justify-between text-xs ${
                  isMockup1 ? 'border-slate-700/60 text-slate-400' : 'border-slate-100 text-slate-500'
                }`}>
                  <button
                    onClick={() => handleLike(post.id, post.likes)}
                    className="flex items-center gap-1.5 hover:text-red-400 transition-colors group"
                  >
                    <Heart className="w-4 h-4 group-hover:fill-red-400" />
                    <span>{currentLikes}</span>
                  </button>

                  <button
                    onClick={() => handleShare(post.id)}
                    className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors relative"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copiedId === post.id ? 'Copied Link!' : 'Share'}</span>
                  </button>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                  >
                    View Original <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-2xl overflow-hidden max-w-3xl w-full border border-slate-700 shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-500" /> {selectedVideo.videoTitle || selectedVideo.author}
                </h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black">
                <iframe
                  src={selectedVideo.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                  title="YouTube video player"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="p-4 text-xs text-slate-300">
                <p>{selectedVideo.content}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
