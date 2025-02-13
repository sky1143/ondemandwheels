import React, { useContext, useState }  from 'react'
import { Link , useNavigate } from 'react-router-dom'
import  logo  from '../assets/captainlogo.png'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
const CaptainLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   
    const {captain , setCaptain } = useContext(CaptainDataContext)
    const navigate = useNavigate();


    const submitHandler = async (e) => {
      e.preventDefault();
      const captainLogin ={
        email:email,
        password:password
      } 
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainLogin)
        if( response.status === 200) {
          const data = response.data;
          setCaptain(data.captain)
          localStorage.setItem('token', data.token)
         setTimeout(() => {
          navigate('/captain-home')
         }, 100)
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
      setEmail('')
      setPassword('')
     
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
