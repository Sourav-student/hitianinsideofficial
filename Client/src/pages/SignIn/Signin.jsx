import { BiLogoGoogle } from "react-icons/bi"
import { useGoogleLogin } from '@react-oauth/google'
import googleAuth from "../../api/api"
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { isAccountContext } from "../../context/context";
import logo from "../../assets/images/logo.png";

const LogIn = () => {

  const setIsAccount = useContext(isAccountContext);
  const navigate = useNavigate();
  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult['code']);
        const { email, name, image, admin } = await result.data.user;
        const token = await result.data.token;
        const obj = { email, name, image, admin, token };
        localStorage.setItem('user-info', JSON.stringify(obj));
        setIsAccount(true)
        navigate('/');
      }
    } catch (error) {
      alert("server error")
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
  })

  return (
    <div className="w-full h-[100vh] absolute top-0 z-50 bg-[#650808] flex flex-col justify-center items-center">
      <div className="flex items-center ps-2 md:ps-5 cursor-pointer">
        <img
          src={logo} alt="INSIDE LOGO"
          className="h-10 mr-3"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          HITian Inside
        </span>
      </div>
      <p className="max-w-[500px] m-5 text-xl text-white font-medium">We are the official media club of Haldia Institute of Technology. Become a part if our community by signing up quickly below.</p>
      <button className="p-3 bg-[#e25454] text-white font-bold rounded-full  flex items-center gap-2 shadow-xl"><div className="bg-[#e77b7b] p-2 rounded-full"><BiLogoGoogle className="h-6 w-6" /></div> <p className="text-xl" onClick={googleLogin}>Sign in with Google</p></button>
    </div>
  )
}

export default LogIn