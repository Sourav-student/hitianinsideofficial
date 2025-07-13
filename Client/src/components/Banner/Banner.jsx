import React, { useState, useEffect } from 'react';
import { getHomepageComponents } from '../../api/userapis';

const Banner = () => {
  const [homepageComponent, setHomepageComponent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleSlide = (direction) => {
    setCurrentIndex((prevIndex) =>
      direction === 'left'
        ? (prevIndex === 0 ? homepageComponent.length - 1 : prevIndex - 1)
        : (prevIndex === homepageComponent.length - 1 ? 0 : prevIndex + 1)
    );
  };

  useEffect(() => {
    const getPosters = async () => {
      const { data } = await getHomepageComponents();
      setHomepageComponent(data);
      setLoading(false);
    };
    getPosters();
  }, []);

  return (
    homepageComponent.length > 0 && (
      <div className="flex flex-col items-center justify-center w-full px-4 py-6">
        <h1 className="text-2xl font-bold text-red-200 mb-6 text-center">
          Our Upcoming Events
        </h1>

        {loading ? (
          <div className="animate-pulse w-full max-w-[600px] aspect-square bg-red-100/10 rounded-2xl flex items-center justify-center text-red-100 text-lg">
            Loading upcoming events...
          </div>
        ) : (
          <div className="overflow-hidden w-full max-w-[600px] aspect-square relative rounded-2xl shadow-lg">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {homepageComponent.map((poster, index) => (
                <div
                  key={index}
                  className="w-full max-w-[600px] aspect-square flex-shrink-0 relative"
                >
                  <img
                    src={poster.eventPoster}
                    alt={poster.eventName}
                    className="w-full h-full object-cover rounded-2xl"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end items-center bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 sm:p-6 rounded-2xl">
                    <h2 className="text-lg sm:text-xl text-white font-bold mb-2 text-center">
                      {poster.eventName}
                    </h2>
                    <a
                      href={poster.eventFormLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-700/70 hover:bg-red-500/80 text-white font-semibold px-4 py-2 rounded-full shadow-md transition-all border border-white text-sm sm:text-base"
                    >
                      Register Now
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Nav buttons */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 z-10 -translate-y-1/2">
              <button
                onClick={() => handleSlide('left')}
                className="text-2xl sm:text-4xl bg-white/40 text-black rounded-full p-2 hover:bg-red-500 hover:text-white transition-all"
                aria-label="Previous Slide"
              >
                &lt;
              </button>
              <button
                onClick={() => handleSlide('right')}
                className="text-2xl sm:text-4xl bg-white/40 text-black rounded-full p-2 hover:bg-red-500 hover:text-white transition-all"
                aria-label="Next Slide"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Banner;