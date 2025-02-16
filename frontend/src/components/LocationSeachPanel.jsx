import React from 'react'

const LocationSeachPanel = () => {

    // Sample array of location
    const location = [
        "56B , Near cyber cafe,  Gol Market Sp Nagar, Gandhi Nagar, Delhi",
        "16C , Near Donald Trump, building Gol Market Sp Nagar, Gandhi Nagar, Delhi",
        "22B , Near Obama House, Gol Market Sp Nagar, Gandhi Nagar, Delhi",
        "34A , Near Sharma's cafe, House Gol Market Sp Nagar, Gandhi Nagar, Delhi"

    ]

   

    return (
        <div>
            {/* this is just a sample  data*/}
            {
                location.map(function (key) {
                    return <div className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start">
                        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full '><i className="ri-map-pin-fill "></i></h2>
                        <h4 className='font-medium'>{key}</h4>
                    </div>
                })
            },
           





        </div>
    )
}

export default LocationSeachPanel