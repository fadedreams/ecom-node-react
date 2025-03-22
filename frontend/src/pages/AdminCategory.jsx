import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const AdminCategory = () => {
    const [categories, setCategories] = useState([
        { id: 1, label: 'Electronics', value: 'electronics' },
        { id: 2, label: 'Jewelery', value: 'jewelery' },
        { id: 3, label: "Men's Clothing", value: "men's clothing" },
        { id: 4, label: "Women's Clothing", value: "women's clothing" },
    ]);

    const handleDelete = (id) => {
        setCategories((prev) => prev.filter((category) => category.id !== id));
    };

    return (
        <div className='container mx-auto p-4 pt-20'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Manage Categories</h1>
                <Link
                    to='/admin/add-category'
                    className='flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700'
                >
                    <FaPlus /> Add Category
                </Link>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                    <thead>
                        <tr className='bg-gray-100 text-gray-600'>
                            <th className='py-2 px-4 border-b text-left'>ID</th>
                            <th className='py-2 px-4 border-b text-left'>Label</th>
                            <th className='py-2 px-4 border-b text-left'>Value</th>
                            <th className='py-2 px-4 border-b text-left'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id} className='hover:bg-gray-50'>
                                <td className='py-2 px-4 border-b'>{category.id}</td>
                                <td className='py-2 px-4 border-b'>{category.label}</td>
                                <td className='py-2 px-4 border-b'>{category.value}</td>
                                <td className='py-2 px-4 border-b'>
                                    <div className='flex gap-2'>
                                        <Link
                                            to={`/admin/edit-category/${category.id}`}
                                            className='text-gray-600 hover:text-gray-800'
                                        >
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className='text-gray-600 hover:text-red-600'
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCategory;
