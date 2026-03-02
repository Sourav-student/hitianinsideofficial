import React, { useState, useRef } from "react";
import { toast } from 'react-toastify';
import { contactFormSubmit } from "../../api/userapis";

const ContantUs = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    try {
      if (formData.name === '' || formData.email === '' || formData.message === '') {
        toast.warning("Fill the form first");
        return;
      }

      //response from server
      const result = await contactFormSubmit(formData);

      //reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      })

      //message user that form is submitted successfully
      toast.success(result.data.message);

    } catch (error) {
      toast.error("Something went wrong!!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Contact US */}
      <div className="contactus mt-2 col-span-3 md:col-span-1 max-md:mb-10 sm:hidden">
        <h1 className="heading text-[1.5rem] font-bold text-[#f2b5b5]">Contact Us</h1>
        <form className="form mt-2 grid justify-center" ref={ref} onSubmit={
          (e) => {
            handleSubmit(e);
            ref.current.reset()
          }}
        >
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className="formInput placeholder:text-[#650808] bg-[#f2b5b5] rounded-md m-1 h-8 text-[#650808] font-medium"
            required />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            className="bg-[#f2b5b5] placeholder:text-[#650808] rounded-md m-1 h-8 text-[#650808] font-medium"
            required
          />
          <input
            name="message"
            type="text-area"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Write a message"
            className="formInput bg-[#f2b5b5] placeholder:text-[#650808] ps-2 rounded-md m-1 h-16 text-[#650808] font-medium"
            required
          />
          <button type="submit" className="text-[#650808] mt-2 font-bold bg-[#FFB5B5] text-[0.9rem] w-[80px] h-[32px] rounded-[50px]" disabled={submitting}>{submitting ? "Submitting" : "Submit"}</button>
        </form>
      </div>
    </div>
  )
}

export default ContantUs;