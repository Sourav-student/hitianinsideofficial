import React, { useEffect, useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import { toast } from "react-toastify";
// import { FacebookEmbed } from "react-social-media-embed";
import AOS from 'aos';
import 'aos/dist/aos.css';
import AddEvent from '../../components/AddEvent/AddEvent';
import { handleChangeEvent } from '../../../functions/functions'
import { getAdminEvent, editEvent, deleteEvent } from "../../../api/adminapis";

const AdminEvent = () => {

  const [events, setEvents] = useState([]);
  const [originalEvents, setOriginalEvents] = useState([]);
  const [loading, setLoading] = useState(true)

  // for Animation
  useEffect(() => {
    AOS.init({ duration: 1700 })
  }, [])

  // for events
  useEffect(() => {
    const loadEvents = async () => {
      const result = await getAdminEvent();
      setEvents(result.data);
      setOriginalEvents(result.data);
      setLoading(false);
    }

    loadEvents();
  }, [])

  //delete in event
  const handleDelete = async (index) => {
    try {
      const id = events[index]._id;
      const result = await deleteEvent(id);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  //Change in Database
  const handleChange = async (index) => {
    try {
      const id = events[index]._id;
      const data = events[index];
      if (originalEvents[index] === data) {
        toast.warning("No changes found");
        return;
      }

      const result = await editEvent(id, data);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
        {
          loading ?
            <h2 className="w-full text-xl text-[#ffb5b5] text-left  px-3 font-semibold">Loading...</h2> :
            <div className="allthrebox Events-cards flex flex-wrap justify-center items-center gap-8 px-3 mb-5 font-sans" data-aos="fade-up">
              {
                events.map((event, index) => (
                  <div className="bg-[#d03c19] w-auto rounded-lg h-[800px]" key={index}>
                    <InstagramEmbed
                      url={event.insta_url}
                      className="rounded-t-lg h-[60%]"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-base mb-2 text-white">
                        NAME: <input type="text"
                          name="eventName" value={event.event_name}
                          className="bg-[#d03c19]"
                          onChange={(e) => handleChangeEvent(events, setEvents, index, e, "eventName")}
                        />
                      </div>
                      <div className="font-bold text-base mb-2 text-white">
                        DATE: <input type="text"
                          name="date" value={event.date}
                          className="bg-[#d03c19]"
                          onChange={(e) => handleChangeEvent(events, setEvents, index, e, "date")}
                        />
                      </div>
                      <div className="font-bold text-base mb-2 text-white">
                        Year: <input type="text"
                          name="date" value={event.year}
                          className="bg-[#d03c19]"
                          onChange={(e) => handleChangeEvent(events, setEvents, index, e, "year")}
                        />
                      </div>
                      <div className="font-bold text-base mb-2 text-white">
                        instaURL: <input type="text"
                          name="date" value={event.insta_url}
                          className="bg-[#d03c19]"
                          onChange={(e) => handleChangeEvent(events, setEvents, index, e, "instaURL")}
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
        }
      </section>
    </div>
  )
}

export default AdminEvent;