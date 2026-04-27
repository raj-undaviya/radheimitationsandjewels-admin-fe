import { FiUploadCloud, FiPlus } from "react-icons/fi";

export default function InventoryHeader({ onAddClick, onBulkUploadClick }) {
    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

            {/* Left */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
                    Inventory Management
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Manage your products easily
                </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

                {/* Bulk Upload Button */}
                <button
                    onClick={onBulkUploadClick}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto 
                    bg-gray-800 hover:bg-gray-900 
                    text-white px-5 py-3 rounded-xl shadow-md 
                    text-sm sm:text-base font-medium transition duration-200"
                >
                    <FiUploadCloud size={18} />
                    Bulk Upload
                </button>

                {/* Add Product Button */}
                <button
                    onClick={onAddClick}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto 
                    bg-linear-to-r from-orange-500 to-orange-600 
                    hover:from-orange-600 hover:to-orange-700 
                    text-white px-5 py-3 rounded-xl shadow-md 
                    text-sm sm:text-base font-medium transition duration-200"
                >
                    <FiPlus size={18} />
                    Add New Product
                </button>

            </div>

        </div>
    );
}