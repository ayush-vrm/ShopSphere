import React from 'react'
import Layout from '../Components/Layout/Layout'
import Privacy from '../Images/Privacy.webp'

export default function Policy() {
  return (
    <div>
      <Layout title={"Privacy policy"}>
      <div className="container mx-auto pt-16 flex items-center px-24 text-center ">
        {/* Image on the left side */}
        <div className="w-1/2 mr-4">
          <img
            src={Privacy} // Replace with your actual image source
            alt="Privacy"
            className="w-96 h-auto rounded-lg"
          />
        </div>

        {/* Content on the right side */}
        <div className="w-1/2">
          <h2 className="text-3xl font-Nunito font-semibold mb-4">Privacy Policy</h2>
          <p className="text-gray-700">
             Will be available soon...
          </p>

          
        </div>
      </div>
      </Layout>
    </div>
  )
}
