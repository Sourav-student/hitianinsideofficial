import Home from '../pages/Home/Home'
import Almanac from '../pages/Almanac/Almanac'
import Events from '../pages/Events/Events'
import Merchandise from '../pages/Merchandise/Merchandise'
import Team from '../pages/Team/Team'
import About from '../pages/About/About'
import GoogleAuthWrapper from '../components/GoogleAuthWrapper/GoogleAuthWrapper'
import { Routes, Route } from 'react-router-dom'
import PageNotFound from '../pages/PageNotFound'
import Profile from '../pages/Profile/Profile'
import ArtSubmition from '../pages/ArtSubmition/ArtSubmition'
import PoemSubmition from '../pages/PoemSubmition/PoemSubmition'
import VideoSubmition from '../pages/VideoSubmition/videoSubmition'
import PhotoSubmition from '../pages/PhotoSubmition/PhotoSubmition'
import StorySubmition from '../pages/StorySubmition/StorySubmition'

function Routers() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/almanac' element={<Almanac />} />
        <Route exact path='/events' element={<Events />} />
        <Route exact path='/merchandise' element={<Merchandise />} />
        <Route exact path='/team' element={<Team />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/Signin' element={<GoogleAuthWrapper />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/almanac/artworkSubmitionForm' element={<ArtSubmition/>} />
        <Route exact path='/almanac/photoSubmitionForm' element={<PhotoSubmition />} />
        <Route exact path='/almanac/storySubmitionForm' element={<StorySubmition />} />
        <Route exact path='/almanac/videoSubmitionForm' element={<VideoSubmition />} />
        <Route exact path='/almanac/poemSubmitionForm' element={<PoemSubmition />} />
        <Route exact path='*' element={<PageNotFound />}></Route>
      </Routes>

    </div>
  )
}
export default Routers