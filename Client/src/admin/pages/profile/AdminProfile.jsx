import { useState, useEffect, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { isAuthenticatedContext } from '../../../context/context';

const AdminProfile = () => {

  //class for style
  const btnClass = "bg-[#bb1d1d] hover:bg-[#e01414] p-2 rounded-lg font-semibold w-40";

  //navigate feature
  const navigate = useNavigate();

  //handle states
  const [userInfo, setUserInfo] = useState(null);
  const { setIsAuthenticated } = useContext(isAuthenticatedContext);

  //use useEffect to fetch data from local storage
  useEffect(() => {
    const data = localStorage.getItem('user-info');
    const userData = JSON.parse(data);
    setUserInfo(userData);
  }, [])

  //Implement logged out feature
  const handleLogout = () => {
    localStorage.removeItem('user-info');
    setIsAuthenticated(false);
    navigate('/signin');
  }

  return (
    <div className='p-4 m-6 mt-10 text-white flex justify-center items-center flex-col'>
      <div className='flex justify-around items-center flex-wrap gap-4 bg-[#8c0909] w-auto p-6 rounded-lg shadow-lg border-[1px] border-[#8c0909] hover:border-orange-400'>
        <div>
          <img src={userInfo?.image} alt={userInfo?.name} className='rounded-md' />
        </div>
        <div className='text-left'>
          <h2 className='text-lg sm:text-xl font-semibold'>Name - <span className='font-normal'>{userInfo?.name}</span></h2>
          <h3 className='text-sm sm:text-lg font-semibold'>Email - <span className='font-normal'>{userInfo?.email}</span></h3>
        </div>
      </div>
      <div className='w-full p-6'>
        <div>
          <h2 className='text-xl font-semibold'>Hello Admin {userInfo?.name}</h2>
          <p>I am really happy to see you again.</p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-8 max-sm:grid-cols-1'>
        <NavLink to='/admin/events'>
          <button className={btnClass}>Add Event</button>
        </NavLink>
        <NavLink to='/admin/add-poster'>
          <button className={btnClass}>Add Poster at Homepage</button>
        </NavLink>
        <NavLink to='/admin/almanac'>
          <button className={btnClass}>Add Almanac</button>
        </NavLink>
        <NavLink to='/admin/matches-scorecard'>
          <button className={btnClass}>Add Scores</button>
        </NavLink>
        <NavLink to='/admin/users-sent-data'>
          <button className={btnClass}>users sent data</button>
        </NavLink>
      </div>

      <div className='flex gap-8 mt-5'>
        <NavLink to="/matches-scorecard">
          <button className={btnClass}>View Scores</button>
        </NavLink>
        <button className='bg-[#0788e4] hover:bg-[#0760e7] py-2 px-4 rounded-lg font-semibold w-40 max-sm:w-auto' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default AdminProfile;