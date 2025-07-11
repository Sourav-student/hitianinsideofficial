import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Routers from '../routes/Routers';
import Footer from '../components/Footer/Footer';
import Loader from '../components/Loader/Loader';
import { isAuthenticatedContext } from '../context/context'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify';

function Layout() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user-info'));
    if (userData?.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/Signin');
    }
  }, [navigate])

  setInterval(() => {
    setLoading(false);
  }, 1500);

  return (
    <isAuthenticatedContext.Provider value={{ setIsAuthenticated, isAuthenticated }}>
      {
        loading ? <Loader />
          : <div>
            <Header />
            <main>
              <Routers />
            </main>
            <Footer />
          </div>
      }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce} />
    </isAuthenticatedContext.Provider>
  )
}

export default Layout