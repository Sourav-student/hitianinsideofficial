import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// --- GPU-Optimized Animation Variants ---
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

const fadeVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const ScoresForHome = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchScores = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/user/cricket-scores`);
      if (res.data.success) {
        setScores(res.data.data.slice(0, 2));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  if (!loading && scores.length === 0) return null;

  return (
    <section className="relative py-12 px-4 md:px-10 overflow-hidden font-inter">
      <div className="relative max-w-7xl mx-auto w-full">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            <p className="text-red-200/80 uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-1">
              Cricket Updates
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white font-hammersmith tracking-wide">
              Latest Match Scores
            </h2>
          </motion.div>

          {/* DESKTOP VIEW ALL BUTTON */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/scorecards" className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600/90 shadow-[0_4px_14px_rgba(220,38,38,0.4)] transition-colors font-semibold text-white group"
              >
                View All
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

        {/* CONTENT AREA */}
        <div className="min-h-[180px] relative">
          <AnimatePresence mode="wait">

            {loading ? (
              /* SKELETON LOADER (Hardware Accelerated) */
              <motion.div
                key="skeleton"
                variants={fadeVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {[1, 2].map((i) => (
                  <div key={i} className="rounded-[28px] border border-white/5 bg-red-950 p-5 h-[180px] flex flex-col justify-between overflow-hidden relative">
                    
                    {/* GPU-Accelerated Shimmer using Framer Motion instead of CSS background-position */}
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    />

                    <div className="flex justify-between items-center w-full relative z-10">
                      <div className="w-20 h-4 rounded bg-white/10" />
                      <div className="w-12 h-4 rounded bg-white/10" />
                    </div>
                    <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center"><div className="w-10 h-10 rounded-full bg-white/10" /><div className="w-24 h-5 rounded bg-white/10" /></div>
                        <div className="w-16 h-6 rounded bg-white/10" />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center"><div className="w-10 h-10 rounded-full bg-white/10" /><div className="w-24 h-5 rounded bg-white/10" /></div>
                        <div className="w-16 h-6 rounded bg-white/10" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              /* ACTUAL SCORES */
              <motion.div
                key="scores"
                variants={containerVariant}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {scores.map((score) => {
                  const isLive = score.match_status?.toLowerCase() === "live";
                  return (
                    <motion.div
                      key={score._id}
                      variants={cardVariant}
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      // Hinting the browser to offload this container to the GPU
                      style={{ willChange: "transform" }}
                      className="group relative h-full"
                    >
                      <Link to={`/scorecards`} className="block h-full">
                        {/* 
                          Fixes: 
                          1. Removed `backdrop-blur-sm` (Lag killer)
                          2. Changed `transition-all` to specific `transition-colors` (Prevents layout thrashing)
                          3. Solidified background to `bg-red-950/80` instead of relying on blur 
                        */}
                        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-red-950/80 p-6 h-full min-h-[180px] shadow-lg hover:border-red-500/40 transition-colors duration-300">

                          {/* Ambient Glow on Hover (Opacity animation is cheap on GPU) */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none" />

                          {/* TOP HEADER */}
                          <div className="flex items-center justify-between mb-6 relative z-10">
                            <span className="text-red-200/80 uppercase tracking-[0.2em] text-[11px] font-bold">
                              {score.match_type}
                            </span>
                            {isLive && (
                              <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                                  Live
                                </span>
                              </div>
                            )}
                          </div>

                          {/* TEAMS */}
                          <div className="space-y-4 relative z-10">
                            {/* TEAM 1 */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 w-[60%]">
                                <img
                                  src={score.team1_details.team_logo}
                                  alt={score.team1_details.team_name}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-10 h-10 rounded-full object-cover border border-white/20 bg-white/5"
                                />
                                <h3 className="text-white font-bold text-sm md:text-base truncate">
                                  {score.team1_details.team_name}
                                </h3>
                              </div>
                              <h2 className="text-lg md:text-xl font-black text-white text-right">
                                {score.team1_details.team_run}<span className="text-white/50 text-base font-bold">/{score.team1_details.team_wicket_loss}</span>
                              </h2>
                            </div>

                            {/* TEAM 2 */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 w-[60%]">
                                <img
                                  src={score.team2_details.team_logo}
                                  alt={score.team2_details.team_name}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-10 h-10 rounded-full object-cover border border-white/20 bg-white/5"
                                />
                                <h3 className="text-white font-bold text-sm md:text-base truncate">
                                  {score.team2_details.team_name}
                                </h3>
                              </div>
                              <h2 className="text-lg md:text-xl font-black text-white text-right">
                                {score.team2_details.team_run}<span className="text-white/50 text-base font-bold">/{score.team2_details.team_wicket_loss}</span>
                              </h2>
                            </div>
                          </div>

                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
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
          <Link to="/scorecards">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-600 shadow-[0_4px_14px_rgba(220,38,38,0.3)] font-semibold text-white"
            >
              View All Scores
              <FiArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ScoresForHome;