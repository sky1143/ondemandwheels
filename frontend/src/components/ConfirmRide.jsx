import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center absolute w-[93%] top-0 ' onClick={() => {
        props.setConfirmRidePanel(false)
      }}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
      <h3 className='text-xl font-semibold mb-5'>Choose Your Ride</h3>

      <div className='flex flex-col gap-2 justify-between items-center'>
        <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
        <div className='w-full mt-5'>

          <div className="flex  items-center gap-5 p-3 border-b-2 ">
            <i className=" text-lg ri-map-pin-user-fill"></i>
            <div className=''>
              <h3 className='text-lg font-medium'>896/22-B</h3>
              <p className='text-sm -mt text-gray-600' >{props.pickup}</p>
            </div>
          </div>
          <div className="flex  items-center gap-5 p-3 border-b-2 ">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div >
              <h3 className='text-lg font-medium'>896/22-B</h3>
              <p className='text-sm -mt  text-gray-600' >{props.destination}</p>
            </div>
          </div>
          <div className="flex  items-center gap-5 p-3  " >
            <i className=" text-lg ri-money-rupee-circle-line"></i>
            <div className=''>
              <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
              <p className='text-sm -mt  text-gray-600' >Cash Cash</p>
            </div></div>

          <button onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.createRide()

          }} className='w-full mt-5 bg-green-400 text-white font-semibold p-2 rounded-lg' >Confirm</button>
         
        </div>
      </div>
    </div>
  )
}

export default ConfirmRide