import React from 'react';
import Layout from '../Components/Layout/Layout';
import ContactImage from '../Images/Contact.avif'; // Replace with your actual image source
import { FaPhone, FaEnvelope, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  return (
    <div>
      <Layout title={"Contact - ShopEase"}>
        <div className="container mx-auto mt-8 pl-24 font-Nunito pr-4 flex flex-col lg:flex-row items-center">
          {/* Image on the left side */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img
              src={ContactImage} // Replace with your actual image source
              alt="Contact Us"
              className="w-9/12 h-auto rounded-lg"
            />
          </div>

          {/* Contact details on the right side */}
          <div className="lg:w-1/2 lg:ml-8 "> {/* Added 'text-center' class */}
            <h2 className="text-3xl font-semibold mb-4 text-red-600">Contact Us</h2>

            <p className='pb-8 '> {/* Added 'text-center' class */}
              Have a question or need assistance? Reach out to us – we're here to help! Your satisfaction is our priority, and our dedicated support team is just a message away. Contact us for a seamless shopping experience.
            </p>

            <div className="flex items-center mb-4">
              <FaPhone className="text-xl mr-2" />
              <p className="text-gray-700">+1 (123) 456-7890</p>
            </div>

            <div className="flex items-center mb-4">
              <FaEnvelope className="text-xl mr-2" />
              <p className="text-gray-700">info@example.com</p>
            </div>

            <div className="flex items-center">
              <FaInstagram className="text-xl mr-2" />
              <p className="text-gray-700">@your_instagram_handle</p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
