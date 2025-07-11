// import "./header.css";
import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import './header.css'

function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  //navLinks
  const [navLinks, setNavLinks] = useState([
    {
      path: "/",
      display: "Home",
    },
    {
      path: "/almanac",
      display: "Almanac",
    },
    {
      path: "/events",
      display: "Events",
    },
    {
      path: "/merchandise",
      display: "Merchandise",
    },
    {
      path: "/team",
      display: "Team",
    },

    {
      path: "/about",
      display: "About",
    }
  ])
  // const [navbarOpen, setNavbarOpen] = useState("hiddenbox");
  
  // //navLinks
  // const navLinks = [
  //   {
  //     path: "/",
  //     display: "Home",
  //   },
  //   {
  //     path: "/almanac",
  //     display: "Almanac",
  //   },
  //   {
  //     path: "/events",
  //     display: "Events",
  //   },
  //   {
  //     path: "/merchandise",
  //     display: "Merchandise",
  //   },
  //   {
  //     path: "/team",
  //     display: "Team",
  //   },

  //   {
  //     path: "/about",
  //     display: "About",
  //   }
  // ];

  // const changeStyle = () => {
  //   // console.log(navbarOpen)
  //   if (navbarOpen !== "hiddenbox") setNavbarOpen("hiddenbox");
  //   else setNavbarOpen("openbox")
  // }

  const changeStyle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const profile = {
    path: "/profile",
  }

  return (
    <>
      <div>
        <nav className="border-gray-200 bg-[#650808] dark:bg-[#650808] dark:border-[#650808]">
          <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap items-center justify-between mx-auto p-4">

            <NavLink to="/" className="flex items-center ps-2 md:ps-5">
              <img src={logo} alt="INSIDE LOGO" className="h-8 mr-3" />
              <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white mb-1">
                HITian Inside
              </span>
            </NavLink>

            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center p-2 me-3 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-red-400 dark:hover:bg-red-700 dark:focus:ring-red-600"
                onClick={changeStyle}
              >
                <span className="sr-only">Toggle menu</span>
                {navbarOpen ? (
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path d="M1 1h15M1 7h15M1 13h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <NavLink to={profile.path} className="border rounded-full">
                <FaUserCircle size={30} color="white" />
              </NavLink>
            </div>

            {/* Navbar Links */}
            <div className={`w-full md:w-auto ${navbarOpen ? 'block' : 'hidden'} md:flex items-center gap-5`} id="navbar-solid-bg">
              <ul className="flex flex-col md:flex-row font-medium mt-4 md:mt-0 rounded-lg bg-[#650808] md:bg-transparent dark:bg-[#650808] md:dark:bg-transparent space-y-2 md:space-y-0 md:space-x-4">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#FFB5B5] text-[17px] font-[400] font-hammersmith"
                          : "text-white text-[17px] font-[100] hover:text-[#FFB5B5] font-hammersmith"
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <NavLink to={profile.path} className="border rounded-full hidden md:block">
                <FaUserCircle size={30} color="white" />
              </NavLink>
            </div>
          </div>
        </nav>
      </div>

    </>
  );
}

export default Header;
