import React from 'react'
import useCategory from '../hooks/useCategory'
import Layout from '../Components/Layout/Layout'
import { NavLink, Link } from 'react-router-dom'

export default function Categories() {
    const categories = useCategory()
    return (
        <Layout title="ALL Categories" >
            <div className='flex flex-wrap p-16 '>
                {categories.map((c) => (
                    <NavLink
                        className='flex items-center justify-center border-2 border-gray-800 text-white font-frek  bg-gray-400 w-64 m-4 mx-8 rounded text-2xl shadow-lg shadow-gray-300 py-6 hover:bg-gray-600'
                        to={`/category/${c.slug}`}
                    >
                        {c.name}
                    </NavLink>

                ))}

            </div>
        </Layout>
    )
}
