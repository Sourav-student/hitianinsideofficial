import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { handleChangeCricketScores } from '../../../actions/actions';
import { getAdminCricketScores } from '../../../api/adminapis';
import { deleteCricketScores } from '../../../api/adminapis';
import { editCricketScores } from '../../../api/adminapis';

const CricketPanel = () => {

  const [originalScores, setOriginalScores] = useState([]);
  const [cricketScores, setCricketScores] = useState([]);
  const [loading, setLoading] = useState(true);

  //get the cricket scores
  useEffect(() => {
    const printScorecard = async () => {
      const result = await getAdminCricketScores();
      setCricketScores(result.data);
      setOriginalScores(result.data);
      setLoading(false);
    }

    printScorecard();
  }, [])

  //delete the cricket scores
  const handleDelete = async (id) => {
    try {
      const result = await deleteCricketScores(id);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  //changes saved in database
  const handleChange = async (index, id) => {
    try {
      const data = cricketScores[index];
      if(data === originalScores[index]){
        toast.warning("first make changes then apply");
        return;
      }

      const res = await editCricketScores(id, data);
      toast.success(res.data.message);

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    loading? <h2 className='w-full text-2xl text-[#ffb5b5] text-left px-3 font-semibold'>Loading...</h2> :
    <>
      <div className='w-full text-xl text-[#ffb5b5] text-left  px-3 font-semibold'>Matches</div>

      {/* map all matches */}
      <div className='mx-6 flex flex-wrap gap-5'>
        {
          (cricketScores.length > 0) && cricketScores.map((score, index) => (
            <div className="w-auto sm:w-[350px] bg-white/10 text-white rounded-xl shadow-md p-2 my-2" key={index}>
              <h2>{score.match_type}</h2>
              <div className="flex justify-between items-center border-b border-gray-400 pb-2 mb-2">
                {/* team 1 information */}
                <div className="flex flex-col">
                  <div className='grid grid-cols-2 items-center p-1'>
                    <img src={score.team1_logo} alt={score.team1_name}
                      className='w-12 rounded-full' />
                    <span className="font-bold text-lg">{score.team1_name}</span>
                  </div>
                  <span className="text-sm">Runs:
                    <input
                      type="number"
                      value={score.team1_run}
                      onChange={(e) => handleChangeCricketScores(cricketScores, setCricketScores, e, index, "team1run")}
                      className="text-sm w-12 bg-[#6b0909] p-1" /> /  <input
                      type="number"
                      value={score.team1_wicket_loss}
                      onChange={(e) => handleChangeCricketScores(cricketScores, setCricketScores, e, index, "team1wicketloss")}
                      className="text-sm w-10 bg-[#6b0909] p-1" /></span>
                  <span className="text-sm">Overs:
                    <input type='number'
                      value={score.team1_over_played}
                      onChange={(e) => handleChangeCricketScores(cricketScores, setCricketScores, e, index, "team1overplayed")}
                      className="text-sm w-12 bg-[#6b0909] p-1" /></span>
                </div>

                <div className="text-center text-lg text-gray-300">vs</div>

                {/* team 2 information */}
                <div className="flex flex-col">
                  <div className='grid grid-cols-2 items-center p-1'>
                    <span className="font-bold text-lg">{score.team2_name}</span>
                    <img src={score.team2_logo} alt={score.team2_name}
                      className='w-12 rounded-full' />
                  </div>
                  <span className="text-sm">Runs:
                    <input
                      type="number"
                      value={score.team2_run}
                      onChange={(e) => handleChangeCricketScores(cricketScores, setCricketScores, e, index, "team2run")}
                      className="text-sm w-12 bg-[#6b0909] p-1" /> /  <input
                      type="number"
                      value={score.team2_wicket_loss}
                      onChange={(e) => handleChangeCricketScores(cricketScores, setCricketScores, e, index, "team2wicketloss")}
                      className="text-sm w-10 bg-[#6b0909] p-1" /></span>
                  <span className="text-sm">Overs:
                    <input type='number'
                      value={score.team2_over_played}
                      onChange={(e) => handleChangeCricketScores(cricketScores, setCricketScores, e, index, "team2overplayed")}
                      className="text-sm w-12 bg-[#6b0909] p-1" /></span>
                </div>
              </div>

              {/* match complete status */}
              <div>
                <label htmlFor="completed">Match complete - </label>
                <input
                  type='text'
                  value={score.completed}
                  onChange={(e) => handleChangeCricketScores(cricketScores, setCricketScores, e, index, "complete")}
                  className="text-sm w-10 bg-[#6b0909] p-1"
                />
              </div>

              <div className="w-full flex justify-between text-white mt-3">
                <button
                  className='bg-[#bb1d1d] hover:bg-[#e01414] p-2 rounded-lg font-medium'
                  onClick={() => handleChange(index, score._id)}>Make Changes</button>
                <button
                  className='bg-[#bb1d1d] hover:bg-[#e01414] p-2 rounded-lg font-medium'
                  onClick={() => handleDelete(score._id)}>Delete</button>
              </div>
            </div>
          ))
        }
        {
          (cricketScores.length === 0) && <p className='text-sm text-[#ffb5b5]'>Currently no matches</p>
        }
      </div >
    </>
  )
}

export default CricketPanel;