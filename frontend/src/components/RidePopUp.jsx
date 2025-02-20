import React from 'react'

const RidePopUp = () => {
  return (
    <div>
         <h5 className='p-1 text-center absolute w-[93%] top-0 ' onClick={() => {
        props.setConfirmRidePanel(false)
      }}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
      <h3 className='text-xl font-semibold mb-5'>New Ride Available!</h3>
      <div>
        <div>
            <img src="" alt="" />
        </div>
      </div>
      <div className='flex flex-col gap-2 justify-between items-center'>
       <div className='w-full mt-5'>

          <div className="flex  items-center gap-5 p-3 border-b-2 ">
            <i className=" text-lg ri-map-pin-user-fill"></i>
            <div className=''>
              <h3 className='text-lg font-medium'>896/22-B</h3>
              <p className='text-sm -mt text-gray-600' >Pragraj Nagar, Uttar pardesh</p>
            </div>
          </div>
          <div className="flex  items-center gap-5 p-3 border-b-2 ">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div >
              <h3 className='text-lg font-medium'>896/22-B</h3>
              <p className='text-sm -mt  text-gray-600' >Pragraj Nagar, Uttar pardesh</p>
            </div>
          </div>
          <div className="flex  items-center gap-5 p-3  " >
            <i className=" text-lg ri-money-rupee-circle-line"></i>
            <div className=''>
              <h3 className='text-lg font-medium'>₹193.20</h3>
              <p className='text-sm -mt  text-gray-600' >Cash Cash</p>
            </div></div>

          <button onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);

          }} className='w-full mt-5 bg-green-400 text-white font-semibold p-2 rounded-lg' >Confirm</button>

          <button onClick={() => {
           

          }} className='w-full mt-2 bg-gray-200 text-gray-700 font-semibold p-2 rounded-lg' >Ignore</button>
         
        </div>
      </div>
    </div>
  )
}

export default RidePopUp