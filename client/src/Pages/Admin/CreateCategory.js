import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import CategoryForm from '../../Components/Form/CategoryForm';
import { set } from 'mongoose';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [edit, setEdit] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        // Update category
        await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${editCategoryId}`, { name });
        toast.success(`${name} updated Successfully`);
      } else {
        // Create new category
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });
        
        if (data?.success) {
          toast.success(`${name} added Successfully`);
        } else {
          toast.error(data.message);
        }
      }
      setEdit(false);
      setEditCategoryId(null);
      setName('');
      response();
    } catch (error) {
      console.log(error);
      toast.error('Something Went wrong');
    }
  };

  const handleEdit = (id, categoryName) => {
    setEdit(true);
    setEditCategoryId(id);
    setName(categoryName);
  };

  const handleDelete = async (id, name) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete/${id}`);
      toast.success(`${name} deleted`);
      response();
    } catch (error) {
      console.log(error);
      toast.error('Error in Deleting Category');
    }
  };

  const response = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/categories`);
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting Categories');
    }
  };

  useEffect(() => {
    response();
  }, []);

  return (
    <Layout>
      <div className="flex font-Nunito ">
        {/* Admin Panel on the left */}
        <div className='w-1/6'>
          <AdminMenu />
        </div>

        {/* Admin Information in the middle */}
        <div className="w-5/6 pl-8">
        <h1 className='text-xl my-8 py-1 font-Nunito border-2 border-red-600 shadow-lg w-fit px-2 rounded font-bold'>
           Manage Categories
          </h1>

          <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} edit={edit} />

          <table className="w-3/4 mx-auto divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{c.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-white bg-gray-800 px-2 py-1 rounded hover:bg-gray-900"
                      onClick={() => handleEdit(c._id, c.name)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-white hover:bg-red-700 ml-2 py-1 px-2 bg-red-600 rounded"
                      onClick={() => handleDelete(c._id, c.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
