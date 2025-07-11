import React, { useEffect, useState } from 'react'
import { contactFormData, photographyFormData, poemFormData, artFormData } from '../../../api/adminapis';
import Loader from '../../../components/Loader/Loader';
import { toast } from 'react-toastify';

const UsersData = () => {
  const [contactData, setContactData] = useState([]);
  const [photographyData, setPhotographyData] = useState([]);
  const [poemData, setPoemData] = useState([]);
  const [artData, setArtData] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch all submitted forms
  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactResponse = await contactFormData();
        setContactData(contactResponse.data);

        const photographyResponse = await photographyFormData();
        setPhotographyData(photographyResponse.data);

        const poemResponse = await poemFormData();
        setPoemData(poemResponse.data);

        const artResponse = await artFormData();
        setArtData(artResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    loading ? <Loader /> :
      <>
        {/* photography data */}
        <h1 className='text-xl text-red-200 font-semibold mx-4 text-center'>Photographs Sent by students</h1>
        {
          photographyData.length > 0 &&
          <div className='flex flex-wrap gap-4 m-6'>
            {
              photographyData.map((item, index) => (
                <div key={index} className='p-4 rounded-lg shadow-md flex flex-col justify-center items-center w-full md:w-1/3 lg:w-1/4 bg-[#b52323] border hover:scale-105 transition-transform duration-300 ease-in-out'>
                  <h2 className='text-lg font-semibold text-red-100'>{item.name}</h2>
                  <p className='text-red-100'>{item.roll_no}</p>
                  <p className='text-red-100'>{item.email}</p>
                  <p className='text-red-100'>{item.contact_no}</p>
                  <img src={item.file} alt="photograph" className='w-[250px] h-[250px] rounded-lg' />
                </div>
              ))
            }
          </div>
        }
        {
          photographyData.length === 0 && <p className='text-gray-400'>No photographs found.</p>
        }

        {/* art data */}
        <h1 className='text-xl text-red-200 font-semibold mx-4 text-center'>Artworks Sent by students</h1>
        {
          artData.length > 0 &&
          <div className='flex flex-wrap gap-4 m-6'>
            {
              artData.map((item, index) => (
                <div key={index} className='p-4 rounded-lg shadow-md flex flex-col justify-center items-center w-full md:w-1/3 lg:w-1/4 bg-[#b52323] border hover:scale-105 transition-transform duration-300 ease-in-out'>
                  <h2 className='text-lg font-semibold text-red-100'>{item.name}</h2>
                  <p className='text-red-100'>{item.roll_no}</p>
                  <p className='text-red-100'>{item.email}</p>
                  <p className='text-red-100'>{item.contact_no}</p>
                  <img src={item.file} alt="photograph" className='w-[250px] h-[250px] rounded-lg' />
                </div>
              ))
            }
          </div>
        }
        {
          artData.length === 0 && <p className='text-gray-400'>No Artwork found.</p>
        }

        {/* poem data */}
        <h1 className='text-xl text-red-200 font-semibold mx-4 text-center'>Poems Sent by students</h1>
        {
          poemData.length > 0 &&
          <div className='flex flex-wrap gap-4 m-6'>
            {
              poemData.map((item, index) => (
                <div key={index} className='p-4 rounded-lg shadow-md flex flex-col justify-center items-center w-full md:w-1/3 lg:w-1/4 bg-[#b52323] border hover:scale-105 transition-transform duration-300 ease-in-out'>
                  <h2 className='text-lg font-semibold text-red-100'>{item.name}</h2>
                  <p className='text-red-100'>{item.roll_no}</p>
                  <p className='text-red-100'>{item.email}</p>
                  <p className='text-red-100'>{item.contact_no}</p>
                  <p className='text-white font-semibold'>Title - {item.title}</p>
                  <pre className='text-white text-left font-sans'>{item.poem}</pre>
                </div>
              ))
            }
          </div>
        }
        {
          poemData.length === 0 && <p className='text-gray-400'>No poem found.</p>
        }
        <h1 className='text-xl text-red-200 font-semibold mx-4 text-center'>Contact us form Sent by students</h1>
        {
          contactData.length > 0 &&
          <div className='flex flex-wrap gap-4 m-6'>
            {
              contactData.map((item, index) => (
                <div key={index} className='p-4 rounded-lg shadow-md w-full md:w-1/3 lg:w-1/4 bg-[#b52323] border hover:scale-105 transition-transform duration-300 ease-in-out'>
                  <h2 className='text-lg font-semibold text-red-100'>{item.name}</h2>
                  <p className='text-red-100'>{item.email}</p>
                  <p className='text-red-200'>{item.message}</p>
                </div>
              ))
            }
          </div>
        }
        {
          contactData.length === 0 && <p className='text-gray-400'>No contact form submissions found.</p>
        }
      </>
  )
}

export default UsersData;