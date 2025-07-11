import React, { useState, useEffect } from 'react'
import { poemFormSubmit } from '../../api/userapis';
import { toast } from 'react-toastify';

const PoemSubmition = () => {

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    year: '1st Year',
    department: 'Applied Electronics and Instrumentation Engineering',
    rollNo: '',
    contactNo: '',
    instaID: '',
    title: '',
    poem: ''
  })

  const [submitting, setSubmitting] = useState(false)

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

  //Poem Form Submition
  const handleSubmit = async () => {
    try {
      if (formData.name === '' || formData.contactNo === '' || formData.rollNo === '' || formData.title === '' || formData.poem === '') {
        toast.warning("Fill the form first!!");
        return;
      }

      //contact number validation
      if (formData.contactNo.length !== 10) {
        toast.warning("Invalid number!!");
        return;
      }
      setSubmitting(true);

      // response from backend
      const result = await poemFormSubmit(formData);
      toast.success(result.data.message);

      //reset form data
      setFormData({
        name: '',
        year: '1st Year',
        department: 'Applied Electronics and Instrumentation Engineering',
        rollNo: '',
        contactNo: '',
        instaID: '',
        title: '',
        poem: ''
      })

    } catch (error) {
      toast.error("Failed to submit. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-white text-3xl font-semibold text-center mt-6 mb-8">
        Submit Your Poem and Be Part of Our Almanac
      </h1>

      <div className="flex flex-col justify-center items-center w-full px-4 bg-[#650808] text-white py-6 rounded-lg shadow-lg">
        {/* Name */}
        <div className={inpDivStyle}>
          <label htmlFor="name" className={labelStyle}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Enter your full name"
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
            className="bg-[#d83939] rounded-lg w-full h-10 p-2"
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
            className="bg-[#d83939] rounded-lg w-full h-10 p-2"
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          >
            <option value="" disabled>Select Department</option>
            {depts.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Roll Number */}
        <div className={inpDivStyle}>
          <label htmlFor="rollNum" className={labelStyle}>
            Roll Number <span className="text-sm text-gray-300">(e.g., 24/CSE/189)</span>
          </label>
          <input
            type="text"
            id="rollNum"
            name="rollNum"
            value={formData.rollNo}
            placeholder="Enter your roll number"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
            required
          />
        </div>

        {/* Contact Number */}
        <div className={inpDivStyle}>
          <label htmlFor="contactNo" className={labelStyle}>
            Contact Number <span className="text-sm text-gray-300">(Preferably WhatsApp)</span>
          </label>
          <input
            type="text"
            id="contactNo"
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
          <label htmlFor="insta" className={labelStyle}>
            Instagram Handle or Profile Link <span className="text-sm text-gray-300">(optional)</span>
          </label>
          <input
            type="text"
            id="insta"
            name="insta"
            value={formData.instaID}
            placeholder="e.g., @yourhandle or link"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, instaID: e.target.value })}
          />
        </div>

        {/* Title */}
        <div className={inpDivStyle}>
          <label htmlFor="title" className={labelStyle}>Poem Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            placeholder="Give your poem a title"
            className={inpStyle}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        {/* Poem */}
        <div className={inpDivStyle}>
          <label htmlFor="poem" className={labelStyle}>Your Poem</label>
          <textarea
            id="poem"
            name="poem"
            value={formData.poem}
            placeholder="Write your poem here..."
            className={`${inpStyle} h-[150px] resize-none p-2`}
            onChange={(e) => setFormData({ ...formData, poem: e.target.value })}
            required
          />
        </div>

        {/* Submit */}
        <div className="w-full flex justify-center mt-6">
          <button
            className="py-3 px-6 bg-[#e04444] hover:bg-[#ff0000] text-white font-bold rounded-lg transition-all duration-300"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </>

  )
}

export default PoemSubmition