import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import "./home.css";
import hit from "../../assets/images/fourpillar.png";
import curve from "../../assets/images/homepage-curve.png";
import name from "../../assets/images/Hitian-name.png";

// recruitment
// import recruitmentbanner from "../../assets/images/recruitment/recuritment_header.png";
// import recruitmentposter from "../../assets/images/recruitment/Recruitment_poster.png";

import Banner from '../../components/Banner/Banner';
import HomeSkeleton from "../../components/Home/HomeSkeleton";
import AboutusHome from "../../components/Home/AboutusHome";
import GellaryHome from "../../components/Home/GalleryHome";
import EventsHome from "../../components/Home/EventsHome";

function Home() {

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1700 });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(false);
    }, 1000);
  }, [])

  if(loadingPage){
    return (
      <HomeSkeleton/>
    );
  }

  return (
    <div className="min-h-screen">

      {/* ============ Banner ============= */}
      <Banner />

      {/* ============ Landing Page ============= */}
      <section className="homepage bg-[#650808] justify-center ">
        {/* recruitment poster  */}

        {/* <div
          class="w-full  md:h-[450px] h-20 bg-fixed bg-contain  bg-center flex justify-center items-center opacity-60"
          data-aos="slide-down"
          style={{ backgroundImage: `url(${recruitmentbanner})` }}
        >
          <Link to="/team" className="ms-5">
            <button
              className="bg-[#650808] font-bold text-[#ffffff] md:text-[2rem] text-[.7rem] md:w-[250px] w-[78px] md:h-[70px] h-[28px] rounded-[50px] hover:scale-125 transition-all duration-700"
              data-aos="slide-up"
            >
              checkout
            </button>
          </Link>
        </div> */}

        <div className="text-2xl/[2.3rem] md:text-[2.2rem] pt-6 md:pt-10 comeExplore font-semibold text-[#ffa6a6]">
          COME AND EXPLORE
        </div>
        <img src={name} alt="name" className="name inline w-[30%]" />

        {/* /////////////// recruitment snippet ///////////// */}

        <img
          data-aos="fade-up"
          src={hit}
          alt="hit"
          className="hit mt-6 md:mt-10"
        />
        <img src={curve} alt="curve" className="curve mt-[-8%] w-full" />
      </section>

      {/* About us */}
       <AboutusHome/>

      {/* <Gallery/> */}
      <GellaryHome/>

      {/* Events */}
      <EventsHome/>
    </div>
  );
}

export default Home;