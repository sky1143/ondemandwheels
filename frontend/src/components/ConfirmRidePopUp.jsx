import React from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  return (
    <div className='h-screen'>
      <h5 className='p-1 text-center absolute w-[93%] top-0 ' onClick={() => {
        props.setRidePopupPanel(false)
      }}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
      <h3 className='text-xl font-semibold mb-5'>Confirm ride to start</h3>
      <div className='flex items-center justify-between  p-3 rounded-lg bg-yellow-300 '>
        <div className='flex items-center gap-3 '>
          <img className='h-10 w-10 object-cover rounded-full' src="https://live.staticflickr.com/7160/6410037157_8a32776d93_b.jpg" alt="" />
          <h2 className='text-lg font-medium'>Sunil Patil</h2>
        </div>
        <h5 className='text-lg font-semibold'>3.2 Km</h5>
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

          <Link to='/captain-riding' className='w-full mt-5 flex bg-green-400 justify-center  text-white font-semibold p-2 rounded-lg' >Confirm</Link>

          <button onClick={() => {
           
            props.setRidePopupPanel(false)
            props.setConfirmRidePopupPanel(false)

          }} className='w-full mt-2 bg-red-500 text-white font-semibold p-2 rounded-lg' >Cancel</button>

        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp