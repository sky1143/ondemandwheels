import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import  logo  from '../assets/captainlogo.png'
const CaptainLogin = () => {
    const [email, setEmail] = useState('')
  
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})
    
    const submitHandler = (e) => {
      e.preventDefault();
      setCaptainData({
        email:email,
        password:password
      })

      console.log(captainData)
      setEmail('')
      setPassword('')
      console.log(email,password);
    }
  return (
    <div className='p-3  h-screen flex flex-col justify-between' >
    <div>
    <img className='w-20 mb-2' src={logo} />
    <form onSubmit={(e) => {
      submitHandler(e)
    }} >
      <h3 className='text-lg font-medium mb-2'>What's your email</h3>
      <input
        className='bg-[#eeeeee] rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base'
        type="email"
        placeholder='email@example.com'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        required />

      <h3 className='text-lg font-medium  mb-2'>Enter Password</h3>
      <input
        className='bg-[#eeeeee] rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base'
        type="password"
        placeholder='password'
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        required />

      <button
        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
      >Login</button>
     
     <p className='text-center'>Join a fleet <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
       
    </form>
    </div>
    <div>
      <Link to = '/login'
        className='bg-[#d5622d] flex items-center justify-center text-white mb-5 font-semibold rounded px-4 py-2  w-full text-lg placeholder:text-base'
      >Sign in as User</Link>
    </div>
  </div>
  )
}

export default CaptainLogin
