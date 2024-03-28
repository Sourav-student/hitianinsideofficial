import React from 'react'
// import "./Merchandise.css";
import { BiDownArrowCircle } from "react-icons/bi";
// import tshirtf from "../../assets/images/t-shirt-front.jpg";
import hoodie from "../../assets/images/merchandise/hoodies2023.jpg"
import tshirt from "../../assets/images/merchandise/summer_2024.png"
import qr from "../../assets/images/QR.png";

function Merchandise() {
  return (
    <section className='bg-[#650808] pt-5 pb-10'>

    {/* <div className=" h-[90vh] flex align-middle justify-center">
      <div className='text-box flex items-center justify-center flex-col '>
        <p className=' text-[6rem] text-white font-bold'>Merchandise</p>
        <p className='w-[70%]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus minus est quis reprehenderit ducimus. Ducimus.</p>

      </div>


    </div> */}
    
    <section className=" h-[20vh] md:h-[30vw] header flex justify-center items-center text-[#fbb3b3]">
        {/* header section    */}
        <div className=" w-[80%] ">
          <p className=" text-[6vw] font-[500] font-hammersmith md:text-[6vw]">
            Merchandise
          </p>
          <p className=" font-hammersmith text-[60%] md:text-[100%] ">
            {/* somewhere between better and best are there. */}
          </p>
          <p className=" flex justify-center mt-3">
            <a href="#merchandise">
              <BiDownArrowCircle className=" text-[7vw] md:text-[3vw]" />
            </a>
          </p>
        </div>
      </section>



    

    {/* ********* test box start ********* */}
    
      <div id='merchandise' className='merch-home bg-[#d28888] mt-10 flex justify-center flex-col md:flex-row gap-5 py-20'>
        
        <div className='bg-[#fcf6f6] h-full w-fit md:w-fit rounded-xl '>

          <div className="merch flex flex-row justify-center items-center px-5 pt-5 pb-1 ">
            <img src={hoodie} alt="front tshirt" className='w-[full] md:w-[20vw] rounded-xl' />
            
          </div>
          <div className=" h-full pb-5 flex justify-start text-left flex-col gap-1 px-5">
              <div className=" font-bold text-[15px]">The Winter Avatar 2022</div>
              <div className="text-[90%]">Available size</div>
              <div className=" flex flex-row gap-3 ms-3">
                <button className='bg-red-400 rounded-[50%] font-bold w-7 h-7'>S</button>
                <button className='bg-red-800 text-red-100  font-bold rounded-[50%] w-7 h-7'>M</button>
                <button className='bg-red-400 rounded-[50%]  font-bold w-7 h-7'>L</button>
                <button className='bg-red-400 rounded-[50%]  font-bold w-7 h-7'>XL</button>
              </div>
              <div className="btn mt-3">
                <button className='w-full rounded-[20px] p-2 bg-red-900 text-white font-bold'>BUY NOW</button>
              </div>

          </div>
        </div> 


        <div className='bg-[#fcf6f6] h-full w-fit md:w-fit rounded-xl '>

          <div className="merch flex flex-row justify-center items-center px-5 pt-5 pb-1 ">
            <img src={tshirt} alt="front tshirt" className='w-[full] md:w-[18vw] rounded-xl' />
            
          </div>
          <div className=" h-full pb-5 flex justify-start text-left flex-col gap-1 px-5">
              <div className=" font-bold text-[15px]">The Summer Avtar 2024</div>
              <div className="text-[90%]">Available size</div>
              <div className=" flex flex-row gap-3 ms-3">
                <button className='bg-red-400 rounded-[50%] font-bold w-7 h-7'>S</button>
                <button className='bg-red-800 text-red-100  font-bold rounded-[50%] w-7 h-7'>M</button>
                <button className='bg-red-400 rounded-[50%]  font-bold w-7 h-7'>L</button>
                <button className='bg-red-400 rounded-[50%]  font-bold w-7 h-7'>XL</button>
              </div>
              <div className="btn mt-3">
                <button className='w-full rounded-[20px] p-2 bg-red-900 text-white font-bold'>BUY NOW</button>
              </div>

          </div>
        </div>
        
      </div>
      {/* **********test box end ********** */}
      
    </section>
  )
}

export default Merchandise