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

            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-4 text-xs text-gray-400 font-semibold px-3 py-2">
                <span>ORDER ID</span>
                <span>CUSTOMER</span>
                <span>STATUS</span>
                <span className="text-right">VALUE</span>
            </div>

            {/* Rows */}
            <div className="space-y-3">
                {orders.map((order, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 md:bg-transparent rounded-xl p-3 md:p-0"
                    >

                        {/* Mobile View */}
                        <div className="md:hidden space-y-2">
                            <div className="flex justify-between">
                                <span className="font-semibold">{order.id}</span>
                                <span className="font-semibold">{order.amount}</span>
                            </div>

                            <div className="text-gray-600 text-sm">
                                {order.name}
                            </div>

                            <span
                                className={`text-xs px-3 py-1 rounded-full w-fit ${getStatusStyle(order.status)}`}
                            >
                                {order.status}
                            </span>
                        </div>

                        {/* Desktop View */}
                        <div className="hidden md:grid grid-cols-4 items-center px-3 py-3 rounded-xl hover:bg-gray-50 transition">
                            <span className="font-semibold text-gray-700">
                                {order.id}
                            </span>

                            <span className="text-gray-600">
                                {order.name}
                            </span>

                            <span
                                className={`text-xs px-3 py-1 rounded-full w-fit ${getStatusStyle(order.status)}`}
                            >
                                {order.status}
                            </span>

                            <span className="text-right font-semibold text-gray-800">
                                {order.amount}
                            </span>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}