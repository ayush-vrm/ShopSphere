import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateProducts = () => {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState("")
  const [photo, setPhoto] = useState("")
  const [shipping, setShipping] = useState(false)
  const [category, setCategory] = useState("")

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Clicked")
    try {

      const productData = new FormData()
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("photo", photo)
      productData.append("category", category)

      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData)
      if (data?.success) {
        toast.success("Product Created Successfully")
      }
      else {
        toast.error(data?.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in creating product")
    }

    setPhoto("")
    setName("")
    setDescription("")
    setPrice("")
    setQuantity("")

    console.log("Exec")
  }
  useEffect(() => {
    getCatgeories()
  }, [])

  return (
    <Layout>
      <div className="flex ">
        {/* Admin Panel on the left */}
        <div className='w-1/6'>
          <AdminMenu />
        </div>

        {/* Admin Information in the middle */}
        <div className="w-5/6 pl-8">
          <h1 className='text-xl my-8 py-1 font-Nunito border-2 border-red-600 shadow-lg w-fit px-2 rounded font-bold'>
            Add new Product
          </h1>
          {/* <form action="" onSubmit={handleSubmit}> */}

          <div className=' w-3/4 mx-auto'>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}

              className="border border-gray-300 p-2 w-full rounded-l"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className='my-4 border-2 border-gray-600 rounded  h-8'>
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
            <div className="my-4 ">
              {
                photo && (
                  <div className="border-2 border-black flex items-center justify-center h-52 ">
                    <img src={URL.createObjectURL(photo)} alt="Product_Photo" className='h-48' />
                  </div>
                )
              }
            </div>
            <div className=" my-4 border-2 border-gray-500 rounded">
              <input type="text"
                name="product name"
                placeholder='Name of Product'
                value={name}
                className='w-full py-1 px-2'
                onChange={(e) => { setName(e.target.value) }} />
            </div>

            <div className=" my-4 border-2 border-gray-500 rounded">
              <input type='text'
                name="description"
                placeholder='About the Product'
                value={description}
                className='w-full py-1 px-2'
                onChange={(e) => { setDescription(e.target.value) }} />
            </div>

            <div className=" my-4 border-2 border-gray-500 rounded">
              <input type="Number"
                name="product quantity"
                placeholder='Quantity'
                value={quantity}
                className='w-full py-1 px-2'
                onChange={(e) => { setQuantity(e.target.value) }} />
            </div>
            <div className=" my-4 border-2 border-gray-500 rounded">
              <input type="Number"
                name="product price"
                placeholder='Price'
                value={price}
                className='w-full py-1 px-2'
                onChange={(e) => { setPrice(e.target.value) }} />
            </div>
            <div className="my-4 border-2 border-gray-500 rounded">
              <select
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}

                className="border border-gray-300 p-2  w-full rounded-l"
              >
                <option value="">Shipping</option>
                <option value="1">YES</option>
                <option value="0">NO</option>
              </select>
            </div>
          </div>
          <div className="  py-2 flex justify-center item center">
            <button type='submit' className=' bg-red-600 py-2 px-2 text-white rounded shadow-lg ' onClick={handleSubmit} > Create Product</button>
          </div>


          {/* </form> */}
        </div>
      </div>
    </Layout>
  );
};

export default CreateProducts