import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { getAdminHomepageData, addHomepageData, deleteHomepageData } from '../../../api/adminapis';
import Loader from '../../components/Loader/Loader';

const AdminHome = () => {
  const [homepageData, setHomepageData] = useState({
    eventPoster: null,
    eventName: '',
    eventContent: '',
    eventFormLink: '',
  })

  const [homepageContainer, sethomepageContainer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    // get homepageData
    const getData = async () => {
      try {
        const { data } = await getAdminHomepageData();
        sethomepageContainer(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

    getData();
  }, [])

  //add homepageData to database
  const handleAdd = async () => {
    setSubmit(true);
    if (homepageData.eventPoster === null || homepageData.eventName === '') {
      toast.warning("fill the required field");
      return;
    }

    try {
      const res = await addHomepageData(homepageData);
      toast.success(res.data.message);
      setHomepageData({
        eventPoster: null,
        eventName: '',
        eventContent: '',
        eventFormLink: '',
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSubmit(false)
    }
  }

  //delete event
  const handleDelete = async (id) => {
    try {
      const res = await deleteHomepageData(id);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      {/* Adding homepageData */}
      <div className='form'>
        <div className="text-red-200 flex flex-wrap px-6 text-xl justify-evenly gap-4">
          <div className='flex flex-col'>
            <label htmlFor="photo" className='text-left'>Upload Event Poster</label>
            <input
              type="file"
              name='eventPoster'
              onChange={(e) => setHomepageData({ ...homepageData, eventPoster: e.target.files[0] })}
              accept='image/*'
              className='p-1 my-2 w-[250px] border border-dotted rounded-2xl shadow-md'
              required />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="eventname" className='text-left'>Event Name</label>
            <input
              type="text"
              name='eventName'
              value={homepageData.eventName}
              onChange={(e) => setHomepageData({ ...homepageData, eventName: e.target.value })}
              className='bg-red-400 p-2 my-2 w-[250px] border border-dotted rounded-lg text-white shadow-md'
              placeholder='Enter here'
              required />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="eventform" className='text-left'>Registration Form Link</label>
            <input
              type="text"
              name='eventFormLink'
              value={homepageData.eventFormLink}
              onChange={(e) => setHomepageData({ ...homepageData, eventFormLink: e.target.value })}
              className='bg-red-400 p-2 my-2 w-[250px] border border-dotted rounded-lg text-white shadow-md'
              placeholder='Enter here'
              required />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="eventContent" className='text-left'>Event Content</label>
            <textarea
              name='eventContent'
              value={homepageData.eventContent}
              onChange={(e) => setHomepageData({ ...homepageData, eventContent: e.target.value })}
              className='bg-red-400 p-2 my-2 w-[250px] border rounded-lg text-white shadow-md'
              placeholder='Enter here'
            />
          </div>
        </div>
        <div>
          <button
            type='submit'
            className='text-red-100 bg-[#c21414] px-4 py-2 m-10 rounded-md text-lg shadow-md hover:bg-[#f00] transition-all'
            onClick={handleAdd} disabled={submit}>
            {submit ? "Adding Poster" : "Add Poster"}
          </button>
        </div>
      </div>

      {/*get all the homepageData */}
      {
        loading ? <Loader /> :
          <div>
            <h1 className='text-red-200 text-xl p-3 w-full text-center font-serif'>All the homepage events list</h1>
            {
              homepageContainer.length > 0 ?
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5 bg-[#c3712958] p-2 rounded-lg'>
                  {
                    homepageContainer.map((homepageData, index) => (
                      <div
                        className='p-3 bg-[#ec1901] rounded-lg text-red-200'
                        key={index}>
                        <img src={homepageData.event_poster}
                          alt="homepageData image"
                          className='h-52 w-full' />
                        <h2 className='text-lg font-bold'>{homepageData.event_name}</h2>
                        <a href={homepageData.event_form_link} className='font-semibold'>{homepageData.event_form_link.slice(0, 25)}</a>
                        <h3 className='font-semibold'>{homepageData.event_content}</h3>
                        <hr />
                        <button
                          type='submit'
                          className='text-red-100 bg-[#c21414] px-4 py-2 mt-3 rounded-md text-lg shadow-md hover:bg-[#710505] transition-all'
                          onClick={() => handleDelete(homepageData._id)}>Delete</button>
                      </div>
                    ))
                  }
                </div>
                :
                <p className='text-red-200 text-sm'>No events for homepage poster</p>
            }
          </div>
      }
    </>
  )
}

export default AdminHome;