import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        productName: '',
        category: '',
        sellingPrice: '',
        price: '',
        productImage: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setProduct({
                    productName: data.title,
                    category: data.category,
                    sellingPrice: data.price,
                    price: data.price * 1.2,
                    productImage: null,
                    existingImage: data.image,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulate updating a product (in a real app, this would be an API call)
        const formData = new FormData();
        formData.append('productName', product.productName);
        formData.append('category', product.category);
        formData.append('sellingPrice', product.sellingPrice);
        formData.append('price', product.price);
        if (product.productImage) {
            formData.append('productImage', product.productImage);
        }

        // Simulate API call to update product
        console.log('Updating product:', Object.fromEntries(formData));
        navigate('/admin/products');
    };

    if (loading) return <p className='text-gray-600'>Loading...</p>;

    return (
        <div className='container mx-auto p-4 pt-20'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>Edit Product</h1>
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
                    <label className='block text-gray-700 font-medium mb-2'>Current Image</label>
                    {product.existingImage && (
                        <img
                            src={product.existingImage}
                            alt='Current product'
                            className='w-24 h-24 object-contain mb-2'
                        />
                    )}
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='productImage'>
                        Upload New Image
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
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default AdminEditProduct;
