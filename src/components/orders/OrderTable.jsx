import { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import { OrderAPI } from "../../api/api";

export default function OrdersTable() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);

            try {
                const res = await API.get(OrderAPI());

                const data = res?.data?.data || [];

                // ✅ SORT BY LATEST DATE (IMPORTANT)
                const sortedOrders = data.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );

                setOrders(sortedOrders);

            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return "bg-green-100 text-green-600";
            case "processing":
                return "bg-orange-100 text-orange-600";
            case "shipped":
                return "bg-blue-100 text-blue-600";
            case "pending":
                return "bg-gray-200 text-gray-600";
            default:
                return "bg-gray-100";
        }
    };

    return (
        <div className="bg-white p-3 sm:p-5 rounded-2xl shadow">

            {loading ? (
                <p className="text-center py-5 text-gray-500">Loading orders...</p>
            ) : (
                <div className="w-full overflow-x-auto">

                    <table className="min-w-225 w-full text-left">

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
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-5">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                orders.map((o) => (
                                    <tr key={o.id} className="border-b hover:bg-gray-50">

                                        {/* ORDER ID */}
                                        <td className="py-4 font-semibold text-orange-600">
                                            #{o.id}
                                        </td>

                                        {/* PRODUCT NAME */}
                                        <td>
                                            {o.items[0]?.product_details?.name || "N/A"}
                                        </td>

                                        {/* AMOUNT */}
                                        <td className="font-semibold">
                                            ₹{o.total_amount}
                                        </td>

                                        {/* STATUS */}
                                        <td>
                                            <span className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(o.status)}`}>
                                                {o.status}
                                            </span>
                                        </td>

                                        {/* DATE */}
                                        <td className="text-sm text-gray-500">
                                            {new Date(o.created_at).toLocaleDateString()}
                                        </td>

                                        {/* ACTION */}
                                        <td className="text-right">
                                            <button className="text-orange-600 text-sm font-semibold hover:underline">
                                                VIEW
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>

                </div>
            )}
        </div>
    );
}