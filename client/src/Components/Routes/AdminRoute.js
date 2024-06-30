import React, { useContext, useEffect, useState } from 'react'
import authContext from '../../Context/authContext'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Layout/Spinner'


export default function AdminRoute() {
    const [ok,setOk] = useState(false)
    const {auth,setAuth} = useContext(authContext)

    useEffect(()=>{
        const authchk = async ()=>{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`)
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
           
        }

        if(auth?.token) authchk()
    },[auth?.token])
    return ok ? <Outlet/> :<Spinner path = "/"/>
}
