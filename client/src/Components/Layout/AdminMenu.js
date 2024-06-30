import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import authContext from '../../Context/authContext';

const AdminMenu = () => {
  const { auth, setAuth } = useContext(authContext);
  const location = useLocation();

  return (
   
    <div className="flex flex-col w-full  shadow-lg ">
      {/* <h1 className="text-2xl font-bold pb-2 text-center">Dashboard</h1> */}
      <NavLink
        to="/dashboard/admin"
        className={`text-blue-500 py-2 px-4  text-center font-Nunito  border-r border-gray-600 ${location.pathname === '/dashboard/admin' && ' bg-red-600 text-white'}`}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/dashboard/admin/create-category"
        className={`text-blue-500 py-2 px-4  text-center  font-Nunito  border border-gray-600 ${location.pathname === '/dashboard/admin/create-category' && ' bg-red-600 text-white'}`}
      >
        Create Category
      </NavLink>
      <NavLink
        to="/dashboard/admin/create-products"
        className={`text-blue-500 py-2 px-4 text-center  border border-gray-600 ${location.pathname === '/dashboard/admin/create-products' && 'bg-red-600 text-white'}`}
      >
       Create Products
      </NavLink>
      <NavLink
        to="/dashboard/admin/products"
        className={`text-blue-500  py-2 px-4 text-center  border border-gray-600 ${location.pathname === '/dashboard/admin/products' && 'bg-red-600 text-white'}`}
      >
        All Products
      </NavLink>
      <NavLink
        to="/dashboard/admin/all-orders"
        className={`text-blue-500 rounded-b py-2 px-4 text-center  border border-gray-600 ${location.pathname === '/dashboard/admin/all-orders' && 'bg-red-600 text-white'}`}
      >
        All Orders
      </NavLink>
      
    </div>
    
  );
};

export default AdminMenu;
