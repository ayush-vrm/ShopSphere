import React, {useState } from 'react'
import Layout from '../Components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [securityAns,setSecurityAns] = useState("")

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/reset-password`,{
        email,
        securityAns,
        newPassword
      })

      if(res.data.success){
        toast.success(res.data && res.data.message)
        navigate('/login')
      }
      else{
        toast.error(res.data.message)
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout title="Reset Password - ShopeEase">
      <div className="register bg-gradient-to-t from-gray-600 via-gray-700 to-gray-800 pt-36 pb-36">
        <form onSubmit={handleSubmit} className="bg-white max-w-md shadow-black shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto bg-gradient-to-t from-gray-600 via-gray-700 to-gray-700 text-white">

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-300 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="sequrityAns" className="block text-sm font-bold mb-2">
              Sequrity Question
            </label>
            <input
              type="text"
              id="sequrityAns"
              placeholder="Enter your favourite movie"
              value={securityAns}
              onChange={(e) => setSecurityAns(e.target.value)}
              className="bg-gray-300 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newpassword" className="block text-sm font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newpassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-gray-300 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          

          <div className="flex items-center justify-center ">
            <button
              type="submit"
              className=" bg-red-500 hover:bg-red-600 text-white font-bold pb-2 pt-1 px-3 rounded focus:outline-none focus:shadow-outline shadow-black shadow-md"
            >
              Submit
            </button>

          </div>

        </form>
      </div>
    </Layout>
  )
}
