import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import "./home.css";
import hit from "../../assets/images/fourpillar.png";
import curve from "../../assets/images/homepage-curve.png";
import name from "../../assets/images/Hitian-name.png";

// Components
import Banner from '../../components/Banner/Banner';
import HomeSkeleton from "../../components/Home/HomeSkeleton";
import AboutusHome from "../../components/Home/AboutusHome";
import GellaryHome from "../../components/Home/GalleryHome";
import StoriesForHome from "../../components/Home/StoriesForHome";
// import ScoresForHome from "../../components/Home/ScoresForHome";

function Home() {
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    // Artificial delay to allow assets to begin parsing and to show off the skeleton
    const timeout = setTimeout(() => {
      setLoadingPage(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  return (
    // AnimatePresence handles the smooth unmounting of the Skeleton
    <AnimatePresence mode="wait">
      {loadingPage ? (
        <HomeSkeleton key="global-skeleton" />
      ) : (
        <motion.div 
          key="main-home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="min-h-screen bg-[#650808]"
        >
          {/* ============ Banner ============= */}
          <Banner />

          {/* ============ Hero / Landing Page ============= */}
          <section className="relative flex flex-col items-center pt-8 md:pt-12 overflow-hidden">
            
            {/* Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl/[2.3rem] md:text-[2.2rem] font-semibold text-[#ffa6a6] tracking-widest font-hammersmith text-center z-10"
            >
              COME AND EXPLORE
            </motion.h1>
            
            {/* Logo / Name Image */}
            <motion.img 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              src={name} 
              alt="Hitian Inside" 
              className="w-[70%] md:w-[30%] mt-4 md:mt-6 z-10" 
              loading="eager"
            />
            
            {/* Main Illustration (Four Pillars) */}
            <motion.img
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 60, damping: 20 }}
              src={hit}
              alt="HIT Four Pillars"
              className="mt-8 md:mt-12 w-[90%] md:w-auto relative z-10 drop-shadow-2xl"
              loading="eager"
            />
            
            {/* Bottom Curve Divider */}
            <motion.img 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              src={curve} 
              alt="Section Divider Curve" 
              className="w-full -mt-[8%] md:-mt-[5%] relative z-20 pointer-events-none drop-shadow-[0_-10px_20px_rgba(0,0,0,0.15)]" 
            />
          </section>

          {/* ============ Page Content ============= */}
          {/* Note: All of these components now contain their own internal 
            motion.div logic using `whileInView`, so they will automatically 
            animate as the user scrolls down.
          */}
          <div className="relative z-30 -mt-2 bg-[#660909]">
            <AboutusHome />
            <StoriesForHome />
            {/* <ScoresForHome /> */}
            <GellaryHome />
            {/* <EventsHome/>  */}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Home;