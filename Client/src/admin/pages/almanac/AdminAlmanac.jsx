import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { addAlmanac, getAdminAlmanac, deleteAlmanac } from '../../../api/adminapis';
import { toast } from 'react-toastify';

const AdminAlmanac = () => {
  const [almanac, setAlmanac] = useState({
    file: null,
    username: '',
    department: ''
  })

  const [almanacData, setAlmanacData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    // get almanac
    const getData = async () => {
      try {
        const { data } = await getAdminAlmanac();
        setAlmanacData(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

    getData();
  }, [])

  //add almanac to database
  const handleAdd = async () => {
    setSubmit(true);
    if (almanac.file === null || almanac.department === '' || almanac.username === '') {
      toast.warning("fill the required field");
      return;
    }

    try {
      const res = await addAlmanac(almanac);
      toast.success(res.data.message);
      setAlmanac({
        file: null,
        username: '',
        department: ''
      })
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSubmit(false)
    }
  }

  //delete event
  const handleDelete = async (id) => {
     try {
      const res = await deleteAlmanac(id);
      toast.success(res.data.message);
     } catch (error) {
      toast.error(error.response.data.message);
     }
  }

  return (
    <>
      {/* Adding almanac */}
      <div className='form'>
        <div className="text-red-200 flex flex-wrap px-6 text-xl justify-evenly gap-4">
          <div className='flex flex-col'>
            <label htmlFor="photo" className='text-left'>Upload almanac photo</label>
            <input
              type="file"
              name='file'
              onChange={(e) => setAlmanac({ ...almanac, file: e.target.files[0] })}
              accept='image/*'
              className='p-1 my-2 w-[250px] border border-dotted rounded-2xl shadow-md' 
              required/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="username" className='text-left'>Name</label>
            <input
              type="text"
              name='username'
              value={almanac.username}
              onChange={(e) => setAlmanac({ ...almanac, username: e.target.value })}
              className='bg-red-400 p-2 my-2 w-[250px] border border-dotted rounded-lg text-white shadow-md'
              placeholder='Enter here' 
              required/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="department" className='text-left'>department</label>
            <input
              type="text"
              name='department'
              value={almanac.department}
              onChange={(e) => setAlmanac({ ...almanac, department: e.target.value })}
              className='bg-red-400 p-2 my-2 w-[250px] border border-dotted rounded-lg text-white shadow-md'
              placeholder='Enter here' 
              required/>
          </div>
        </div>
        <div>
          <button
            type='submit'
            className='text-red-100 bg-[#c21414] px-4 py-2 m-10 rounded-md text-lg shadow-md hover:bg-[#f00] transition-all'
            onClick={handleAdd} disabled={submit}>
            {submit ? "Adding almanac" : "Add almanac"}
          </button>
        </div>
      </div>

      {/*get all the almanac */}
      {
        loading? <Loader/> :
        <div>
           <h1 className='text-red-200 text-4xl p-3 w-full text-center font-serif'>Best of Almanac</h1>
           {
            almanacData.length > 0 ? 
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5 bg-[#c3712958] p-2 rounded-lg'>
              {
                almanacData.map((almanac, index) => (
                  <div
                  className='p-3 bg-[#ec1901] rounded-lg text-red-200'
                  key={index}>
                    <img src={almanac.photo} 
                    alt="almanac image"
                    className='h-52 w-full' />
                    <h2 className='text-lg font-bold'>{almanac.username}</h2>
                    <h3 className='font-semibold'>{almanac.department}</h3>
                    <hr />
                    <button 
                    type='submit'
                    className='text-red-100 bg-[#c21414] px-4 py-2 mt-3 rounded-md text-lg shadow-md hover:bg-[#710505] transition-all'
                    onClick={() => handleDelete(almanac._id)}>Delete</button>
                  </div>
                ))
              }
            </div> 
            : 
            <p className='text-red-200 text-xl'>No Almanac Found</p>
           }
        </div>
      }
    </>
  )
}

export default AdminAlmanac;