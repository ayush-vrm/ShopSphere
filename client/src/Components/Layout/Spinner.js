import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

const Spinner = ({path = "/login"}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [count,setCount] = useState(4)

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=>--prevValue)
        },1000)
        count ===0 && navigate(`${path}`,{
            state : location.pathname
        })
        return ()=>clearInterval(interval)
    },[count,navigate,location,path])
  return (
    <div className="flex items-center justify-center h-screen flex-col bg-gradient-to-t from-gray-600 via-gray-700 to-gray-700 text-white">
      <div><PulseLoader color="#FF0200" size={15} /></div>
      <div className='text-3xl text-white'>redirecting tou to you in {count}</div>
    </div>
  );
};

export default Spinner;
