import React from 'react'
import { NavLink } from 'react-router-dom';
import aditi from "../../assets/images/best_of_almanac/Aditi_bera_IT.jpg"

const AlmanacForm = () => {
  const formContents = [
    {
      img_url: aditi,
      Almanacname: "Digital/Traditional Artwork",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
      formSubmitionLink: "/almanac/almanac-form/artwork-form-submit",
      aosSegment: "fade-up",
    },
    {
      img_url: aditi,
      Almanacname: "Photography",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
      formSubmitionLink: "/almanac/almanac-form/photo-form-submit",
      aosSegment: "fade-up",
    },
    {
      img_url: aditi,
      Almanacname: "Poems",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
      formSubmitionLink: "/almanac/almanac-form/poem-form-submit",
      aosSegment: "fade-up",
    },
    {
      img_url: aditi,
      Almanacname: "Reels/Videos",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
      formSubmitionLink: "/almanac/almanac-form/video-form-submit",
      aosSegment: "fade-up",
    },
    {
      img_url: aditi,
      Almanacname: "Story and Experiences",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis dolorum rerum.",
      formSubmitionLink: "/almanac/almanac-form/story-form-submit",
      aosSegment: "fade-up",
    },
  ]
  return (
    <div>
      {/* ========== Submission Sections ========== */}
      <section className="mt-8 px-4 md:px-16">
        {formContents.map((formContent, index) => (
          <div
            key={index}
            className="bg-[#5f1818] p-6 mb-6 rounded-lg flex flex-col md:flex-row items-center gap-6 text-white font-semibold shadow-lg hover:shadow-[#a2c4e99d] transition-shadow duration-300"
          >
            <img
              src={formContent.img_url}
              alt={formContent.Almanacname}
              className="w-[150px] h-[150px] object-cover rounded-md"
            />

            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-semibold">{formContent.Almanacname}</h2>
              <p className="mt-2 text-sm md:text-base">{formContent.content}</p>
              <NavLink to={formContent.formSubmitionLink}>
                <button className="mt-4 bg-[#c15b5b] hover:bg-[#ef5555] py-2 px-5 rounded-xl font-semibold transition-all duration-300">
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
