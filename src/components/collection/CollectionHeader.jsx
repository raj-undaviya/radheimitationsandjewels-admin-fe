import { Plus, Package, ClipboardList } from "lucide-react";

export default function CollectionHeader({ onAdd }) {
    return (
        <>
            {/* 🔹 HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                {/* LEFT */}
                <div>
                    <h1 className="text-2xl font-bold">
                        Categories Management
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Organize and curate your jewelry boutique’s main collections.
                    </p>
                </div>

                {/* RIGHT */}
                <button
                    onClick={onAdd}
                    className="flex items-center justify-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-full shadow-md hover:bg-orange-600 transition"
                >
                    <Plus size={16} />
                    Add New Category
                </button>
            </div>

            {/* 🔹 STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

                <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                        <Package className="text-orange-500" size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">TOTAL CATEGORIES</p>
                        <h2 className="text-xl font-semibold">12</h2>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                        <ClipboardList className="text-orange-500" size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">SUB-ITEMS LISTED</p>
                        <h2 className="text-xl font-semibold">1,284</h2>
                    </div>
                </div>

            </div>
        </>
    );
}