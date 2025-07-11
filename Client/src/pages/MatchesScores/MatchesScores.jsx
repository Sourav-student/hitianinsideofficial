import React, { useState } from 'react';
import CricketScore from '../../components/CricketScore/CricketScore';
import FootballScore from '../../components/FootballScore/FootballScore';
import VollyballScore from '../../components/VollyballScore/VollyballScore';
import BasketballScore from '../../components/BasketballScore/BasketballScore'

const MatchesScores = () => {

  const activeStyle = 'cursor-pointer text-[#ffb5b5] relative pb-2 after:absolute after:bottom-0 after:right-0 after:w-[60%] after:h-[3px] after:bg-[#ffb5b5]';

  const [isCricket, setIsCricket] = useState(true);
  const [isFootball, setIsFootball] = useState(false);
  const [isBasketball, setIsBasketball] = useState(false);
  const [isVollyball, setIsVollyball] = useState(false);

  const handleCricket = () => {
    setIsCricket(true);
    setIsBasketball(false);
    setIsFootball(false);
    setIsVollyball(false);
  }

  const handleBasketball = () => {
    setIsCricket(false);
    setIsBasketball(true);
    setIsFootball(false);
    setIsVollyball(false);
  }

  const handleFootball = () => {
    setIsCricket(false);
    setIsBasketball(false);
    setIsFootball(true);
    setIsVollyball(false);
  }

  const handleVollyball = () => {
    setIsCricket(false);
    setIsBasketball(false);
    setIsFootball(false);
    setIsVollyball(true);
  }

  return (
    <>
      <div className='text-white text-xl font-semibold py-3 space-x-4 min-[400px]:space-x-8 sm:space-x-16 md:space-x-36 max-sm:text-lg'>
        <span
          className={isCricket ? activeStyle : 'cursor-pointer'}
          onClick={handleCricket}>Cricket</span>
        <span
          className={isFootball ? activeStyle : 'cursor-pointer'}
          onClick={handleFootball}>Football</span>
        <span
          className={isVollyball ? activeStyle : 'cursor-pointer'}
          onClick={handleVollyball}>Vollyball</span>
        <span
          className={isBasketball ? activeStyle : 'cursor-pointer'}
          onClick={handleBasketball}>Basketball</span>
      </div>
      <div>
        {
          isCricket && <CricketScore />
        }
        {
          isFootball && <FootballScore/>
        }
        {
          isVollyball && <VollyballScore/>
        }
        {
          isBasketball && <BasketballScore/>
        }
      </div>
    </>
  )
}

export default MatchesScores;