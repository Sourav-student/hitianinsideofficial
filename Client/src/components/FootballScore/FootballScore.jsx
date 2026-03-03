import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { getFootballScores } from '../../api/userapis';

const FootballScore = () => {
  const [liveFootball, setLiveFootball] = useState([]);
  const [completedFootball, setCompletedFootball] = useState([]);

  const printScorecard = async () => {
    try {
      const result = await getFootballScores();
      setLiveFootball(result.data.filter((item) => item.completed === "no").reverse());
      setCompletedFootball(result.data.filter((item) => item.completed === "yes").reverse());
    } catch (error) {
      console.error("Failed to fetch football scores", error);
    }
  };

  useEffect(() => {
    printScorecard();
    // Refresh every 45 seconds for live updates
    const interval = setInterval(printScorecard, 45000);
    return () => clearInterval(interval);
  }, []);

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const cardVars = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: "spring", stiffness: 100, damping: 12 } 
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  const MatchCard = ({ score, isLive }) => (
    <motion.div
      variants={cardVars}
      layout
      className={`w-full max-w-[430px] text-white p-6 rounded-3xl backdrop-blur-xl border transition-all duration-500 ${
        isLive 
        ? "bg-gradient-to-br from-[#4a0d16] to-[#1a0306] border-red-500/40 shadow-[0_10px_30px_-10px_rgba(220,38,38,0.5)]" 
        : "bg-gradient-to-br from-[#202020] to-[#0a0a0a] border-white/10 shadow-2xl"
      }`}
    >
      {/* Match Header */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-black tracking-[0.2em] text-red-400 uppercase">
          {score.match_type}
        </span>
        {isLive && (
          <div className="flex items-center gap-2 bg-red-600/20 px-3 py-1 rounded-full border border-red-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-bold text-red-500 uppercase">Live</span>
          </div>
        )}
      </div>

      {/* Score Display */}
      <div className="flex justify-between items-center gap-4">
        {/* Team 1 */}
        <div className="flex flex-col items-center flex-1">
          <motion.img
            whileHover={{ scale: 1.1, rotate: 5 }}
            src={score.team1_logo}
            alt={score.team1_name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/10 p-1 bg-black/20"
          />
          <h3 className="text-sm font-bold mt-3 text-center line-clamp-1">{score.team1_name}</h3>
        </div>

        {/* Center Score */}
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            {score.team1_goals}<span className="text-red-500 mx-1">:</span>{score.team2_goals}
          </div>
          <div className="mt-2 text-[10px] font-medium text-gray-500 uppercase tracking-widest">
            Full Time
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col items-center flex-1">
          <motion.img
            whileHover={{ scale: 1.1, rotate: -5 }}
            src={score.team2_logo}
            alt={score.team2_name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/10 p-1 bg-black/20"
          />
          <h3 className="text-sm font-bold mt-3 text-center line-clamp-1">{score.team2_name}</h3>
        </div>
      </div>

      {/* Footer Status */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <p className={`text-center text-xs font-bold uppercase tracking-widest ${
          isLive ? "text-green-400 animate-pulse" : "text-gray-500"
        }`}>
          {isLive ? "Second Half — In Progress" : "Match Concluded"}
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-16">
      {/* Live Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-black text-white italic">LIVE <span className="text-red-600 underline decoration-2 underline-offset-8">FOOTBALL</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-red-600/50 to-transparent"></div>
        </div>
        
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center lg:justify-start gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {liveFootball.length > 0 ? (
              liveFootball.map((score, index) => (
                <MatchCard key={score._id || index} score={score} isLive={true} />
              ))
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 italic">No live football matches currently.</motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* History Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-black text-white italic">RECENT <span className="text-gray-600 underline decoration-2 underline-offset-8">RESULTS</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-600/50 to-transparent"></div>
        </div>

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center lg:justify-start gap-8"
        >
          {completedFootball.length > 0 ? (
            completedFootball.map((score, index) => (
              <MatchCard key={score._id || index} score={score} isLive={false} />
            ))
          ) : (
            <p className="text-gray-500 italic">No historical records found.</p>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default FootballScore;