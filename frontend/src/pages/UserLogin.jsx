import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();

    const loginUser = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,loginUser)
      
      if(response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }

    } catch (error) {
      if(error){
        console.error('Error in login', error.response.data)
        alert(error.response.data.message || 'login Error')
      } else {
        console.log( 'Network Error',error)
        alert('Something went wrong, please try again')
      }
      
    }

    console.log(userData)
    setEmail('')
    setPassword('')
    console.log(email, password);
  }
  return (
    <div className='p-3 h-screen flex flex-col justify-between' >
      <div>
        <img className='w-16 mb-8 h-20' src={logo} />
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

          <p className='text-center'> New here ? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>

        </form>
      </div>
      <div>
        <Link to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white mb-5 font-semibold rounded px-4 py-2  w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
