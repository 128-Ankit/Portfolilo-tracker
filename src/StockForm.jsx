/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const BASE_URL = 'https://portfolilo-tracker-backend.onrender.com/api';

const StockForm = ({ onSuccess, editingStock, setEditingStock }) => {
    const [formData, setFormData] = useState({
        ticker: '',
        name: '',
        quantity: '',
        buyPrice: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingStock) {
            setFormData({
                ticker: editingStock.ticker,
                name: editingStock.name,
                quantity: editingStock.quantity,
                buyPrice: editingStock.buyPrice
            });
        }
    }, [editingStock]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const url = editingStock
                ? `${BASE_URL}/stocks/${editingStock._id}`
                : `${BASE_URL}/stocks`;

            const method = editingStock ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Something went wrong');
            }

            setFormData({ ticker: '', name: '', quantity: '', buyPrice: '' });
            setEditingStock(null);
            onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">
                {editingStock ? 'Edit Stock' : 'Add New Stock'}
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ticker Symbol
                        </label>
                        <input
                            type="text"
                            name="ticker"
                            value={formData.ticker}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            required
                            min="1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Buy Price
                        </label>
                        <input
                            type="number"
                            name="buyPrice"
                            value={formData.buyPrice}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            required
                            min="0.01"
                            step="0.01"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    {editingStock && (
                        <button
                            type="button"
                            onClick={() => setEditingStock(null)}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : editingStock ? 'Update Stock' : 'Add Stock'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StockForm;