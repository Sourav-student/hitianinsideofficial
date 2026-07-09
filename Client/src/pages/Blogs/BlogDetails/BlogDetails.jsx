import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiArrowLeft, FiExternalLink, FiAlertCircle, FiRefreshCcw } from "react-icons/fi";
import axios from "axios";
import { InstagramEmbed } from "react-social-media-embed";
import { Link, useSearchParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// --- Animation Variants ---
const fadeVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const slideUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 20 } 
  }
};

const BlogDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API_URL}/api/user/blogs/${id}`);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      setBlog(res.data.blog);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to load blog");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchBlog();
  }, [fetchBlog, id]);

  // ERROR UI
  if (error || (!loading && !blog)) {
    return (
      <div className="min-h-screen bg-[#660909] flex items-center justify-center px-4 font-inter">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full border border-red-500/20 bg-red-950/40 rounded-[32px] p-10 text-center shadow-2xl"
        >
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <FiAlertCircle className="text-red-400 text-4xl" />
          </div>
          <h2 className="text-white text-3xl font-black font-hammersmith mb-4">
            Failed to Load
          </h2>
          <p className="text-red-200/70 leading-relaxed mb-8">
            {error || "The story you are looking for could not be found."}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchBlog}
            className="inline-flex items-center gap-2 bg-red-600 shadow-[0_4px_14px_rgba(220,38,38,0.4)] px-8 py-3.5 rounded-full font-semibold text-white transition-colors hover:bg-red-500"
          >
            <FiRefreshCcw />
            Retry Connection
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    // Replaced overflow-hidden with overflow-x-hidden to allow vertical scrolling
    <div className="min-h-screen bg-[#660909] text-white overflow-x-hidden font-inter pb-20">
      
      {/* Ambient Background Lights */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {loading ? (
            
            /* --- SKELETON LOADER --- */
            <motion.div key="skeleton" variants={fadeVariant} initial="initial" animate="animate" exit="exit" className="pt-10 px-4 md:px-10 max-w-6xl mx-auto">
              {/* Back Button Skeleton */}
              <div className="w-32 h-6 bg-red-950 rounded mb-8 animate-pulse" />
              
              {/* Hero Skeleton */}
              <div className="relative h-[400px] md:h-[500px] rounded-[40px] bg-red-950/50 border border-white/5 overflow-hidden mb-12">
                <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                <div className="absolute bottom-12 left-12 space-y-4 w-full">
                  <div className="w-2/3 h-10 md:h-14 bg-white/10 rounded-lg" />
                  <div className="w-1/2 h-10 md:h-14 bg-white/10 rounded-lg" />
                  <div className="w-40 h-12 bg-white/10 rounded-full mt-6" />
                </div>
              </div>

              {/* Content Skeleton */}
              <div className="max-w-3xl mx-auto space-y-5">
                <div className="w-1/4 h-5 bg-red-950 rounded mb-8" />
                <div className="w-full h-4 bg-red-950 rounded" />
                <div className="w-full h-4 bg-red-950 rounded" />
                <div className="w-5/6 h-4 bg-red-950 rounded" />
                <div className="w-full h-4 bg-red-950 rounded mt-8" />
                <div className="w-4/5 h-4 bg-red-950 rounded" />
              </div>
            </motion.div>

          ) : (

            /* --- ACTUAL CONTENT --- */
            <motion.div key="content" variants={fadeVariant} initial="initial" animate="animate" className="pt-8 md:pt-12">
              
              {/* HERO SECTION */}
              <section className="px-4 md:px-10 mb-12">
                <div className="max-w-6xl mx-auto">
                  
                  {/* BACK BUTTON */}
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                    <Link to="/stories" className="inline-flex items-center gap-2 text-red-200/70 hover:text-white transition-colors duration-300 mb-6 font-semibold group">
                      <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                      Back to Stories
                    </Link>
                  </motion.div>

                  {/* HERO CARD */}
                  <motion.div variants={slideUpVariant} initial="hidden" animate="visible" className="relative overflow-hidden rounded-[40px] border border-white/10 bg-red-950/80 shadow-2xl">
                    
                    <div className="relative min-h-[400px] md:h-[500px] overflow-hidden flex flex-col justify-end">
                      
                      {/* MEDIA BACKGROUND */}
                      <div className="absolute inset-0 z-0 bg-black/40 flex items-center justify-center">
                        {blog.social_media_link ? (
                          <div className="w-full h-full flex justify-center items-center py-6">
                            <InstagramEmbed url={blog.social_media_link} className="w-full max-w-[360px] shadow-2xl" />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-red-800 via-red-600 to-orange-700 flex items-center justify-center">
                             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-pattern-with-subtle-cross-lines.png')] opacity-20 mix-blend-overlay"></div>
                          </div>
                        )}
                      </div>

                      {/* GRADIENT OVERLAY (Protects text readability) */}
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-red-950 via-red-950/60 to-transparent pointer-events-none" />

                      {/* HERO TEXT & BUTTON */}
                      <div className="relative z-20 p-8 md:p-12 w-full">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight max-w-4xl text-white font-hammersmith drop-shadow-lg">
                          {blog.title}
                        </h1>

                        {blog.social_media_link && (
                          <div className="mt-8">
                            <a href={blog.social_media_link} target="_blank" rel="noopener noreferrer">
                              <motion.button 
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-red-600 shadow-[0_4px_14px_rgba(220,38,38,0.4)] transition-colors hover:bg-red-500 font-semibold text-white"
                              >
                                View Original Post
                                <FiExternalLink />
                              </motion.button>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* ARTICLE CONTENT SECTION */}
              <section className="px-4 md:px-10">
                {/* Changed max-w-5xl to max-w-3xl for optimal reading width */}
                <div className="max-w-3xl mx-auto">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                    
                    <div className="mb-8">
                      <p className="text-red-400 uppercase tracking-[0.25em] text-xs font-bold mb-2">
                        Article Content
                      </p>
                      <div className="w-12 h-1 bg-red-600 rounded-full"></div>
                    </div>

                    {/* Highly readable typographic scale */}
                    <article className="prose prose-invert prose-lg md:prose-xl max-w-none">
                      <p className="text-red-50/90 leading-loose whitespace-pre-wrap font-medium tracking-wide">
                        {blog.content}
                      </p>
                    </article>

                  </motion.div>
                </div>
              </section>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlogDetails;