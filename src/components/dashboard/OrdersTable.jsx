import { NavLink } from "react-router-dom";

export default function OrdersTable({ orders, loading }) {

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
                return "";
        }
    };

    return (
        <div className="bg-white p-5 rounded-2xl shadow">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Latest Orders</h2>

                <NavLink
                    to="/admin/orders"
                    className="text-orange-500 text-sm hover:underline"
                >
                    VIEW ALL
                </NavLink>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">

                    <thead className="text-xs text-gray-400 uppercase border-b">
                        <tr>
                            <th className="py-3 px-2">Order ID</th>
                            <th className="py-3 px-2">Customer</th>
                            <th className="py-3 px-2">Status</th>
                            <th className="py-3 px-2 text-right">Value</th>
                        </tr>
                    </thead>

                    <tbody>

                        {/* 🔥 SKELETON */}
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="border-b animate-pulse">
                                    <td className="py-3 px-2">
                                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                                    </td>
                                    <td className="py-3 px-2">
                                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                                    </td>
                                    <td className="py-3 px-2">
                                        <div className="h-5 bg-gray-200 rounded w-20"></div>
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                        <div className="h-3 bg-gray-200 rounded w-16 ml-auto"></div>
                                    </td>
                                </tr>
                            ))
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-5 text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b last:border-none hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-2 font-semibold text-gray-700">
                                        #{order.id}
                                    </td>

                                    <td className="py-3 px-2 text-gray-600">
                                        User {order.user}
                                    </td>

                                    <td className="py-3 px-2">
                                        <span
                                            className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(order.status)}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className="py-3 px-2 text-right font-semibold text-gray-800">
                                        ₹{order.total_amount}
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>

                </table>
            </div>
        </div>
    );
}