import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import authContext from '../../Context/authContext';
import UserMenu from '../../Components/Layout/UserMenu';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
  const { auth, setAuth } = useContext(authContext);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    const { name, email, address, phone } = auth?.user
    setAddress(address)
    setName(name)
    // setPassword(password)
    setEmail(email)
    setPhone(phone)
  }, [auth?.user])


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-profile`, { name, email, password, phone, address })
      if (data?.error) toast.error(data.error)
      else {
        setAuth({ ...auth, user: data.updateUser })
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data?.updateUser
        localStorage.setItem("auth", JSON.stringify(ls))
        toast.success("Profile Updated Succeffully")

      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }

  };


  return (
    <Layout title="Your Profile">
      <div className="flex h-screen bg-gray-300">

        <div className="w-1/6 border-r ">
          <UserMenu />
        </div>

        <div className="w-5/6">
          <div className="mt-16 p-8 font-Nunito">
            <form onSubmit={handleSubmit} className="bg-white max-w-md shadow-black shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto bg-gradient-to-t from-gray-600 via-gray-700 to-gray-700 text-gray-300">
              <div className="mb-4">
                <label htmlFor="name" className="block  text-sm font-bold mb-2 ">
                  Names
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


              <div className="flex items-center justify-center m">
                <button
                  type="submit"
                  className="text-black bg-red-500 hover:bg-red-600 text-white font-bold pb-2 pt-1 px-3 rounded focus:outline-none focus:shadow-outline shadow-black shadow-md"
                >
                  Update
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;






