import React, { useEffect, useState, useContext } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import axios from 'axios'
import authContext from '../../Context/authContext';

export default function AllOrdersAdmin() {
    const { auth, setAuth } = useContext(authContext);
    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Canceled"])
    const [toggleDropdown, setToggleDropdown] = useState(false)
    const getAllOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`)
            setOrders(data.orders)
        } catch (error) {
            console.log(error)
        }
    }



    const handleChange = async (id,st) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${id}`, { status: st })
            getAllOrders()
            console.log(id)
        } catch (error) {
            console.log(error)
        }
    }




    const handleToggleDropdownStatus = () => {
        toggleDropdown ? setToggleDropdown(false) : setToggleDropdown(true)
    }

    useEffect(() => {
        if (auth?.token) getAllOrders()

    }, [auth?.token])
    return (
        <Layout>
            <div className="flex font-Nunito ">

                <div className="w-1/6 border-r ">
                    <AdminMenu />
                </div>

                <div className="w-5/6  pl-8 ">
                <h1 className='text-xl my-8 py-1 font-Nunito border-2 border-red-600 shadow-lg w-fit px-2 rounded font-bold'>
            Your Orders
          </h1>
                    {/* <p>{JSON.stringify(orders,null,4)}</p> */}


                    {orders.map((o, i) => {
                        return (
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="px-4 py-2">#</th>
                                            <th className="px-4 py-2">Status</th>
                                            <th className="px-4 py-2">Buyer</th>
                                            <th className="px-4 py-2">Date</th>
                                            <th className="px-4 py-2">Payment</th>
                                            <th className="px-4 py-2">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {/* Table body rows will be dynamically populated */}

                                        <tr>
                                            <th className="px-4 py-2">{i + 1}</th>
                                            <th className="group inline-block">
                                                <div
                                                    className="hover: relative cursor-pointer"
                                                    activeClassName="font-bold"
                                                    onClick={handleToggleDropdownStatus}
                                                >
                                                    {o.status}
                                                    <div
                                                        className={`${toggleDropdown ? 'rotate-180' : 'rotate-0'
                                                            } transition-transform absolute -right-4 top-1 h-4 w-4 text-black group-hover:text-black`}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                {/* <th className="px-4 py-2"> */}
                                                {toggleDropdown && (
                                                    <div className="absolute  z-10 mt-2 space-y-2 bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-44">
                                                        {/* {o.status} */}
                                                        {status.map((st) => (
                                                            <div
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"

                                                                onClick={()=>handleChange(o._id,st)}
                                                            >
                                                                {st}
                                                                <hr />
                                                            </div>

                                                        ))}
                                                    </div>
                                                )}
                                            </th>
                                            {/* </th> */}
                                            <th className="px-4 py-2">{o?.buyer?.name}</th>
                                            <th className="px-4 py-2">{(o?.createdAt)}</th>
                                            <th className="px-4 py-2">{o?.payment}</th>
                                            <th className="px-4 py-2">{o?.product?.length}</th>
                                        </tr>
                                    </tbody>
                                </table>

                                {o && o.product.map((pr) => (
                                    <div key={pr.id} className="flex items-center space-x-4 p-4 border-b ">
                                        {/* Product Image */}
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${pr._id}`} alt={pr.name} className="w-64 object-cover" />
                                        {/* Product Details */}
                                        <div className='pl-8 '>
                                            <h3 className="text-lg font-semibold">{pr.name}</h3>
                                            <p className="text-gray-700">{pr.description}</p>
                                            <p className="text-red-500">${pr.price}</p>
                                        </div>
                                    </div>
                                ))}
                                {/* </div> */}

                            </div>
                        )
                    })
                    }


                </div>
            </div>

        </Layout>
    )
}
