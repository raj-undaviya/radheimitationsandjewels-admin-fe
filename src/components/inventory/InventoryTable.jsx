import { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Eye, Trash2 } from "lucide-react";

export default function InventoryTable({ products }) {

    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);

    const getStatus = (stock) => {
        if (stock === 0) return { text: "Out of Stock", color: "text-red-600" };
        if (stock < 10) return { text: "Low Stock", color: "text-yellow-600" };
        return { text: "Active", color: "text-green-600" };
    };

    // ✅ CLICK OUTSIDE CLOSE
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
                <div className="flex flex-wrap gap-2">
                    <button className="bg-gray-200 px-4 py-2 rounded-full text-sm">
                        Filter by Category
                    </button>
                    <button className="bg-gray-200 px-4 py-2 rounded-full text-sm">
                        Sort by Stock
                    </button>
                </div>

                <p className="text-gray-500 text-sm">
                    Showing {products.length} items
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-175 w-full text-left">

                    <thead className="text-gray-400 text-sm border-b">
                        <tr>
                            <th className="pb-2">Product</th>
                            <th>SKU</th>
                            <th>Category</th>
                            <th>Stock Level</th>
                            <th>Unit Price</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((item, index) => {
                            const status = getStatus(item.stock);

                            return (
                                <tr key={index} className="border-b last:border-none">

                                    {/* PRODUCT */}
                                    <td className="py-4 flex items-center gap-3">
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                        <span className="font-medium">{item.name}</span>
                                    </td>

                                    <td>{item.sku}</td>

                                    <td>
                                        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                                            {item.category}
                                        </span>
                                    </td>

                                    {/* Stock */}
                                    <td className="min-w-40">
                                        <div className="w-full bg-gray-200 h-2 rounded-full">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    item.stock === 0
                                                        ? "bg-red-500"
                                                        : item.stock < 10
                                                        ? "bg-yellow-500"
                                                        : "bg-green-500"
                                                }`}
                                                style={{ width: `${Math.min(item.stock, 100)}%` }}
                                            />
                                        </div>
                                        <p className="text-xs mt-1">
                                            {item.stock} units
                                        </p>
                                    </td>

                                    <td>${item.price}</td>

                                    <td className={`text-sm font-medium ${status.color}`}>
                                        {status.text}
                                    </td>

                                    {/* 🔥 ADVANCED MENU */}
                                    <td className="relative" ref={menuRef}>
                                        <button
                                            onClick={() =>
                                                setOpenMenu(openMenu === index ? null : index)
                                            }
                                            className="p-2 rounded-full hover:bg-gray-100 transition"
                                        >
                                            <MoreVertical size={18} />
                                        </button>

                                        {openMenu === index && (
                                            <div className="absolute right-0 mt-2 w-40 bg-white overflow-hidden rounded-xl shadow-xl z-50 
                                                animate-in fade-in zoom-in duration-150">

                                                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                                                    <Eye size={16} /> View
                                                </button>

                                                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                                                    <Pencil size={16} /> Edit
                                                </button>

                                                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                    <Trash2 size={16} /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>

        </div>
    );
}