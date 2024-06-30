import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'


export default function Products() {

    const [allProducts,setAllProducts] = useState([])

    const getProducts = async ()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`)

            console.log(data)
            if(data?.success){
                setAllProducts(data?.products)
            }

            
        } catch (error) {
            console.log(error)
            toast.error("Some thing went wrong while Getting All products")
        }
    }

  

    useEffect(()=>{
        getProducts()
    },[])

  return (
    <div>
        <Layout>
        <div className="flex">
            <div className='w-1/6'>
                <AdminMenu/>
            </div>

            <div className="w-5/6 pl-8">
            <h1 className='text-xl my-8 py-1 font-Nunito border-2 border-red-600 shadow-lg w-fit px-2 rounded font-bold'>
                All Products
          </h1>
           
          <div className='flex flex-wrap '>
                {
                  allProducts && allProducts.map((p) => (
                    <div className="shadow-lg font-Nunito border-2 border-gray-300 rounded-sm overflow-hidden flex flex-col  hover:translate-y-[-5px] transition duration-300 ease-in-out w-60 s m-5 mx-6">
                      {/* Product Image */}
                      <div className="relative w-full h-56 overflow-hidden ">
                        <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className="w-full h-full object-cover absolute inset-0" />
                      </div>

                      {/* Product Details */}
                      <div className="bg-gray-300">

                      <div className="pt-2 pb-1 px-4 flex justify-between">
                        {/* Product Name */}
                        <h2 className="text-gray-800 text-md ">{p.name}</h2>

                        {/* Product Price */}
                        <p className="text-red-500 font-semibold">$ {p.price}</p>
                      </div>
                        <p className="pl-4 text-gray-700 text-sm pb-4">{p.description.length>20 ? `${p.description.substring(0,30)}...`:p.description}</p>

                      {/* Buttons */}
                      <div className='flex justify-center'>
                        {/* <button className='px-2 py-1 bg-red-600 rounded-tl rounded-br  text-gray-200 mr-1 my-2' onClick={() => navigate(`/product-details/${p.slug}`)}>More Details</button>
                        <button className='px-2 py-1 bg-gray-900 rounded-bl rounded-br text-gray-200  my-2' onClick={() => handleCartButton(p)}>Add to Cart</button> */}
                      </div>
                      </div>
                    </div>
                  ))

                }
              </div>
 </div>
           

        </div>
        </Layout>
    </div>
  )
}
