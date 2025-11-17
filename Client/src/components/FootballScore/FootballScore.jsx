import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getFootballScores } from '../../api/userapis';
import { motion } from "motion/react";

const FootballScore = () => {

  const [liveFootball, setLiveFootball] = useState([]);
  const [completedFootball, setCompletedFootball] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const printScorecard = async () => {
      const result = await getFootballScores();
      setLiveFootball(result.data.filter((item) => item.completed === "no"));
      setCompletedFootball(result.data.filter((item) => item.completed === "yes"));
    };
    printScorecard();
  }, []);

  return (
    <>
      {/* Live Matches */}
      <p className='text-xl text-[#ffb5b5] font-semibold p-1'>Live Matches</p>

      <div className='m-3 flex flex-wrap justify-center gap-8'>
        {
          liveFootball.length > 0 ? liveFootball.map((score, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full max-w-[430px]
              bg-gradient-to-b from-[#4a0d16]/90 to-[#28060b]/90
              backdrop-blur-xl rounded-2xl shadow-[0_0_18px_#b00020]
              border border-[#ff5c77]/30 p-5 text-white"
            >

              {/* Match Type */}
              <h2 className="text-center text-xl font-bold tracking-wider 
                text-[#ffbbc4] drop-shadow-[0_0_6px_#ff6e80]">
                ⚽ {score.match_type}
              </h2>

              {/* Scoreboard */}
              <div className="grid grid-cols-3 items-center mt-5 mb-4 
                pb-4 border-b border-white/20">

                {/* TEAM 1 */}
                <div className="flex flex-col items-center gap-2">
                  <motion.img
                    src={score.team1_logo}
                    alt={score.team1_name}
                    className="w-16 h-16 rounded-full object-cover 
                    border-2 border-[#ff8a9b] shadow-[0_0_10px_#ff8a9b]"
                    whileHover={{ scale: 1.08 }}
                  />
                  <span className="font-semibold">{score.team1_name}</span>
                  <span className="text-sm text-[#ff7a8f]">
                    Goals: {score.team1_goals}
                  </span>
                </div>

                {/* MID SCORE */}
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-extrabold tracking-wide 
                    text-[#ffe3e7] drop-shadow-[0_0_10px_#ff8fa1]">
                    {score.team1_goals} - {score.team2_goals}
                  </span>
                </div>

                {/* TEAM 2 */}
                <div className="flex flex-col items-center gap-2">
                  <motion.img
                    src={score.team2_logo}
                    alt={score.team2_name}
                    className="w-16 h-16 rounded-full object-cover 
                    border-2 border-[#ff8a9b] shadow-[0_0_10px_#ff8a9b]"
                    whileHover={{ scale: 1.08 }}
                  />
                  <span className="font-semibold">{score.team2_name}</span>
                  <span className="text-sm text-[#ff7a8f]">
                    Goals: {score.team2_goals}
                  </span>
                </div>

              </div>

              {/* Live Badge */}
              <p className="text-center text-sm font-semibold 
                text-green-300 animate-pulse drop-shadow-[0_0_6px_#00ff91]">
                🟢 LIVE — Match in Progress
              </p>

            </motion.div>
          ))
            :
            <p className='text-sm text-[#ffb5b5]'>Currently no live matches</p>
        }
      </div>


      {/* Completed Matches */}
      <p className='text-xl text-[#ffb5b5] font-semibold p-1'>Completed Matches</p>

      <div className='m-3 flex flex-wrap justify-center gap-8'>
        {
          completedFootball.length > 0 ? completedFootball.map((score, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full max-w-[430px]
              bg-gradient-to-b from-[#2d0303]/90 to-[#170001]/90
              backdrop-blur-xl rounded-2xl shadow-[0_0_18px_#b00020]
              border border-[#ff6176]/30 p-5 text-white"
            >

              <h2 className="text-center text-xl font-bold tracking-wider 
                text-[#ffc7cd] drop-shadow-[0_0_6px_#ff7a8f]">
                ⚽ {score.match_type}
              </h2>

              <div className="grid grid-cols-3 items-center mt-5 mb-4 pb-4 border-b border-white/20">

                {/* TEAM 1 */}
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={score.team1_logo}
                    alt={score.team1_name}
                    className="w-16 h-16 rounded-full object-cover border-2 
                    border-[#ff8a9b] shadow-[0_0_10px_#ff8a9b]"
                  />
                  <span className="font-semibold">{score.team1_name}</span>
                  <span className="text-sm text-[#ff7a8f]">
                    Goals: {score.team1_goals}
                  </span>
                </div>

                {/* SCORE */}
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-extrabold tracking-wide 
                    text-[#ffe3e7] drop-shadow-[0_0_10px_#ff8fa1]">
                    {score.team1_goals} - {score.team2_goals}
                  </span>
                </div>

                {/* TEAM 2 */}
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={score.team2_logo}
                    alt={score.team2_name}
                    className="w-16 h-16 rounded-full object-cover border-2 
                    border-[#ff8a9b] shadow-[0_0_10px_#ff8a9b]"
                  />
                  <span className="font-semibold">{score.team2_name}</span>
                  <span className="text-sm text-[#ff7a8f]">
                    Goals: {score.team2_goals}
                  </span>
                </div>

              </div>

              {/* Completed Badge */}
              <p className="text-sm text-center font-semibold text-red-300 
                drop-shadow-[0_0_6px_#ff4d4d]">
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

export default FootballScore;