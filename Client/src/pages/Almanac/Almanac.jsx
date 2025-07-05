import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// all images are there, add only path and it will be active
import aditi from "../../assets/images/best_of_almanac/Aditi_bera_IT.jpg"
import aditya from "../../assets/images/best_of_almanac/Aditya_Raj_IT.jpg"
import ashwin from "../../assets/images/best_of_almanac/Ashwini_Kumar_IT.jpg"
import durba from "../../assets/images/best_of_almanac/Durba_Chattopadhyay_CHE.jpg"
import kaif from "../../assets/images/best_of_almanac/Md Kaif_CSE_CS.jpg"
import mrin from "../../assets/images/best_of_almanac/Mrinmoyee Sil_CSE.jpg"
import pushp from "../../assets/images/best_of_almanac/Pushp_Ranjan_CSE_CS.jpg"
import satyam from "../../assets/images/best_of_almanac/Satyam_Kumar_ECE.jpg"

import almanac_img from "../../assets/images/almanac-vector.png";
import almanac_background from "../../assets/images/almanac-img.png";
import { NavLink } from "react-router-dom";
// import almanacPoster from "../../assets/images/almanac-poster.jpg";
// import { NavLink } from "react-router-dom";

const almanacs = [
  {
    img_url: aditi,
    alt: "value",
    name: "Aditi bera",
    roll: "Information Technology",
    aosSegment: "fade-up",
  },
  {
    img_url: aditya,
    alt: "value",
    name: "Aditya Raj",
    roll: "Information Technology",
    aosSegment: "fade-up",
  },
  {
    img_url: ashwin,
    alt: "value",
    name: "Ashwini Kumar",
    roll: "Information Technology",
    aosSegment: "fade-up",
  },
  {
    img_url: durba,
    alt: "value",
    name: "Durba Chattopadhyay",
    roll: "Chemical",
    aosSegment: "fade-up",
  },
  {
    img_url: kaif,
    alt: "value",
    name: "Md Kaif",
    roll: "Cyber Security",
    aosSegment: "fade-up",
  },
  {
    img_url: mrin,
    alt: "value",
    name: "Mrinmoyee sil",
    roll: "Computer Science",
    aosSegment: "fade-up",
  },
  {
    img_url: pushp,
    alt: "value",
    name: "Pushp Ranjan",
    roll: "Cyber Security",
    aosSegment: "fade-up",
  },
  {
    img_url: satyam,
    alt: "value",
    name: "Satyam Kumar",
    roll: "Electronics and communication",
    aosSegment: "fade-up",
  },
];


function Almanac() {

  useEffect(() => {
    AOS.init({ duration: 1700 })
  }, [])

  return (
    <div className="bg-[#650808] w-full overflow-hidden">
      {/* ========== Almanac Header Section ========== */}
      <section className="ps-[8%] pt-[6%]">
        <div className="max-w-[90%] md:max-w-[50%] relative z-10" data-aos="fade-up">
          <h1 className="text-[2.8rem] md:text-[4.5rem] text-[#fdd0d0] font-bold font-hammersmith leading-tight">
            Almanac
          </h1>
          <p className="text-[#f2b5b5] font-medium text-[1.2rem] leading-relaxed mt-3 font-hammersmith">
            Bringing to you the platform to unveil your astounding creativity through the official e-media of HIT. A platform to showcase your creativity in the form of your rhythmic poems, thrilling experiences, captured moments, beautiful arts, and animations, and glorify your ingenious talents by getting exposure through our Instagram handle.
          </p>
          <NavLink to="/almanac/almanac-form"><button className="mt-4 bg-[#e22b2b] hover:bg-transparent border-2 py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-white text-lg">Submit</button></NavLink>
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
        style={{ backgroundImage: `url(${almanac_background})` }}
      >
        <div className="bg-[#650808] py-10 text-center">
          <h1 className="text-[2rem] md:text-[2.5rem] text-[#f5d9d9] font-bold">Best of Almanac</h1>
        </div>

        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-16 pb-10 flex flex-col items-center">
          {almanacs.map((almanac, index) => (
            <div
              key={index}
              className="bg-[#d17f7f]/50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden sm:max-w-[400px] max-sm:w-[90%]"
            >
              <img
                className="w-full h-[220px] p-4"
                src={almanac.img_url}
                alt={`Artwork by ${almanac.name}`}
                data-aos={almanac.aosSegment}
              />
              <div className="px-4 py-3">
                <p className="text-white font-bold text-lg">{almanac.name}</p>
                <p className="text-white text-sm">{almanac.roll}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>

  );
}

export default Almanac;