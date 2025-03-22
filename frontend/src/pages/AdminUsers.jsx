import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            // Simulate fetching users from Fake Store API (using /users endpoint for simulation)
            const response = await fetch('https://fakestoreapi.com/users', {
                method: 'GET',
                headers: {
                    "content-type": "application/json"
                }
            });
            const data = await response.json();
            const transformedUsers = data.map((user) => ({
                _id: user.id,
                email: user.email,
                username: user.username,
                name: `${user.name.firstname} ${user.name.lastname}`,
                isDisabled: false // Add a flag to track if the user is disabled
            }));
            setUsers(transformedUsers);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className='container mx-auto p-4 pt-20'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>Manage Users</h1>

            {loading ? (
                <p className='text-gray-600'>Loading users...</p>
            ) : (
                <div className='overflow-x-auto'>
                    <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                        <thead>
                            <tr className='bg-gray-100 text-gray-600'>
                                <th className='py-2 px-4 border-b text-left'>ID</th>
                                <th className='py-2 px-4 border-b text-left'>Name</th>
                                <th className='py-2 px-4 border-b text-left'>Email</th>
                                <th className='py-2 px-4 border-b text-left'>Username</th>
                                <th className='py-2 px-4 border-b text-left'>Status</th>
                                <th className='py-2 px-4 border-b text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className='hover:bg-gray-50'>
                                    <td className='py-2 px-4 border-b'>{user._id}</td>
                                    <td className='py-2 px-4 border-b'>{user.name}</td>
                                    <td className='py-2 px-4 border-b'>{user.email}</td>
                                    <td className='py-2 px-4 border-b'>{user.username}</td>
                                    <td className='py-2 px-4 border-b'>
                                        {user.isDisabled ? (
                                            <span className='text-red-600'>Disabled</span>
                                        ) : (
                                            <span className='text-green-600'>Active</span>
                                        )}
                                    </td>
                                    <td className='py-2 px-4 border-b'>
                                        <Link
                                            to={`/admin/users/edit/${user._id}`}
                                            className='text-gray-600 hover:text-gray-800'
                                        >
                                            <FaEdit />
                                        </Link>
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

export default AdminUsers;
