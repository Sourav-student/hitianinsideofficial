import React, { useState, useRef } from "react";
import newLogo from "../../assets/images/insidewhitelogo.png";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import { BiLogoFacebook, BiLogoLinkedin, BiCopyright } from 'react-icons/bi'
import { BsInstagram, BsYoutube } from 'react-icons/bs'
import { contactFormSubmit } from "../../api/userapis";
// import {BiCopyright}

function Footer() {

  // const userInfo = localStorage("user-info");
  // console.log(userInfo);
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
    <>
      {/* ========= Footer ============ */}
      <footer className="bg-[#3f0909] h-full w-full grid grid-cols-3 pb-8 ">

        {/* Contact US */}
        <div className="contactus mt-2 col-span-3 md:col-span-1">
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
        <div className="sections hidden md:flex flex-col text-left ms-10 md:col-span-1">
          <h1 className="heading text-[1.5rem] font-bold mt-2 text-[#f2b5b5]">Contents</h1>
          <ul className="content-list ">
            <li className="content-items text-[#f2b5b5]">
              <Link to="/"> Home</Link>
            </li>
            <li className="content-items text-[#f2b5b5]">
              <Link to="/events">Events</Link>
            </li>
            <li className="content-items text-[#f2b5b5]">
              <Link to="almanac">Almanac</Link>
            </li>
            <li className="content-items text-[#f2b5b5]">
              <Link to="merchandise">Merchandise</Link>
            </li>
            <li className="content-items text-[#f2b5b5]">
              <Link to="team">Team</Link>
            </li>
            <li className="content-items text-[#f2b5b5]">
              <Link to="about">About</Link>
            </li>
          </ul>
        </div>
        <div className="sections hidden md:flex flex-col w-[70%] pt-3 col-span-3 md:col-span-1">
          <img src={newLogo} alt="Logo" className="w-[15vw]  " />
          <hr
            className="mt-3 w-full bg-[#f2b5b5] h-1"
          />
          <div className="social-icons flex justify-evenly mt-5 ">
            <a href="https://www.facebook.com/HITian.Inside" target="_blank">
              {/* <i class="fa-brands fa-facebook fa-2xl icon"></i> */}
              <div className="circle rounded-full bg-[#f2b5b5] h-10 w-10 flex justify-center  items-center	 ">
                <BiLogoFacebook className="h-8 w-8 " />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/company/hitian-inside/mycompany/"
              target="_blank"
            >
              {/* <i class="fa-brands fa-linkedin fa-2xl"></i> */}
              <div className="rounded-full bg-[#f2b5b5] h-10 w-10 flex justify-center  items-center	">
                <BiLogoLinkedin className="h-7 w-7" />
              </div>
            </a>
            <a href="https://www.instagram.com/hitianinside/" target="_blank">
              {/* <i class="fa-brands fa-square-instagram fa-2xl"></i> */}
              <div className="rounded-full bg-[#f2b5b5] h-10 w-10 flex justify-center  items-center">
                <BsInstagram className="h-7 w-7" />
              </div>
            </a>
            <a href="https://www.youtube.com/@hitianinside2131" target="_blank">
              {/* <i class="fa-brands fa-square-youtube fa-2xl"></i> */}
              <div className="rounded-full bg-[#f2b5b5] h-10 w-10 flex justify-center  items-center">
                <BsYoutube className="h-7 w-7" />
              </div>
            </a>
          </div>
        </div>
      </footer>




      <div className=" bg-[#280606] text-[#f2b5b5]">
        <p className="flex justify-center items-center ">
          All <BiCopyright className="ms-2 me-2" /> Copyright reserved || 2023
        </p>
      </div>
    </>
  );
}

export default Footer;
