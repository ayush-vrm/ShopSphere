import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams ,useNavigate} from 'react-router-dom';

const UpdateProducts = () => {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState("")
  const [photo, setPhoto] = useState("")
  const [shipping, setShipping] = useState(false)
  const [id,setId] = useState("")
  const [category, setCategory] = useState("")
  const param = useParams()
  const navigate = useNavigate()

  const getSingleProducts = async()=>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${param.slug}`)
      setName(data.product.name)
      setId(data.product._id)
      setDescription(data.product.description)
      setCategory(data.product.category._id)
      setQuantity(data.product.quantity)
      setPrice(data.product.price)
      setShipping(data.product.shipping)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getSingleProducts()
  },[])

  const getCatgeories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/categories`);
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log("Clicked")
    try {

      const productData = new FormData()
      productData.append("name",name)
      productData.append("description",description)
      productData.append("price",price)
      productData.append("quantity",quantity)
      photo && productData.append("photo",photo)
      productData.append("category",category)
      
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,productData)
      if(data?.success){
        toast.success("Product Updated Successfully")
      }
      else{
        toast.error(data?.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in Updating product")
    }

    

    console.log("Exec")
  }
  useEffect(() => {
    getCatgeories()
  }, [])

  const handleDelete = async ()=>{
    try {
      let ans = window.prompt("Are you sure wnat to delte this product")
      if(ans === "NO" || ans === "No") return
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
      toast.success("Deleted Successfully")
      navigate('/dashboard/admin/products')
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in deleting product")
    }

  }

  return (
    <Layout>
      <div className="grid grid-cols-3 h-screen gap-6">
        {/* Admin Panel on the left */}
        <div>
          <AdminMenu />
        </div>

        {/* Admin Information in the middle */}
        <div className="col-span-2 pt-4">
          <h2>Update Products</h2>

          {/* <form action="" onSubmit={handleSubmit}> */}
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}

              className="border border-gray-300 p-2 w-3/4 rounded-l"
            >
              {/* <option value="">Category</option> */}
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className='my-4 w-3/4 border-2 border-gray-600 rounded  h-8'>
              <label className='rounded flex h-full  items-center justify-center hover:text-white hover:bg-gray-400'>
                {photo ? photo.name : " Upload Photo"}
                <input
                  type='file'
                  name="photo"
                  accept='image/*'
                  onChange={(e) => { setPhoto(e.target.files[0]) }}
                  hidden
                />
              </label>
            </div>
            <div className="my-4 w-3/4">
              {
                photo ? (
                  <div className="border-2 border-black flex items-center justify-center h-52 ">
                    <img src={URL.createObjectURL(photo)} alt="Product_Photo" className='h-48' />
                  </div>
                ):(
                  <div className="border-2 border-black flex items-center justify-center h-52 ">
                    <img src={`/api/v1/product/product-photo/${id}`}alt="Product_Photo" className='h-48' />
                  </div>
                )
              }
            </div>
            <div className="w-3/4 my-4 border-2 border-gray-500 rounded">
              <input type="text"
                name="product name"
                placeholder='Name of Product'
                value={name}
                className='w-full py-1 px-2'
                onChange={(e) => { setName(e.target.value) }} />
            </div>

            <div className="w-3/4 my-4 border-2 border-gray-500 rounded">
              <input type='text'
                name="description"
                placeholder='About the Product'
                value={description}
                className='w-full py-1 px-2'
                onChange={(e) => { setDescription(e.target.value) }} />
            </div>

            <div className="w-3/4 my-4 border-2 border-gray-500 rounded">
              <input type="Number"
                name="product quantity"
                placeholder='Quantity'
                value={quantity}
                className='w-full py-1 px-2'
                onChange={(e) => { setQuantity(e.target.value) }} />
            </div>
            <div className="w-3/4 my-4 border-2 border-gray-500 rounded">
              <input type="Number"
                name="product price"
                placeholder='Price'
                value={price}
                className='w-full py-1 px-2'
                onChange={(e) => {setPrice(e.target.value) }} />
            </div>
            <div className="w-3/4 my-4 border-2 border-gray-500 rounded">
              <select
                onChange={(e) => setShipping(e.target.value)}
                className="border border-gray-300 p-2  w-full rounded-l"
                value = {shipping? "Yes":"No"}
              >
                {/* <option value="">Shipping</option> */}
                <option value="1">YES</option>
                <option value="0">NO</option>
              </select>
            </div>
            <div className="w-3/4  py-2 flex justify-center item center">
              <button type='submit' className=' bg-gray-800 py-2 px-2 text-white rounded'onClick={handleSubmit} > Update Product</button>
            </div>

            <div className="w-3/4  py-2 flex justify-center item center">
              <button type='submit' className=' bg-red-600 py-2 px-2 text-white rounded'onClick={handleDelete} > Delete Product</button>
            </div>


          {/* </form> */}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProducts