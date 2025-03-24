import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext)

    return (
        <div>
            <div className='flex items-center justify-between' >
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://live.staticflickr.com/7160/6410037157_8a32776d93_b.jpg" alt="" />
                    <h4 className='text-lg font-medium capitalize '>{captain.firstname + " " + captain.lastname}</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹150</h4>
                    <p className='text-sm  text-gray-600'>Earned</p>
                </div>

            </div>

            <div className='flex p-3 mt-2 bg-gray-100 rounded-xl justify-center gap-4 items-start '>
                <div className='text-center'>
                    <i className=" text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>10.05</h5>
                    <p className='text-xs text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className=" text-3xl mb-2 font-thin ri-speed-up-line"></i>
                    <h5 className='text-lg font-medium'>10.05</h5>
                    <p className='text-xs text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className=" text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>10.05</h5>
                    <p className='text-xs text-gray-600'>Hours Online</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails