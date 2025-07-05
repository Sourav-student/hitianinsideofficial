import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getCricketScores } from '../../../api/userapis';

const CricketPanel = () => {
 
  const [cricket, setCricket] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  useEffect(() => {
    const printScorecard = async () => {
      const result = await getCricketScores();
      //Separated live and finished matches
      setCricket(result.data);
    }

    printScorecard();

  }, [])

  return (
    <>
      <div className='text-xl text-[#ffb5b5] text-left px-8 font-semibold'>Matches</div>
      <div className='m-3 flex flex-wrap gap-5'>
        {
          (cricket.length > 0) && cricket.map((score, index) => (
            <div className="w-[300px] sm:w-[350px] bg-white/10 text-white rounded-xl shadow-md p-4 my-2" key={index}>
              <h2>{score.matchType}</h2>
              <div className="flex justify-between items-center border-b border-gray-400 pb-2 mb-2">
                <div className="flex flex-col">
                  <div className='grid grid-cols-2 items-center p-1'>
                    <img src={score.team1Logo} alt={score.team1Name}
                      className='w-12 rounded-full' />
                    <span className="font-bold text-lg">{score.team1Name}</span>
                  </div>
                  <span className="text-sm">Runs: {score.team1Run} / {score.team1WicketLoss}</span>
                  <span className="text-sm">Overs: {score.team1OverPlayed}</span>
                </div>

                <div className="text-center text-lg text-gray-300">vs</div>

                <div className="flex flex-col items-end">
                  <div className='grid grid-cols-2 items-center p-1'>
                    <span className="font-bold text-lg">{score.team2Name}</span>
                    <img src={score.team2Logo} alt={score.team2Name}
                      className='w-12 rounded-full' />
                  </div>
                  <span className="text-sm">Runs: {score.team2Run} / {score.team2WicketLoss}</span>
                  <span className="text-sm">Overs: {score.team2OverPlayed}</span>
                </div>
              </div>
              <p className="text-yellow-300 text-sm text-center">Ongoing Match</p>
            </div>
          ))
        }
        {
          (cricket.length === 0) && <p className='text-2xl text-[#ffb5b5]'>Currently no matches</p>
        }
      </div>
    </>
  )
}

export default CricketPanel;
