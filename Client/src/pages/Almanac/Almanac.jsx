import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';

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

const formContents = [
  {
    img_url: aditi,
    Almanacname: "Digital/Traditional Artwork",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
    formSubmitionLink: "/almanac/artworkSubmitionForm",
    aosSegment: "fade-up",
  },
  {
    img_url: kaif,
    Almanacname: "Photography",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
    formSubmitionLink: "/almanac/photoSubmitionForm",
    aosSegment: "fade-up",
  },
  {
    img_url: pushp,
    Almanacname: "Poems",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
    formSubmitionLink: "/almanac/poemSubmitionForm",
    aosSegment: "fade-up",
  },
  {
    img_url: satyam,
    Almanacname: "Reels/Videos",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
    formSubmitionLink: "/almanac/videoSubmitionForm",
    aosSegment: "fade-up",
  },
  {
    img_url: mrin,
    Almanacname: "Story and Experiences",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
    formSubmitionLink: "/almanac/storySubmitionForm",
    aosSegment: "fade-up",
  },
]


function Almanac() {

  useEffect(() => {
    AOS.init({ duration: 1700 })
  }, [])

  return (
    <div className="bg-[#650808] ">
      {/* ======== Almanac Section ========= */}

      <div className="ps-[10%] md:ps-[8%] pt-[5%]">
        <div className="w-[80vw] md:w-[43vw]">
          <h1 className="text-[3rem] md:text-[5rem] text-[#fdd0d0] font-bold font-hammersmith" data-aos="fade-up">Almanac</h1>
          <p className="text-[#f2b5b5] font-medium text-[1.2rem] font-hammersmith" data-aos="fade-up">
            Bringing to you the platform to unveil your astounding creativity through the official e-media of HIT. A platform to showcase your creativity in the form of your rhythmic poems, thrilling experiences, captured moments, beautiful arts, and animations, and glorify your ingenious talents by getting exposure through our Instagram handle.
          </p>
          {/* <NavLink to="/Almanac/AlmanacSubmission" >
          <button type="submit" className="mt-5 text-[#650808] font-bold bg-[#fdd0d0] text-[.9rem] md:text-[1.3rem] w-[120px] h-[38px] md:w-[160px] md:h-[45px] rounded-[50px]
           hover:scale-125 transition-all duration-700 font-hammersmith" data-aos="fade-up">Submit Here</button>
          </NavLink> */}
        </div>
      </div>

      <div className="flex justify-end mt-[5%] md:mt-[-20%]">
        <img src={almanac_img} alt="IMAGE" className="w-[80%] md:w-[65%]" data-aos="fade-up" />
      </div>

      {/* formContents */}
      {
        formContents.map((formContent, index) => (
          <div className="bg-[#5f1818] p-3 mb-5 flex flex-wrap justify-around text-white font-semibold shadow-lg hover:shadow-md hover:shadow-[#a2c4e99d]" key={index}>
            <div>
              <img src={formContent.img_url} alt={formContent.Almanacname} width={150} height={150} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{formContent.Almanacname}</h2>
              <p className="mt-3">{formContent.content}</p>
              <NavLink to={formContent.formSubmitionLink}><button className='bg-[#c15b5b] hover:bg-[#ef5555] m-3  py-2 px-4 rounded-xl font-semibold'>Submit</button></NavLink>
            </div>
          </div>
        ))}

      {/* Best of Almanac */}
      <div className="Almanac-section flex flex-col justify-center bg-no-repeat bg-bottom " style={{ backgroundImage: `url(${almanac_background})` }}>
        <h1 className="text-[2rem] md:text-[2.5rem] text-[#f5d9d9] pt-10 pb-5 font-bold bg-[#650808]">Best of Almanac</h1>

        <div className=" grid justify-center grid-cols-4 gap-3 pb-10 pe-10 md:pe-16 ps-10 md:ps-16 font-sans">
          {
            almanacs.map((almanac, index) => (
              <div className="Almanac-card  bg-[#d17f7f] bg-opacity-50 col-span-4 ms-auto md:col-span-1 rounded-lg flex flex-col justify-center" key={index}>
                <div className=" object-contain w-full h-full">
                  <img
                    className="w-full h-full p-3"
                    src={almanac.img_url}
                    alt="Sunset in the mountains"
                    data-aos={almanac.aosSegment}
                  />
                </div>
                <div className="px-6 py-2">
                  <div className="font-bold text-base text-white">{almanac.name}</div>
                  <div className="font-bold text-base mb-2 text-white">{almanac.roll}</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Almanac;