import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';

export default function PagenotFound() {
  return (
    <div>
      <Layout title={"Go-Back "}>
        <div className="flex flex-col items-center justify-center pt-24 font-sans">
          <h1 className="text-6xl text-black mb-6 font-bold">404</h1>
          <p className="text-4xl text-gray-700">OOPS ! Page Not Found</p>
          <Link to="/" className="text-blue-500 mt-4 hover:underline">
            Go to Home
          </Link>
        </div>
      </Layout>
    </div>
  );
}
