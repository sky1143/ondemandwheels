import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center absolute w-[93%] top-0 ' onClick={() => {
        props.setVehiclePanel(false)
      }}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
      <h3 className='text-xl font-semibold mb-5'>Choose Vehicle</h3>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
      }} className='flex w-full p-2 border active:border-black rounded-xl mb-2 items-center justify-between'>
        <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
        <div className="w-1/2">
          <h4 className='font-medium text-base'>OdwxGo <span><i className="ri-user-fill">4</i></span></h4>
          <h5 className='font-medium text-sm' >2 mins away </h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹150.20</h2>
      </div>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
      }} className='flex w-full p-2 border active:border-black rounded-xl mb-2 items-center justify-between'>
        <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
        <div className="w-1/2">
          <h4 className='font-medium text-base'>Motocyle <span><i className="ri-user-fill">1</i></span></h4>
          <h5 className='font-medium text-sm' >3 mins away </h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, bike rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹65.20</h2>
      </div>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
      }} className='flex w-full p-2 border active:border-black rounded-xl mb-2 items-center justify-between'>
        <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
        <div className=" w-1/2">
          <h4 className='font-medium text-base'>Odwx auto <span><i className="ri-user-fill">3</i></span></h4>
          <h5 className='font-medium text-sm' >3 mins away </h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹120.40</h2>
      </div>
    </div>
  )
}

export default VehiclePanel