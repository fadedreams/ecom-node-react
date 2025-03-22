import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAddProduct = () => {
    const [product, setProduct] = useState({
        productName: '',
        category: '',
        sellingPrice: '',
        price: '',
        productImage: null,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulate adding a product (in a real app, this would be an API call)
        const formData = new FormData();
        formData.append('productName', product.productName);
        formData.append('category', product.category);
        formData.append('sellingPrice', product.sellingPrice);
        formData.append('price', product.price);
        if (product.productImage) {
            formData.append('productImage', product.productImage);
        }

        // Simulate API call to add product
        console.log('Adding product:', Object.fromEntries(formData));
        navigate('/admin/products');
    };

    return (
        <div className='container mx-auto p-4 pt-20'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>Add Product</h1>
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md max-w-lg'>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='productName'>
                        Product Name
                    </label>
                    <input
                        type='text'
                        id='productName'
                        name='productName'
                        value={product.productName}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='category'>
                        Category
                    </label>
                    <input
                        type='text'
                        id='category'
                        name='category'
                        value={product.category}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='sellingPrice'>
                        Selling Price
                    </label>
                    <input
                        type='number'
                        id='sellingPrice'
                        name='sellingPrice'
                        value={product.sellingPrice}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='price'>
                        Original Price
                    </label>
                    <input
                        type='number'
                        id='price'
                        name='price'
                        value={product.price}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='productImage'>
                        Product Image
                    </label>
                    <input
                        type='file'
                        id='productImage'
                        name='productImage'
                        accept='image/*'
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400'
                    />
                </div>
                <button
                    type='submit'
                    className='bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700'
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AdminAddProduct;
