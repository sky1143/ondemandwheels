import React, { useEffect, useRef, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import map from '../assets/map.jpg'
import logo from '../assets/logo.png'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [ConfirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null)
  const ConfirmRidePopupPanelRef = useRef(null)

  const { socket } = useContext(SocketContext);
const { captain } = useContext(CaptainDataContext);

// useEffect(() => {
//   if (!socket) {
//       console.warn("⏳ Waiting for socket initialization...");
//       return;
//   }

//   // Emit join event after confirming socket is connected
//   socket.on("connect", () => {
//       console.log(`📡 Emitting join event for captain ID: ${captain?._id || storedCaptainId}`);
//       socket.emit('join', {
//           userId: captain?._id || storedCaptainId, 
//           userType: 'captain'
//       }, (ack) => {
//           if (ack && ack.error) {
//               console.error('Join error:', ack.error);
//           } else {
//               console.log('✅ Join successful');
//           }
//       });
//   });

//   return () => {
//       socket.off("connect"); // Clean up the event listener
//   };

// }, [socket, captain]);

 useEffect(() => {

    if (!captain) return
    console.log(captain)

    socket.emit("join", { userType: 'captain', userId: captain.id })
  }, [captain])


  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(5%)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])

  

  useGSAP(function () {
    if (ConfirmRidePopupPanel) {
      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ConfirmRidePopupPanel])


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
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className='fixed  w-full z-10 bg-white bottom-0  translate-y-full   px-3 py-10 pt-14'>
        <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
      <div ref={ConfirmRidePopupPanelRef} className='fixed  w-full h-screen z-10 bg-white bottom-0  translate-y-full   px-3 py-10 pt-14'>
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  )
}

export default CaptainHome
