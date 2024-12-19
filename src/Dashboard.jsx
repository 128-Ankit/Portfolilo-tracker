import { useState, useEffect } from 'react';
import StockForm from './StockForm';
import StockList from './StockList';

const BASE_URL = 'https://portfolilo-tracker-backend.onrender.com/api';

const Dashboard = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingStock, setEditingStock] = useState(null);
    const [totalValue, setTotalValue] = useState(0);

    // Fetch stocks
    useEffect(() => {
        fetchStocks();
    }, []);

    // Calculate total value whenever stocks change
    useEffect(() => {
        const total = stocks.reduce((sum, stock) => {
            return sum + (stock.currentPrice * stock.quantity);
        }, 0);
        setTotalValue(total);
    }, [stocks]);

    const fetchStocks = async () => {
        try {
            const response = await fetch(`${BASE_URL}/stocks`);
            if (!response.ok) throw new Error('Failed to fetch stocks');
            const data = await response.json();
            setStocks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/stocks/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete stock');
            setStocks(stocks.filter(stock => stock._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="p-4 text-red-500 bg-red-100 rounded">
            Error: {error}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Portfolio Tracker</h1>

                {/* Portfolio Summary */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded">
                            <p className="text-gray-600">Total Portfolio Value</p>
                            <p className="text-2xl font-bold text-blue-600">
                                ${totalValue.toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded">
                            <p className="text-gray-600">Total Stocks</p>
                            <p className="text-2xl font-bold text-green-600">
                                {stocks.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stock Form */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <StockForm
                        onSuccess={fetchStocks}
                        editingStock={editingStock}
                        setEditingStock={setEditingStock}
                    />
                </div>

                {/* Stock List */}
                <div className="bg-white rounded-lg shadow p-6">
                    <StockList
                        stocks={stocks}
                        onDelete={handleDelete}
                        onEdit={setEditingStock}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;