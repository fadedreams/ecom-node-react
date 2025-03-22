import React from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaList, FaPlus } from 'react-icons/fa';

const AdminDashboard = () => {
    return (
        <div className='container mx-auto p-4 pt-20'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-8'>Admin Dashboard</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {/* Products Section */}
                <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
                    <div className='flex items-center gap-3 mb-4'>
                        <FaBox className='text-gray-600 text-2xl' />
                        <h2 className='text-xl font-semibold text-gray-700'>Products</h2>
                    </div>
                    <p className='text-gray-500 mb-4'>Manage your product inventory.</p>
                    <div className='flex flex-col gap-3'>
                        <Link
                            to='/admin/products'
                            className='flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700'
                        >
                            <FaList /> View Products
                        </Link>
                        <Link
                            to='/admin/products/add'
                            className='flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700'
                        >
                            <FaPlus /> Add Product
                        </Link>
                    </div>
                </div>

                {/* Categories Section */}
                <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
                    <div className='flex items-center gap-3 mb-4'>
                        <FaList className='text-gray-600 text-2xl' />
                        <h2 className='text-xl font-semibold text-gray-700'>Categories</h2>
                    </div>
                    <p className='text-gray-500 mb-4'>Manage product categories.</p>
                    <div className='flex flex-col gap-3'>
                        <Link
                            to='/admin/cats'
                            className='flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700'
                        >
                            <FaList /> View Categories
                        </Link>
                        <Link
                            to='/admin/cats/add'
                            className='flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700'
                        >
                            <FaPlus /> Add Category
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
