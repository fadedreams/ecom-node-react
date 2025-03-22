import React from 'react';
import { Link } from 'react-router-dom';
import scrollTop from '../utils/Utils'

const VerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
            {loading ? (
                loadingList.map((_, index) => (
                    <div
                        key={"loading" + index}
                        className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow-md overflow-hidden'
                    >
                        <div className='bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse'>
                            <div className='w-full h-full bg-gray-300 rounded'></div>
                        </div>
                        <div className='p-4 space-y-3'>
                            <div className='h-5 bg-gray-200 rounded animate-pulse'></div>
                            <div className='h-4 bg-gray-200 rounded animate-pulse w-1/2'></div>
                            <div className='flex gap-3'>
                                <div className='h-5 bg-gray-200 rounded animate-pulse w-1/3'></div>
                                <div className='h-5 bg-gray-200 rounded animate-pulse w-1/3'></div>
                            </div>
                            <div className='h-8 bg-gray-200 rounded-full animate-pulse'></div>
                        </div>
                    </div>
                ))
            ) : (
                data.map((product) => (
                    <Link
                        key={product?._id}
                        to={`/product/${product?._id}`}
                        className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'
                        onClick={scrollTop}
                    >
                        <div className='bg-slate-200 h-48 p-4 flex justify-center items-center'>
                            <img
                                src={product?.productImage[0] || "https://placehold.co/300x300"}
                                alt={product?.productName}
                                className='object-scale-down h-full hover:scale-110 transition-transform duration-300 mix-blend-multiply'
                            />
                        </div>
                        <div className='p-4 space-y-2'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-gray-800'>
                                {product?.productName}
                            </h2>
                            <p className='capitalize text-sm text-gray-500'>{product?.category}</p>
                            <div className='flex gap-3 items-center'>
                                <p className='text-gray-600 font-medium text-lg'>₹{product?.sellingPrice}</p>
                                <p className='text-gray-400 line-through text-sm'>₹{product?.price}</p>
                            </div>
                            <button
                                className='text-sm bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded-full transition-colors duration-200'
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log("Add to cart:", product?._id);
                                }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default VerticalCard;
