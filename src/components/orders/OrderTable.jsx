import { Eye, Download } from "lucide-react";
import { useState } from "react";
import Pagination from "../common/Pagination";
import OrderInvoiceModal from "./OrderInvoiceModal";
import jsPDF from "jspdf";

export default function OrdersTable({
    orders = [],
    loading = false,
    page,
    setPage,
    itemsPerPage
}) {

    // ✅ DOWNLOAD FUNCTION
    const generateInvoicePDF = (order) => {
        if (!order) return;

        const pdf = new jsPDF();
        let y = 15;

        const subtotal = Array.isArray(order.items)
            ? order.items.reduce(
                (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
                0
            )
            : 0;

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.text("INVOICE", 90, y);

        y += 10;

        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");

        pdf.text(`Order ID: ${order.id || "N/A"}`, 10, y);
        pdf.text(
            order.created_at
                ? new Date(order.created_at).toLocaleDateString()
                : "N/A",
            140,
            y
        );

        y += 10;

        pdf.text(`Name: ${order.name || "N/A"}`, 10, y);
        y += 6;
        pdf.text(`Phone: ${order.phone || "N/A"}`, 10, y);
        y += 6;
        pdf.text(`Email: ${order.email || "N/A"}`, 10, y);

        y += 10;

        if (Array.isArray(order.items)) {
            order.items.forEach((item) => {
                const total = (item.price || 0) * (item.quantity || 0);

                pdf.text(item?.product_details?.name || "Product", 10, y);
                pdf.text(String(item?.quantity || 0), 110, y);
                pdf.text(`₹${item?.price || 0}`, 140, y);
                pdf.text(`₹${total}`, 170, y);

                y += 8;
            });
        }

        y += 10;
        pdf.text(`Total: ₹${subtotal}`, 140, y);

        pdf.save(`invoice-${order.id}.pdf`);
    };

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            case "processing": return "bg-orange-100 text-orange-600";
            case "shipped": return "bg-blue-100 text-blue-600";
            case "pending": return "bg-gray-200 text-gray-600";
            default: return "bg-gray-100";
        }
    };

    return (
        <div className="bg-white p-5 rounded-2xl shadow">

            <div className="w-full overflow-x-auto">
                <table className="min-w-175 w-full text-left">

                    <thead className="text-xs text-gray-400 border-b">
                        <tr>
                            <th className="py-3">Order ID</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            Array.from({ length: itemsPerPage }).map((_, i) => (
                                <tr key={i} className="border-b animate-pulse">
                                    <td className="py-4"><div className="h-4 w-16 bg-gray-200 rounded"></div></td>
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
                                    <tr key={o.id || index} className="border-b hover:bg-gray-50">

                                        <td className="py-4 text-orange-600 font-semibold">
                                            #{o?.id || "N/A"}
                                        </td>

                                        <td>
                                            {Array.isArray(o.items) && o.items.length > 0
                                                ? o.items[0]?.product_details?.name || "N/A"
                                                : "N/A"}
                                        </td>

                                        <td className="font-medium">
                                            ₹{o?.total_amount ?? 0}
                                        </td>

                                        <td>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(o?.status)}`}
                                            >
                                                {o?.status || "unknown"}
                                            </span>
                                        </td>

                                        <td className="text-sm text-gray-500">
                                            {o?.created_at
                                                ? new Date(o.created_at).toLocaleDateString()
                                                : "N/A"}
                                        </td>

                                        <td className="text-right">
                                            <div className="flex justify-end gap-3">

                                                <button
                                                    onClick={() => {
                                                        setSelectedOrder(o);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="p-2 rounded-full bg-blue-50 hover:bg-blue-100"
                                                >
                                                    <Eye size={16} className="text-blue-600" />
                                                </button>

                                                <button
                                                    onClick={() => generateInvoicePDF(o)}
                                                    className="p-2 rounded-full bg-green-50 hover:bg-green-100"
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

            {!loading && (
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
            )}

            <OrderInvoiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
            />
        </div>
    );
}