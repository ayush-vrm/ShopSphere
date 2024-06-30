import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useCategory() {
    const [categories, setCategories] = useState([])
    const getCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/categories`)
            if (data?.success) {
                setCategories(data.categories)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCategories()
    },[])

    return categories
}
