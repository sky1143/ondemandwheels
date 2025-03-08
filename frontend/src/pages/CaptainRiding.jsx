import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import map from '../assets/map.jpg';


const CaptainRiding = () => {

  return (
    <div className='h-screen'>
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
    <div className="h-1/5 p-6  flex  items-center justify-between bg-yellow-500">
    <h4 className='text-xl  font-semibold'>3 Km away</h4>
    <button className=' bg-green-400 text-white font-semibold p-3 px-4 rounded-lg'>Complete Ride</button>
   
    </div>
    
  </div>
  )
}

export default CaptainRiding