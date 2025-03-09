import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import map from '../assets/map.jpg';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)

  useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])

  return (
    <div className='h-screen relative '>
    <div className='fixed p-2 top-0 flex items-center justify-between w-full' >
      <img className='w-16 ' src={logo} alt="logo" />
      <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center  justify-center rounded-full'>
        <i className="text-lg font-medium  ri-logout-box-r-line"></i>
      </Link>
    </div>
    <div className='h-4/5'>
      <img className='h-full w-full object-cover' src={map}
        alt='map' />
    </div>
    <div className="h-1/5 p-6  flex relative items-center justify-between bg-yellow-500"
    onClick={() =>{
      setFinishRidePanel(true)
    }}>
    
    <h5 className='p-1 text-center absolute w-[95%]  top-0 ' onClick={() => {

      }}><i className=" text-3xl text-black ri-arrow-up-wide-line"></i></h5>
    <h4 className='text-xl  font-semibold'>3 Km away</h4>
    <button className=' bg-green-400 text-white font-semibold p-3 px-4 rounded-lg'>Complete Ride</button>
   
    </div>
    <div ref={finishRidePanelRef} className='fixed  w-full h-screen z-10 bg-white bottom-0  translate-y-full   px-3 py-10 pt-14'>
        <FinishRide  setFinishRidePanel={setFinishRidePanel} />
      </div>
    
  </div>
  )
}

export default CaptainRiding