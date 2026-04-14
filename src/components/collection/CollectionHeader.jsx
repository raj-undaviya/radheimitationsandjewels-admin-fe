import { Plus, Package, ClipboardList } from "lucide-react";

export default function CollectionHeader({ onAdd, stats }) {
    return (
        <>
            {/* 🔹 HEADER */}
            <div className="w-full overflow-x-auto">
                <div className="min-w-[600px]">

                    {/* 🔹 HEADER */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                        {/* LEFT */}
                        <div>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                Categories Management
                            </h1>

                            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md">
                                Organize and curate your jewelry boutique’s main collections.
                            </p>
                        </div>

                        {/* RIGHT */}
                        <button
                            onClick={onAdd}
                            className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-md hover:bg-orange-600 transition w-full sm:w-auto"
                        >
                            <Plus size={16} />
                            <span className="text-sm sm:text-base">Add New Category</span>
                        </button>

                    </div>



                    {/* 🔹 STATS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                        {/* CARD */}
                        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-3 sm:gap-4">
                            <div className="bg-orange-100 p-2.5 sm:p-3 rounded-full">
                                <Package className="text-orange-500" size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-gray-400">
                                    TOTAL CATEGORIES
                                </p>
                                <h2 className="text-lg sm:text-xl font-semibold">
                                    {stats?.total}
                                </h2>
                            </div>
                        </div>

                        {/* CARD */}
                        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-3 sm:gap-4">
                            <div className="bg-orange-100 p-2.5 sm:p-3 rounded-full">
                                <ClipboardList className="text-orange-500" size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-gray-400">
                                    SUB-ITEMS LISTED
                                </p>
                                <h2 className="text-lg sm:text-xl font-semibold">
                                    {stats?.subcategories}
                                </h2>
                            </div>
                        </div>

                        {/* CARD */}
                        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-3 sm:gap-4">
                            <div className="bg-orange-100 p-2.5 sm:p-3 rounded-full">
                                <ClipboardList className="text-orange-500" size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-gray-400">
                                    ACTIVE
                                </p>
                                <h2 className="text-lg sm:text-xl font-semibold">
                                    {stats?.active}
                                </h2>
                            </div>
                        </div>

                        {/* CARD */}
                        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-3 sm:gap-4">
                            <div className="bg-orange-100 p-2.5 sm:p-3 rounded-full">
                                <ClipboardList className="text-orange-500" size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-gray-400">
                                    INACTIVE
                                </p>
                                <h2 className="text-lg sm:text-xl font-semibold">
                                    {stats?.inactive}
                                </h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}