import React, { useState } from "react";
import userContext from "./userContext";

const UserState = ({ children }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [securityques,setSecurityques] = useState("")
    const [newPassword, setNewPassword] = useState("")

    return (
        <userContext.Provider value={{
            name,
            setName,
            email,
            setEmail,
            password,
            setPassword,
            phone,
            setPhone,
            address,
            setAddress,
            securityques,
            setSecurityques,
            newPassword,
            setNewPassword
        }}>
            {children}
        </userContext.Provider>
    )

}

export default UserState