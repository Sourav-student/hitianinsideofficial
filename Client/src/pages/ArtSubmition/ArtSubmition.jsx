import React, { useState } from 'react'
import { artworkFormSubmit } from '../../api/api';

const ArtSubmition = () => {

  const [formData, setFormData] = useState({
    name: '',
    year: '1st Year',
    department: 'Applied Electronics and Instrumentation Engineering',
    rollNo: '',
    contactNo: '',
    instaID: '',
    file: null,
    desc: ''
  })

  const [submitting, setSubmitting] = useState(false);

  const depts = ["Applied Electronics and Instrumentation Engineering", "Agricultural Engineering", "BioTechnology", "Civil Engineering", "Chemical Engineering", "Computer Science and Engineering", "Computer Science and Engineering (AIML)", "Computer Science and Engineering (CS)", "Computer Science and Engineering (DS)", "Electronics and Communication Engineering", "Electrical Engineering", "Food Technology", "Information Technology", "Mechanical Engineering"];

  //CSS Styles
  const inpDivStyle = "p-5 bg-[#c37173] rounded-xl shadow-lg mb-[22px] w-[600px] max-sm:w-[400px] max-[440px]:w-[300px] max-[320px]:w-auto";
  const labelStyle = "text-xl p-1 font-semibold flex mb-1"
  const inpStyle = "bg-[#d83939] rounded-lg border-0 w-full"

  //Artwork Form Submition
  const handleSubmit = async () => {
    try {
      if (formData.contactNo.length !== 10) {
        alert("Invalid number!!");
        return;
      }
      
      setSubmitting(true);
      await artworkFormSubmit(formData);
      setSubmitting(false);
      alert("Submitted successfully!");
    } catch (error) {
      setSubmitting(false);
      alert("Failed to submit. Try again.");
    }
  };


  return (
    <>
      <h1 className='text-white text-2xl m-4'>Submit your Artwork here and be the part of our Almanac</h1>
      <div className='flex flex-col justify-center items-center w-full h-full bg-[#650808] text-white text-left mb-3'>
        {/* name */}
        <div className={inpDivStyle}>
          <label htmlFor="Name" className={labelStyle}>Name </label>
          <input type="text"
            value={formData.name}
            name='name'
            placeholder='Enter here'
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required />
        </div>

        {/* year */}
        <div className={inpDivStyle}>
          <label htmlFor="Year" className={labelStyle}>Year </label>
          <select name="year"
            id="year"
            value={formData.year}
            className='bg-[#d83939] rounded-lg border-0 w-full h-[35px] p-1'
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            required>
            <option value="1st Year" className='bg-[#d83939] rounded-lg border-0'>1st Year</option>
            <option value="2nd Year" className='bg-[#d83939] rounded-lg border-0'>2nd Year</option>
            <option value="3rd Year" className='bg-[#d83939] rounded-lg border-0'>3rd Year</option>
            <option value="4th Year" className='bg-[#d83939] rounded-lg border-0'>4th Year</option>
          </select>
        </div>

        {/* dept */}
        <div className={inpDivStyle}>
          <label htmlFor="Dept" className={labelStyle}>Department </label>
          <select name="department"
            id="year"
            value={formData.department}
            className='bg-[#d83939] rounded-lg border-0 w-full h-[35px] p-1'
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required>
            {depts.map((dept, index) => (
              <option value={dept} key={index} className='bg-[#d83939] rounded-lg border-0'>{dept}</option>
            ))}
          </select>
        </div>

        {/* roll   */}
        <div className={inpDivStyle}>
          <label htmlFor="Roll" className={labelStyle}>Roll Number <br />(type - 24/CSE/189)</label>
          <input type="text"
            name='rollNum'
            value={formData.rollNo}
            placeholder='Enter here'
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
            required />
        </div>

        {/* contact   */}
        <div className={inpDivStyle}>
          <label htmlFor="Contact" className={labelStyle}>Contact Number <br />(Preferably WhatsApp Number)</label>
          <input type="text"
            name='contactNum'
            value={formData.contactNo}
            placeholder='Enter here'
            onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
            className={inpStyle}
            required />
        </div>

        {/* insta  */}
        <div className={inpDivStyle}>
          <label htmlFor="Insta" className={labelStyle}>Instagram Handle or Profile Link(if any)</label>
          <input type="text"
            name='insta'
            placeholder='Enter here'
            className={inpStyle}
            value={formData.instaID}
            onChange={(e) => setFormData({ ...formData, instaID: e.target.value })} />
        </div>

        {/* upload */}
        <div className={inpDivStyle}>
          <label htmlFor="Roll" className={labelStyle}>Upload a high quality picture of your art.</label>
          <input type="file"
            name='file'
            placeholder='Enter here'
            className={inpStyle}
            accept='image/*'
            onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
            required />
        </div>

        {/* Description (Caption)(Optional) */}
        <div className={inpDivStyle}>
          <label htmlFor="Roll" className={labelStyle}>Description (Caption)(Optional)</label>
          <input type="text"
            name='caption'
            value={formData.desc}
            placeholder='Enter here'
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            className={inpStyle} />
        </div>
      </div>
      <button className='mb-6 py-2 px-4 bg-[#e04444] hover:bg-[#ff0000] text-white font-semibold rounded-lg' onClick={handleSubmit} disabled={submitting}>
        Submit
      </button>
    </>
  )
}

export default ArtSubmition