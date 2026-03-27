export default function InventoryFilters() {
    return (
        <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">

            <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    Filter by Category
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    Sort by Stock
                </button>
            </div>

            <p className="text-sm text-gray-500">
                Showing 1 to 4 of 1,240 items
            </p>

        </div>
    );
}