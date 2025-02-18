import React, { useRef, useState } from 'react'
import logo from '../assets/logo.png';
import map from '../assets/map.jpg';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSeachPanel from '../components/LocationSeachPanel';
import VehiclePanel from '../components/VehiclePanel';
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
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

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
          <LocationSeachPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />

        </div>

      </div>
      <div ref={vehiclePanelRef} className='fixed  w-full z-10 bg-white bottom-0 translate-y-full px-3 py-10 pt-14'>
        <VehiclePanel setVehiclePanel={setVehiclePanel} />
      </div>

    </div>

  )
}

export default Home
  