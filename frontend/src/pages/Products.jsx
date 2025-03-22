import React, { useEffect, useState } from 'react';
import VerticalCard from '../components/VerticalCard';

const PRODUCTS_PER_PAGE = 5;

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchAllProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products', {
                method: 'GET',
                headers: {
                    "content-type": "application/json"
                }
            });
            const data = await response.json();
            return data || [];
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const allProducts = await fetchAllProducts();

            // Transform the API data to match the expected structure
            const transformedProducts = allProducts.map((product) => ({
                _id: product.id,
                productImage: [product.image],
                productName: product.title,
                category: product.category,
                sellingPrice: product.price,
                price: product.price * 1.2, // Simulate a higher original price
            }));

            setProducts(transformedProducts);
            setLoading(false);
        };

        fetchProducts();
    }, []);

    const getPaginatedProducts = () => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        return products.slice(startIndex, endIndex);
    };

    const getTotalPages = () => {
        return Math.ceil(products.length / PRODUCTS_PER_PAGE);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = getTotalPages();
    const paginatedProducts = getPaginatedProducts();

    return (
        <div className='container mx-auto p-4 pt-20'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>All Products</h1>
            <VerticalCard
                loading={loading}
                data={paginatedProducts}
            />
            {totalPages > 1 && (
                <div className='flex justify-center items-center gap-2 mt-4'>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-full border border-gray-300 text-gray-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                            }`}
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 rounded-full border border-gray-300 ${currentPage === index + 1
                                    ? 'bg-gray-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-full border border-gray-300 text-gray-600 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Products;
