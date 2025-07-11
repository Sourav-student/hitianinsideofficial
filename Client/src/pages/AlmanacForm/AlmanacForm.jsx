import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import aditi from "../../assets/images/best_of_almanac/Aditi_bera_IT.jpg";
import aditya from "../../assets/images/best_of_almanac/Aditya_Raj_IT.jpg";
import poemImg from "../../assets/images/poemImg.png";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AlmanacForm = () => {
  
  const [formContents, setFormContents] = useState([
    {
      img_url: aditi,
      Almanacname: "Digital/Traditional Artwork",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
      formSubmitionLink: "/almanac/almanac-form/artwork-form-submit",
      aosSegment: "fade-up",
    },
    {
      img_url: aditya,
      Almanacname: "Photography",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
      formSubmitionLink: "/almanac/almanac-form/photo-form-submit",
      aosSegment: "fade-up",
    },
    {
      img_url: poemImg,
      Almanacname: "Poems",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
      formSubmitionLink: "/almanac/almanac-form/poem-form-submit",
      aosSegment: "fade-up",
    },
    // {
    //   img_url: aditi,
    //   Almanacname: "Reels/Videos",
    //   content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
    //   formSubmitionLink: "/almanac/almanac-form/video-form-submit",
    //   aosSegment: "fade-up",
    // },
    // {
    //   img_url: aditi,
    //   Almanacname: "Story and Experiences",
    //   content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
    //   formSubmitionLink: "/almanac/almanac-form/story-form-submit",
    //   aosSegment: "fade-up",
    // },
  ])

  useEffect(() => {
    AOS.init({ duration: 1700 })
  }, [])

  return (
    <div>
      {/* ========== Submission Sections ========== */}
      <section className="mt-8 px-4 md:px-16">
        {formContents.map((formContent, index) => (
          <div
            key={index}
            className="bg-[#5f1818] p-3 mb-6 rounded-lg flex flex-col md:flex-row items-center gap-6 text-[#ffc8c8] font-semibold shadow-lg hover:shadow-[#e158582e] transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={formContent.img_url}
              alt={formContent.Almanacname}
              className="w-[150px] h-[150px] object-cover rounded-md"
              data-aos = {formContent.aosSegment}
            />

            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-semibold">{formContent.Almanacname}</h2>
              <p className="mt-2 text-sm md:text-base">{formContent.content}</p>
              <NavLink to={formContent.formSubmitionLink}>
                <button className="mt-4 bg-[#df2121] py-1 px-4 rounded-xl shadow-lg font-semibold text-lg border transition-all duration-300 hover:scale-110 hover:bg-[#f00]">
                  Submit
                </button>
              </NavLink>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default AlmanacForm
