import React, { useState, useEffect } from "react";
import { getAlmanacs } from "../../api/userapis";
import AOS from 'aos';
import { motion } from "motion/react";
import 'aos/dist/aos.css';

import almanac_img from "../../assets/images/almanac-vector.png";
// import almanac_background from "../../assets/images/almanac-img.png";
import { NavLink } from "react-router-dom";
import AlmanacSkeleton from "../../components/Almanac/AlmanacSkeleton";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

function Almanac() {

  const [almanacs, setAlmanacs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1700 })
  }, [])

  //Loading page
  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(false);
    }, 1500);
  }, [])

  //get all almanac
  useEffect(() => {
    const getAllAlmanacs = async () => {
      const { data } = await getAlmanacs();
      console.log(data);
      setAlmanacs(data);
      setLoading(false)
    }

    getAllAlmanacs();
  }, [])

  if(loadingPage){
    return (
      <>
       <AlmanacSkeleton/>
      </>
    )
  }

  return (
    <div className="bg-[#650808] w-full overflow-hidden">
      {/* ========== Almanac Header Section ========== */}
      <section
        className="ps-[8%] pt-[6%]">
        <div className="max-w-[90%] md:max-w-[50%] relative z-10" data-aos="fade-up">
          <h1 className="text-[2.8rem] md:text-[4.5rem] text-[#fdd0d0] font-bold font-hammersmith leading-tight">
            Almanac
          </h1>
          <p className="text-[#f2b5b5] font-medium text-[1.2rem] leading-relaxed mt-3 font-hammersmith">
            Bringing to you the platform to unveil your astounding creativity through the official e-media of HIT. A platform to showcase your creativity in the form of your rhythmic poems, thrilling experiences, captured moments, beautiful arts, and animations, and glorify your ingenious talents by getting exposure through our Instagram handle.
          </p>
          <NavLink to="/almanac/almanac-form">
            <button className="mt-4 bg-[#e22b2b] border-2 py-2 px-6 rounded-2xl font-semibold transition-all duration-300 text-white text-lg hover:scale-110 hover:bg-[#ff0000]">Submit</button>
          </NavLink>
        </div>

        {/* Image Section */}
        <div className="flex justify-end mt-[5%] md:mt-[-20%]" data-aos="fade-up">
          <img
            src={almanac_img}
            alt="Almanac Visual"
            className="w-[80%] md:w-[65%] aos-init aos-animate"
          />
        </div>
      </section>

      {/* ========== Best of Almanac Section ========== */}
      <section
        className="Almanac-section bg-no-repeat bg-bottom bg-cover"
        // style={{ backgroundImage: `url(${almanac_background})` }}
      >
        <div className="bg-[#650808] py-10 text-center">
          <h1 className="text-[2rem] md:text-[2.5rem] text-[#f5d9d9] font-bold">Best of Almanac</h1>
        </div>


        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl text-[#f5d9d9] text-center py-8"
          >
            Loading Best of Almanac...
          </motion.p>
        ) :  almanacs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white text-xl py-10"
          >
            No Almanac Found
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-16 pb-10 flex flex-col items-center"
          >
            {almanacs.map((almanac, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="relative bg-[#d17f7f]/30 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl 
                         transition-shadow duration-300 overflow-hidden border border-white/10 sm:max-w-[300px] max-sm:w-[90%]"
              >
                <div className="overflow-hidden relative">
                  <motion.img
                    className="w-full h-[220px] object-cover p-3 rounded-t-2xl"
                    src={almanac.photo}
                    alt={`Artwork by ${almanac.username}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                <div className="px-5 py-4">
                  <p className="text-white font-semibold text-lg tracking-wide">
                    {almanac.username}
                  </p>
                  <p className="text-white/80 text-sm">{almanac.department}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>

  );
}

export default Almanac;