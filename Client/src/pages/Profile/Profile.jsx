import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { isAccountContext } from '../../context/context';

const Profile = () => {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const setIsAccount = useContext(isAccountContext);

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    const userData = JSON.parse(data);
    setUserInfo(userData);
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/signin')
    setIsAccount(false);
  }

  return (
    <div className='p-4 m-6 mt-10 text-white'>
      <div className='flex justify-evenly items-center flex-wrap'>
        <img src={userInfo?.image} alt={userInfo?.name} />
        <div className='text-left'>
          <h2 className='text-xl font-bold'>Name - {userInfo?.name}</h2>
          <h3 className='text-lg font-bold'>Email - {userInfo?.email}</h3>
        </div>
      </div>
      <div className='w-full p-6'>
        {userInfo?.admin ?
          <div>
            <h2 className='text-xl font-semibold'>Hello Admin {userInfo?.name}</h2>
            <div className='flex justify-between m-6 gap-5 flex-wrap'>
              <button className='bg-[#c15b5b] hover:bg-[#ef5555] m-3 py-2 px-4 rounded-xl font-semibold'>Add Almanac</button>
              <button className='bg-[#c15b5b] hover:bg-[#ef5555] m-3 py-2 px-4 rounded-xl font-semibold'>Add Events</button>
              <button className='bg-[#c15b5b] hover:bg-[#ef5555] m-3 py-2 px-4 rounded-xl font-semibold'>Add Merchandise</button>
              <button className='bg-[#c15b5b] hover:bg-[#ef5555] m-3 py-2 px-4 rounded-xl font-semibold'>Add match Scorecard</button>
            </div>
          </div>
          :
          <div>
            <p>Hello user {userInfo?.name}, you are now part of the official HITian inside website. Congratulations!!</p>
          </div>}
      </div>
      <button className='bg-[#c15b5b] hover:bg-[#ef5555] m-3  py-2 px-4 rounded-xl font-semibold' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile
