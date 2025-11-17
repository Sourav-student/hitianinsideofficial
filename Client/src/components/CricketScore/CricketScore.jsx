import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getCricketScores } from '../../api/userapis';
import { motion } from "motion/react";

const CricketScore = () => {

  const [liveCricket, setLiveCricket] = useState([]);
  const [completedCricket, setCompletedCricket] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const printScorecard = async () => {
      const result = await getCricketScores();

      setLiveCricket(result.data.filter((item) => item.completed === "no"));
      setCompletedCricket(result.data.filter((item) => item.completed === "yes"));
    };

    printScorecard();
  }, []);

  return (
    <>
      {/* Live Matches */}
      <p className='text-xl text-[#ffb5b5] font-semibold p-1'>Live Matches</p>

      <div className='m-3 flex flex-wrap justify-center gap-6'>
        {
          liveCricket.length > 0 ? liveCricket.map((score, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="w-full max-w-[420px] bg-white/10 backdrop-blur-md 
              text-white rounded-xl shadow-lg p-4 border border-white/10"
            >

              {/* Match Type */}
              <h2 className="text-center text-lg font-bold tracking-wide text-yellow-300">
                {score.match_type}
              </h2>

              {/* Scoreboard Container */}
              <div className="grid grid-cols-3 items-center my-4">

                {/* TEAM 1 */}
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={score.team1_logo}
                    alt={score.team1_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <span className="font-semibold text-center">{score.team1_name}</span>
                  <span className="text-lg font-bold">{score.team1_run}/{score.team1_wicket_loss}</span>
                  <span className="text-xs text-gray-300">Ov: {score.team1_over_played}</span>
                </div>

                {/* VS Center */}
                <div className="flex flex-col justify-center items-center">
                  <span className="text-2xl font-extrabold text-gray-300">VS</span>
                </div>

                {/* TEAM 2 */}
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={score.team2_logo}
                    alt={score.team2_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <span className="font-semibold text-center">{score.team2_name}</span>
                  <span className="text-lg font-bold">{score.team2_run}/{score.team2_wicket_loss}</span>
                  <span className="text-xs text-gray-300">Ov: {score.team2_over_played}</span>
                </div>

              </div>

              {/* Live Badge with Pulse */}
              <p className="text-yellow-300 text-sm text-center animate-pulse font-semibold">
                🟢 LIVE – Ongoing Match
              </p>
            </motion.div>
          ))
            :
            <p className='text-sm text-[#ffb5b5]'>Currently no live matches</p>
        }
      </div>


      {/* Completed Matches */}
      <p className='text-xl text-[#ffb5b5] font-semibold p-1'>Completed Matches</p>

      <div className='m-3 flex flex-wrap justify-center gap-6'>
        {
          completedCricket.length > 0 ? completedCricket.map((score, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="w-full max-w-[420px] bg-white/10 backdrop-blur-md 
              text-white rounded-xl shadow-lg p-4 border border-white/10"
            >

              <h2 className="text-center text-lg font-bold tracking-wide text-green-300">
                {score.match_type}
              </h2>

              <div className="grid grid-cols-3 items-center my-4">

                {/* TEAM 1 */}
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={score.team1_logo}
                    alt={score.team1_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <span className="font-semibold text-center">{score.team1_name}</span>
                  <span className="text-lg font-bold">{score.team1_run}/{score.team1_wicket_loss}</span>
                  <span className="text-xs text-gray-300">Ov: {score.team1_over_played}</span>
                </div>

                {/* VS */}
                <div className="flex flex-col justify-center items-center">
                  <span className="text-2xl font-extrabold text-gray-300">VS</span>
                </div>

                {/* TEAM 2 */}
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={score.team2_logo}
                    alt={score.team2_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <span className="font-semibold text-center">{score.team2_name}</span>
                  <span className="text-lg font-bold">{score.team2_run}/{score.team2_wicket_loss}</span>
                  <span className="text-xs text-gray-300">Ov: {score.team2_over_played}</span>
                </div>

              </div>

              {/* Completed Badge */}
              <p className="text-red-300 text-sm text-center font-semibold">
                🔴 Match Completed
              </p>
            </motion.div>
          ))
            :
            <p className='text-sm text-[#ffb5b5]'>No completed matches</p>
        }
      </div>
    </>
  );
};

export default CricketScore;