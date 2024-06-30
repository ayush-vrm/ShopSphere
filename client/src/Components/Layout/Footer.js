import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='bg-gray-600 flex flex-col items-center justify-center h-24 text-gray-200 font-Nunito'>
      <h3 className='mb-2 text-xl '>All Right Reserved &copy; Shopease</h3>
      <div className="block">
        <Link to="/about" className='px-1'>About</Link> | <Link to="/contact" className='px-1'>Contact</Link> | <Link to="/policy" className='px-1'>Privacy Policy</Link>
      </div>
    </div>
  );
}
