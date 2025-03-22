import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        label: '',
        value: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching category data (in a real app, this would be an API call)
        const categories = [
            { id: 1, label: 'Electronics', value: 'electronics' },
            { id: 2, label: 'Jewelery', value: 'jewelery' },
            { id: 3, label: "Men's Clothing", value: "men's clothing" },
            { id: 4, label: "Women's Clothing", value: "women's clothing" },
        ];
        const foundCategory = categories.find((cat) => cat.id === parseInt(id));
        if (foundCategory) {
            setCategory(foundCategory);
        }
        setLoading(false);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate updating a category (in a real app, this would be an API call)
        console.log('Updating category:', category);
        navigate('/admin/categories');
    };

    if (loading) return <p className='text-gray-600'>Loading...</p>;

    return (
        <div className='container mx-auto p-4 pt-20'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>Edit Category</h1>
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md max-w-lg'>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='label'>
                        Category Label
                    </label>
                    <input
                        type='text'
                        id='label'
                        name='label'
                        value={category.label}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='value'>
                        Category Value
                    </label>
                    <input
                        type='text'
                        id='value'
                        name='value'
                        value={category.value}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400'
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700'
                >
                    Update Category
                </button>
            </form>
        </div>
    );
};

export default AdminEditCategory;
