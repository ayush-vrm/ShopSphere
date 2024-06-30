import React, { useContext, useState } from 'react';
import { NavLink ,useLocation} from 'react-router-dom';
import authContext from '../../Context/authContext';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../Context/cartContext';

const Header = () => {
  const { auth, setAuth } = useContext(authContext);
  const [cart] = useCart()
  const categories = useCategory();
  const location = useLocation()

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpencat,setDropdownOpencat] = useState(false)

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleToggleDropdownCat = ()=>{
    setDropdownOpencat(!dropdownOpencat)
  }

  const handleLogout = () => {
    toast.success('Logged Out Successfully');
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
    setDropdownOpen(false);
  };

  return (
    <>
      <header className="bg-gray-900 text-white p-4 pr-8 ">
        <div className="container mx-auto flex items-center justify-between">
          {/* Brand Name */}
          <div className="flex items-center">
            {/* Logo (you can replace this with your logo) */}
            <div className="w-8 h-8 bg-dark-gray-900 mr-2"></div>
            <span className="text-xl  font-anta">ShopEase.</span>
          </div>

          <SearchInput />

          {/* Navigation Tabs */}
          <nav className="space-x-10 relative font-roboto">
          <NavLink to="/" exact className={` relative cursor-pointer ${location.pathname === '/' && 'p-1 rounded border-b-2 border-red-500  text-white '}`} activeClassName="font-bold">
              Home
            </NavLink>
            <div className="group inline-block">
              <div
                className={` relative cursor-pointer ${location.pathname === '/categories' && 'p-1 rounded border-b-2 border-red-500  text-white '}`}
                activeClassName="font-bold"
                onClick={handleToggleDropdownCat}
              >
                Categories
                <div
                  className={`${
                    dropdownOpencat ? 'rotate-180' : 'rotate-0'
                  } transition-transform absolute -right-4 top-1 h-4 w-4  text-white group-hover:text-gray-400`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              {dropdownOpencat && (
                <div className="absolute z-10 mt-2 space-y-2 bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-44">
                   <NavLink
                      // key={category._id}
                      to={`/categories`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      All Categories
                      <hr />
                    </NavLink>
                  {categories.map((category) => (
                    <NavLink
                      key={category._id}
                       to={`/category/${category.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      {category.name}
                      <hr />
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/cart" className={` relative cursor-pointer ${location.pathname === '/cart' && 'p-1 rounded border-b-2 border-red-500  text-white '}`} activeClassName="font-bold">
              {/* Cart ({cart?.length>0 ? cart.length:25}) */}
              Cart <span className="absolute -top-4 -right-3 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">
                    {cart.length}
                  </span>
            </NavLink>
            {!auth.user ? (<>
              <NavLink to="/register" className={` relative cursor-pointer ${location.pathname === '/register'&& 'p-1 rounded border-b-2 border-red-500  text-white '}`} activeClassName="font-bold">
                Register
              </NavLink>
              <NavLink to="/login" className={` relative cursor-pointer ${location.pathname === '/login' && 'p-1 rounded border-b-2 border-red-500  text-white '}`} activeClassName="font-bold">
                Login
              </NavLink>
            </>) : (<>
              
              <div className="relative inline-block text-left">
                <NavLink
                  // to="/login"
                  className={` relative cursor-pointer ${location.pathname.startsWith('/dashboard') && 'p-1 rounded border-b-2 border-red-500  text-white '}`}
                  activeClassName="font-bold"
                  onClick={handleToggleDropdown}
                >
                  {auth?.user?.name}
                  <div
                  className={`${
                    dropdownOpen ? 'rotate-180' : 'rotate-0'
                  } transition-transform absolute -right-4 top-1 h-4 w-4 text-white group-hover:text-gray-400`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                </NavLink>

                {dropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <NavLink
                        to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        activeClassName="font-bold"
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to="/"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </>)}

           
          </nav>
        </div>
      </header>
      <div className="bg-red-600 w-full h-1"></div>
    </>
  );
};

export default Header;










