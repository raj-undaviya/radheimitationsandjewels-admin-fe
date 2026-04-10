import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AddProductModal from "./AddProductModal";
import toast from "react-hot-toast";

import API from "../../api/axiosInstance";
import { ProductDeleteAPI } from "../../api/api";

export default function InventoryTable({ products = [], loading = false }) {

    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const [localProducts, setLocalProducts] = useState(products);

    const getStatus = (stock) => {
        if (stock === 0) return { text: "Out of Stock", color: "text-red-600" };
        if (stock < 10) return { text: "Low Stock", color: "text-yellow-600" };
        return { text: "Active", color: "text-green-600" };
    };

    useEffect(() => {
        setLocalProducts(products);
    }, [products]);

    const handleDelete = (id) => {
        toast((t) => (
            <div className="flex flex-col gap-2">
                <span>Delete this product?</span>

                <div className="flex gap-2">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);

                            try {
                                await API.delete(ProductDeleteAPI(id));

                                setLocalProducts(prev =>
                                    prev.filter(item => item.id !== id)
                                );

                                toast.success("Product deleted successfully");
                            } catch (error) {
                                console.error(error);
                                toast.error("Failed to delete product");
                            }
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Yes
                    </button>

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-300 px-3 py-1 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <div>

            {/* FILTERS */}
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
                    Showing {localProducts.length} items
                </p>
            </div>

            {/* TABLE */}
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

                        {/* LOADING */}
                        {loading && (
                            <tr>
                                <td colSpan="7" className="text-center py-6">
                                    Loading products...
                                </td>
                            </tr>
                        )}

                        {/* EMPTY */}
                        {!loading && localProducts.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-6 text-gray-400">
                                    No products found
                                </td>
                            </tr>
                        )}

                        {/* DATA */}
                        {!loading && localProducts.map((item) => {
                            const status = getStatus(item.stock);

                            return (
                                <tr key={item.id} className="border-b last:border-none">

                                    {/* PRODUCT */}
                                    <td className="py-4 flex items-center gap-3">
                                        <img
                                            src={item.images?.[0]?.image_url || "https://via.placeholder.com/40"}
                                            alt={item.name}
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                        <span className="font-medium">{item.name}</span>
                                    </td>

                                    {/* SKU */}
                                    <td>SKU-{item.id}</td>

                                    {/* CATEGORY */}
                                    <td>
                                        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                                            Category {item.category}
                                        </span>
                                    </td>

                                    {/* STOCK */}
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

                                    {/* PRICE */}
                                    <td>₹{Number(item.price).toLocaleString()}</td>

                                    {/* STATUS */}
                                    <td className={`text-sm font-medium ${status.color}`}>
                                        {status.text}
                                    </td>

                                    {/* ACTIONS */}
                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditData(item);
                                                    setOpenModal(true);
                                                }}
                                                className="p-2 rounded-full hover:bg-blue-100 transition"
                                            >
                                                <Pencil size={16} className="text-blue-600" />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 rounded-full hover:bg-red-100 transition"
                                            >
                                                <Trash2 size={16} className="text-red-600" />
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            <AddProductModal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditData(null);
                }}
                editData={editData}
                onSuccess={(updatedProduct) => {
                    setLocalProducts(prev =>
                        prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
                    );
                }}
            />
        </div>
    );
}