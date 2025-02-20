import React from 'react'
import { Link } from 'react-router-dom'
import map from '../assets/map.jpg'
import logo from '../assets/logo.png'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
const CaptainHome = () => {
  return (
    <div className='h-screen'>
      <div className='fixed p-2 top-0 flex items-center justify-between w-full' >
        <img className='w-16 ' src={logo} alt="logo" />
        <Link to='/home' className=' h-10 w-10 bg-white flex items-center  justify-center rounded-full'>
          <i className="text-lg font-medium  ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src={map}
          alt='map' />
      </div>
      <div className="h-2/5 p-6 ">
        <CaptainDetails/>
      </div>
      <div className='fixed  w-full z-10 bg-white bottom-0  px-3 py-10 pt-14'>
        <RidePopUp/>
      </div>
    </div>
  )
}

export default CaptainHome
