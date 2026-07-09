import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiAlertCircle, FiRefreshCcw } from "react-icons/fi";
import { getAlmanacs } from "../../api/userapis";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const fadeVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const BestOfAlmanac = () => {
  const [almanacs, setAlmanacs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH ALMANACS
  const getAllAlmanacs = useCallback(async () => {
    try {
      setLoading(true);
      setError(""); // Reset error state on new fetch attempt
      const { data } = await getAlmanacs();
      
      // Assuming data is an array. Adapt if your API returns { success: true, data: [...] }
      setAlmanacs(data || []); 
    } catch (err) {
      console.error(err);
      setError("Failed to load the Almanac showcase. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllAlmanacs();
  }, [getAllAlmanacs]);

  return (
    <section className="Almanac-section bg-[#650808] min-h-[400px] pb-16 font-inter">
      
      {/* HEADER */}
      <div className="pt-8 pb-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2rem] md:text-[2.5rem] uppercase text-[#f6c5c5] font-black font-hammersmith tracking-wider"
        >
          Best of Almanac
        </motion.h1>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <AnimatePresence mode="wait">
          
          {loading ? (
            /* --- SKELETON LOADER --- */
            <motion.div
              key="skeleton"
              variants={fadeVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`skel-${i}`}
                  className="w-full sm:max-w-[300px] h-[300px] bg-red-950/40 rounded-2xl overflow-hidden relative border border-white/5 shadow-lg"
                >
                  {/* GPU-Accelerated Shimmer */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-10"
                  />
                  {/* Image Placeholder */}
                  <div className="w-full h-[220px] bg-black/20 rounded-t-2xl m-3 w-[calc(100%-24px)]" />
                  {/* Text Placeholders */}
                  <div className="px-5 py-2 space-y-2">
                    <div className="w-3/4 h-5 bg-white/10 rounded" />
                    <div className="w-1/2 h-3 bg-white/5 rounded" />
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
              className="flex flex-col items-center justify-center py-10"
            >
              <div className="max-w-md w-full border border-red-500/20 bg-red-950/40 rounded-[32px] p-8 text-center shadow-xl">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                  <FiAlertCircle className="text-red-400 text-3xl" />
                </div>
                <h2 className="text-white text-2xl font-black font-hammersmith mb-3">
                  Connection Error
                </h2>
                <p className="text-red-200/70 text-sm leading-relaxed mb-6">
                  {error}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={getAllAlmanacs}
                  className="inline-flex items-center gap-2 bg-red-600 shadow-[0_4px_14px_rgba(220,38,38,0.4)] px-6 py-2.5 rounded-full font-semibold text-white transition-colors hover:bg-red-500"
                >
                  <FiRefreshCcw />
                  Try Again
                </motion.button>
              </div>
            </motion.div>

          ) : almanacs.length === 0 ? (
            /* --- EMPTY STATE --- */
            <motion.div
              key="empty"
              variants={fadeVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center py-16"
            >
              <h2 className="text-2xl font-bold text-white/90 font-hammersmith">
                No Artworks Found
              </h2>
              <p className="text-red-200/60 mt-2">
                The Best of Almanac collection is currently empty.
              </p>
            </motion.div>

          ) : (
            /* --- ACTUAL DATA GRID --- */
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
            >
              {almanacs.map((almanac, index) => (
                <motion.div
                  key={almanac._id || index}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  style={{ willChange: "transform" }}
                  className="group relative w-full sm:max-w-[300px] bg-red-950/40 rounded-2xl shadow-lg hover:shadow-[0_10px_30px_rgba(220,38,38,0.15)] transition-all duration-300 overflow-hidden border border-white/10 hover:border-red-500/30"
                >
                  <div className="overflow-hidden relative p-3 pb-0">
                    <motion.img
                      className="w-full h-[220px] object-cover rounded-t-xl bg-black/20"
                      src={almanac.photo}
                      alt={`Artwork by ${almanac.username}`}
                      loading="lazy"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    {/* Inner shadow to blend image with card background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="px-5 py-4 relative z-10">
                    <p className="text-white font-bold text-lg tracking-wide truncate group-hover:text-red-300 transition-colors">
                      {almanac.username}
                    </p>
                    <p className="text-red-200/60 text-sm font-medium truncate mt-1">
                      {almanac.department}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};

export default BestOfAlmanac;