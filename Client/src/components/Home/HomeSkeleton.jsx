import { motion } from "motion/react";

const HomeSkeleton = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // The exit prop ensures this fades out beautifully when the real data loads
      exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
      className="min-h-screen flex flex-col items-center bg-[#6A0000] text-center overflow-hidden"
    >
      {/* Top Heading */}
      <h2 className="text-3xl text-white/50 font-semibold mt-12 mb-4 animate-pulse font-hammersmith">
        COME AND EXPLORE
      </h2>

      {/* Subheading / Logo Placeholder */}
      <div className="w-44 h-8 rounded-md bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer mb-8"></div>

      {/* Hero Image / Bridge Illustration Skeleton */}
      <div className="w-full h-40 md:h-56 bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer shadow-inner"></div>

      {/* Middle Content Area (Pink) */}
      <div className="w-full bg-gradient-to-b from-[#FFB5B5] to-[#f8c8c8] -mt-2 flex flex-col items-center py-16 px-6 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-10">
        
        {/* About Us Heading Placeholder */}
        <div className="w-40 h-8 rounded-md bg-gradient-to-r from-[#d28b8b] via-[#e9b2b2] to-[#d28b8b] shimmer mb-8"></div>

        {/* Paragraph Skeleton */}
        <div className="w-full max-w-2xl flex flex-col items-center gap-4 mb-10">
          <div className="w-full h-4 rounded-full bg-gradient-to-r from-[#d28b8b] via-[#e9b2b2] to-[#d28b8b] shimmer"></div>
          <div className="w-[90%] h-4 rounded-full bg-gradient-to-r from-[#d28b8b] via-[#e9b2b2] to-[#d28b8b] shimmer"></div>
          <div className="w-[95%] h-4 rounded-full bg-gradient-to-r from-[#d28b8b] via-[#e9b2b2] to-[#d28b8b] shimmer"></div>
          <div className="w-[70%] h-4 rounded-full bg-gradient-to-r from-[#d28b8b] via-[#e9b2b2] to-[#d28b8b] shimmer"></div>
        </div>

        {/* Button Placeholder */}
        <div className="w-40 h-12 rounded-full bg-gradient-to-r from-[#d28b8b] via-[#e9b2b2] to-[#d28b8b] shimmer mb-16"></div>

        {/* Image Grid Skeletons */}
        <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`grid-skel-${i}`}
              className="w-full aspect-[4/5] rounded-xl bg-gradient-to-r from-[#d28b8b] via-[#e9b2b2] to-[#d28b8b] shimmer shadow-md"
            ></div>
          ))}
        </div>
      </div>

      {/* Bottom Gallery Section Skeleton */}
      <div className="w-full flex flex-col md:flex-row bg-[#660909] py-16 px-8 md:px-16 items-center gap-12">
        
        {/* Left Text Skeleton */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-2/5">
          <div className="w-48 h-10 rounded-md bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer mb-8"></div>

          <div className="flex flex-col gap-4 w-full mb-10">
            <div className="w-full h-4 rounded-full bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer"></div>
            <div className="w-[90%] h-4 rounded-full bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer"></div>
            <div className="w-[85%] h-4 rounded-full bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer"></div>
          </div>

          <div className="w-40 h-12 rounded-full bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer"></div>
        </div>

        {/* Right Gallery Preview Skeleton */}
        <div className="w-full md:w-3/5 h-64 md:h-[400px] rounded-xl bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer shadow-xl"></div>
      </div>

      {/* Hardware-Accelerated Shimmer Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background-size: 200% 100%;
          animation: shimmer 1.8s infinite linear;
          /* Will-change hints to the browser to put this on the GPU */
          will-change: background-position; 
        }
      `}} />
    </motion.div>
  );
};

export default HomeSkeleton;