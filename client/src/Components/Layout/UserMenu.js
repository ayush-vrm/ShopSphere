import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import authContext from '../../Context/authContext';

const UserMenu = () => {
  const { auth, setAuth } = useContext(authContext);
  const location = useLocation();

  return (
    <div className="flex flex-col w-full  my-8 shadow-lg ">
      {/* <h1 className="text-2xl font-bold pb-2 text-center">Dashboard</h1> */}
      <NavLink
        to="/dashboard/user"
        className={`text-blue-500 py-2 px-4  text-center rounded-t font-Nunito  border border-gray-600 ${location.pathname === '/dashboard/user' && ' bg-red-600 text-white'}`}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/dashboard/user/profile"
        className={`text-blue-500 py-2 px-4 text-center  border border-gray-600 ${location.pathname === '/dashboard/user/profile' && 'bg-red-600 text-white'}`}
      >
       Update Profile
      </NavLink>
      <NavLink
        to="/dashboard/user/all-orders"
        className={`text-blue-500 rounded-b py-2 px-4 text-center  border border-gray-600 ${location.pathname === '/dashboard/user/all-orders' && 'bg-red-600 text-white'}`}
      >
        All Orders
      </NavLink>
      
    </div>
  );
};

export default UserMenu;
