import React from 'react'
import map from '../assets/map.jpg'
import { Link } from 'react-router-dom'
const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to ='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center  justify-center rounded-full'> 
                <i className=" text-lg font-medium ri-home-2-line"></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src={map}
                    alt='map' />
            </div>
            <div className="h-1/2 p-4 ">
                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>Suresh</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>  MP04 AB 5612</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Baleno</p>
                    </div>
                </div>

                <div className='flex flex-col gap-2 justify-between items-center'>
                    <div className='w-full mt-5'>

                        
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


                    </div>
                </div>

                <button className='w-full mt-5 bg-green-400 text-white font-semibold p-2 rounded-lg'>Make a payment</button>
            </div>
        </div>
    )
}

export default Riding