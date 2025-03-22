import React, { useEffect, useState } from 'react';
import VerticalCard from '../components/VerticalCard';

const PRODUCTS_PER_PAGE = 5;

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('default');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 }); // Default range
    const [priceRangeLimits, setPriceRangeLimits] = useState({ min: 0, max: 1000 }); // Dynamic range based on products

    // Categories from Fake Store API
    const categories = [
        { label: 'All', value: 'all' },
        { label: 'Electronics', value: 'electronics' },
        { label: 'Jewelery', value: 'jewelery' },
        { label: "Men's Clothing", value: "men's clothing" },
        { label: "Women's Clothing", value: "women's clothing" },
    ];

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

            // Calculate the price range limits based on the products
            const prices = transformedProducts.map((product) => product.sellingPrice);
            const minPrice = Math.floor(Math.min(...prices));
            const maxPrice = Math.ceil(Math.max(...prices));

            setPriceRangeLimits({ min: minPrice, max: maxPrice });
            setPriceRange({ min: minPrice, max: maxPrice });
            setProducts(transformedProducts);
            setFilteredProducts(transformedProducts);
            setLoading(false);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Reset to page 1 when filters or sorting change
        setCurrentPage(1);

        let updatedProducts = [...products];

        // Filter by category
        if (categoryFilter !== 'all') {
            updatedProducts = updatedProducts.filter(
                (product) => product.category === categoryFilter
            );
        }

        // Filter by price range
        updatedProducts = updatedProducts.filter(
            (product) =>
                product.sellingPrice >= priceRange.min &&
                product.sellingPrice <= priceRange.max
        );

        // Sort by price
        if (sortOrder !== 'default') {
            updatedProducts.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.sellingPrice - b.sellingPrice;
                } else {
                    return b.sellingPrice - a.sellingPrice;
                }
            });
        }

        setFilteredProducts(updatedProducts);
    }, [categoryFilter, sortOrder, priceRange, products]);

    const getPaginatedProducts = () => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        return filteredProducts.slice(startIndex, endIndex);
    };

    const getTotalPages = () => {
        return Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handlePriceRangeChange = (e) => {
        const { name, value } = e.target;
        setPriceRange((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const totalPages = getTotalPages();
    const paginatedProducts = getPaginatedProducts();

    return (
        <div className='container mx-auto p-4 pt-20'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>All Products</h1>

            {/* Filter and Sort Section */}
            <div className='flex flex-col sm:flex-row gap-4 mb-6'>
                {/* Category Filter */}
                <div className='flex items-center gap-2'>
                    <label htmlFor='category-filter' className='text-gray-700 font-medium'>
                        Filter by Category:
                    </label>
                    <select
                        id='category-filter'
                        value={categoryFilter}
                        onChange={handleCategoryChange}
                        className='border border-gray-300 rounded-md px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400'
                    >
                        {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort by Price */}
                <div className='flex items-center gap-2'>
                    <label htmlFor='sort-order' className='text-gray-700 font-medium'>
                        Sort by Price:
                    </label>
                    <select
                        id='sort-order'
                        value={sortOrder}
                        onChange={handleSortChange}
                        className='border border-gray-300 rounded-md px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400'
                    >
                        <option value='default'>Default</option>
                        <option value='asc'>Low to High</option>
                        <option value='desc'>High to Low</option>
                    </select>
                </div>

                {/* Price Range Filter */}
                <div className='flex flex-col gap-2'>
                    <label className='text-gray-700 font-medium'>Price Range Filter:</label>
                    <div className='flex items-center gap-3'>
                        <input
                            type='number'
                            name='min'
                            value={priceRange.min}
                            onChange={handlePriceRangeChange}
                            min={priceRangeLimits.min}
                            max={priceRange.max}
                            className='w-20 border border-gray-300 rounded-md px-2 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400'
                        />
                        <span className='text-gray-600'>to</span>
                        <input
                            type='number'
                            name='max'
                            value={priceRange.max}
                            onChange={handlePriceRangeChange}
                            min={priceRange.min}
                            max={priceRangeLimits.max}
                            className='w-20 border border-gray-300 rounded-md px-2 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400'
                        />
                    </div>
                    <input
                        type='range'
                        min={priceRangeLimits.min}
                        max={priceRangeLimits.max}
                        value={priceRange.min}
                        onChange={(e) =>
                            setPriceRange((prev) => ({
                                ...prev,
                                min: Number(e.target.value),
                            }))
                        }
                        className='w-full accent-gray-600'
                    />
                    <input
                        type='range'
                        min={priceRangeLimits.min}
                        max={priceRangeLimits.max}
                        value={priceRange.max}
                        onChange={(e) =>
                            setPriceRange((prev) => ({
                                ...prev,
                                max: Number(e.target.value),
                            }))
                        }
                        className='w-full accent-gray-600'
                    />
                    <div className='flex justify-between text-gray-500 text-sm'>
                        <span>Min: ${priceRangeLimits.min}</span>
                        <span>Max: ${priceRangeLimits.max}</span>
                    </div>
                </div>
            </div>

            {/* Product List */}
            <VerticalCard
                loading={loading}
                data={paginatedProducts}
            />

            {/* Pagination */}
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
