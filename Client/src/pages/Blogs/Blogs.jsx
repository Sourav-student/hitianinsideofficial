import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiRefreshCcw, FiAlertCircle, FiTrendingUp, FiBookOpen } from "react-icons/fi";
import axios from "axios";
import BlogCard from "../../components/Blogs/BlogCard";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// --- Animation Variants ---
const fadeVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const Blogs = () => {
  // STATES
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH BLOGS
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API_URL}/api/user/blogs`);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      setBlogs(res.data.blogs || []);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to load blogs");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    // Changed overflow-hidden to overflow-x-hidden to allow vertical scrolling!
    <div className="min-h-screen bg-[#660909] font-inter text-white overflow-x-hidden pb-24">
      
      {/* FIXED BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10">
        
        {/* HERO SECTION (Loads instantly, regardless of data state) */}
        <section className="px-4 md:px-10 pt-12 pb-8 md:pb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
              className="text-center"
            >
              {/* BADGE */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-500/30 bg-red-950/50 backdrop-blur-sm text-red-200 text-sm font-semibold mb-6 shadow-lg">
                <FiTrendingUp className="text-red-400" />
                College Media Club
              </div>

              {/* TITLE */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight max-w-5xl mx-auto font-hammersmith tracking-wide">
                Stories That
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500 drop-shadow-sm"> Define Campus Life</span>
              </h1>

              {/* DESCRIPTION */}
              <p className="text-red-100/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-6 font-medium">
                Discover official coverage of campus events,
                cultural programs, competitions, celebrations,
                achievements, and unforgettable student moments.
              </p>
            </motion.div>
          </div>
        </section>

        {/* DYNAMIC CONTENT AREA */}
        <section className="px-4 md:px-10">
          <div className="max-w-7xl mx-auto min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {loading ? (
                /* --- SKELETON GRID --- */
                <motion.div
                  key="skeleton"
                  variants={fadeVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={`skel-${i}`} className="rounded-[30px] border border-white/5 bg-red-950/30 overflow-hidden relative h-[420px] shadow-xl">
                      {/* Hardware-accelerated Shimmer */}
                      <motion.div 
                        animate={{ x: ["-100%", "200%"] }} 
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} 
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-10" 
                      />
                      
                      {/* Media Area */}
                      <div className="h-[220px] w-full bg-black/20" />
                      
                      {/* Text Area */}
                      <div className="p-6 space-y-5">
                        <div className="space-y-3">
                          <div className="w-full h-6 rounded bg-white/10" />
                          <div className="w-3/4 h-6 rounded bg-white/10" />
                        </div>
                        <div className="space-y-2 pt-2">
                          <div className="w-full h-4 rounded bg-white/5" />
                          <div className="w-5/6 h-4 rounded bg-white/5" />
                        </div>
                        <div className="flex justify-between items-center mt-8">
                          <div className="w-24 h-4 rounded bg-white/10" />
                          <div className="w-6 h-6 rounded-full bg-white/10" />
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>

              ) : error ? (
                /* --- ERROR STATE --- */
                <motion.div
                  key="error"
                  variants={fadeVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center justify-center py-20"
                >
                  <div className="max-w-md w-full border border-red-500/20 bg-red-950/40 backdrop-blur-sm rounded-[32px] p-10 text-center shadow-2xl">
                    <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                      <FiAlertCircle className="text-red-400 text-4xl" />
                    </div>
                    <h2 className="text-3xl font-black font-hammersmith mb-4">Failed to Load</h2>
                    <p className="text-red-200/70 leading-relaxed mb-8">{error}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={fetchBlogs}
                      className="inline-flex items-center gap-2 bg-red-600 shadow-[0_4px_14px_rgba(220,38,38,0.4)] px-8 py-3.5 rounded-full font-semibold text-white transition-colors hover:bg-red-500"
                    >
                      <FiRefreshCcw />
                      Retry Connection
                    </motion.button>
                  </div>
                </motion.div>

              ) : blogs.length === 0 ? (
                /* --- EMPTY STATE --- */
                <motion.div
                  key="empty"
                  variants={fadeVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-center py-24"
                >
                  <div className="w-28 h-28 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <FiBookOpen className="text-red-400/50 text-5xl" />
                  </div>
                  <h2 className="text-3xl font-bold font-hammersmith text-white/90">
                    No Stories Published Yet
                  </h2>
                  <p className="text-red-200/60 mt-4 text-lg max-w-md mx-auto">
                    The media team is currently working on coverage. New campus stories will appear here soon.
                  </p>
                </motion.div>

              ) : (
                /* --- BLOG GRID --- */
                <motion.div
                  key="grid"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  {blogs.map((blog, index) => (
                    // Added a fallback key combining ID and index to prevent React console warnings
                    <div key={blog._id || `blog-${index}`}> 
                      <BlogCard blog={blog} index={index} />
                    </div>
                  ))}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Blogs;