import React, { useContext, useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.png';
import map from '../assets/map.jpg';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSeachPanel from '../components/LocationSeachPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/userContext';
import axios from 'axios'


const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestion, setPickupSuggestion] = useState([])
  const [destinationSuggestion, setDestinationSuggestion] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const { sendMessage, recieveMessage } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {

    if (!user) return
    console.log(user)

    sendMessage("join", { userType: 'user', userId: user._id })
  }, [user])

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log('Pickup Suggestions:', response.data);



      setPickupSuggestion(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching destination suggestions:', error);
      setPickupSuggestion([]);
    }

  }


  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log('Destination Suggestions:', response.data);

      setDestinationSuggestion(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error('Error fetching destination suggestions:', error);
      setDestinationSuggestion([])
    }
  }




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

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])


  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }

      })
      console.log("Fare Data:", response.data);
      setFare(response.data)

    } catch (error) {
      console.error("Error fetching fare:", error.response?.data || error.message);
    }

  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType

    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log('Create ride data', response.data);

  }


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
                setActiveField('pickup')
              }}
              value={pickup}
              // onChange={(e) => {
              //   setPickup(e.target.value)
              // }}
              onChange={handlePickupChange}
              className='bg-[#eeee] px-11 py-2 text-lg rounded-lg mt-5 w-full'
              type="text"
              placeholder='Add a pick-up Location'
            />

            <input
              onClick={(e) => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              // onChange={(e) => {
              //   setDestination(e.target.value)
              // }}
              onChange={handleDestinationChange}
              className='bg-[#eeee] px-11 py-2 text-lg rounded-lg  mt-3 w-full'
              type="text"
              placeholder='Enter your destination'
            />
          </form>
          <button onClick={findTrip}
            className='bg-black font-semibold text-white px-4 py-2 rounded-lg mt-2 w-full '
          >Find a Trip</button>
        </div>
        <div ref={panelRef} className=' bg-white   h-0  '>
          <LocationSeachPanel
            suggestions={activeField === 'pickup' ? pickupSuggestion : destinationSuggestion}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />

        </div>

      </div>
      <div ref={vehiclePanelRef} className='fixed  w-full z-10 bg-white bottom-0 translate-y-full px-3 py-10 pt-14'>
        <VehiclePanel
          selectVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed  w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12'>
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={vehicleFoundRef} className='fixed  w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12'>
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className='fixed  w-full z-10 bg-white bottom-0   px-3 py-6 pt-12'>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>

    </div>

  )
}

export default Home
