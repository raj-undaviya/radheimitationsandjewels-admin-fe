import { useState } from "react";

export default function InventoryRow({ item }) {

    const [openMenu, setOpenMenu] = useState(false);

    const getStockWidth = () => {
        if (item.stock < 10) return "w-[25%]";
        if (item.stock < 50) return "w-[50%]";
        return "w-[80%]";
    };

    return (
        <div className="bg-white px-6 py-5 rounded-2xl shadow-sm hover:shadow-md transition">

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 items-center gap-y-4 gap-x-6">

                {/* PRODUCT */}
                <div className="flex items-center gap-3 col-span-2 md:col-span-2">
                    <img
                        src="https://via.placeholder.com/40"
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <p className="font-semibold text-gray-800 leading-tight">
                            {item.name}
                        </p>
                        <p className="text-xs text-gray-500">{item.sku}</p>
                    </div>
                </div>

                {/* CATEGORY */}
                <div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">
                        {item.category}
                        {item.name}
                    </span>
                </div>

                {/* STOCK */}
                <div className="col-span-2 sm:col-span-1">
                    <p className="text-sm text-gray-500">{item.stock} units</p>

                    <div className="h-2 bg-gray-200 rounded-full mt-1">
                        <div className={`h-2 bg-green-500 rounded-full ${getStockWidth()}`}></div>
                    </div>
                </div>

                {/* PRICE */}
                <div className="font-semibold text-gray-900">
                    {item.price}
                </div>

                {/* STATUS */}
                <div className="flex items-center gap-2 text-green-600 font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Active
                </div>

                {/* MENU */}
                <div className="relative text-right">
                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className="text-gray-400 hover:text-gray-700 text-xl"
                    >
                        ⋮
                    </button>

                    {openMenu && (
                        <div className="absolute right-0 mt-2 w-36 bg-white border rounded-xl shadow-lg z-50">

                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                                View Details
                            </button>

                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                                Edit Product
                            </button>

                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500">
                                Delete
                            </button>

                        </div>
                    )}
                </div>

            </div>

        </div>
    );
}