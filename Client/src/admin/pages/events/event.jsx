import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { InstagramEmbed } from "react-social-media-embed";
// import { FacebookEmbed } from "react-social-media-embed";
import AOS from 'aos';
import 'aos/dist/aos.css';
import AddEvent from '../../components/AddEvent/AddEvent';
import { getEvents } from "../../../api/userapis";
import { editEvent } from "../../../api/adminapis";
import { deleteEvent } from "../../../api/adminapis";
import { toast } from "react-toastify";

const AdminEvent = () => {

  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const navigate = useNavigate();

  // for Animation
  useEffect(() => {
    AOS.init({ duration: 1700 })
  }, [])

  // for events
  useEffect(() => {
    const loadEvents = async () => {
      const result = await getEvents();
      setEvents(result.data);
    }

    loadEvents();
  }, [])

  //for admin
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    setIsAdmin(userInfo.admin)
  }, [isAdmin])

  //check admin or not
  if (!isAdmin) {
    navigate("/events")
  }

  //delete in event
  const handleDelete = async (index) => {
    try {
      const id = events[index]._id;
      const result = await deleteEvent(id);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  }


  //make changes in event
  const handleChangeEvent = (index, e, title) => {
    const updatedEvents = [...events];

    if (title === "eventName") {
      updatedEvents[index] = {
        ...updatedEvents[index],
        eventName: e.target.value
      }
    }

    if (title === "date") {
      updatedEvents[index] = {
        ...updatedEvents[index],
        date: e.target.value
      }
    }

    if (title === "year") {
      updatedEvents[index] = {
        ...updatedEvents[index],
        year: e.target.value
      }
    }

    if (title === "instaURL") {
      updatedEvents[index] = {
        ...updatedEvents[index],
        instaURL: e.target.value
      }
    }

    setEvents(updatedEvents);
  }

  //Change in Database
  const handleChange = async (index) => {
    try {
      const id = events[index]._id;
      const data = events[index];
      const result = await editEvent(id, data);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <div className="bg-[#650808] flex justify-center">
      <section className="events-home pb-16 w-full md:w-[80%]">
        <section className="flex flex-col justify-center items-center p-4">
          <h1 className="text-white text-3xl font-bold text-left">Add Event</h1>
          <AddEvent />
        </section>


        {/* events conduct by hitian inside */}
        <h1 className="text-white text-3xl font-bold m-4">Our Events</h1>
        <div className="allthrebox Events-cards flex flex-wrap justify-center items-center gap-8 px-3 mb-5 font-sans" data-aos="fade-up">
          {
            events.map((event, index) => (
              <div key={index} className="bg-[#d03c19] w-auto rounded-lg h-[800px]">
                <InstagramEmbed
                  url={event.instaURL}
                  className="rounded-t-lg h-[60%]"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-base mb-2 text-white">
                    NAME: <input type="text"
                      name="eventName" value={event.eventName}
                      className="bg-[#d03c19]"
                      onChange={(e) => handleChangeEvent(index, e, "eventName")}
                    />
                  </div>
                  <div className="font-bold text-base mb-2 text-white">
                    DATE: <input type="text"
                      name="date" value={event.date}
                      className="bg-[#d03c19]"
                      onChange={(e) => handleChangeEvent(index, e, "date")}
                    />
                  </div>
                  <div className="font-bold text-base mb-2 text-white">
                    Year: <input type="text"
                      name="date" value={event.year}
                      className="bg-[#d03c19]"
                      onChange={(e) => handleChangeEvent(index, e, "year")}
                    />
                  </div>
                  <div className="font-bold text-base mb-2 text-white">
                    instaURL: <input type="text"
                      name="date" value={event.instaURL}
                      className="bg-[#d03c19]"
                      onChange={(e) => handleChangeEvent(index, e, "instaURL")}
                    />
                  </div>
                </div>
                <div className="flex justify-around text-white m-3">
                  <button className='bg-[#bb1d1d] hover:bg-[#e01414] p-2 rounded-lg font-medium' onClick={() => handleChange(index)}>Make Changes</button>
                  <button className='bg-[#bb1d1d] hover:bg-[#e01414] p-2 rounded-lg font-medium' onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default AdminEvent;