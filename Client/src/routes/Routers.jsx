import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import GoogleAuthWrapper from '../components/GoogleAuthWrapper/GoogleAuthWrapper' //google sign up

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
import VideoSubmition from '../pages/VideoSubmition/VideoSubmition'
import PhotoSubmition from '../pages/PhotoSubmition/PhotoSubmition'
import StorySubmition from '../pages/StorySubmition/StorySubmition'
import AlmanacForm from '../pages/AlmanacForm/AlmanacForm'
import MatchesScores from '../pages/MatchesScores/MatchesScores'

//admin pages
import AdminProfile from '../admin/pages/profile/profile';
import AdminEvents from '../admin/pages/events/event';
import Scorecard from '../admin/pages/scorecard/Scorecard'

function Routers() {

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user-info'));
    setIsAdmin(userData.admin);
  }, [isAdmin]);

  return (
    <div>
      <Routes>
        {/* user and admin both access */}
        <Route exact path='/' element={<Home />} />
        <Route exact path='/almanac' element={<Almanac />} />
        <Route exact path='/events' element={<Events />} />
        <Route exact path='/merchandise' element={<Merchandise />} />
        <Route exact path='/team' element={<Team />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/Signin' element={<GoogleAuthWrapper />} />
         {/* alumanacform pages */}
        <Route exact
          path='/almanac/almanac-form'
          element={<AlmanacForm />} />
        <Route exact
          path='/almanac/artwork-form-submit/artwork-form-submit'
          element={<ArtSubmition />} />
        <Route exact
          path='/almanac/artwork-form-submit/photo-form-submit'
          element={<PhotoSubmition />} />
        <Route exact
          path='/almanac/artwork-form-submit/story-form-submit'
          element={<StorySubmition />} />
        <Route exact
          path='/almanac/artwork-form-submit/video-form-submit'
          element={<VideoSubmition />} />
        <Route exact
          path='/almanac/artwork-form-submit/poem-form-submit'
          element={<PoemSubmition />} />
        <Route exact path='*' element={<PageNotFound />}></Route>
        <Route exact path='/matches-scorecard' element={<MatchesScores />} />

        {/* unique one */}
        <Route exact path={isAdmin? '/admin/profile' : '/profile'} element={isAdmin? <AdminProfile /> : <Profile/>} />

        {/* protected for admin only*/}
        <Route exact path='/admin/events' element={<AdminEvents />} />
        <Route exact path='/admin/matches-scorecard' element={<Scorecard />} />
        <Route exact path='/admin/almanac' element={<AdminEvents />} />
        <Route exact path='/admin/homepage' element={<MatchesScores />} />
      </Routes>

    </div>
  )
}
export default Routers