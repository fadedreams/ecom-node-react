import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch('YOUR_FORGOT_PASSWORD_API_ENDPOINT_HERE', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/login');
        }

        if (dataApi.error) {
            toast.error(dataApi.message);
        }
    };

    return (
        <section id='forgot-password' className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                    <img
                        src="/assest/forgotpasswnedSend.gif" // Assuming you have this asset, adjust if different
                        alt='forgot password icon'
                        className='w-20 h-20 mx-auto mb-4'
                    />
                    <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your email to reset your password
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleOnChange}
                                placeholder="Enter your email"
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 transform hover:scale-105"
                    >
                        Reset Password
                    </button>

                    <div className="text-center text-sm text-gray-600 space-y-2">
                        <p>
                            <Link to="/login" className="font-medium text-gray-600 hover:text-gray-700 hover:underline">
                                Back to Sign in
                            </Link>
                        </p>
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-gray-600 hover:text-gray-700 hover:underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ForgotPassword;
