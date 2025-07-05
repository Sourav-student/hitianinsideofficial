import { BiLogoGoogle } from "react-icons/bi"
import { useGoogleLogin } from '@react-oauth/google'
import googleAuth from "../../api/googleapi";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { isAccountContext } from "../../context/context";
import logo from "../../assets/images/logo.png";
import { toast } from "react-toastify"

const SignIn = () => {

  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    image: '',
    token: '',
    admin: false
  })

  console.log(userInfo)

  const setIsAccount = useContext(isAccountContext);
  const navigate = useNavigate();

  //Google response
  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult['code']);
        const { email, name, image, admin } = await result.data.user;
        const token = await result.data.token;
        //newUser
        setUserInfo({ email, name, image, token, admin });
        localStorage.setItem('user-info', JSON.stringify({email, name, image, token, admin}))
        setIsAccount(true)
        navigate('/');
        toast.success("sign in successfully");
      }
    } catch (error) {
      toast.error("server error, try again later");
    }
  }

  //auth-code
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
  })

  //user information stored in localstorage
  // useEffect(() => {
  //   localStorage.setItem('user-info', JSON.stringify(userInfo));
  // }, [userInfo])

  return (
    <div className="w-full h-[100vh] absolute top-0 z-50 bg-[#650808] flex flex-col justify-center items-center text-white">
      <div className="mt-10 text-center">
        <div className="flex items-center ps-2 md:ps-5 cursor-pointer absolute top-5 left-5">
          <img
            src={logo} alt="INSIDE LOGO"
            className="h-10 mr-3"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            HITian Inside
          </span>
        </div>
        <h1 className="text-2xl font-bold">Welcome to the Official e-Media Club of Haldia Institute of Technology!</h1>
        <p className="max-w-[700px] m-5 text-md font-normal">Unleash your creativity, amplify your voice, and become part of a vibrant community that captures the spirit of our campus through media, design, content, and innovation.Whether you're into photography, videography, writing, design, or digital storytelling - there's a place for you here.</p>
        <h2 className="text-lg font-semibold">🎯 Join us today and be the voice behind the visuals.</h2>
        <p className="max-w-[700px] m-5 text-md font-medium shadow-md">📩 Sign up below and take the first step toward something extraordinary.</p>
      </div>

      <div>
        <button className="my-5 p-3 bg-[#e25454] font-bold rounded-full flex items-center gap-2 shadow-lg hover:shadow-2xl hover:scale-110"
          onClick={googleLogin}><div className="bg-[#e77b7b] p-2 rounded-full"><BiLogoGoogle className="h-6 w-6" /></div> <p className="text-xl">Sign in with Google</p></button>
      </div>
    </div>
  )
}

export default SignIn;