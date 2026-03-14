import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getBasketballScores } from '../../api/userapis';

const BasketballScore = () => {
  const [liveBasketball, setLiveBasketball] = useState([]);
  const [completedBasketball, setCompletedBasketball] = useState([]);
  // const [loading, setLoading] = useState(true);

  const printScorecard = async () => {
    try {
      const result = await getBasketballScores();
      setLiveBasketball(result.data.filter((item) => item.completed === "no").reverse());
      setCompletedBasketball(result.data.filter((item) => item.completed === "yes").reverse());
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  }

  useEffect(() => {
    printScorecard();
    // Optional: Set up polling to refresh scores every 30 seconds
    const interval = setInterval(printScorecard, 30000);
    return () => clearInterval(interval);
  }, []);

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const cardVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const ScoreCard = ({ score, isLive }) => (
    <motion.div
      variants={cardVars}
      layout
      whileHover={{ scale: 1.02 }}
      className={`relative w-full max-w-[400px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl transition-all ${
        isLive ? 'ring-1 ring-red-500/30' : ''
      }`}
    >
      {isLive && (
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Live</span>
        </div>
      )}

      <h2 className="text-center text-xs font-bold text-orange-400/80 uppercase tracking-widest mb-6">
        {score.matchType || "Tournament Match"}
      </h2>

      <div className="flex justify-between items-center gap-2">
        {/* Team 1 */}
        <div className="flex flex-col items-center flex-1">
          <motion.img
            whileHover={{ rotate: 5 }}
            src={score.team1Logo}
            alt={score.team1Name}
            className="w-16 h-16 object-contain rounded-full bg-black/20 p-2 border border-white/5"
          />
          <span className="font-bold text-sm mt-3 text-center line-clamp-1">{score.team1Name}</span>
          <span className="text-xs text-gray-400 mt-1">Home</span>
        </div>

        {/* Score Divider */}
        <div className="flex flex-col items-center justify-center px-4">
          <div className="text-3xl md:text-4xl font-black text-white tracking-tighter">
            {score.team1Score} <span className="text-gray-500 text-xl mx-1">:</span> {score.team2Score}
          </div>
          <div className="mt-2 px-3 py-1 bg-white/10 rounded-full text-[10px] text-gray-300 font-medium">
            VS
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col items-center flex-1">
          <motion.img
            whileHover={{ rotate: -5 }}
            src={score.team2Logo}
            alt={score.team2Name}
            className="w-16 h-16 object-contain rounded-full bg-black/20 p-2 border border-white/5"
          />
          <span className="font-bold text-sm mt-3 text-center line-clamp-1">{score.team2Name}</span>
          <span className="text-xs text-gray-400 mt-1">Away</span>
        </div>
      </div>

      <div className={`mt-6 pt-4 border-t border-white/5 text-center text-xs font-semibold ${
        isLive ? 'text-red-400 italic animate-pulse' : 'text-green-500'
      }`}>
        {isLive ? "Second Quarter - Ongoing" : "Final Result"}
      </div>
    </motion.div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
      {/* Live Section */}
      <section>
        <div className="flex items-center font-extrabold italic gap-4 mb-6">
          <h2 className="text-2xl text-white">LIVE <span className="text-red-500 underline decoration-2 underline-offset-8 uppercase">Matches</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-red-500/50 to-transparent"></div>
        </div>
        
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-6 justify-center lg:justify-start"
        >
          <AnimatePresence>
            {liveBasketball.length > 0 ? (
              liveBasketball.map((score, index) => (
                <ScoreCard key={score._id || index} score={score} isLive={true} />
              ))
            ) : (
              <p className="text-gray-500 italic">No matches currently in progress...</p>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Completed Section */}
      <section>
        <div className="flex items-center italic font-extrabold gap-4 mb-6">
          <h2 className="text-2xl text-white">RECENT <span className="text-gray-500 underline decoration-2 underline-offset-8">RESULTS</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-500/50 to-transparent"></div>
        </div>

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-6 justify-center lg:justify-start"
        >
          {completedBasketball.length > 0 ? (
            completedBasketball.map((score, index) => (
              <ScoreCard key={score._id || index} score={score} isLive={false} />
            ))
          ) : (
            <p className="text-gray-500 italic">No completed matches found.</p>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default BasketballScore;