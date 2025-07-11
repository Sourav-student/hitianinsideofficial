import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getCricketScores } from '../../api/userapis';

const CricketScore = () => {

  const [liveCricket, setLiveCricket] = useState([]);
  const [completedCricket, setCompletedCricket] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  useEffect(() => {
    const printScorecard = async () => {
      const result = await getCricketScores();
      //Separated live and finished matches
      setLiveCricket(result.data.filter((item) => item.completed === "no"));
      setCompletedCricket(result.data.filter((item) => item.completed === "yes"))
    }

    printScorecard();

  }, [])

  return (
    <>
      <p className='text-xl text-[#ffb5b5] text-left font-semibold p-1'>Live Matches</p>
      <div className='m-3 flex flex-wrap gap-5'>
        {
          (liveCricket.length > 0) && liveCricket.map((score, index) => (
            <div className="w-[300px] sm:w-[350px] bg-white/10 text-white rounded-xl shadow-md p-4 my-2" key={index} data-aos="fade-up">
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
          (liveCricket.length === 0) && <p className='text-sm text-[#ffb5b5]'>Currently no live matches</p>
        }
      </div>
      <p className='text-xl text-[#ffb5b5] text-left font-semibold p-1'>Completed Matches</p>
      <div className='m-3 flex flex-wrap gap-5'>
        {
          (completedCricket.length > 0) && completedCricket.map((score, index) => (
            <div className="w-[300px] sm:w-[350px] bg-white/10 text-white rounded-xl shadow-md p-4 my-2" key={index} data-aos="fade-up">
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
              <p className="text-red-200 text-sm text-center">Completed</p>
            </div>
          ))
        }
        {
          (completedCricket.length === 0) && <p className='text-sm text-[#ffb5b5]'>Currently no live matches</p>
        }
      </div>
    </>
  )
}

export default CricketScore
