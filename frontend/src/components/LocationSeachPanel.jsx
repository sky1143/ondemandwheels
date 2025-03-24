
import React from "react";
const LocationSeachPanel = ({ suggestions, setPanelOpen, setVehiclePanel, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestions) => {
        if (activeField === 'pickup') {
            setPickup(suggestions)
        } else if (activeField === 'destination') {
            setDestination(suggestions)
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }

    return (
        <div>
            {
                suggestions.map((elem, index) => (
                    <div className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer"
                        key={index} onClick={() => handleSuggestionClick(elem)} >
                        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full '>
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSeachPanel






// import React from 'react'

// const LocationSeachPanel = ({suggestions, setPanelOpen, setVehiclePanel, setPickup, setDestination, activeField}) => {
//     console.log(props);

//     // Sample array of location Static
//     // const location = [
//     //     "56B , Near cyber cafe,  Gol Market Sp Nagar, Gandhi Nagar, Delhi",
//     //     "16C , Near Donald Trump, building Gol Market Sp Nagar, Gandhi Nagar, Delhi",
//     //     "22B , Near Obama House, Gol Market Sp Nagar, Gandhi Nagar, Delhi",
//     //     "34A , Near Sharma's cafe, House Gol Market Sp Nagar, Gandhi Nagar, Delhi"

//     // ]



//     return (
//         // <div>

//         //     {
//         //         location.map(function (elem ,id) {
//         //             return <div key={id} onClick={() => {
//         //                 props.setVehiclePanel(true)
//         //                 props.setPanelOpen(false)
//         //             }} className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start">
//         //                 <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full '><i className="ri-map-pin-fill "></i></h2>
//         //                 <h4 className='font-medium'>{elem}</h4>
//         //             </div>
//         //         })
//         //     },


//         // </div>


//     )
// }

// export default LocationSeachPanel

// 