import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

// all images
import img1 from "../../assets/images/best_of_almanac/Ankit_Maji.jpg";
import img2 from "../../assets/images/best_of_almanac/Rounak_Saha.png";
import img3 from "../../assets/images/best_of_almanac/Pratik_Chattopadhyay.jpg";
import img4 from "../../assets/images/best_of_almanac/Soumi_Pradhan.jpg";
import img5 from "../../assets/images/best_of_almanac/Subham_Kundu.png";

// --- Animation Variants ---

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.6 } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Creates a cascading effect for the images
      delayChildren: 0.2,
    },
  },
};

const cardFlipVariant = {
  hidden: { opacity: 0, rotateX: -60, y: 40, transformPerspective: 1000 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15, mass: 1 },
  },
};

const AboutusHome = () => {
  return (
    <section className="aboutus bg-gradient-to-b from-[#FFB5B5] to-[#A95454] overflow-hidden py-16">
      
      {/* Headings & Text */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Triggers when 30% visible
        className="flex flex-col items-center text-center"
      >
        <motion.h1
          variants={fadeUpVariant}
          className="text-3xl/[3rem] md:text-5xl/[3rem] aboutus-title font-medium text-[#650808] font-hammersmith"
        >
          About us
        </motion.h1>
        
        <motion.div variants={fadeUpVariant} className="aboutus-content mt-7 md:mt-10 md:px-[20%] px-[5%]">
          <p className="text-lg text-[#650808] font-bold font-hammersmith leading-relaxed">
            The Maroon Squad, as the official media team of HIT, is a dynamic
            unit within the media club. Dedicated to keeping the campus
            community informed, it meticulously covers and presents ongoing
            details about campus life.
          </p>
        </motion.div>

        {/* Call To Action Button */}
        <motion.div variants={fadeUpVariant} className="button mt-10">
          <NavLink to="/about">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#4a0606" }}
              whileTap={{ scale: 0.95 }}
              className="text-[#FFB5B5] font-semibold bg-[#650808] text-[1.3rem] w-[169px] h-[48px] rounded-[50px] font-hammersmith shadow-lg flex items-center justify-center"
            >
              Know More
            </motion.button>
          </NavLink>
        </motion.div>
      </motion.div>

      {/* Image Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-20 grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 justify-between h-full max-sm:items-center px-4 md:px-0"
      >
        {[
          { src: img1, alt: "Ankit Maji", className: "rounded-r-md max-sm:hidden" },
          { src: img2, alt: "Rounak Saha", className: "rounded-md" },
          { src: img3, alt: "Pratik Chattopadhyay", className: "rounded-md max-sm:hidden" },
          { src: img4, alt: "Soumi Pradhan", className: "rounded-md" },
          { src: img5, alt: "Subham Kundu", className: "rounded-l-md max-sm:hidden" },
        ].map((image, index) => (
          <motion.div
            key={index}
            variants={cardFlipVariant}
            whileHover={{ y: -10, scale: 1.02, zIndex: 10 }}
            className={`card ${image.className} m-3 md:m-0 relative shadow-xl`}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover rounded-inherit"
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
};

export default AboutusHome;