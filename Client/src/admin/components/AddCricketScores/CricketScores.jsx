import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { addCricketScores } from '../../../api/adminapis'

const CricketScores = () => {

  // css style
  const inputDivStyle = "flex flex-col w-[200px] justify-center text-left text-red-100"
  const inputStyle = "rounded-md p-2 my-2 text-white text-md bg-[#b32610]"

  //form submition
  const [CricketScores, setCricketScores] = useState({
    matchType: '',
    team1Name: '',
    team2Name: '',
    team1Logo: null,
    team2Logo: null,
    team1Run: 0,
    team2Run: 0,
    team1OverPlayed: 0,
    team2OverPlayed: 0,
    team1WicketLoss: 0,
    team2WicketLoss: 0,
    completed: "false"
  })

  const [submit, setSubmit] = useState(false);

  const handleAdd = async () => {
    try {
      if (Object.values(CricketScores).some(item => item === '')) {
        toast.warning("fill the required field");
        return;
      }
      setSubmit(true)
      const res = await addCricketScores(CricketScores);
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
            value={CricketScores.matchType}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...CricketScores, matchType: e.target.value })}
            required />
        </div>


        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 name</label>
          <input type="text"
            className={inputStyle}
            name='team1Name'
            value={CricketScores.team1Name}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...CricketScores, team1Name: e.target.value })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 name</label>
          <input type="text"
            className={inputStyle}
            name='team2Name'
            value={CricketScores.team2Name}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...CricketScores, team2Name: e.target.value })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 logo</label>
          <input type="file"
            className={inputStyle}
            name='team1Logo'
            onChange={(e) => setCricketScores({ ...CricketScores, team1Logo: e.target.files[0] })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 logo</label>
          <input type="file"
            className={inputStyle}
            name='team2Logo'
            onChange={(e) => setCricketScores({ ...CricketScores, team2Logo: e.target.files[0] })}
            required />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 run</label>
          <input type="number"
            className={inputStyle}
            name='team1Run'
            value={CricketScores.team1Run}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...CricketScores, team1Run: e.target.value })} />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 run</label>
          <input type="number"
            className={inputStyle}
            name='team2Run'
            value={CricketScores.team2Run}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...CricketScores, team2Run: e.target.value })} />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 over played</label>
          <input type="number"
            className={inputStyle}
            name='team1over'
            value={CricketScores.team1OverPlayed}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...CricketScores, team1OverPlayed: e.target.value })} />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 over played</label>
          <input type="text"
            className={inputStyle}
            name='team2Over'
            value={CricketScores.team2OverPlayed}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...CricketScores, team2OverPlayed: e.target.value })} />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 1 wicket loss</label>
          <input type="text"
            className={inputStyle}
            name='team1WicketTaken'
            value={CricketScores.team1WicketLoss}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...CricketScores, team1WicketLoss: e.target.value })} />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Team 2 wicket loss</label>
          <input type="text"
            className={inputStyle}
            name='team2WicketTaken'
            value={CricketScores.team2WicketLoss}
            placeholder='Enter here'
            onChange={(e) => setCricketScores({ ...CricketScores, team2WicketLoss: e.target.value })} />
        </div>

        <div className={inputDivStyle}>
          <label htmlFor="aboutTeam">Match is completed (yes --&gt; true)</label>
          <select
            name="completed"
            className={inputStyle}
            value={CricketScores.completed}
            onChange={(e) => setCricketScores({ ...CricketScores, completed: e.target.value })}>
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        </div>
      </div>
      <div className="text-red-200 w-full font-medium">
        <button className='p-2 bg-[#be2525] hover:bg-red-800 rounded-lg w-40' onClick={handleAdd} disabled={submit}>{submit ? "Adding" : "Add"}</button>
      </div>
    </>
  )
}

export default CricketScores;