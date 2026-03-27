export default function InventoryHeader({ onAddClick }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
                <h1 className="text-xl sm:text-2xl font-bold">
                    Inventory Management
                </h1>
                <p className="text-[#584237] text-xs sm:text-sm">
                    Tracking 1,240 luxury jewelry pieces across all collections.
                </p>
            </div>

            <button
                onClick={onAddClick}
                className="w-full sm:w-auto bg-linear-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-full shadow-md"
            >
                + Add New Product
            </button>
        </div>
    );
}