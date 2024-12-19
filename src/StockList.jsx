/* eslint-disable react/prop-types */

const StockList = ({ stocks, onDelete, onEdit }) => {
    if (!stocks.length) {
        return (
            <div className="text-center py-8 text-gray-500">
                No stocks in your portfolio. Add some stocks to get started!
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Your Stocks</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ticker
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Buy Price
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Current Price
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Value
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {stocks.map((stock) => {
                            const totalValue = stock.currentPrice * stock.quantity;

                            return (
                                <tr key={stock._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {stock.ticker}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {stock.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        {stock.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        ${stock.buyPrice.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        ${stock.currentPrice ? stock.currentPrice.toFixed(2) : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        ${totalValue.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() => onEdit(stock)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(stock._id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockList;