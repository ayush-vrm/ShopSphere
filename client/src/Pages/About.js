import React from 'react';
import Layout from '../Components/Layout/Layout';
import AboutImage from '../Images/About.avif';

export default function About() {
  return (
    <Layout title = {"About Us - ShopEase"}>
      <div className="container mx-auto pt-16 flex items-center px-24 text-center font-Nunito ">
        {/* Image on the left side */}
        <div className="w-1/2 mr-4">
          <img
            src={AboutImage} // Replace with your actual image source
            alt="About Us"
            className="w-96 h-auto rounded-lg"
          />
        </div>

        {/* Content on the right side */}
        <div className="w-1/2">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-700">
            At Shopease, we're more than just an online marketplace – we're
            a destination for discovery and satisfaction. Our passion for quality products and
            seamless shopping is at the heart of everything we do. From carefully curated selections
            to personalized service, we're here to redefine your online shopping experience.
          </p>

          <p className="text-gray-700 mt-4">
            What sets us apart is our commitment to excellence. We handpick each item to ensure it
            not only meets but exceeds your expectations. With a customer-centric approach, we
            prioritize your satisfaction, providing dedicated support every step of the way. Join us
            on this journey, and let [Your Ecommerce Website Name] be your trusted partner in
            finding the perfect products that complement your lifestyle.
          </p>
        </div>
      </div>
    </Layout>
  );
}
