import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/captainlogo.png'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'


const CaptainSignup = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')


  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newCaptain = {
      firstname: firstName.trim().toLowerCase(),
      lastname: lastName.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password: password,
      vehicleColor: vehicleColor.trim().toLowerCase(),
      vehiclePlate: vehiclePlate.trim().toLowerCase(),
      vehicleCapacity: vehicleCapacity,
      vehicleType: vehicleType.trim().toLowerCase()

    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain)
      
      if (response.status === 201) {
        const data = response.data;
       
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)

        setTimeout(() => {
          navigate('/captain-home');
        }, 100);        
      }
    } catch (error) {
      if (error) {
        console.error('Registration error', error.response.data)
        alert(error.response.data.message || 'Registraion Error')
      } else {
        console.error('Network Error', error)
        alert('Something went wrong Please try agian later.')
      }

    }

    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }
  return (
    <div className='p-3 h-screen flex flex-col justify-between' >
      <div >
        <img className='w-16 mb-3' src={logo} />
        <form onSubmit={(e) => {
          submitHandler(e)
        }} >
          <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
          <div className='flex gap-4 mb-4'>
            <input
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              required />
            <input
              className='bg-[#eeeeee] w-1/2 rounded  px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              required />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's our Captain's  email</h3>
          <input
            className='bg-[#eeeeee] mb-6 rounded  px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required />

          <h3 className='text-lg font-medium  mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] rounded mb-6 px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required />

          <h3 className='text-lg w-full font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>

            <input
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
              required />
            <input
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
              required />

          </div>
          <div className='flex gap-4 mb-7'>
            <input
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
              required />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='type'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)

              }}
            >
              <option value="">Select Vehicle Type</option>
              <option value="car"> Car</option>
              <option value="auto">auto</option>
              <option value="motorcycle">Moto</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
          >Create Captain account</button>
          <p className='text-center'> Already have an account ? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
        </form>
      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy </span>
          and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>

  )
}

export default CaptainSignup
