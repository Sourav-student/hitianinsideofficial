import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getVolleyballScores } from '../../api/userapis';

const VolleyballScore = () => {

  const [liveVolleyball, setLiveVolleyball] = useState([]);
  const [completedVolleyball, setCompletedVolleyball] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  useEffect(() => {
    const printScorecard = async () => {
      const result = await getVolleyballScores();
      //Separated live and finished matches
      setLiveVolleyball(result.data.filter((item) => item.completed === "no").reverse());
      setCompletedVolleyball(result.data.filter((item) => item.completed === "yes").reverse())
    }

    printScorecard();
  }, [])

  return (
    <>
      <p className='text-xl text-[#ffb5b5] text-left font-semibold p-1'>Live Matches</p>
      <div className='m-3 flex flex-wrap gap-5'>
        {
          (liveVolleyball.length > 0) && liveVolleyball.map((score, index) => (
            <div
              className="w-[320px] sm:w-[380px] bg-white/10 text-white rounded-2xl shadow-lg p-4 my-4 backdrop-blur-md"
              key={index}
              data-aos="fade-up"
            >
              <h2 className="text-center text-lg font-semibold text-orange-300 mb-3">
                {score.match_type}
              </h2>

              <div className="flex justify-between items-center border-b border-gray-400 pb-3 mb-3">
                <div className="flex flex-col items-center w-1/3">
                  <img
                    src={score.team1_logo}
                    alt={score.team1_name}
                    className="w-14 h-14 object-cover rounded-full shadow"
                  />
                  <span className="font-bold mt-2">{score.team1_name}</span>
                  <span className="mt-1 text-sm text-yellow-300">
                    Score: {score.team1_score}
                  </span>
                </div>
                <div className="text-center w-1/3">
                  <span className="text-3xl font-bold text-white">
                    {score.team1_score} - {score.team2_score}
                  </span>
                </div>
                <div className="flex flex-col items-center w-1/3">
                  <img
                    src={score.team2_logo}
                    alt={score.team2_name}
                    className="w-14 h-14 object-cover rounded-full shadow"
                  />
                  <span className="font-bold mt-2">{score.team2_name}</span>
                  <span className="mt-1 text-sm text-yellow-300">
                    Score: {score.team2_score}
                  </span>
                </div>
              </div>
              <p className="text-sm text-center font-medium text-red-200"
              >Ongoing Match</p>
            </div>
          ))
        }
        {
          (liveVolleyball.length === 0) && <p className='text-sm text-[#ffb5b5]'>Currently no live matches</p>
        }
      </div>
      <p className='text-xl text-[#ffb5b5] text-left font-semibold p-1'>Completed Matches</p>
      <div className='m-3 flex flex-wrap gap-5'>
        {
          (completedVolleyball.length > 0) && completedVolleyball.map((score, index) => (
            <div
              className="w-[320px] sm:w-[380px] bg-white/10 text-white rounded-2xl shadow-lg p-4 my-4 backdrop-blur-md"
              key={index}
              data-aos="fade-up"
            >
              <h2 className="text-center text-lg font-semibold text-orange-300 mb-3">
                {score.match_type}
              </h2>

              <div className="flex justify-between items-center border-b border-gray-400 pb-3 mb-3">
                <div className="flex flex-col items-center w-1/3">
                  <img
                    src={score.team1_logo}
                    alt={score.team1_name}
                    className="w-14 h-14 object-cover rounded-full shadow"
                  />
                  <span className="font-bold mt-2">{score.team1_name}</span>
                  <span className="mt-1 text-sm text-yellow-300">
                    Score: {score.team1_score}
                  </span>
                </div>

                <div className="text-center w-1/3">
                  <span className="text-3xl font-bold text-white">
                    {score.team1_score} - {score.team2_score}
                  </span>
                </div>

                <div className="flex flex-col items-center w-1/3">
                  <img
                    src={score.team2_logo}
                    alt={score.team2_name}
                    className="w-14 h-14 object-cover rounded-full shadow"
                  />
                  <span className="font-bold mt-2">{score.team2_name}</span>
                  <span className="mt-1 text-sm text-yellow-300">
                    Score: {score.team2_score}
                  </span>
                </div>
              </div>

              <p className="text-sm text-center font-medium text-green-400">Match Completed</p>
            </div>
          ))
        }
        {
          (completedVolleyball.length === 0) && <p className='text-sm text-[#ffb5b5]'>Currently no live matches</p>
        }
      </div>
    </>
  )
}

export default VolleyballScore;