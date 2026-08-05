import React, { useState } from 'react';
import { useCMS } from '../CMSContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Twitter, 
  Youtube, 
  Linkedin, 
  Heart, 
  Share2, 
  Play, 
  ExternalLink, 
  Sparkles, 
  X, 
  MessageCircle, 
  Repeat, 
  CheckCircle2,
  Bookmark,
  Building2
} from 'lucide-react';

export default function SocialMediaFeed() {
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

  const platformBadge = (platform) => {
    switch (platform) {
      case 'twitter':
        return {
          name: 'X (Twitter)',
          icon: Twitter,
          color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800',
          btnBg: 'bg-sky-500 text-white'
        };
      case 'youtube':
        return {
          name: 'YouTube',
          icon: Youtube,
          color: 'text-red-600 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800',
          btnBg: 'bg-red-600 text-white'
        };
      case 'linkedin':
        return {
          name: 'LinkedIn',
          icon: Linkedin,
          color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800',
          btnBg: 'bg-blue-600 text-white'
        };
      default:
        return {
          name: 'Social',
          icon: Building2,
          color: 'text-slate-600 bg-slate-100',
          btnBg: 'bg-slate-800 text-white'
        };
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 border-t border-slate-200 dark:border-slate-800">
      
      {/* Background glowing accents */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Centered Uniform Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-900 dark:text-amber-300 text-xs font-black tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-700 dark:text-amber-400" />
            <span>REAL-TIME SOCIAL CONNECT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            MUDRA Live Social Media Hub
          </h2>

          <div className="w-32 h-1.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto rounded-full mb-6"></div>

          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-sm md:text-base font-semibold leading-relaxed mb-8">
            Stay updated with official announcements, videos, success stories & policy updates directly from MUDRA India verified social channels.
          </p>

          {/* Centered Social Platform Tabs */}
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md flex-wrap justify-center">
            {[
              { id: 'all', label: 'All Feeds' },
              { id: 'twitter', label: 'X (Twitter)', icon: Twitter },
              { id: 'youtube', label: 'YouTube', icon: Youtube },
              { id: 'linkedin', label: 'LinkedIn', icon: Linkedin }
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 px-4 py-2 rounded-full text-xs font-extrabold transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'text-white dark:text-slate-950 font-black'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="socialActivePill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-red-800 dark:bg-amber-400 rounded-full shadow-md z-[-1]"
                    />
                  )}
                  {TabIcon && <TabIcon className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Popular Hashtags Filter */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10 text-xs">
          <span className="font-extrabold text-slate-500 dark:text-slate-400 mr-1">Trending Topics:</span>
          {['#MUDRA2', '#AtmanirbharBharat', '#WomenEntrepreneurs', '#SkillIndia', '#MSMEIndia'].map((tag) => {
            const isTagSelected = activeHashtag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveHashtag(isTagSelected ? '' : tag)}
                className={`px-3.5 py-1.5 rounded-full border text-xs font-extrabold transition-all ${
                  isTagSelected
                    ? 'bg-red-800 text-white border-red-700 shadow-md scale-105'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400 dark:hover:border-amber-500 shadow-sm'
                }`}
              >
                {tag}
              </button>
            );
          })}
          {activeHashtag && (
            <button
              type="button"
              onClick={() => setActiveHashtag('')}
              className="text-xs font-black text-red-700 dark:text-amber-400 hover:underline ml-2"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Grid of Feed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPosts.map((post) => {
            const currentLikes = likesMap[post.id] || post.likes;
            const meta = platformBadge(post.platform);
            const IconComponent = meta.icon;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-xl hover:border-amber-400 dark:hover:border-amber-500/60 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Author Profile & Platform Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-0.5 object-cover shadow-sm"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-0.5 shadow-sm">
                          <CheckCircle2 size={10} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug flex items-center gap-1">
                          <span>{post.author}</span>
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">
                          {post.handle} • {post.date}
                        </p>
                      </div>
                    </div>

                    <div className={`p-2.5 rounded-xl border ${meta.color} shadow-sm`}>
                      <IconComponent size={16} />
                    </div>
                  </div>

                  {/* Post Content Paragraph */}
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed mb-4 whitespace-pre-line">
                    {post.content}
                  </p>

                  {/* Media / Video Attachment */}
                  {post.platform === 'youtube' ? (
                    <div
                      onClick={() => setSelectedVideo(post)}
                      className="relative rounded-2xl overflow-hidden cursor-pointer group mb-4 border border-slate-200 dark:border-slate-700 shadow-md"
                    >
                      <img
                        src={post.thumbnail || post.media}
                        alt={post.videoTitle || 'YouTube Video'}
                        className="w-full h-48 object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
                        <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-black tracking-wider">
                        {post.videoDuration || 'VIDEO'}
                      </div>
                    </div>
                  ) : post.media ? (
                    <div className="rounded-2xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800 shadow-md">
                      <img
                        src={post.media}
                        alt="Post media"
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : null}
                </div>

                {/* Footer Engagement Metrics Bar */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-bold">
                  <button
                    type="button"
                    onClick={() => handleLike(post.id, post.likes)}
                    className="flex items-center gap-1.5 hover:text-red-600 dark:hover:text-amber-400 transition-colors group px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Heart size={15} className="group-hover:fill-red-600 dark:group-hover:fill-amber-400 transition-colors text-slate-500 dark:text-slate-400" />
                    <span>{currentLikes.toLocaleString()}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShare(post.id)}
                    className="flex items-center gap-1.5 hover:text-red-700 dark:hover:text-amber-400 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Share2 size={15} />
                    <span>{copiedId === post.id ? 'Copied!' : post.retweets || 'Share'}</span>
                  </button>

                  <a
                    href="https://www.mudra.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-red-800 dark:text-amber-400 hover:underline font-extrabold px-2 py-1"
                  >
                    <span>View Post</span>
                    <ExternalLink size={13} />
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
            className="fixed inset-0 z-[99999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-slate-900 rounded-3xl overflow-hidden max-w-3xl w-full border-2 border-slate-800 shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <h3 className="text-white font-extrabold text-sm flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-600" /> 
                  <span>{selectedVideo.videoTitle || selectedVideo.author}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="w-8 h-8 rounded-full bg-slate-700 text-white hover:bg-red-700 flex items-center justify-center transition-colors"
                >
                  <X size={16} />
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

              <div className="p-5 text-xs text-slate-300 font-semibold bg-slate-900">
                <p>{selectedVideo.content}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
