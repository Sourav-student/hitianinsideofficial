import React, { useState, useEffect } from 'react'
import { photoFormSubmit } from '../../api/userapis';
import { toast } from 'react-toastify';
import { use } from 'react';

const PhotoSubmition = () => {

  const [formData, setFormData] = useState({
    email: '',
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

  useEffect(() => {
    // Get user email from localStorage
    const {email} = JSON.parse(localStorage.getItem('user-info'));
    if (email) {
      setFormData({...formData, email: email });
    }
  }, []);


  //Photo Form Submition
  const handleSubmit = async () => {
    try {

      if (formData.name === '' || formData.contactNo === '' || formData.file === null || formData.rollNo === '') {
        toast.warning("Fill the form first!!");
        return;
      }

      //contact number varification
      if (formData.contactNo.length !== 10) {
        toast.warning("Invalid number!!");
        return;
      }

      setSubmitting(true);

      //response from backend
      const result = await photoFormSubmit(formData);
      toast.success(result.data.message);

      //reset form data
      setFormData({
        name: '',
        year: '1st Year',
        department: 'Applied Electronics and Instrumentation Engineering',
        rollNo: '',
        contactNo: '',
        instaID: '',
        file: null,
        desc: ''
      })
    } catch (error) {
      //error message by using toastify
      toast.error("Failed to submit. Try again.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <>
      <h1 className="text-white text-2xl m-4">
        Submit your Photograph here and be a part of our Almanac
      </h1>

      <div className="flex flex-col justify-center items-center w-full h-full bg-[#650808] text-white text-left mb-3">
        {/* Name */}
        <div className={inpDivStyle}>
          <label htmlFor="name" className={labelStyle}>Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Year */}
        <div className={inpDivStyle}>
          <label htmlFor="year" className={labelStyle}>Year</label>
          <select
            id="year"
            name="year"
            value={formData.year}
            className="bg-[#d83939] rounded-lg border-0 w-full h-10 p-1"
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            required
          >
            <option value="" disabled>Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        {/* Department */}
        <div className={inpDivStyle}>
          <label htmlFor="department" className={labelStyle}>Department</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            className="bg-[#d83939] rounded-lg border-0 w-full h-10 p-1"
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          >
            <option value="" disabled>Select Department</option>
            {depts.map((dept, index) => (
              <option value={dept} key={index}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Roll Number */}
        <div className={inpDivStyle}>
          <label htmlFor="rollNum" className={labelStyle}>Roll Number <br />(e.g., 24/CSE/189)</label>
          <input
            id="rollNum"
            type="text"
            name="rollNum"
            value={formData.rollNo}
            placeholder="Enter roll number"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
            required
          />
        </div>

        {/* Contact Number */}
        <div className={inpDivStyle}>
          <label htmlFor="contactNum" className={labelStyle}>Contact Number <br />(preferably WhatsApp)</label>
          <input
            id="contactNum"
            type="text"
            name="contactNum"
            value={formData.contactNo}
            placeholder="Enter contact number"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
            required
          />
        </div>

        {/* Instagram */}
        <div className={inpDivStyle}>
          <label htmlFor="insta" className={labelStyle}>Instagram Handle or Profile Link (optional)</label>
          <input
            id="insta"
            type="text"
            name="insta"
            value={formData.instaID}
            placeholder="Enter Instagram handle or link"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, instaID: e.target.value })}
          />
        </div>

        {/* File Upload */}
        <div className={inpDivStyle}>
          <label htmlFor="file" className={labelStyle}>Upload a high-quality picture of your art</label>
          <input
            id="file"
            type="file"
            name="file"
            accept="image/*"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
            required
          />
        </div>

        {/* Description */}
        <div className={inpDivStyle}>
          <label htmlFor="caption" className={labelStyle}>Description (Caption) <span className="text-sm text-gray-300">(Optional)</span></label>
          <input
            id="caption"
            type="text"
            name="caption"
            value={formData.desc}
            placeholder="Write a short caption"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="mb-6 py-2 px-4 bg-[#e04444] hover:bg-[#ff0000] text-white font-semibold rounded-lg"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </>

  )
}

export default PhotoSubmition