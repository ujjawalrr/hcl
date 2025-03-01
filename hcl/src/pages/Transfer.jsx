import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const Transfer = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const [formData, setFormData] = useState({
        fromAccountNumber: user?.accountNumber || '',
        toAccountNumber: '',
        toBankBIC: '',
        amount: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!formData.toAccountNumber || !formData.toBankBIC || !formData.amount) {
            setError('All fields are required');
            return;
        }

        if (formData.amount <= 0) {
            setError('Amount must be greater than 0');
            return;
        }

        if (formData.fromAccountNumber === formData.toAccountNumber) {
            setError('Cannot transfer to the same account');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Transfer failed');
            }

            setSuccess('Transfer successful!');
            // Reset form except fromAccountNumber
            setFormData(prev => ({
                ...prev,
                toAccountNumber: '',
                toBankBIC: '',
                amount: ''
            }));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full mx-auto space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Transfer Money
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Make a secure transfer to another account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="fromAccountNumber" className="block text-sm font-medium text-gray-700">
                                From Account Number
                            </label>
                            <input
                                id="fromAccountNumber"
                                name="fromAccountNumber"
                                type="number"
                                required
                                disabled
                                value={formData.fromAccountNumber}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="toAccountNumber" className="block text-sm font-medium text-gray-700">
                                To Account Number
                            </label>
                            <input
                                id="toAccountNumber"
                                name="toAccountNumber"
                                type="number"
                                required
                                value={formData.toAccountNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter recipient's account number"
                            />
                        </div>

                        <div>
                            <label htmlFor="toBankBIC" className="block text-sm font-medium text-gray-700">
                                Recipient's Bank BIC
                            </label>
                            <input
                                id="toBankBIC"
                                name="toBankBIC"
                                type="text"
                                required
                                value={formData.toBankBIC}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter recipient's bank BIC"
                            />
                        </div>

                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                Amount
                            </label>
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                value={formData.amount}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter amount to transfer"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="text-green-500 text-sm text-center">
                            {success}
                        </div>
                    )}

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Transfer
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/profile')}
                            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Transfer;