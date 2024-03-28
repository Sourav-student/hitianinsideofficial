import React, { useState } from "react";
import { BiDownArrowCircle } from "react-icons/bi";

import recruitposter from "../../assets/images/recruitment/Recruitment_poster.png";
import recruitheader from "../../assets/images/recruitment/recuritment_header.png";
import { Link } from "react-router-dom";
import Teamtable from "./TeamData/Teamtable";

function Team() {
  const teaminfo = [
    { year: 2019, type: "y1" },
    { year: 2020, type: "y2" },
    { year: 2021, type: "y3" },
    { year: 2022, type: "y4" },
    { year: 2023, type: "y5" },
    { year: 2024, type: "y6" },
    // { year: 2025, type: "y7" },
  ];

  const [teamdetails, setTeamDetails] = useState("y1");

  const Team2019 = () => (
    <div className="">
      {/* <p> 2019 batch and team details 
      </p> */}
      <div className="membername flex md:flex-row text-center flex-col">
        <div className="box1">
          <Teamtable data={teamdetails} />
        </div>
        <div className="box2">
          {/* add group image  */}
          {/* image */}
        </div>
      </div>
    </div>
  );

  const Team2020 = () => (
    <div>
      {/* <h3>2020</h3>
      <p>
        team details who has passed in 2020 or fouding members list add before
        this
      </p> */}
      <Teamtable data={teamdetails} />
    </div>
  );

  const Team2021 = () => (
    <div>
      {/* <h3>2021 </h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, sint.
      </p> */}
      <Teamtable data={teamdetails} />
    </div>
  );
  const Team2022 = () => (
    <div>
      {/* <h3>2022 </h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, rem. team
        2022
      </p> */}
      <Teamtable data={teamdetails} />
    </div>
  );
  const Team2023 = () => (
    <div>
      {/* <h3>2023 </h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
        similique. team 2023
      </p> */}
      <Teamtable data={teamdetails} />
    </div>
  );
  const Team2024 = () => (
    <div>
      {/* <h3>2024  </h3>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, iure.
        team 2024
      </p> */}
      <Teamtable data={teamdetails} />
    </div>
  );

  return (
    <div className="h-full bg-[#660909] text-[white]">
      <section className=" h-[60vh] header flex justify-center items-center">
        {/* header section    */}
        <div className=" w-[80%] ">
          <p className=" text-[6vw] font-[500] font-hammersmith md:text-[6vw]">
            The Maroon Sqad Family
          </p>
          <p className=" font-hammersmith text-[60%] md:text-[100%] ">
            {/* somewhere between better and best are there. */}
          </p>
          <p className=" flex justify-center mt-3">
            <a href="#teamdata">
              <BiDownArrowCircle className=" text-[7vw] md:text-[3vw]" />
            </a>
          </p>
        </div>
      </section>

      {/* year wise team details */}

      <div id="teamdata" className="h-full bg-[#dd9c9c] ">
        <div className="buttons space-x-3 space-y-3 font-hammersmith font-bold p-3 text-red-500  ">
          {teaminfo.map((teaminfo) => (
            <button
              className="w-[20%] md:w-[10%]"
              key={teaminfo.year}
              style={{
                backgroundColor:
                  teaminfo.type === teamdetails ? "lightblue" : "white",
                fontSize: "100%",
                borderRadius: "10px",
              }}
              onClick={() => setTeamDetails(teaminfo.type)}
            >
              {teaminfo.year}
            </button>
          ))}
        </div>

        <div className=" text-black font-[500] py-5 md:px-5 px-1">
          {teamdetails === "y1" && <Team2019 />}
          {teamdetails === "y2" && <Team2020 />}
          {teamdetails === "y3" && <Team2021 />}
          {teamdetails === "y4" && <Team2022 />}
          {teamdetails === "y5" && <Team2023 />}
          {teamdetails === "y6" && <Team2024 />}
          {/* {teamdetails === "y7" && <Team2025 />} */}
        </div>
      </div>






      {/* Temporary section  */}
      {/* <Link to={Team}>
        <div className="header">
          <img src={recruitheader} alt="" />
        </div>
      </Link>

      <section className="pt-5">
        <div className="boxsection  justify-center align-middle font-hammersmith">
          <div className="text-[2rem]  text-[#f5baba] font-bold py-5">
            Fill the form :
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd4RxyUj_laFiecBYONwinvLuXDnO2D54ZGYpB_LbggEqFGvA/viewform"
              target="_blank"
              className="ms-5"
            >
              <button className="text-[#650808] font-bold bg-[#FFB5B5] text-[1.3rem] w-[150px] h-[45px] rounded-[50px] hover:scale-125 transition-all duration-700">
                Submit here
              </button>
            </a>
          </div>
        </div>

        <div className="poster p-5">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd4RxyUj_laFiecBYONwinvLuXDnO2D54ZGYpB_LbggEqFGvA/viewform"
            target="_blank"
          >
            <img src={recruitposter} alt="" />
          </a>
        </div>
      </section> */}
      {/* temporary section end  */}
    </div>
  );
}

export default Team;
