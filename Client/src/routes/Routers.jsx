import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminRoute from './AdminRoute'
import GoogleAuthWrapper from '../components/GoogleAuthWrapper/GoogleAuthWrapper' //google sign up
import { getAdmin } from '../api/userapis'

//user + admin both can access
import Home from '../pages/Home/Home'
import Almanac from '../pages/Almanac/Almanac'
import Events from '../pages/Events/Events'
import Merchandise from '../pages/Merchandise/Merchandise'
import Team from '../pages/Team/Team'
import About from '../pages/About/About'
import PageNotFound from '../pages/PageNotFound'
import Profile from '../pages/Profile/Profile'
import ArtSubmition from '../pages/ArtSubmition/ArtSubmition'
import PoemSubmition from '../pages/PoemSubmition/PoemSubmition'
// import VideoSubmition from '../pages/VideoSubmition/VideoSubmition'
import PhotoSubmition from '../pages/PhotoSubmition/PhotoSubmition'
// import StorySubmition from '../pages/StorySubmition/StorySubmition'
import AlmanacForm from '../pages/AlmanacForm/AlmanacForm'
import MatchesScores from '../pages/MatchesScores/MatchesScores'

//admin pages
import AdminProfile from '../admin/pages/profile/AdminProfile';
import AdminEvents from '../admin/pages/events/AdminEvent';
import Scorecard from '../admin/pages/scorecard/Scorecard';
import AdminAlmanac from '../admin/pages/almanac/AdminAlmanac';
import AdminHome from '../admin/pages/homepagePoster/AdminHome';
import UsersData from '../admin/pages/users/UsersData';

function Routers() {

  const [isAdmin, setIsAdmin] = useState(false);

  //check the user is admin or not
  useEffect(() => {
    const isAdminOrNot = async () => {
      const userData = JSON.parse(localStorage.getItem('user-info'));
      const email = userData?.email;
      if (userData) {
        const result = await getAdmin(email);
        setIsAdmin(result?.data?.isAdmin);
      }
    }

    isAdminOrNot();
  }, [isAdmin]);

  return (
      <Routes>
        <Route exact path='/Signin' element={<GoogleAuthWrapper />} />
        
        {/* user and admin both access */}
        <Route exact path='/' element={<Home />} />
        <Route exact path='/almanac' element={<Almanac />} />
        <Route exact path='/events' element={<Events />} />
        <Route exact path='/merchandise' element={<Merchandise />} />
        <Route exact path='/team' element={<Team />} />
        <Route exact path='/about' element={<About />} />

        {/* alumanacform pages */}
        <Route exact
          path='/almanac/almanac-form'
          element={<AlmanacForm />} />
        <Route exact
          path='/almanac/almanac-form/artwork-form-submit'
          element={<ArtSubmition />} />
        <Route exact
          path='/almanac/almanac-form/photo-form-submit'
          element={<PhotoSubmition />} />
        <Route exact
          path='/almanac/almanac-form/poem-form-submit'
          element={<PoemSubmition />} />
        <Route exact path='/matches-scorecard' element={<MatchesScores />} />

        {/* unique one */}
        <Route exact path='/profile' element={isAdmin ? <AdminProfile /> : <Profile />} />

        {/* protected for admin only*/}
        <Route path='/admin/events'
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AdminEvents />
            </AdminRoute>
          } />

        <Route path='/admin/matches-scorecard'
          element={
            <AdminRoute isAdmin={isAdmin}>
              <Scorecard />
            </AdminRoute>
          } />

        <Route path='/admin/almanac'
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AdminAlmanac />
            </AdminRoute>
          } />

        <Route path='/admin/add-poster'
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AdminHome />
            </AdminRoute>
          } />

          <Route path='/admin/users-sent-data'
          element={
            <AdminRoute isAdmin={isAdmin}>
              <UsersData />
            </AdminRoute>
          } />

        <Route exact path='*' element={<PageNotFound />}></Route>
      </Routes>
  )
}
export default Routers