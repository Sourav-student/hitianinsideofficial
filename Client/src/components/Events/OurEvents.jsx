import React, { useEffect, useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import { motion } from "motion/react";
import { getEvents } from "../../api/userapis";

const OurEvents = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  //load all events
  useEffect(() => {
    const loadEvents = async () => {
      const result = await getEvents();
      setEvents(result.data.data.reverse());
      setLoading(false);
    }

    loadEvents();
  }, [])

  return (
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
                transition={{ duration: 0.2 }}
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
  )
}

export default OurEvents;
