import React, { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import Routers from '../routes/Routers'
import Footer from '../components/Footer/Footer'
import { isAccountContext } from '../context/context'
import { useNavigate } from 'react-router-dom'

function Layout() {

  const [isAccount, setIsAccount] = useState(
    () => JSON.parse(localStorage.getItem('isAccount')) || false
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAccount) {
      navigate('/Signin');
    }
    localStorage.setItem('isAccount', JSON.stringify(isAccount));
  }, [isAccount, navigate])

  return (
    <isAccountContext.Provider value={setIsAccount}>
      <div>
        <Header />
        <main>
          <Routers />
        </main>
        <Footer />
      </div>
    </isAccountContext.Provider>
  )
}

export default Layout