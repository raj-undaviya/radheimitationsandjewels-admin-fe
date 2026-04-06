import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AddProductModal from "./AddProductModal";

export default function InventoryTable({ products }) {

    const [data, setData] = useState(products);
    const [deleteId, setDeleteId] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    const getStatus = (stock) => {
        if (stock === 0) return { text: "Out of Stock", color: "text-red-600" };
        if (stock < 10) return { text: "Low Stock", color: "text-yellow-600" };
        return { text: "Active", color: "text-green-600" };
    };

    // OPTIONAL HANDLERS
    const handleEdit = (item) => {
        setEditProduct(item);
        setOpenModal(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = () => {
        setData(prev => prev.filter(item => item.id !== deleteId));
        setDeleteId(null);
    };

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
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => {
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
                                                className={`h-2 rounded-full ${item.stock === 0
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

                                    {/* ✅ ACTION BUTTONS */}
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">

                                            {/* EDIT */}
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                                            >
                                                <Pencil size={16} className="text-gray-700" />
                                            </button>

                                            {/* DELETE */}
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition"
                                            >
                                                <Trash2 size={16} className="text-gray-700 hover:text-red-600" />
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>

            <AddProductModal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditProduct(null);
                }}
                editData={editProduct}
            />

            {deleteId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm">

                        <h2 className="text-lg font-semibold mb-2">
                            Delete Product?
                        </h2>

                        <p className="text-sm text-gray-500 mb-4">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>

    );
}