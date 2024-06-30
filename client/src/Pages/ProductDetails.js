import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useCart } from '../Context/cartContext'
import toast from 'react-hot-toast'

const ProductDetails = () => {

    const [product, setProduct] = useState({})
    const param = useParams()
    const [cart, setCart] = useCart()
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
    

    useEffect(() => {
        if (param?.slug) getProduct()
    }, [param?.slug])
    const getProduct = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${param.slug}`)
            setProduct(data.product)

        } catch (error) {
            console.log("Error while getting single product in more deutails button")
        }
    }
    return (
        <Layout>
                <div className='bg-gray-500 p-8 h-screen'>
            <h1 className='border-2 border-red-600 w-fit text-xl mb-8 ml-8 px-2 py-1 rounded shadow-lg font-frek'>Product Details</h1>
                    <div className="flex max-w-screen-xl w-full mx-auto my-8 bg-white shadow-gray-900 shadow-lg rounded-md overflow-hidden  h-2/3 bg-gray-200 p-1">
                        {/* Left Side: Product Image */}
                        <div className="md:w-1/2 flex  border-r border-red-600 m-auto p-2 bg-gray-600 h-full rounded ">
                            <img src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} className="mx-auto  " />
                        </div>
                        {/* Right Side: Product Details */}
                        <div className="md:w-1/2 p-6 m-auto bg-gray-900 h-full rounded ">
                            <h1 className="text-3xl font-bold mb-4 text-white">{product.name}</h1>
                            <p className="text-2xl text-red-600 font-semi-bold font-roboto text-gray-500 mb-4">Price: ${product.price}</p>
                            <p className="text-gray-700 mb-4 text-white">{product.description}</p>
                            {/* <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p> */}
                            <button className='px-2 py-1 bg-gray-600 rounded-bl rounded-br text-gray-200  my-2' onClick={() => handleCartButton(product)}>Add to Cart</button>
                            <p className="text-sm text-gray-500 my-2">Quantity: {product.quantity} units available</p>

                        </div>
                    </div>


        </div>
            </Layout>

    )
}

export default ProductDetails
