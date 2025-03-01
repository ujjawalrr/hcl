import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'

export const Home = () => {
    const navigate = useNavigate();
    const { setUser, user } = useUserStore();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        customerName: '',
        accountNumber: '',
        BIC: '',
        balance: 1000,
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const endpoint = isLogin ? 'login' : 'register';
            const loginData = isLogin ? {
                accountNumber: parseInt(formData.accountNumber),
                password: formData.password
            } : {
                ...formData,
                accountNumber: parseInt(formData.accountNumber),
                balance: parseInt(formData.balance)
            };

            const response = await fetch(`http://localhost:3000/api/auth/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `${isLogin ? 'Login' : 'Registration'} failed`);
            }

            setUser(data);
            navigate('/transactions');
        } catch (err) {
            console.error('Auth error:', err);
            setError(err.message);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isLogin ? 'Login to your account' : 'Create new account'}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        {!isLogin && (
                            <>
                                <div>
                                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                                        Customer Name
                                    </label>
                                    <input
                                        id="customerName"
                                        name="customerName"
                                        type="text"
                                        required={!isLogin}
                                        value={formData.customerName}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="BIC" className="block text-sm font-medium text-gray-700">
                                        Bank BIC Code
                                    </label>
                                    <input
                                        id="BIC"
                                        name="BIC"
                                        type="text"
                                        required={!isLogin}
                                        value={formData.BIC}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter bank BIC code"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
                                        Initial Balance
                                    </label>
                                    <input
                                        id="balance"
                                        name="balance"
                                        type="number"
                                        min="0"
                                        required={!isLogin}
                                        value={formData.balance}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter initial balance"
                                    />
                                </div>
                            </>
                        )}
                        <div>
                            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                                Account Number
                            </label>
                            <input
                                id="accountNumber"
                                name="accountNumber"
                                type="number"
                                required
                                value={formData.accountNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your account number"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {isLogin ? 'Sign in' : 'Register'}
                        </button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                                setFormData({
                                    customerName: '',
                                    accountNumber: '',
                                    BIC: '',
                                    balance: 1000,
                                    password: ''
                                });
                            }}
                            className="text-indigo-600 hover:text-indigo-500"
                        >
                            {isLogin ? 'Need to create an account?' : 'Already have an account?'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home;