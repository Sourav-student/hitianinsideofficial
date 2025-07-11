import { useState, useEffect, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { isAuthenticatedContext } from '../../context/context';

const Profile = () => {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const { setIsAuthenticated } = useContext(isAuthenticatedContext);

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    const userData = JSON.parse(data);
    setUserInfo(userData);
  }, [])

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
        <div className='flex w-full justify-center'>
          <p className='text-sm sm:text-lg max-w-[600px] text-center'>🎉 Welcome to the official HITian Inside website! You’re now a valued member of our growing community. We’re thrilled to have you on board - congratulations and get ready to explore, connect, and contribute!
          </p>
        </div>
      </div>

      <div className='flex gap-8'>
        <NavLink to="/matches-scorecard">
          <button className='bg-[#0788e4] hover:bg-[#0760e7] py-2 px-4 rounded-lg font-semibold w-40 max-sm:w-auto'>View Scores</button>
        </NavLink>
        <button className='bg-[#bb1d1d] hover:bg-[#e01414] py-2 px-4 rounded-lg font-semibold w-40 max-sm:w-auto' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Profile