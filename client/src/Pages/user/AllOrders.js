import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import authContext from '../../Context/authContext';
import UserMenu from '../../Components/Layout/UserMenu';
import axios from 'axios';

const AllOrders = () => {
  const { auth, setAuth } = useContext(authContext);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`)
      setOrders(data.orders)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])

  return (
    <Layout title="Orders">
      <div className="flex bg-gray-300 min-h-screen">

        <div className="w-1/6 border-r border-white">
          <UserMenu />
        </div>


        <div className="w-5/6 pl-8 ">
          <h1 className='text-xl my-8 py-1 font-Nunito border-2 border-red-600 shadow-lg w-fit px-2 rounded font-bold'>
            Your Orders
          </h1>
          {/* <p>{JSON.stringify(orders,null,4)}</p> */}


          {orders.map((o, i) => {
                  return (
          <div className="overflow-x-auto font-Nunito">
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
                      <th className="px-4 py-2">{o?.status}</th>
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
  );
};

export default AllOrders;
