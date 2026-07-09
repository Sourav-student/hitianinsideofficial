import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";
import { InstagramEmbed } from "react-social-media-embed";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// --- Animation Variants ---

const fadeVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  },
};

const StoriesForHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/user/blogs`);
      if (res.data.success) {
        setBlogs(res.data.blogs.slice(0, 2));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  if (!loading && blogs.length === 0) {
    return null;
  }

  return (
    <section className="relative my-12 px-4 md:px-10 overflow-hidden font-inter">
      <div className="relative max-w-7xl mx-auto w-full">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            <p className="text-red-200/80 font-semibold uppercase tracking-[0.2em] text-xs md:text-sm mb-1">
              Media Club Stories
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white font-hammersmith tracking-wide">
              Latest Campus Stories
            </h2>
          </motion.div>
          
          {/* DESKTOP VIEW ALL BUTTON */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <Link to="/stories" className="hidden md:block">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600/90 shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-colors font-semibold text-white group"
              >
                See All
                <motion.span
                   animate={{ x: [0, 4, 0] }}
                   transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <FiArrowRight />
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* CONTENT AREA (Animated Transition between Loading and Data) */}
        <div className="min-h-[400px] relative">
          <AnimatePresence mode="wait">
            {loading ? (
              
              /* SKELETON LOADER */
              <motion.div 
                key="skeleton"
                variants={fadeVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {[1, 2].map((i) => (
                  <div key={i} className="rounded-[30px] border border-white/5 bg-red-900/20 overflow-hidden relative h-[420px]">
                     {/* Shimmer Effect */}
                     <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
                     {/* Media Skeleton */}
                     <div className="h-[240px] w-full bg-black/20" />
                     {/* Content Skeleton */}
                     <div className="p-6 space-y-4">
                       <div className="w-3/4 h-6 rounded bg-white/10" />
                       <div className="space-y-2 mt-4">
                         <div className="w-full h-4 rounded bg-white/5" />
                         <div className="w-5/6 h-4 rounded bg-white/5" />
                       </div>
                       <div className="flex justify-between items-center mt-6">
                         <div className="w-24 h-4 rounded bg-white/10" />
                         <div className="w-6 h-6 rounded-full bg-white/10" />
                       </div>
                     </div>
                  </div>
                ))}
              </motion.div>

            ) : (

              /* ACTUAL STORIES */
              <motion.div
                key="stories"
                variants={containerVariant}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {blogs.map((blog) => (
                  <motion.div
                    key={blog._id}
                    variants={cardVariant}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative h-full"
                  >
                    <Link to={`/stories/${blog.slug}?id=${blog._id}`} className="block h-full">
                      <div className="relative overflow-hidden rounded-[30px] bg-red-950/40 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-[0_10px_30px_rgba(220,38,38,0.15)] hover:border-red-500/30 transition-all duration-300 h-full flex flex-col">
                        
                        {/* Ambient Glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none z-10" />

                        {/* MEDIA */}
                        <div className="relative h-[240px] w-full overflow-hidden shrink-0 bg-black/40">
                          {blog.social_media_link ? (
                            <div className="w-full h-full flex justify-center items-center overflow-hidden">
                              <InstagramEmbed url={blog.social_media_link} className="w-full max-w-[328px]" />
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-red-800 via-red-600 to-orange-700 flex items-center justify-center p-6 transition-transform duration-700 group-hover:scale-105">
                              <h2 className="text-3xl font-black text-white/20 uppercase text-center leading-tight">
                                {blog.title}
                              </h2>
                            </div>
                          )}
                          {/* Inner Vignette Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* CONTENT */}
                        <div className="p-6 flex flex-col flex-grow relative z-20">
                          <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-red-400 transition-colors duration-300 line-clamp-2 leading-tight">
                            {blog.title}
                          </h3>
                          <p className="text-red-100/60 leading-relaxed mt-3 line-clamp-2 text-sm md:text-base flex-grow">
                            {blog.excerpt}
                          </p>

                          {/* FOOTER */}
                          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                            <span className="text-red-300 font-semibold text-sm uppercase tracking-wider">
                              Read Story
                            </span>
                            <motion.div
                               whileHover={{ x: 5 }}
                               className="text-red-300 text-xl"
                            >
                               <FiArrowRight />
                            </motion.div>
                          </div>
                        </div>

                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MOBILE BUTTON */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8 md:hidden"
        >
          <Link to="/stories">
            <motion.button 
               whileTap={{ scale: 0.95 }}
               className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)] font-semibold text-white"
            >
              See All Stories
              <FiArrowRight />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default StoriesForHome;