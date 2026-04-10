import { useState } from "react";
import Pagination from "../common/Pagination";
import OrderInvoiceModal from "./OrderInvoiceModal";

export default function OrdersTable({
    orders = [],
    loading = false,
    page,
    setPage,
    itemsPerPage
}) {

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ pagination
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

    // ⚠️ local status update (UI only)
    const cycleStatus = (orderId) => {
        const flow = ["pending", "processing", "shipped", "delivered"];

        const updated = orders.map(order => {
            if (order.id === orderId) {
                const nextIndex = (flow.indexOf(order.status) + 1) % flow.length;
                return { ...order, status: flow[nextIndex] };
            }
            return order;
        });

        // ⚠️ NOTE: this won't persist unless you use API later
        console.log("Updated (UI only):", updated);
    };

    return (
        <div className="bg-white p-5 rounded-2xl shadow">

            {loading ? (
                <p className="text-center py-5 text-gray-500">Loading...</p>
            ) : (
                <>
                    {/* TABLE */}
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
                                {paginatedOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5">
                                            No orders found
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedOrders.map((o) => (
                                        <tr key={o.id} className="border-b hover:bg-gray-50">

                                            <td className="py-4 text-orange-600 font-semibold">
                                                #{o.id}
                                            </td>

                                            <td>
                                                {o.items?.[0]?.product_details?.name || "N/A"}
                                            </td>

                                            <td className="font-medium">
                                                ₹{o.total_amount}
                                            </td>

                                            <td>
                                                <span
                                                    onClick={() => cycleStatus(o.id)}
                                                    className={`px-3 py-1 rounded-full text-xs cursor-pointer ${getStatusStyle(o.status)}`}
                                                >
                                                    {o.status}
                                                </span>
                                            </td>

                                            <td className="text-sm text-gray-500">
                                                {new Date(o.created_at).toLocaleDateString()}
                                            </td>

                                            <td className="text-right">
                                                <button
                                                    onClick={() => {
                                                        setSelectedOrder(o);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="text-orange-600 text-sm font-semibold hover:underline"
                                                >
                                                    VIEW
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>
                    </div>

                    {/* PAGINATION */}
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
                </>
            )}

            {/* MODAL */}
            <OrderInvoiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
            />

        </div>
    );
}