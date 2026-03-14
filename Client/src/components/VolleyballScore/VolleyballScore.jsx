import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getVolleyballScores } from '../../api/userapis';

const VolleyballScore = () => {
  const [liveVolleyball, setLiveVolleyball] = useState([]);
  const [completedVolleyball, setCompletedVolleyball] = useState([]);

  const printScorecard = async () => {
    try {
      const result = await getVolleyballScores();
      setLiveVolleyball(result.data.filter((item) => item.completed === "no").reverse());
      setCompletedVolleyball(result.data.filter((item) => item.completed === "yes").reverse());
    } catch (error) {
      console.error("Score fetch failed", error);
    }
  };

  useEffect(() => {
    printScorecard();
    const interval = setInterval(printScorecard, 45000); // Auto-refresh every 45s
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  const MatchCard = ({ score, isLive }) => (
    <motion.div
      variants={cardVariants}
      layout
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`w-full max-w-[380px] rounded-3xl p-6 border backdrop-blur-md relative overflow-hidden transition-shadow duration-300 bg-gradient-to-br ${
        isLive ? 'from-white/10 to-red-900/20' : 'from-white/10 to-gray-900/40'
      }`}
    >
      {/* Match Context Header */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          {score.match_type}
        </span>
        {isLive && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-bold text-blue-600 uppercase">Live</span>
          </div>
        )}
      </div>

      {/* Main Score Area */}
      <div className="flex items-center justify-between gap-2">
        {/* Team 1 */}
        <div className="flex flex-col items-center flex-1">
          <img
            src={score.team1_logo}
            alt={score.team1_name}
            className="w-16 h-16 rounded-2xl object-cover bg-white p-1 border border-slate-100 shadow-sm"
          />
          <span className="font-bold text-slate-800 mt-3 text-sm text-center h-10 line-clamp-2">
            {score.team1_name}
          </span>
          <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded mt-1">
            {score.team1_score}
          </span>
        </div>

        {/* VS / Divider Area */}
        <div className="flex flex-col items-center justify-center px-2">
          <div className="text-3xl font-black text-slate-900 tracking-tighter">
            {score.team1_score}<span className="text-slate-300 mx-1">:</span>{score.team2_score}
          </div>
          <div className="h-8 w-[1px] bg-slate-200 my-2"></div>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col items-center flex-1">
          <img
            src={score.team2_logo}
            alt={score.team2_name}
            className="w-16 h-16 rounded-2xl object-cover bg-white p-1 border border-slate-100 shadow-sm"
          />
          <span className="font-bold text-slate-800 mt-3 text-sm text-center h-10 line-clamp-2">
            {score.team2_name}
          </span>
          <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded mt-1">
            {score.team2_score}
          </span>
        </div>
      </div>

      {/* Footer Status Badge */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <p className={`text-[11px] font-bold text-center uppercase tracking-widest ${
          isLive ? "text-blue-600 animate-pulse" : "text-slate-400"
        }`}>
          {isLive ? "Game in Progress" : "Final Standings"}
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-4 md:p-10 space-y-12 max-w-7xl mx-auto">
      {/* Live Matches Section */}
      <section>
        <div className="flex items-center gap-4 mb-8 uppercase italic font-extrabold">
          <h2 className="text-2xl text-white">Live <span className="text-red-600 underline decoration-2 underline-offset-8">Volleyball</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-400/50 to-transparent"></div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center sm:justify-items-start"
        >
          <AnimatePresence mode='popLayout'>
            {liveVolleyball.length > 0 ? (
              liveVolleyball.map((score, index) => (
                <MatchCard key={score._id || index} score={score} isLive={true} />
              ))
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-400 italic">No games currently active.</motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Completed Matches Section */}
      <section>
        <div className="flex items-center gap-4 mb-8 uppercase font-extrabold italic">
          <h2 className="text-2xl text-white">Recent <span className="text-slate-500 underline decoration-2 underline-offset-8">Results</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-500/50 to-transparent"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center sm:justify-items-start"
        >
          {completedVolleyball.length > 0 ? (
            completedVolleyball.map((score, index) => (
              <MatchCard key={score._id || index} score={score} isLive={false} />
            ))
          ) : (
            <p className="text-slate-500 italic">No match history found.</p>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default VolleyballScore;