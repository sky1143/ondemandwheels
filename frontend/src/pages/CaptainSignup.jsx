import React , {useState} from 'react'
import logo from '../assets/captainlogo.png'
import { Link } from 'react-router-dom'
const CaptainSignup = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    setUserData({
      fullName:{
        firstName:firstName,
        lastName:lastName,
      },
      email:email,
      password:password
    })
    
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-3 h-screen flex flex-col justify-between' >
      <div>
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

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
          >Login</button>
          <p className='text-center'> Already have an account ? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
        </form>
      </div>
      <div>
        <p className='text-xs leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy </span>
         and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  
  )
}

export default CaptainSignup
