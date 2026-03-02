import React, { useEffect, useState } from "react";
// import "./Events.css";
// import { FacebookEmbed } from "react-social-media-embed";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

import EventsSkeleton from "../../components/Events/EventSkeleton";
import EventsGrid from "../../components/Events/EventsGrid";
import OurEvents from "../../components/Events/OurEvents";

function Events() {
  const [loadingPage, setLoadingPage] = useState(true);

  //loading page first
  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(false);
    }, 1000);
  }, [])

  if (loadingPage) {
    return (
      <EventsSkeleton />
    )
  }

  return (
    <div className="bg-[#650808] flex justify-center min-h-screen">
      <section className="events-home pb-16 w-full md:w-[80%]">
        <h1 className="event-heading text-[3rem] font-bold text-[#fdd0d0] pt-10 pb-10 font-hammersmith">
          EVENTS
        </h1>

        {/* event try grid formation test */}
        <EventsGrid/>

        {/* Our Events Section*/}
         <OurEvents/>
      </section>
    </div>
  );
}

export default Events;