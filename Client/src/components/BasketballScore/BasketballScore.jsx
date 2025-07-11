import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getBasketballScores } from '../../api/userapis';

const BasketballScore = () => {

  const [liveBasketball, setLiveBasketball] = useState([]);
  const [completedBasketball, setCompletedBasketball] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  useEffect(() => {
    const printScorecard = async () => {
      const result = await getBasketballScores();
      //Separated live and finished matches
      setLiveBasketball(result.data.filter((item) => item.completed === "no"));
      setCompletedBasketball(result.data.filter((item) => item.completed === "yes"))
    }

    printScorecard();
  }, [])

  return (
    <>
      <p className='text-xl text-[#ffb5b5] text-left font-semibold p-1'>Live Matches</p>
      <div className='m-3 flex flex-wrap gap-5'>
        {
          (liveBasketball.length > 0) && liveBasketball.map((score, index) => (
            <div
              className="w-[320px] sm:w-[380px] bg-white/10 text-white rounded-2xl shadow-lg p-4 my-4 backdrop-blur-md"
              key={index}
              data-aos="fade-up"
            >
              <h2 className="text-center text-lg font-semibold text-orange-300 mb-3">
                {score.matchType}
              </h2>

              <div className="flex justify-between items-center border-b border-gray-400 pb-3 mb-3">
                <div className="flex flex-col items-center w-1/3">
                  <img
                    src={score.team1Logo}
                    alt={score.team1Name}
                    className="w-14 h-14 object-cover rounded-full shadow"
                  />
                  <span className="font-bold mt-2">{score.team1Name}</span>
                  <span className="mt-1 text-sm text-yellow-300">
                    Score: {score.team1Score}
                  </span>
                </div>
                <div className="text-center w-1/3">
                  <span className="text-3xl font-bold text-white">
                    {score.team1Score} - {score.team2Score}
                  </span>
                </div>
                <div className="flex flex-col items-center w-1/3">
                  <img
                    src={score.team2Logo}
                    alt={score.team2Name}
                    className="w-14 h-14 object-cover rounded-full shadow"
                  />
                  <span className="font-bold mt-2">{score.team2Name}</span>
                  <span className="mt-1 text-sm text-yellow-300">
                    Score: {score.team2Score}
                  </span>
                </div>
              </div>
              <p className="text-sm text-center font-medium text-red-200"
              >Ongoing Match</p>
            </div>
          ))
        }
        {
          (liveBasketball.length === 0) && <p className='text-sm text-[#ffb5b5]'>Currently no live matches</p>
        }
      </div>
      <p className='text-xl text-[#ffb5b5] text-left font-semibold p-1'>Completed Matches</p>
      <div className='m-3 flex flex-wrap gap-5'>
        {
          (completedBasketball.length > 0) && completedBasketball.map((score, index) => (
            <div
              className="w-[320px] sm:w-[380px] bg-white/10 text-white rounded-2xl shadow-lg p-4 my-4 backdrop-blur-md"
              key={index}
              data-aos="fade-up"
            >
              <h2 className="text-center text-lg font-semibold text-orange-300 mb-3">
                {score.matchType}
              </h2>

              <div className="flex justify-between items-center border-b border-gray-400 pb-3 mb-3">
                <div className="flex flex-col items-center w-1/3">
                  <img
                    src={score.team1Logo}
                    alt={score.team1Name}
                    className="w-14 h-14 object-cover rounded-full shadow"
                  />
                  <span className="font-bold mt-2">{score.team1Name}</span>
                  <span className="mt-1 text-sm text-yellow-300">
                    Score: {score.team1Score}
                  </span>
                </div>

                <div className="text-center w-1/3">
                  <span className="text-3xl font-bold text-white">
                    {score.team1Score} - {score.team2Score}
                  </span>
                </div>

                <div className="flex flex-col items-center w-1/3">
                  <img
                    src={score.team2Logo}
                    alt={score.team2Name}
                    className="w-14 h-14 object-cover rounded-full shadow"
                  />
                  <span className="font-bold mt-2">{score.team2Name}</span>
                  <span className="mt-1 text-sm text-yellow-300">
                    Score: {score.team2Score}
                  </span>
                </div>
              </div>

              <p className="text-sm text-center font-medium text-green-400">Match Completed</p>
            </div>
          ))
        }
        {
          (completedBasketball.length === 0) && <p className='text-sm text-[#ffb5b5]'>Currently no live matches</p>
        }
      </div>
    </>
  )
}

export default BasketballScore;