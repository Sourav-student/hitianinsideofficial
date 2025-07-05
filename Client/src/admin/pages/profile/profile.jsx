import { useState, useEffect, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { isAccountContext } from '../../../context/context';

const AdminProfile = () => {

  //class for style
  const btnClass = "bg-[#bb1d1d] hover:bg-[#e01414] py-2 px-4 rounded-lg font-semibold";

  //navigate feature
  const navigate = useNavigate();

  //handle states
  const [userInfo, setUserInfo] = useState(null);
  const setIsAccount = useContext(isAccountContext);

  //use useEffect to fetch data from local storage
  useEffect(() => {
    const data = localStorage.getItem('user-info');
    const userData = JSON.parse(data);
    setUserInfo(userData);
  }, [])

  //Implement logged out feature
  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/signin')
    setIsAccount(false);
  }

  return (
    <div className='p-4 m-6 mt-10 text-white flex justify-center items-center flex-col'>
      <div className='flex justify-around items-center flex-wrap gap-4 bg-[#8c0909] w-auto p-6 rounded-lg shadow-lg border-[1px] border-[#8c0909] hover:border-orange-400'>
        <div>
          <img src={userInfo?.image} alt={userInfo?.name} className='rounded-md' />
        </div>
        <div className='text-left'>
          <h2 className='text-xl font-semibold'>Name - <span className='font-normal'>{userInfo?.name}</span></h2>
          <h3 className='text-lg font-semibold'>Email - <span className='font-normal'>{userInfo?.email}</span></h3>
        </div>
      </div>
      <div className='w-full p-6'>
        <div>
          <h2 className='text-xl font-semibold'>Hello Admin {userInfo?.name}</h2>
          <p>I am really happy to see you again.</p>
        </div>
      </div>

      <div className='grid grid-cols-2 p-3 gap-3'>
         <NavLink to='/admin/events'>
          <button className={btnClass}>Add Event</button>
          </NavLink>
         <NavLink to='/admin/homepage'>
          <button className={btnClass}>Add at Home Page</button>
         </NavLink>
         <NavLink to='/admin/almanac'>
          <button className={btnClass}>Add Almanac</button>
         </NavLink>
         <NavLink to='/admin/matches-scorecard'>
          <button className={btnClass}>Add Scores</button>
         </NavLink>
      </div>

      <button className={btnClass} onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AdminProfile;