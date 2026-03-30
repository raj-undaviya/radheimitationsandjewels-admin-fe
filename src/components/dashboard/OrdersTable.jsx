export default function OrdersTable() {

    const orders = [
        { id: "#RJ-9021", name: "Aarav Patel", status: "Delivered", amount: "$12,400" },
        { id: "#RJ-9022", name: "Sanya Mirza", status: "Processing", amount: "$8,950" },
        { id: "#RJ-9023", name: "Vikram Rao", status: "Shipped", amount: "$22,000" },
        { id: "#RJ-9024", name: "Maya Joshi", status: "Delivered", amount: "$5,200" },
        { id: "#RJ-9025", name: "Neil Kumar", status: "Pending", amount: "$14,750" },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-600";
            case "Processing":
                return "bg-orange-100 text-orange-600";
            case "Shipped":
                return "bg-blue-100 text-blue-600";
            case "Pending":
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
                <span className="text-orange-500 text-sm cursor-pointer hover:underline">
                    VIEW ALL
                </span>
            </div>

            {/* Table Wrapper */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">

                    {/* Table Head */}
                    <thead className="text-xs text-gray-400 uppercase border-b">
                        <tr>
                            <th className="py-3 px-2">Order ID</th>
                            <th className="py-3 px-2">Customer</th>
                            <th className="py-3 px-2">Status</th>
                            <th className="py-3 px-2 text-right">Value</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={index}
                                className="border-b last:border-none hover:bg-gray-50 transition"
                            >

                                <td className="py-3 px-2 font-semibold text-gray-700">
                                    {order.id}
                                </td>

                                <td className="py-3 px-2 text-gray-600">
                                    {order.name}
                                </td>

                                <td className="py-3 px-2">
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(order.status)}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>

                                <td className="py-3 px-2 text-right font-semibold text-gray-800">
                                    {order.amount}
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
}