import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { getCricketScores } from '../../api/userapis';

const CricketScore = () => {
  const [liveCricket, setLiveCricket] = useState([]);
  const [completedCricket, setCompletedCricket] = useState([]);
  // const [loading, setLoading] = useState(true);

  const printScorecard = async () => {
    try {
      const result = await getCricketScores();
      setLiveCricket(result.data.filter((item) => item.completed === "no").reverse());
      setCompletedCricket(result.data.filter((item) => item.completed === "yes").reverse());
    } catch (error) {
      console.error("Score fetch failed", error);
    }
  };

  useEffect(() => {
    printScorecard();
    const interval = setInterval(printScorecard, 60000); // Auto-refresh every minute
    return () => clearInterval(interval);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  const ScoreCard = ({ score, isLive }) => (
    <motion.div
      variants={cardVariants}
      layout
      className={`w-full max-w-[440px] bg-gradient-to-br ${
        isLive ? 'from-white/10 to-red-900/20' : 'from-white/10 to-gray-900/40'
      } backdrop-blur-lg text-white rounded-2xl shadow-2xl p-6 border border-white/10 relative overflow-hidden`}
    >
      {/* Decorative background glow for live matches */}
      {isLive && (
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 blur-3xl rounded-full" />
      )}

      <h2 className={`text-center text-sm font-black uppercase tracking-widest mb-6 ${
        isLive ? 'text-yellow-400' : 'text-green-400'
      }`}>
        {score.match_type}
      </h2>

      <div className="flex justify-between items-start gap-2 mb-6">
        {/* TEAM 1 */}
        <div className="flex flex-col items-center flex-1">
          <div className="relative">
            <img
              src={score.team1_logo}
              alt={score.team1_name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-md"
            />
          </div>
          <span className="font-bold text-sm mt-3 text-center h-10 line-clamp-2">{score.team1_name}</span>
          <div className="flex flex-col items-center mt-2">
            <span className="text-2xl font-black">{score.team1_run}/{score.team1_wicket_loss}</span>
            <span className="text-[10px] text-gray-400 font-mono uppercase">Overs: {score.team1_over_played}</span>
          </div>
        </div>

        {/* VS Divider */}
        <div className="flex flex-col items-center pt-4">
          <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold text-gray-400">
            VS
          </div>
        </div>

        {/* TEAM 2 */}
        <div className="flex flex-col items-center flex-1">
          <div className="relative">
            <img
              src={score.team2_logo}
              alt={score.team2_name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-md"
            />
          </div>
          <span className="font-bold text-sm mt-3 text-center h-10 line-clamp-2">{score.team2_name}</span>
          <div className="flex flex-col items-center mt-2">
            <span className="text-2xl font-black">{score.team2_run}/{score.team2_wicket_loss}</span>
            <span className="text-[10px] text-gray-400 font-mono uppercase">Overs: {score.team2_over_played}</span>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className={`flex items-center justify-center gap-2 pt-4 border-t border-white/5 ${
        isLive ? 'text-red-400' : 'text-gray-400'
      }`}>
        {isLive ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold uppercase animate-pulse">Live – In Progress</span>
          </>
        ) : (
          <span className="text-xs font-bold uppercase tracking-tighter italic">Match Finished</span>
        )}
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      className="p-4 md:p-8 space-y-12"
    >
      {/* Live Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-black text-white italic">LIVE <span className="text-red-500 underline decoration-2 underline-offset-8">SCOREBOARD</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-red-500/50 to-transparent"></div>
        </div>
        
        <div className="flex flex-wrap justify-center lg:justify-start gap-8">
          <AnimatePresence mode="popLayout">
            {liveCricket.length > 0 ? (
              liveCricket.map((score, index) => (
                <ScoreCard key={score._id || index} score={score} isLive={true} />
              ))
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 italic">No live cricket matches at the moment.</motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Completed Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-black text-white italic">RECENT <span className="text-gray-500 underline decoration-2 underline-offset-8">RESULTS</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-500/50 to-transparent"></div>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start gap-8">
          {completedCricket.length > 0 ? (
            completedCricket.map((score, index) => (
              <ScoreCard key={score._id || index} score={score} isLive={false} />
            ))
          ) : (
            <p className="text-gray-500 italic">No recent results found.</p>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default CricketScore;