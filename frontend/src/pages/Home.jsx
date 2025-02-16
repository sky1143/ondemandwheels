import React, { useRef, useState } from 'react'
import logo from '../assets/logo.png'
import map from '../assets/map.jpg'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSeachPanel from '../components/LocationSeachPanel';
const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false);



  const submitHandler = (e) => {
    e.preventDefault();
  }



  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
        // opacity:1
      })

      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0
        // opacity:0
      })

      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {

  })

  return (

    <div className='h-screen relative overflow-hidden' >
      <img className='w-16 h-20 absolute left-3 top-0' src={logo}
        alt='logo' />

      <div className='w-screen h-screen '>
        {/* Image for temporay use */}
        <img className='w-screen h-screen object-cover' src={map}
          alt='map' />
      </div>
      <div className=' flex flex-col justify-end h-screen absolute bottom-0 w-full '>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className='absolute opacity-0 top-6 right-6 text-2xl '>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip </h4>
          <form onSubmit={(e) => {
            submitHandler()
          }} >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
            <input
              onClick={(e) => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              className='bg-[#eeee] px-11 py-2 text-lg rounded-lg mt-5 w-full'
              type="text"
              placeholder='Add a pick-up Location'
            />

            <input
              onClick={(e) => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              className='bg-[#eeee] px-11 py-2 text-lg rounded-lg  mt-3 w-full'
              type="text"
              placeholder='Enter your destination'
            />
          </form>
        </div>
        <div ref={panelRef} className=' bg-white   h-0  '>
          <LocationSeachPanel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} />

        </div>

      </div>
      <div className='fixed  w-full z-10 bg-white bottom-0 translate-y-full px-3 py-8'>
        <h3 className='text-xl font-semibold mb-5'>Choose Vehicle</h3>
        <div className='flex w-full p-2 border active:border-black rounded-xl mb-2 items-center justify-between'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
          <div className="w-1/2">
            <h4 className='font-medium text-base'>OdwxGo <span><i className="ri-user-fill">4</i></span></h4>
            <h5 className='font-medium text-sm' >2 mins away </h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹150.20</h2>
        </div>

        <div className='flex w-full p-2 border active:border-black rounded-xl mb-2 items-center justify-between'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className="w-1/2">
            <h4 className='font-medium text-base'>Motocyle <span><i className="ri-user-fill">1</i></span></h4>
            <h5 className='font-medium text-sm' >3 mins away </h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, bike rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹65.20</h2>
        </div>

        <div className='flex w-full p-2 border active:border-black rounded-xl mb-2 items-center justify-between'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className=" w-1/2">
            <h4 className='font-medium text-base'>Odwx auto <span><i className="ri-user-fill">3</i></span></h4>
            <h5 className='font-medium text-sm' >3 mins away </h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹120.40</h2>
        </div>
      </div>

    </div>

  )
}

export default Home
