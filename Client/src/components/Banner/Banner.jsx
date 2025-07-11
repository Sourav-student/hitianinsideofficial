import React, { useState, useEffect } from 'react';
import { getHomepageComponents } from '../../api/userapis';
import {NavLink} from 'react-router-dom';

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
      <h1 className="text-2xl font-bold text-red-200 mb-6">Our uncoming events</h1>
      {loading ? <p className='text-lg text-red-200 mb-6'>Loading uncoming events</p> :
        (<div className='overflow-hidden md:w-[60vw] relative'>
          <div
            className='h-auto flex transition-transform duration-700 ease-in-out relative z-0'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {homepageComponent.map((poster, index) => (
              <div className='w-full flex-shrink-0 relative' key={index}>
                <img src={poster.eventPoster} alt={poster.eventName} key={index} className='min-w-full object-fill rounded-2xl' />
                <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-2xl'>
                  <h2 className='text-xl font-bold'>{poster.eventName}</h2>
                  <p className='text-sm'>{poster.eventContent}</p>
                </div>
                <NavLink to={poster.eventFormLink} className="text-[#650808] mt-2 font-bold bg-[#FFB5B5] text-[0.9rem] rounded-xl p-2 absolute bottom-20 left-[43%] border border-black hover:bg-[#0005] hover:text-white">Register Now</NavLink>
              </div>
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
