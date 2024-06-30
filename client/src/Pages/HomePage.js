import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../Components/Layout/Layout'
import authContext from '../Context/authContext'
import { useCart } from '../Context/cartContext'
import toast from 'react-hot-toast'
// import { Checkbox } from 'antd'
import axios from 'axios'
import { MoonLoader } from 'react-spinners'


export default function HomePage() {
  const { auth } = useContext(authContext)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [totalP, setTotalP] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useCart()
  const navigate = useNavigate()

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/categories`)
      if (data?.success) {
        setCategories(data.categories)
      }

    } catch (error) {
      console.log(error)
      console.log("Erroe in getting categories - Home Page")
    }
  }

  useEffect(() => {
    getCategories()
    getTotalCount()
  }, [])

  const getProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false)
      if (data?.success) {
        setProducts(data.products)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      console.log("Erroe in getting products - Home Page")
    }
  }


  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }

    setChecked(all)
    // console.log("INside Handle Filter",checked)
  }

  useEffect(() => {
    if (checked.length) filterProduct()
  }, [checked])

  useEffect(() => {
    if (!checked.length) getProducts()
  }, [checked.length])



  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`, { checked })
      console.log(data)
      setProducts(data?.products)

    } catch (error) {
      console.log(error)
      console.log("Erroe in filtering Products - Home Page")
    }
  }

  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/total-count`)
      setTotalP(data?.total)
    } catch (error) {
      console.log(error)
    }

  }

  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products]);

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (page === 1) return
    loadMore()

  }, [page])

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



  return (
    <div>
      {/* console.log(products) */}

      <Layout title={"Best Offers - ShopEase"}>
        {
          loading ?<div className='flex justify-center items-center h-screen'><MoonLoader color="#FF0200" size={45} /></div>: (<>
             <div className="container mx-auto ">
          <div className="flex min-h-screen">
            <div className="w-1/6 flex flex-col  border-r border-gray-300">
              <div className='text-center text-xl font-Nunito pt-8 '>
                Filter By Category
              </div>
              {/* {JSON.stringify(checked,null,4)} */}

              <div className='flex flex-col mt-4 pl-4 '>
                {categories?.map(c => (
                  <label key={c._id} className="flex items-center space-x-2 pb-2">
                    <input type="checkbox" onChange={(e) => handleFilter(e.target.checked, c._id)} className="form-checkbox text-blue-500 " />
                    <span className='text-md'>{c.name}</span>
                  </label>
                ))}
              </div>

              <button className='bg-red-600 rounded px-2 py-1  mx-auto text-white font-roboto shadow-lg hover:bg-red-700' onClick={() => window.location.reload()}>
                Reset Filters
              </button>



            </div>
            <div className="w-5/6 bg-gray-100 pt-8">
              <div className='flex flex-wrap '>
                {
                  products && products.map((p) => (
                    <div className="shadow-lg font-Nunito border-2 border-gray-300 rounded-sm overflow-hidden flex flex-col  hover:translate-y-[-5px] transition duration-300 ease-in-out w-60 s m-5 mx-6">
                      {/* Product Image */}
                      <div className="relative w-full h-56 overflow-hidden">
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
                        <p className="pl-4 text-gray-700 text-sm">{p.description.length>20 ? `${p.description.substring(0,25)}...`:p.description}</p>

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
              {
                products && products.length < totalP && (
                  <button
                    className="bg-yellow-400 px-2 py-1 m-2 ml-4  rounded font-frek hover:bg-yellow-500"
                    onClick={(e) => {
                      e.preventDefault()
                      setPage(page + 1)
                    }}
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                )
              }
            </div>

          </div>
        </div>
          </>)
        }
       

      </Layout >
    </div >
  )
}

