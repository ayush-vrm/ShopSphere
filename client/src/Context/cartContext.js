import { useState,useContext, createContext, useEffect } from "react";

const cartContext = createContext()

const CartState = ({children})=>{
    const [cart,setCart] = useState([])
    useEffect(()=>{
        let existingCartItem = localStorage.getItem('cart')
        if(existingCartItem) setCart(JSON.parse(existingCartItem))
    },[])
    return(
        <cartContext.Provider value={[cart,setCart]}>
            {children}
        </cartContext.Provider>
    )
}

const useCart = ()=>useContext(cartContext)

export {useCart,CartState}