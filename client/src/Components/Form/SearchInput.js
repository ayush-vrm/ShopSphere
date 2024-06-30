import React, { useContext } from 'react'
import searchContext from '../../Context/searchContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function SearchInput() {

    const {values, setValues} = useContext(searchContext)
    const navigate = useNavigate()

    const handleSearch = async () => {
        // e.preventDefault()
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`)
            setValues({...values,result:data})
            navigate("/search")
            console.log(values)

        } catch (error) {
            console.log("Error in getting Search result", error)
        }
    }

    return (
        <div className="flex items-center bg-white rounded-lg ">
            <input
                type="text"
                placeholder="Search..."
                className=" px-4 py-2 rounded-bl-lg  w-80 focus:outline-none text-black"
                value = {values.keyword}
                onChange={(e)=>setValues({...values,keyword:e.target.value})}
                
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded-tr-lg hover:bg-red-700 focus:outline-none font-roboto"
                onClick={handleSearch}
            >
                Search
            </button>
            {/* <button>
                Dusplay
            </button> */}
        </div>
    )
}
