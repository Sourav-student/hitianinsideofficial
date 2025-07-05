import React, { useEffect, useState } from "react";
// import "./Events.css";
import { InstagramEmbed } from "react-social-media-embed";
// import { FacebookEmbed } from "react-social-media-embed";
import AOS from 'aos';
import 'aos/dist/aos.css';
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

  const [events, setEvents] = useState([])

  //animation
  useEffect(() => {
    AOS.init({ duration: 1700 })
  }, [])

  //load all events
  useEffect(() => {
    const loadEvents = async () => {
      const result = await getEvents();
      let arr = result.data;
      //reverse the array
      for (let i = 0; i < arr.length/2; i++) {
         let temp = arr[i];
         arr[i] = arr[arr.length - 1 - i];
         arr[arr.length - 1 - i] = temp;
      }

      setEvents(arr);
    }

    loadEvents();
  }, [])

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

        {/* <div className="events-list"> */}

        {/* {Elist.map((index) => (
          <div data-aos="fade-up">
            <p className="text-start font-bold text-2xl ps-5 pb-5 text-[#fdd0d0] underline decoration-[red] font-hammersmith">
              {index.year}
            </p>
            <div className="allthrebox Events-cards grid grid-cols-3 gap-8 px-3 mb-5 font-sans">
              {index.list.map((event, indexes) => (
                <div
                  key={indexes}
                  data={event}
                  className="event-card rounded-lg col-span-3 md:col-span-1 w-full pb-5  h-[90%] bg-[#a81f1f] "
                >
                  <InstagramEmbed
                    url={event.img_url}
                    className="rounded-t-lg h-[87%] object-cover"
                  />

                  <div className="px-6 py-4">
                    <div className="font-bold text-base mb-2 text-white">
                      NAME: {event.name}
                    </div>
                    <div className="font-bold text-base mb-2 text-white">
                      DATE: {event.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))} */}

        {/* </div> */}


        <h1 className="event-heading text-[3rem] font-bold text-[#fdd0d0] pt-10 pb-10 font-hammersmith">Our Events</h1>
        <div className="allthrebox Events-cards flex flex-wrap justify-center items-center gap-8 px-3 mb-5 font-sans" data-aos="fade-up">
          {
            events.map((event, index) => (
              <div key={index} className="bg-[#d03c19] w-auto h-[600px] max-w-[400px] rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-100">
                <InstagramEmbed
                  url={event.instaURL}
                  className="rounded-t-xl h-[80%]"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-base mb-2 text-white">
                    NAME: {event.eventName}
                  </div>
                  <div className="font-bold text-base mb-2 text-white">
                    DATE: {event.date}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  );
}

export default Events;
