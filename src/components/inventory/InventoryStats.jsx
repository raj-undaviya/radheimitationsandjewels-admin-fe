export default function InventoryStats({
    totalItems = 0,
    lowStock = 0,
    outOfStock = 0,
    totalValue = 0,
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

            {/* Card 1 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
                <p className="text-gray-400 text-xs sm:text-sm">Total Stock Items</p>
                <h2 className="text-xl sm:text-2xl font-bold mt-1">
                    {Number(totalItems).toLocaleString()}
                </h2>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
                <p className="text-gray-400 text-xs sm:text-sm">Low Stock Alerts</p>
                <h2 className="text-xl sm:text-2xl font-bold mt-1">
                    {Number(lowStock)}
                </h2>
                <p className="text-xs text-orange-500 mt-1">Under 10 units</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
                <p className="text-gray-400 text-xs sm:text-sm">Out of Stock</p>
                <h2 className="text-xl sm:text-2xl font-bold mt-1">
                    {Number(outOfStock)}
                </h2>
            </div>

            {/* Card 4 */}
            <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white p-5 sm:p-6 rounded-xl shadow-lg">
                <p className="text-xs sm:text-sm">Total Inventory Value</p>
                <h2 className="text-xl sm:text-2xl font-bold mt-1">
                    ₹{Number(totalValue).toLocaleString()}
                </h2>
            </div>

        </div>
    );
}