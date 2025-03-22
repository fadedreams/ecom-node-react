import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        username: '',
        name: '',
        isDisabled: false,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/users/${id}`);
                const data = await response.json();
                setUser({
                    email: data.email,
                    username: data.username,
                    name: `${data.name.firstname} ${data.name.lastname}`,
                    isDisabled: false, // Default to false; in a real app, this would come from the API
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate updating the user (in a real app, this would be an API call)
        console.log('Updating user:', user);
        navigate('/admin/users');
    };

    if (loading) return <p className='text-gray-600'>Loading...</p>;

    return (
        <div className='container mx-auto p-4 pt-20'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>Edit User</h1>
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md max-w-lg'>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='name'>
                        Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={user.name}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='email'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={user.email}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor='username'>
                        Username
                    </label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={user.username}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='flex items-center gap-2 text-gray-700 font-medium'>
                        <input
                            type='checkbox'
                            name='isDisabled'
                            checked={user.isDisabled}
                            onChange={handleChange}
                            className='h-4 w-4 text-gray-600 focus:ring-gray-400'
                        />
                        Disable User
                    </label>
                </div>
                <button
                    type='submit'
                    className='bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700'
                >
                    Update User
                </button>
            </form>
        </div>
    );
};

export default AdminEditUser;
