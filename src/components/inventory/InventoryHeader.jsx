export default function InventoryHeader({ onAddClick }) {
    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

            {/* Left */}
            <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                    Inventory Management
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Manage your products easily
                </p>
            </div>

            {/* Right Button */}
            <button
                onClick={onAddClick}
                className="w-full md:w-auto bg-linear-to-r from-orange-500 to-orange-600 
                hover:from-orange-600 hover:to-orange-700 
                text-white px-5 py-3 rounded-xl shadow-md 
                text-sm sm:text-base font-medium 
                transition duration-200"
            >
                + Add New Product
            </button>

        </div>
    );
}