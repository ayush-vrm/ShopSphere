import React, { useState } from 'react';
// import userContext from '../Context/userContext';
import Layout from '../Components/Layout/Layout';
import { useNavigate,Link} from 'react-router-dom';
import  toast  from 'react-hot-toast'
import axios from 'axios'

const Register = () => {
 
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")
  const [securityAns,setSecurityAns] = useState("")
  

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address,securityAns })

      
      if(res.data.success){
        toast.success(res.data.message)
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
      else{
        toast.error(res.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }

    setName("")
    setEmail("")
    setPhone("")
    setPassword("")
    setAddress("")
    setSecurityAns("")
  };

  return (
    <Layout>
      <div className="register bg-gradient-to-t from-gray-600 via-gray-700 to-gray-800 p-16 pb-8">
        <form onSubmit={handleSubmit} className="bg-white max-w-md shadow-black shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto bg-gradient-to-t from-gray-600 via-gray-700 to-gray-700 text-gray-300">
          <div className="mb-4">
            <label htmlFor="name" className="block  text-sm font-bold mb-2 ">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black bg-gray-300 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

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
              className="text-black bg-gray-300 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black bg-gray-300 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block  text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-black bg-gray-300 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-bold mb-2">
              Address
            </label>
            <input
              id="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="text-black bg-gray-300 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              rows="1"
            ></input>
          </div>

          <div className="mb-4">
            <label htmlFor="securityans" className="block text-sm font-bold mb-2">
              Security Question
            </label>
            <input
              id="securityans"
              placeholder="Write your favourite movie"
              value={securityAns}
              onChange={(e) => setSecurityAns(e.target.value)}
              className="text-black bg-gray-300 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              rows="1"
            ></input>
          </div>

          <div className="flex items-center justify-center m">
            <button
              type="submit"
              className="text-black bg-red-500 hover:bg-red-600 text-white font-bold pb-2 pt-1 px-3 rounded focus:outline-none focus:shadow-outline shadow-black shadow-md"
            >
              Register
            </button>
            
          </div>
          <div className="flex items-center justify-center mt-2 ">
            Already have an account? <Link to="/login" className='pl-2 text-red-600'>Login</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
