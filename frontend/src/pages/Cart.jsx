import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadingCart = new Array(4).fill(null);

    const fetchCartData = async () => {
        try {
            // Using Fake Store API's cart endpoint for simulation
            const response = await fetch('https://fakestoreapi.com/carts/1', {
                method: 'GET',
                headers: {
                    "content-type": "application/json"
                }
            });
            const cartResponse = await response.json();

            // Fetch product details for each cart item
            const cartProducts = await Promise.all(
                cartResponse.products.map(async (item) => {
                    const productResponse = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
                    const productData = await productResponse.json();
                    return {
                        _id: item.productId,
                        quantity: item.quantity,
                        productId: {
                            productImage: [productData.image],
                            productName: productData.title,
                            category: productData.category,
                            sellingPrice: productData.price,
                        }
                    };
                })
            );

            setData(cartProducts);
        } catch (error) {
            console.error('Error fetching cart data:', error);
            setData([]);
        }
    };

    const handleLoading = async () => {
        setLoading(true);
        await fetchCartData();
        setLoading(false);
    };

    useEffect(() => {
        handleLoading();
    }, []);

    const increaseQty = (id, qty) => {
        setData((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, quantity: qty + 1 } : item
            )
        );
    };

    const decreaseQty = (id, qty) => {
        if (qty >= 2) {
            setData((prev) =>
                prev.map((item) =>
                    item._id === id ? { ...item, quantity: qty - 1 } : item
                )
            );
        }
    };

    const deleteCartProduct = (id) => {
        setData((prev) => prev.filter((item) => item._id !== id));
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0);

    return (
        <div className='container mx-auto p-4 pt-20'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>Your Cart</h1>

            <div className='text-center text-lg my-3'>
                {data.length === 0 && !loading && (
                    <p className='bg-white py-5 rounded-md shadow-md'>Your cart is empty</p>
                )}
            </div>

            <div className='flex flex-col lg:flex-row gap-6 lg:gap-10'>
                {/* View Products */}
                <div className='w-full lg:w-2/3'>
                    {loading ? (
                        loadingCart.map((_, index) => (
                            <div
                                key={"loading" + index}
                                className='w-full bg-gray-100 h-32 my-2 border border-gray-200 animate-pulse rounded-lg'
                            ></div>
                        ))
                    ) : (
                        data.map((product) => (
                            <div
                                key={product?._id}
                                className='w-full bg-white my-2 border border-gray-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4'
                            >
                                <div className='w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 flex-shrink-0'>
                                    <img
                                        src={product?.productId?.productImage?.[0] || "https://placehold.co/128x128/gray/white?text=Product"}
                                        alt={product?.productId?.productName}
                                        className='w-full h-full object-contain mix-blend-multiply'
                                    />
                                </div>
                                <div className='flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
                                    <div className='flex-1'>
                                        <h2 className='text-base sm:text-lg font-medium text-gray-800 text-ellipsis line-clamp-1'>
                                            {product?.productId?.productName}
                                        </h2>
                                        <p className='capitalize text-gray-500 text-sm'>
                                            {product?.productId?.category}
                                        </p>
                                        <p className='text-gray-600 font-medium text-lg mt-1'>
                                            ${product?.productId?.sellingPrice.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <div className='flex items-center gap-2'>
                                            <button
                                                className='border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                                onClick={() => decreaseQty(product?._id, product?.quantity)}
                                            >
                                                -
                                            </button>
                                            <span className='text-gray-600'>{product?.quantity}</span>
                                            <button
                                                className='border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                                onClick={() => increaseQty(product?._id, product?.quantity)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div
                                            className='text-gray-600 rounded-full p-2 hover:bg-gray-200 cursor-pointer'
                                            onClick={() => deleteCartProduct(product?._id)}
                                        >
                                            <MdDelete />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Summary */}
                <div className='w-full lg:w-1/3 max-w-sm'>
                    {loading ? (
                        <div className='h-36 bg-gray-100 border border-gray-200 animate-pulse rounded-lg'></div>
                    ) : (
                        <div className='bg-white rounded-lg shadow-md'>
                            <h2 className='text-white bg-gray-600 px-4 py-2 rounded-t-lg'>Summary</h2>
                            <div className='flex items-center justify-between px-4 py-3 text-gray-600'>
                                <p className='font-medium'>Quantity</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 py-3 text-gray-600'>
                                <p className='font-medium'>Total Price</p>
                                <p>${totalPrice.toFixed(2)}</p>
                            </div>
                            <button className='bg-gray-600 text-white w-full py-2 rounded-b-lg hover:bg-gray-700 transition-colors'>
                                Proceed to Payment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
