import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products', {
                method: 'GET',
                headers: {
                    "content-type": "application/json"
                }
            });
            const data = await response.json();
            const transformedProducts = data.map((product) => ({
                _id: product.id,
                productImage: [product.image],
                productName: product.title,
                category: product.category,
                sellingPrice: product.price,
                price: product.price * 1.2,
                hidden: false // Add a hidden flag for toggling visibility
            }));
            setProducts(transformedProducts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = (id) => {
        setProducts((prev) => prev.filter((product) => product._id !== id));
    };

    const handleToggleHide = (id) => {
        setProducts((prev) =>
            prev.map((product) =>
                product._id === id ? { ...product, hidden: !product.hidden } : product
            )
        );
    };

    return (
        <div className='container mx-auto p-4 pt-20'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Manage Products</h1>
                <Link
                    to='/admin/add-product'
                    className='flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700'
                >
                    <FaPlus /> Add Product
                </Link>
            </div>

            {loading ? (
                <p className='text-gray-600'>Loading products...</p>
            ) : (
                <div className='overflow-x-auto'>
                    <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                        <thead>
                            <tr className='bg-gray-100 text-gray-600'>
                                <th className='py-2 px-4 border-b text-left'>Image</th>
                                <th className='py-2 px-4 border-b text-left'>Name</th>
                                <th className='py-2 px-4 border-b text-left'>Category</th>
                                <th className='py-2 px-4 border-b text-left'>Price</th>
                                <th className='py-2 px-4 border-b text-left'>Status</th>
                                <th className='py-2 px-4 border-b text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className='hover:bg-gray-50'>
                                    <td className='py-2 px-4 border-b'>
                                        <img
                                            src={product.productImage[0] || "https://placehold.co/50x50/gray/white?text=Product"}
                                            alt={product.productName}
                                            className='w-12 h-12 object-contain'
                                        />
                                    </td>
                                    <td className='py-2 px-4 border-b'>{product.productName}</td>
                                    <td className='py-2 px-4 border-b capitalize'>{product.category}</td>
                                    <td className='py-2 px-4 border-b'>${product.sellingPrice.toFixed(2)}</td>
                                    <td className='py-2 px-4 border-b'>
                                        {product.hidden ? (
                                            <span className='text-red-600'>Hidden</span>
                                        ) : (
                                            <span className='text-green-600'>Visible</span>
                                        )}
                                    </td>
                                    <td className='py-2 px-4 border-b'>
                                        <div className='flex gap-2'>
                                            <Link
                                                to={`/admin/edit-product/${product._id}`}
                                                className='text-gray-600 hover:text-gray-800'
                                            >
                                                <FaEdit />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className='text-gray-600 hover:text-red-600'
                                            >
                                                <FaTrash />
                                            </button>
                                            <button
                                                onClick={() => handleToggleHide(product._id)}
                                                className='text-gray-600 hover:text-gray-800'
                                            >
                                                {product.hidden ? <FaEye /> : <FaEyeSlash />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminProduct;
