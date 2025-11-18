import { BiLogoGoogle } from "react-icons/bi"
import { useGoogleLogin } from '@react-oauth/google'
import googleAuth from "../../api/googleapi";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { isAuthenticatedContext } from "../../context/context";
import logo from "../../assets/images/logo.png";
import { toast } from "react-toastify"

const SignUp = () => {

  const { setIsAuthenticated } = useContext(isAuthenticatedContext);
  const navigate = useNavigate();

  //Google response
  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult['code']);
        const { email, name, image } = await result.data.user;
        const token = await result.data.token;
        //newUser
        localStorage.setItem('user-info', JSON.stringify({ email, name, image, token }))
        setIsAuthenticated(true);
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

  return (
    <div className="w-full h-[100vh] px-4 absolute top-0 z-50 bg-gradient-to-br from-[#4b0606] via-[#650808] to-[#8c0f0f] flex flex-col justify-center items-center text-white overflow-hidden">

      {/* Floating blobs (decorative) */}
      <div className="absolute w-72 h-72 bg-[#a31313] opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-[#ff4f4f] opacity-10 rounded-full blur-2xl bottom-0 right-0 animate-ping"></div>

      {/* Header Logo */}
      <div className="mt-10 text-center relative z-10">
        <div className="flex items-center ps-2 md:ps-5 cursor-pointer absolute top-5 left-5 backdrop-blur-md bg-white/10 px-3 py-1 rounded-xl shadow-xl">
          <img
            src={logo}
            alt="INSIDE LOGO"
            className="h-10 mr-3 drop-shadow-xl"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            HITian Inside
          </span>
        </div>

        {/* Glassmorphism Card */}
        <div className="backdrop-blur-md bg-white/10 px-10 py-6 rounded-2xl shadow-2xl border border-white/20 mt-16 animate-[fadeIn_1s_ease]">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide drop-shadow-xl">
            Welcome to the Official e-Media Club of HIT!
          </h1>
        </div>
      </div>

      {/* Google Button */}
      <div className="relative z-10">
        <button
          className="my-10 px-6 py-3 bg-gradient-to-r from-[#ff6b6b] to-[#d42525] font-bold rounded-full flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-[1.07] active:scale-95 transition-all duration-300"
          onClick={googleLogin}
        >
          <div className="bg-white/20 p-2 rounded-full">
            <BiLogoGoogle className="h-6 w-6" />
          </div>
          <p className="text-xl tracking-wide">Sign in with Google</p>
        </button>
      </div>
    </div>
  );
}

export default SignUp;