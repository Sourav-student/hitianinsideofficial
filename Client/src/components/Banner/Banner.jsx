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

    return () => clearInterval(interval); // cleanup
  }, [homepageComponent.length]);

  return (
    homepageComponent.length > 0 &&
    <div className='flex flex-col items-center justify-center rounded-xl'>
      <h1 className="text-2xl font-bold text-red-200 mb-6">Our uncoming Programs</h1>
      {loading ? <p className='text-lg text-red-200 mb-6'>Loading uncoming progeams</p> :
        (<div className='overflow-hidden md:w-[60vw] relative rounded-2xl'>
          <div
            className='h-auto flex transition-transform duration-700 ease-in-out z-0'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {homepageComponent.map((poster, index) => (
              <img src={poster.eventPoster} alt={poster.eventName} key={index} className='min-w-full h-[600px] object-fill' />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className='absolute left-0 flex justify-between items-center w-full top-[40%] max-sm:top-1/3 z-10 px-2'>
            <button
              onClick={() => handleSlide("left")}
              className='text-6xl p-3 bg-[#ffe8cf5d] opacity-80 text-black rounded-md cursor-pointer hover:bg-[#f68402] hover:opacity-100 transition-all duration-300 shadow-md max-sm:text-xl'
            >&lt;</button>
            <button
              onClick={() => handleSlide("right")}
              className='text-6xl p-3 bg-[#ffe8cf5d] opacity-80 text-black rounded-md cursor-pointer hover:bg-[#f68402] hover:opacity-100 transition-all duration-300 shadow-md max-sm:text-xl'
            >&gt;</button>
          </div>
        </div>)}
    </div>

  )
}

export default Banner
