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
  CheckCircle2,
  Building2
} from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { useLanguage } from '../LanguageContext';

export default function SocialMediaFeed() {
  const { t } = useLanguage();
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
    <section className="section-y relative overflow-hidden border-t border-slate-200 text-slate-900 dark:border-slate-800 dark:text-slate-100">
      
      {/* Background glowing accents */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-blue-400/8 blur-3xl" aria-hidden="true"></div>
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-blue-700/8 blur-3xl" aria-hidden="true"></div>

      <div className="shell relative">
        
        <SectionHeading
          eyebrow={t('socialEyebrow')}
          icon={Sparkles}
          title={t('socialTitle')}
          description={t('socialDescription')}
        >
          {/* Centered Social Platform Tabs */}
          <div
            role="tablist"
            aria-label="Social platforms"
            className="no-scrollbar fade-scroll-x inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            {[
              { id: 'all', label: t('socialTabAll') },
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
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-colors duration-200 ${
                    isSelected
                      ? 'text-white dark:text-slate-950'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="socialActivePill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-full bg-blue-700 shadow-sm dark:bg-blue-400"
                    />
                  )}
                  {TabIcon && <TabIcon className="h-3.5 w-3.5" aria-hidden="true" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </SectionHeading>

        {/* Popular Hashtags Filter */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="mr-1 font-bold text-slate-500 dark:text-slate-400">{t('socialTrendingTopics')}</span>
          {['#MUDRA2', '#AtmanirbharBharat', '#WomenEntrepreneurs', '#SkillIndia', '#MSMEIndia'].map((tag) => {
            const isTagSelected = activeHashtag === tag;
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={isTagSelected}
                onClick={() => setActiveHashtag(isTagSelected ? '' : tag)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                  isTagSelected
                    ? 'border-blue-700 bg-blue-700 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-600'
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
              className="link-underline ml-2 text-xs font-bold text-blue-700 dark:text-blue-400"
            >
              {t('socialClearFilter')}
            </button>
          )}
        </div>

        {/* Empty state when the active filters match no posts */}
        {filteredPosts.length === 0 && (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/70">
            <Sparkles className="mx-auto mb-3 h-7 w-7 text-slate-400" aria-hidden="true" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              {t('socialNoPosts')}
            </p>
          </div>
        )}

        {/* Grid of Feed Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post, idx) => {
            const currentLikes = likesMap[post.id] || post.likes;
            const meta = platformBadge(post.platform);
            const IconComponent = meta.icon;

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="card-lift flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-600/50"
              >
                <div>
                  {/* Card Header: Author Profile & Platform Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-0.5 object-cover shadow-sm"
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
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(post)}
                      aria-label={`Play video: ${post.videoTitle || 'YouTube Video'}`}
                      className="media-frame group relative mb-4 block w-full border border-slate-200 shadow-sm dark:border-slate-700"
                    >
                      <img
                        src={post.thumbnail || post.media}
                        alt={post.videoTitle || 'YouTube Video'}
                        loading="lazy"
                        className="h-48 w-full object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-slate-950/40 transition-colors duration-300 group-hover:bg-slate-950/25">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                          <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
                        </span>
                      </span>
                      <span className="absolute bottom-3 right-3 rounded-md bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold tracking-wide text-blue-300 backdrop-blur-sm">
                        {post.videoDuration || 'VIDEO'}
                      </span>
                    </button>
                  ) : post.media ? (
                    <div className="media-frame mb-4 border border-slate-200 shadow-sm dark:border-slate-800">
                      <img
                        src={post.media}
                        alt="Post media"
                        loading="lazy"
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  ) : null}
                </div>

                {/* Footer Engagement Metrics Bar */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-400">
                  <button
                    type="button"
                    onClick={() => handleLike(post.id, post.likes)}
                    className="group flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors duration-200 hover:bg-slate-100 hover:text-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  >
                    <Heart size={15} className="text-slate-500 transition-colors duration-200 group-hover:fill-red-600 dark:text-slate-400 dark:group-hover:fill-blue-400" aria-hidden="true" />
                    <span>{currentLikes.toLocaleString()}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShare(post.id)}
                    className="flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors duration-200 hover:bg-slate-100 hover:text-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  >
                    <Share2 size={15} aria-hidden="true" />
                    <span>{copiedId === post.id ? 'Copied!' : post.retweets || 'Share'}</span>
                  </button>

                  <a
                    href="https://www.mudra.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline flex items-center gap-1 px-2 py-1 font-bold text-blue-700 dark:text-blue-400"
                  >
                    <span>{t('socialViewPost')}</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
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
