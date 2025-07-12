import React, { useState, useEffect } from 'react';
import { getHomepageComponents } from '../../api/userapis';

const Banner = () => {
  const [homepageComponent, sethomepageComponent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true)

  //sliding animation
  const handleSlide = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? homepageComponent.length - 1 : prevIndex - 1
      );
    } else if (direction === "right") {
      setCurrentIndex((prevIndex) =>
        prevIndex === homepageComponent.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  //get all data from backend  
  useEffect(() => {
    const getPosters = async () => {
      const { data } = await getHomepageComponents();
      sethomepageComponent(data);
      setLoading(false);
    }

    getPosters();
  }, []);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleSlide("right");
    }, 4000);

    return () => clearInterval(interval);
  }, [homepageComponent.length]);

  return (
    homepageComponent.length > 0 &&
    <div className="flex flex-col items-center justify-center rounded-xl py-6 px-4">
      <h1 className="text-3xl font-bold text-red-200 mb-6 text-center">
        Our Upcoming Events
      </h1>

      {loading ? (
        <div className="animate-pulse w-full md:w-[60vw] h-[300px] bg-red-100/10 rounded-2xl flex items-center justify-center text-red-100 text-lg">
          Loading upcoming events...
        </div>
      ) : (
        <div className="overflow-hidden md:w-[60vw] relative rounded-2xl shadow-lg">
          {/* Slide Container */}
          <div
            className="h-auto flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {homepageComponent.map((poster, index) => (
              <div
                className="w-full flex-shrink-0 flex flex-col items-center gap-2"
                key={index}
              >
                <img
                  src={poster.eventPoster}
                  alt={poster.eventName}
                  className="min-w-full h-[300px] object-contain rounded-2xl"
                />

                <div className="bg-white/10 text-white w-full p-4 rounded-xl shadow-inner backdrop-blur-md text-center">
                  <h2 className="text-xl font-semibold mb-1">{poster.eventName}</h2>
                  <p className="text-sm text-gray-200">{poster.eventContent}</p>
                </div>

                {/* Register button */}
                <a
                  href={poster.eventFormLink}
                  target='_blank'
                  rel="noopener noreferrer"
                  className="mt-2 bg-red-700 hover:bg-red-500 text-stone-900 hover:text-white font-semibold px-4 py-2 rounded-full shadow-md transition-all duration-200 border border-black"
                >
                  Register Now
                </a>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 z-10 -translate-y-1/2">
            <button
              onClick={() => handleSlide("left")}
              className="text-3xl sm:text-5xl bg-white/40 text-black rounded-full p-2 hover:bg-[#f63702] hover:text-white transition-all"
              aria-label="Previous Slide"
            >
              &lt;
            </button>
            <button
              onClick={() => handleSlide("right")}
              className="text-3xl sm:text-5xl bg-white/40 text-black rounded-full p-2 hover:bg-[#f62b02] hover:text-white transition-all"
              aria-label="Next Slide"
            >
              &gt;
            </button>
          </div>
        </div>

      )}
    </div>
  )
}

export default Banner
