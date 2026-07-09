import { Link } from "react-router-dom";
import { InstagramEmbed } from "react-social-media-embed";
import { motion } from "motion/react";

// --- Animation Variants ---

const embedVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 20 }
  }
};

const listContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Cascades each event item
      delayChildren: 0.1,
    }
  }
};

const listItemVariant = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 }
  }
};

const EventsHome = () => {
  return (
    <section className="grid grid-cols-5 overflow-hidden">

      {/* Left Column: Instagram Embeds */}
      <div className="md:col-span-3 col-span-5 bg-[#660909] flex flex-col md:flex-row justify-center items-center gap-6 pt-[3rem] md:pb-[5rem] pb-[1rem] px-4">

        <motion.div
          variants={embedVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full md:w-[45%] flex justify-center"
        >
          {/* Wrapped in a stable container to prevent layout shifts */}
          <div className="w-full max-w-[328px]">
            <InstagramEmbed
              url="https://www.instagram.com/p/DO3uLXOjc4P/?utm_source=ig_embed&ig_rid=ab08a5dd-6bc0-4786-a6ec-8baf4adc0dd5"
              className="w-full h-full shadow-2xl rounded-md"
            />
          </div>
        </motion.div>

        <motion.div
          variants={embedVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2 }} // Slightly delayed behind the first embed
          className="w-full md:w-[45%] flex justify-center"
        >
          <div className="w-full max-w-[328px]">
            <InstagramEmbed
              url="https://www.instagram.com/p/DVYyhVggbzV/?img_index=1"
              className="w-full h-full shadow-2xl rounded-md"
            />
          </div>
        </motion.div>

      </div>

      {/* Right Column: Events List */}
      <div className="bg-[#660909] col-span-5 md:col-span-2 md:pt-[6rem] pt-[1rem] md:pb-[10rem] pb-[5rem] max-sm:hidden flex flex-col px-6 md:px-10">

        <motion.h2
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="text-5xl/[2] text-[#FFB5B5] font-semibold"
        >
          Events
        </motion.h2>

        <motion.ul
          variants={listContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-left w-full pt-10 font-inter list-none p-0"
        >
          {/* Event 1 */}
          <motion.li variants={listItemVariant} className="mb-6 relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-red-200 before:text-2xl">
            <h3 className="text-2xl text-red-200 font-bold">Navroopam</h3>
            <hr className="my-2 border-red-400/30" />
            <p className="text-red-300 leading-relaxed">
              'NAVROOPAM' is an annual event organised by HITian Inside,
              offering a vibrant display of the cultural richness surrounding
              Durga Puja. The event beautifully showcases artistic pandals,
              cultural performances, and traditional rituals, idols of maa
              durga through creative displays (like Photography, Vlogs, Artwork).
            </p>
          </motion.li>

          {/* Event 2 */}
          <motion.li variants={listItemVariant} className="mb-6 relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-red-200 before:text-2xl">
            <h3 className="text-2xl text-red-200 font-bold">Deepdarpan</h3>
            <hr className="my-2 border-red-400/30" />
            <p className="text-red-300 leading-relaxed">
              'DEEPDARPAN' an exclusive event by HITian Inside for HITians,
              illuminates the spirit of Diwali through captivating displays
              including Photography, Videography, Artwork, and Creative
              Writing, showcasing the radiant beauty of lights and diyas.
            </p>
          </motion.li>

          {/* Event 3 */}
          <motion.li variants={listItemVariant} className="mb-6 relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-red-200 before:text-2xl">
            <h3 className="text-2xl text-red-200 font-bold">Extravaganza</h3>
            <hr className="my-2 border-red-400/30" />
            <p className="text-red-300 leading-relaxed">
              'EXTRAVANZA', the precursor to Prayukti (The Technical Fest) and
              Riviera (The Cultural Fest), organised by Team HITian Inside.
              Taking place both offline and online, it offers students an
              opportunity to familiarize themselves with the essence of the
              fest.
            </p>
          </motion.li>
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/events">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ffc9c9" }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 mb-10 text-[#650808] font-bold bg-[#FFB5B5] text-[1.3rem] w-[150px] h-[45px] rounded-[50px] shadow-lg flex items-center justify-center"
            >
              See More
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default EventsHome;