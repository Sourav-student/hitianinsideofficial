import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { addVollyballScores } from '../../../api/adminapis'


const VollyballScores = () => {

  // css style
  const inputDivStyle = "flex flex-col w-[200px] justify-center text-left text-red-100"
  const inputStyle = "rounded-md p-2 my-2 text-white text-md bg-[#b32610]"


  const [vollyballScores, setVollyballScores] = useState({
    matchType: '',
    team1Name: '',
    team2Name: '',
    team1Logo: null,
    team2Logo: null,
    team1Score: 0,
    team2Score: 0,
    completed: "no"
  })

  const [submit, setSubmit] = useState(false);

  //add cricket scores
  const handleAdd = async () => {
    try {
      if (Object.values(vollyballScores).some(item => item === '') || vollyballScores.team1Logo === null || vollyballScores.team2Logo === null) {
        toast.warning("fill the required field");
        return;
      }
      setSubmit(true)
      const res = await addVollyballScores(vollyballScores);
      toast.success(res.data.message);
    } catch (error) {
      toast.error("server error ! try again later");
    } finally {
      setSubmit(false);
    }
  }

  return (
    <>
      <div className='flex flex-wrap gap-5 justify-center'>
        <div className={inputDivStyle}>
          <label htmlFor="matchType">Match Type (eg - Final)</label>
          <input type="text"
            className={inputStyle}
            name='matchType'
            value={vollyballScores.matchType}
            placeholder='Enter here'
            onChange={(e) => setVollyballScores({ ...vollyballScores, matchType: e.target.value })}
            required />
        </div>


        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 name</label>
          <input type="text"
            className={inputStyle}
            name='team1Name'
            value={vollyballScores.team1Name}
            placeholder='Enter here'
            onChange={(e) => setVollyballScores({ ...vollyballScores, team1Name: e.target.value })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 name</label>
          <input type="text"
            className={inputStyle}
            name='team2Name'
            value={vollyballScores.team2Name}
            placeholder='Enter here'
            onChange={(e) => setVollyballScores({ ...vollyballScores, team2Name: e.target.value })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 logo</label>
          <input type="file"
            className={inputStyle}
            name='team1Logo'
            onChange={(e) => setVollyballScores({ ...vollyballScores, team1Logo: e.target.files[0] })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 logo</label>
          <input type="file"
            className={inputStyle}
            name='team2Logo'
            onChange={(e) => setVollyballScores({ ...vollyballScores, team2Logo: e.target.files[0] })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 Score</label>
          <input type="number"
            className={inputStyle}
            name='team1Score'
            value={vollyballScores.team1Score}
            placeholder='Enter here'
            onChange={(e) => setVollyballScores({ ...vollyballScores, team1Score: e.target.value })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 Score</label>
          <input type="number"
            className={inputStyle}
            name='team2Score'
            value={vollyballScores.team2Score}
            placeholder='Enter here'
            onChange={(e) => setVollyballScores({ ...vollyballScores, team2Score: e.target.value })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Match is completed</label>
          <select
            name="completed"
            className={inputStyle}
            value={vollyballScores.completed}
            onChange={(e) => setVollyballScores({ ...vollyballScores, completed: e.target.value })}>
            <option value="no">no</option>
            <option value="yes">yes</option>
          </select>
        </div>
      </div>
      <div className="text-red-200 w-full font-medium">
        <button className='p-2 bg-[#be2525] hover:bg-red-800 rounded-lg w-40' onClick={handleAdd} disabled={submit}>{submit ? "Adding" : "Add"}</button>
      </div>
    </>
  )
}

export default VollyballScores;
