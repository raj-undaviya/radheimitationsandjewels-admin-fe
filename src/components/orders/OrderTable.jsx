import { Eye, Download, Pencil } from "lucide-react";
import { useState } from "react";
import Pagination from "../common/Pagination";
import OrderInvoiceModal from "./OrderInvoiceModal";
import jsPDF from "jspdf";

import { downloadInvoice } from "../utils/downloadInvoice";
import EditOrderModal from "./EditOrderModal";

export default function OrdersTable({
    orders = [],
    loading = false,
    page,
    setPage,
    itemsPerPage,
    refreshOrders
}) {

    const [invoiceMode, setInvoiceMode] = useState("view");

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEdit = (order) => {
        setSelectedOrder(order);
        setIsEditModalOpen(true);
    };

    // pagination
    const totalItems = orders.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginatedOrders = orders.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered": return "bg-green-100 text-green-600";
            case "shipped": return "bg-blue-100 text-blue-600";
            case "pending": return "bg-gray-200 text-gray-600";
            default: return "bg-gray-100";
        }
    };

    return (
        <div className="bg-white p-5 rounded-2xl shadow">

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">

                    <thead className="text-xs text-gray-400 border-b">
                        <tr>
                            <th className="py-3 px-4">Order ID</th>
                            <th className="px-4">Product</th>
                            <th className="px-4">Amount</th>
                            <th className="px-4">Status</th>
                            <th className="px-4">Date</th>
                            <th className="px-4 text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            Array.from({ length: itemsPerPage }).map((_, i) => (
                                <tr key={i} className="border-b animate-pulse">
                                    <td className="py-4">
                                        <div className="h-4 w-16 bg-gray-200 rounded"></div></td>
                                    <td><div className="h-4 w-32 bg-gray-200 rounded"></div></td>
                                    <td><div className="h-4 w-20 bg-gray-200 rounded"></div></td>
                                    <td><div className="h-6 w-20 bg-gray-200 rounded-full"></div></td>
                                    <td><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
                                    <td className="text-right"><div className="h-4 w-12 bg-gray-200 rounded ml-auto"></div></td>
                                </tr>
                            ))
                        ) : paginatedOrders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-5">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            paginatedOrders.map((o, index) => {
                                if (!o) return null;

                                return (

                                    <tr key={o.id || index} className="border-b hover:bg-gray-50 transition">

                                        {/* ORDERID */}
                                        <td className="py-4 px-4 text-orange-600 font-semibold">
                                            #{o?.id || "N/A"}
                                        </td>

                                        {/* PRODUCT */}
                                        <td className="px-4">
                                            {Array.isArray(o.items) && o.items.length > 0
                                                ? o.items[0]?.product_details?.name || "N/A"
                                                : "N/A"}
                                        </td>

                                        {/* AMOUNT */}
                                        <td className="px-4 font-medium">
                                            ₹{o?.total_amount ?? 0}
                                        </td>

                                        {/* STATUS */}
                                        <td className="px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(o?.status)}`}>
                                                {o?.status || "unknown"}
                                            </span>
                                        </td>

                                        {/* DATE */}
                                        <td className="px-4 text-sm text-gray-500">
                                            {o?.created_at
                                                ? new Date(o.created_at).toLocaleDateString()
                                                : "N/A"}
                                        </td>

                                        {/* ACTION */}
                                        <td className="px-4">
                                            <div className="flex justify-end items-center gap-2">

                                                {/* VIEW */}
                                                <button
                                                    onClick={() => {
                                                        setSelectedOrder(o);
                                                        setInvoiceMode("view");
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="p-2 rounded-full bg-blue-50 hover:bg-blue-100"
                                                >
                                                    <Eye size={16} className="text-blue-600" />
                                                </button>

                                                {/* EDIT */}
                                                <button
                                                    onClick={() => handleEdit(o)}
                                                    className="p-2 rounded-full bg-yellow-50 hover:bg-yellow-100"
                                                    title="Edit Order"
                                                >
                                                    <Pencil size={16} className="text-yellow-600" />
                                                </button>

                                                {/* DOWNLOAD */}
                                                <button
                                                    onClick={() => {
                                                        setSelectedOrder(o);
                                                        setInvoiceMode("download");
                                                        setIsModalOpen(true);

                                                        setTimeout(() => {
                                                            downloadInvoice(o);
                                                        }, 300);
                                                    }}
                                                    className="p-2 rounded-full bg-green-50 hover:bg-green-100"
                                                    title="Download Invoice"
                                                >
                                                    <Download size={16} className="text-green-600" />
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                );
                            })
                        )}
                    </tbody>

                </table>
            </div>

            {
                !loading && (
                    <div className="mt-4 flex justify-center">
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={(newPage) => {
                                if (newPage >= 1 && newPage <= totalPages) {
                                    setPage(newPage);
                                }
                            }}
                        />
                    </div>
                )
            }

            <OrderInvoiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
                mode={invoiceMode} // 🔥 IMPORTANT
            />

            <EditOrderModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                order={selectedOrder}
                onUpdate={refreshOrders} // 🔥 IMPORTANT
            />

        </div >
    );
}