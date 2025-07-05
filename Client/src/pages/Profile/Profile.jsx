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
    navigate('/signin');
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
        <div className='flex w-full justify-center'>
          <p className='text-lg max-w-[600px] text-center'>🎉 Welcome to the official HITian Inside website!
            You’re now a valued member of our growing community. We’re thrilled to have you on board - congratulations and get ready to explore, connect, and contribute!
          </p>
        </div>
      </div>

      <button className='bg-[#bb1d1d] hover:bg-[#e01414] py-2 px-4 rounded-lg font-semibold w-40' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile