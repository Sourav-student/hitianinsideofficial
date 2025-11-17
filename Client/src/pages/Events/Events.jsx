import React, { useEffect, useState } from "react";
// import "./Events.css";
import { InstagramEmbed } from "react-social-media-embed";
// import { FacebookEmbed } from "react-social-media-embed";
import { motion } from "motion/react";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import { getEvents } from "../../api/userapis";


// image list 
import abhinito23 from '../../assets/eventimage/abhinito23.jpeg'
import carrercounteling01 from '../../assets/eventimage/carrercounteling01.jpeg'
import creativeart from '../../assets/eventimage/creativeart.jpeg'
import deepdarpan23 from '../../assets/eventimage/deepdarpan23.jpeg'
import glory23 from '../../assets/eventimage/glory23.jpeg'
import navroopam2 from '../../assets/eventimage/navroopam2.0.jpeg'
import navroopam3 from '../../assets/eventimage/navroopam3.0.jpeg'
import swarajehind from '../../assets/eventimage/swarajehind.jpeg'
import websitedevelopment02 from '../../assets/eventimage/websitedevelopment02.jpeg'
// import abhinito22 from '../../assets/eventimage/abhinito22.jpeg'
import battleground from '../../assets/eventimage/battleground.jpeg'
import azadikaamritmahotsav from '../../assets/eventimage/azadikaamritmahotsav.jpeg'
import BhasharTori from '../../assets/eventimage/BhasharTori.jpeg'
import EventsSkeleton from "../../components/Events/EventSkeleton";


// const Elist = [
//   {
//     year: "2023",
//     list: [
//       {
//         img_url: "https://www.instagram.com/p/CybFEKehBlS/?img_index=1",
//         alt: "navroopam poster",
//         name: "Navroopam",
//         date: "18/08/23",
//       },
//       {
//         img_url: "https://www.instagram.com/p/C01BGughMNv/?img_index=1",
//         alt: "Shaam-E-Parichay",
//         name: "Shaam-E-Parichay",
//         date: "14/12/2023",
//       },
//       {
//         img_url: "https://www.instagram.com/p/Csgad_6IR-1/",
//         alt: "Saudade",
//         name: "Saudade",
//         date: "21/05/2023",
//       },
//     ],
//   },

//   {
//     year: "2022",
//     list: [
//       {
//         img_url: "https://www.instagram.com/p/CjKoc0KBFnJ/?img_index=1",
//         alt: "Navroopam poster",
//         name: "Navroopam",
//         date: "18/08/23",
//       },
//       {
//         img_url: "https://www.instagram.com/p/CkBgMJ8BoDm/?img_index=1",
//         alt: "Deepdarpan poster",
//         name: "Deepdarpan",
//         date: "18/08/23",
//       },
//     ],
//   },
//   {
//     year: "2021",
//     list: [
//       {
//         img_url: "https://www.instagram.com/p/CU4wxYxBonN/?img_index=1",
//         alt: "Navroopam poster",
//         name: "Navroopam",
//         date: "18/08/23",
//       },
//     ],
//   },
// ];

function Events() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);

  //loading page first
  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(false);
    }, 1500);
  }, [])


  //load all events
  useEffect(() => {
    const loadEvents = async () => {
      const result = await getEvents();
      setEvents(result.data.data.reverse());
      setLoading(false);
    }

    loadEvents();
  }, [])

  if (loadingPage) {
    return (
      <EventsSkeleton />
    )
  }

  return (
    <div className="bg-[#650808] flex justify-center">
      <section className="events-home pb-16 w-full md:w-[80%]">
        <h1 className="event-heading text-[3rem] font-bold text-[#fdd0d0] pt-10 pb-10 font-hammersmith">
          EVENTS
        </h1>

        {/* event try grid formation test */}
        <section className="box grid grid-cols-4 gap-2 mb-5">
          <div className="box1 bg-red-50 w-full  hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75">
            <img className=" object-fill" src={abhinito23} alt="" />
          </div>
          <div className="box3  bg-red-50 w-full  hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75">
            <img src={carrercounteling01} alt="" />
          </div>
          <div className="box2  bg-red-50 w-full  hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75">
            <img src={creativeart} alt="" />
          </div>
          <div className="box4  bg-red-50 w-full hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75">
            <img src={deepdarpan23} alt="" />
          </div>
          <div className="box5  bg-red-50 w-full  hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75">
            <img src={glory23} alt="" />
          </div>
          <div className="box6  bg-red-50 col-start-2 col-end-4 row-start-2 row-end-4 w-full hover:scale-125   hover:transition-all ease-in-out delay-75 duration-75">
            {/* center  */}
            <img className="" src={navroopam2} alt="" />
          </div>
          <div className="box8  bg-red-50 w-full hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75">
            <img src={navroopam3} alt="" />
          </div>
          <div className="box9  bg-red-50 w-full hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75">
            <img src={battleground} alt="" />
          </div>
          {/* <div className="box7  bg-red-50 col-start-2 col-end-4 h-28">2</div> */}
          <div className="box10 bg-red-50 w-full hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75">
            <img src={swarajehind} alt="" />
          </div>
          <div className="box11 bg-red-50 w-full hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75">
            <img src={azadikaamritmahotsav} alt="" />
          </div>
          <div className="box12 bg-red-50 w-full hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75">
            <img src={swarajehind} alt="" />
          </div>
          <div className="box13 bg-red-50 w-full hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75">
            <img src={BhasharTori} alt="" />
          </div>
          <div className="box14 bg-red-50 w-full hover:scale-110 hover:transition-all ease-in-out delay-75 duration-75">
            <img src={websitedevelopment02} alt="" />
          </div>
        </section>

        {/* Our Events Section*/}
        <div className="text-center">
          <motion.h1
            className="event-heading text-[3rem] font-bold text-[#fdd0d0] pt-10 pb-10 font-hammersmith"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Our Events
          </motion.h1>

          <div className="allthrebox Events-cards flex flex-wrap justify-center items-center gap-8 px-3 mb-5 font-sans">
            {loading ? (
              <div className="w-[90%] max-w-sm mt-6 bg-[#5a0000] rounded-xl overflow-hidden shadow-lg">
                {/* Reel video skeleton */}
                <div className="w-full aspect-[9/16] bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] animate-[shimmer_1.5s_infinite_linear]"></div>

                {/* Reel footer (profile + icons) */}
                <div className="flex items-center justify-between p-4">
                  {/* Left: profile pic + name */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] animate-[shimmer_1.5s_infinite_linear]"></div>
                    <div className="flex flex-col gap-2">
                      <div className="w-24 h-3 rounded bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] animate-[shimmer_1.5s_infinite_linear]"></div>
                      <div className="w-16 h-3 rounded bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] animate-[shimmer_1.5s_infinite_linear]"></div>
                    </div>
                  </div>

                  {/* Right: like/comment icons */}
                  <div className="flex flex-col gap-3 items-center">
                    <div className="w-6 h-6 rounded bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] animate-[shimmer_1.5s_infinite_linear]"></div>
                    <div className="w-6 h-6 rounded bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] animate-[shimmer_1.5s_infinite_linear]"></div>
                    <div className="w-6 h-6 rounded bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] animate-[shimmer_1.5s_infinite_linear]"></div>
                  </div>
                </div>
              </div>
            ) : events.length > 0 ? (
              events.map((event, index) =>
                event.insta_url ? (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 10px 20px rgba(0,0,0,0.4)"
                    }}
                    whileTap={{ scale: 0.94, boxShadow: "0px 10px 20px rgba(0,0,0,0.4)" }}
                    className="bg-[#d03c19] w-auto h-[600px] max-w-[400px] rounded-xl shadow-lg overflow-hidden transition-all duration-300"
                  >
                    <InstagramEmbed
                      url={event.insta_url}
                      className="rounded-t-xl h-[80%]"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-base mb-2 text-white">
                        NAME: {event.event_name}
                      </div>
                      <div className="font-bold text-base mb-2 text-white">
                        DATE: {event.date}
                      </div>
                    </div>
                  </motion.div>
                ) : null
              )
            ) : (
              <motion.div
                className="text-white text-2xl font-bold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                No Events Found
              </motion.div>
            )}
          </div>
        </div>

      </section>
    </div>
  );
}

export default Events;