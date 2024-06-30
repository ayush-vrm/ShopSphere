import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { useCart } from '../Context/cartContext'
import toast from 'react-hot-toast'

export default function CategoryProducts() {
    const [category,setCategory] = useState([])
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(true)
    const [cart, setCart] = useCart()
    const params = useParams() 
    const navigate = useNavigate()

    useEffect(()=>{
        if(params?.slug) getCatProducts()
    },[params?.slug])

    const handleCartButton = (p) => {
      // Check if the product is already in the cart
      const isProductInCart = cart.some((item) => item._id === p._id);
  
      if (isProductInCart) {
        toast.error('Item is already in the Cart');
      } else {
        // Add the product to the cart if it's not present
        setCart([...cart, p]);
        localStorage.setItem('cart', JSON.stringify([...cart, p]))
        toast.success('Item added to Cart Successfully');
      }
    };

   

    const getCatProducts = async ()=>{
        try {
            setLoading(true)
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/category-product/${params.slug}`)
            setLoading(false)
            setCategory(data.category)
            setProducts(data.products)
            
        } catch (error) {
          setLoading(false)
            console.log(error)
        }
    }

  return (
    <Layout>
      {
        loading ?<div className='flex justify-center items-center h-screen'><PulseLoader color="#FF0200" size={15} /></div>:(
          <>
          
          <h1 className='border-2 border-red-600 w-fit text-xl my-8 ml-8 px-2 py-1 rounded shadow-lg font-frek'>Catgeory - {category?.name}({products.length})</h1>
      <div className='flex flex-wrap'>
                {
                  products && products.map((p) => (
                    <div className="shadow-lg font-Nunito border-2 border-gray-300 rounded-sm overflow-hidden flex flex-col  hover:translate-y-[-5px] transition duration-300 ease-in-out w-60 s m-5 mx-6">
                      {/* Product Image */}
                      <div className="relative w-full h-56 overflow-hidden">
                        <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className="w-full h-full object-cover absolute inset-0" />
                      </div>

                      {/* Product Details */}
                      <div className="bg-gray-200">

                      <div className="pt-2 pb-1 px-4 flex justify-between">
                        {/* Product Name */}
                        <h2 className="text-gray-800 text-md ">{p.name}</h2>

                        {/* Product Price */}
                        <p className="text-red-500 font-semibold">$ {p.price}</p>
                      </div>
                        <p className="pl-4 text-gray-700 text-sm">{p.description.length>20 ? `${p.description.substring(0,30)}...`:p.description}</p>

                      {/* Buttons */}
                      <div className='flex justify-center'>
                        <button className='px-2 py-1 bg-red-600 rounded-tl rounded-br  text-gray-200 mr-1 my-2' onClick={() => navigate(`/product-details/${p.slug}`)}>More Details</button>
                        <button className='px-2 py-1 bg-gray-900 rounded-bl rounded-br text-gray-200  my-2' onClick={() => handleCartButton(p)}>Add to Cart</button>
                      </div>
                      </div>
                    </div>
                  ))

                }
              </div>
                </>
        )
      }
      
    </Layout>
  )
}
