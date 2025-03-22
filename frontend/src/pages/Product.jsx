import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaStarHalf } from "react-icons/fa";

const Product = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });

    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState("");
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
    const [zoomImage, setZoomImage] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const MAX_THUMBNAILS = 5;
    const placeholderImage = "https://placehold.co/300x300";
    const thumbnailPlaceholder = "https://placehold.co/80x80";

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch('YOUR_PRODUCT_DETAILS_API_ENDPOINT_HERE', {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ productId: params?.id })
            });
            const dataResponse = await response.json();
            const productData = dataResponse?.data || {};
            setData(productData);
            setActiveImage(productData.productImage?.[0] || placeholderImage);
        } catch (error) {
            console.error('Error fetching product details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [params]);

    const handleThumbnailClick = (imageURL) => {
        setActiveImage(imageURL || placeholderImage);
    };

    const handleZoomImage = useCallback((e) => {
        setZoomImage(true);
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setZoomImageCoordinate({ x, y });
    }, []);

    const handleLeaveImageZoom = () => setZoomImage(false);

    const handleAddToCart = async (e, id) => {
        console.log("Add to cart:", id);
        // Add your cart logic here
    };

    const handleBuyProduct = async (e, id) => {
        console.log("Buy product:", id);
        await handleAddToCart(e, id);
        navigate("/cart");
    };

    return (
        <div className='container mx-auto p-4 pt-20'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/* Product Image Section */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                        <img
                            src={activeImage}
                            className='h-full w-full object-contain mix-blend-multiply transition-all duration-300'
                            onMouseMove={handleZoomImage}
                            onMouseLeave={handleLeaveImageZoom}
                            alt={data.productName || "Product Image"}
                            loading="lazy"
                        />
                        {zoomImage && (
                            <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 overflow-hidden'>
                                <div
                                    className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                                    style={{
                                        background: `url(${activeImage})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '200%',
                                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Slider */}
                    <div className='h-full max-h-[300px] lg:max-h-96'>
                        {loading ? (
                            <div className='flex gap-2 lg:flex-col overflow-auto scrollbar-none h-full'>
                                {Array(4).fill(null).map((_, index) => (
                                    <div
                                        className='h-20 w-20 bg-slate-200 rounded animate-pulse'
                                        key={`loading-${index}`}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className='flex gap-2 lg:flex-col overflow-auto scrollbar-none h-full'>
                                {data.productImage.length > 0 ? (
                                    data.productImage.slice(0, MAX_THUMBNAILS).map((imgURL, index) => (
                                        <div
                                            className={`h-20 w-20 bg-slate-200 rounded p-1 cursor-pointer ${activeImage === imgURL ? 'border-2 border-gray-600' : ''}`}
                                            key={imgURL || `thumbnail-${index}`}
                                            onClick={() => handleThumbnailClick(imgURL)}
                                            tabIndex={0}
                                            onKeyDown={(e) => e.key === 'Enter' && handleThumbnailClick(imgURL)}
                                        >
                                            <img
                                                src={imgURL || thumbnailPlaceholder}
                                                className='w-full h-full object-contain mix-blend-multiply'
                                                alt={`${data.productName || 'Product'} thumbnail ${index + 1}`}
                                                loading="lazy"
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className='h-20 w-20 bg-slate-200 rounded p-1'>
                                        <img
                                            src={thumbnailPlaceholder}
                                            className='w-full h-full object-contain mix-blend-multiply'
                                            alt="No thumbnails available"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details */}
                {loading ? (
                    <div className='grid gap-2 w-full'>
                        <div className='bg-slate-200 h-6 w-24 rounded animate-pulse' />
                        <div className='h-8 bg-slate-200 rounded animate-pulse' />
                        <div className='h-6 w-32 bg-slate-200 rounded animate-pulse' />
                        <div className='flex gap-1 h-6'>
                            {Array(5).fill(null).map((_, i) => (
                                <div key={i} className='h-6 w-6 bg-slate-200 rounded animate-pulse' />
                            ))}
                        </div>
                        <div className='flex gap-2 h-8'>
                            <div className='h-8 w-20 bg-slate-200 rounded animate-pulse' />
                            <div className='h-8 w-20 bg-slate-200 rounded animate-pulse' />
                        </div>
                        <div className='flex gap-3 h-10'>
                            <div className='h-10 w-32 bg-slate-200 rounded animate-pulse' />
                            <div className='h-10 w-32 bg-slate-200 rounded animate-pulse' />
                        </div>
                        <div className='h-20 bg-slate-200 rounded animate-pulse' />
                    </div>
                ) : (
                    <div className='flex flex-col gap-2'>
                        <p className='bg-gray-200 text-gray-600 px-2 rounded-full inline-block w-fit'>{data.brandName}</p>
                        <h2 className='text-2xl lg:text-4xl font-medium'>{data.productName}</h2>
                        <p className='capitalize text-slate-400'>{data.category}</p>
                        <div className='text-gray-600 flex items-center gap-1'>
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
                        </div>
                        <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                            <p className='text-gray-600'>₹{data.sellingPrice}</p>
                            <p className='text-slate-400 line-through'>₹{data.price}</p>
                        </div>
                        <div className='flex items-center gap-3 my-2'>
                            <button
                                className='border-2 border-gray-600 rounded px-3 py-1 min-w-[120px] text-gray-600 font-medium hover:bg-gray-600 hover:text-white transition-colors'
                                onClick={(e) => handleBuyProduct(e, data?._id)}
                            >
                                Buy
                            </button>
                            <button
                                className='border-2 border-gray-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-gray-600 hover:text-gray-600 hover:bg-white transition-colors'
                                onClick={(e) => handleAddToCart(e, data?._id)}
                            >
                                Add To Cart
                            </button>
                        </div>
                        <div>
                            <p className='text-slate-600 font-medium my-1'>Description:</p>
                            <p className='text-gray-700'>{data.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
