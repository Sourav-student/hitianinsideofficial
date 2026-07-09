import { Link } from "react-router-dom";
import { motion } from "motion/react";
import collage from "../../assets/images/Image-collage2.png";

// --- Animation Variants ---

const textContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Cascades the heading, paragraph, and button
      delayChildren: 0.1,
    },
  },
};

const textItemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

const imageVariant = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 20, delay: 0.3 },
  },
};

const GalleryHome = () => {
  return (
    // Added overflow-hidden to prevent animation from causing horizontal scrollbars
    <section className="gallery grid grid-cols-5 overflow-hidden bg-[#660909]">
      
      {/* Left Text Column */}
      <motion.div
        variants={textContainerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="gallery-contents col-span-5 md:col-span-2 flex flex-col justify-center px-6 md:px-10 py-12 md:py-0"
      >
        <motion.h2
          variants={textItemVariant}
          className="text-5xl/[2] text-[#FFB5B5] font-semibold md:mt-[6rem]"
        >
          Gallery
        </motion.h2>
        
        <motion.p
          variants={textItemVariant}
          className="mt-6 text-[#FFB5B5] font-medium font-hammersmith text-lg leading-relaxed"
        >
          Dive into our gallery for a visual treat! Explore captivating snapshots
          of all the dynamic events and the lively spirit of our community.
          Discover our world in vibrant shades!
        </motion.p>
        
        <motion.div variants={textItemVariant} className="mt-10 mb-6">
          <Link to="/almanac">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ffc9c9" }}
              whileTap={{ scale: 0.95 }}
              className="text-[#650808] font-bold bg-[#FFB5B5] text-[1.3rem] w-[150px] h-[45px] rounded-[50px] font-hammersmith shadow-lg flex items-center justify-center"
            >
              See More
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Image Column */}
      <motion.div
        variants={imageVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="md:col-span-3 col-span-5 flex items-center justify-center relative"
      >
        <motion.img
          whileHover={{ scale: 1.02 }} // Subtle zoom on hover
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={collage}
          alt="insideGallery"
          className="w-full h-auto object-cover md:h-full drop-shadow-2xl"
          loading="lazy"
        />
      </motion.div>
      
    </section>
  );
};

export default GalleryHome;