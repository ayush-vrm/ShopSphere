import React, { useState,useEffect } from "react";
import authContext from "./authContext";
import axios from "axios";

const AuthState = ({children})=>{
    const [auth,setAuth] = useState({
        user:null,
        token:""
    })

    axios.defaults.headers.common["Authorization"] = auth?.token

    useEffect(()=>{
        const data = localStorage.getItem('auth');
        if(data){
            const parsedData = JSON.parse(data);
            setAuth({
                ...auth,
                user : parsedData.user,
                token : parsedData.token
            })
        }
        //eslint-disable-next-line
    },[])
    return(
        <authContext.Provider value = {{auth,setAuth}}>
            {children}
        </authContext.Provider>
    )

}

export default AuthState