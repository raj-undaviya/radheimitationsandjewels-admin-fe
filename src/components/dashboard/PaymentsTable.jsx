import { CreditCard, Landmark, Wallet } from "lucide-react";

export default function PaymentsTable({ loading }) {

    const payments = [
        { id: "TXN-482910", method: "Visa Ending 4291", amount: "$4,500.00", status: "success" },
        { id: "TXN-482911", method: "Bank Transfer", amount: "$18,200.00", status: "success" },
        { id: "TXN-482912", method: "Apple Pay", amount: "$1,250.00", status: "success" },
        { id: "TXN-482913", method: "MasterCard 8821", amount: "$6,800.00", status: "failed" },
        { id: "TXN-482914", method: "Internal Credit", amount: "$950.00", status: "success" },
    ];

    const getStatusDot = (status) => {
        return status === "failed" ? "bg-orange-500" : "bg-green-500";
    };

    const getAmountColor = (status) => {
        return status === "failed" ? "text-orange-500" : "text-green-600";
    };

    const getIcon = (method) => {
        if (method.includes("Bank")) return <Landmark size={14} />;
        if (method.includes("Apple")) return <Wallet size={14} />;
        return <CreditCard size={14} />;
    };

    return (
        <div className="bg-white p-5 rounded-2xl shadow">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Latest Payments</h2>
                <span className="text-orange-500 text-sm cursor-pointer hover:underline">
                    VIEW ALL
                </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">

                    <thead className="text-xs text-gray-400 uppercase border-b">
                        <tr>
                            <th className="py-3 px-2">Transaction ID</th>
                            <th className="py-3 px-2">Method</th>
                            <th className="py-3 px-2 text-right">Amount</th>
                        </tr>
                    </thead>

                    <tbody>

                        {/* 🔥 SKELETON */}
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="border-b animate-pulse">

                                    <td className="py-3 px-2">
                                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                                    </td>

                                    <td className="py-3 px-2">
                                        <div className="h-3 bg-gray-200 rounded w-40"></div>
                                    </td>

                                    <td className="py-3 px-2 text-right">
                                        <div className="h-3 bg-gray-200 rounded w-20 ml-auto"></div>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            payments.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b last:border-none hover:bg-gray-50 transition"
                                >

                                    {/* Transaction */}
                                    <td className="py-3 px-2">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${getStatusDot(item.status)}`} />
                                            <span className="font-semibold text-gray-700">
                                                {item.id}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Method */}
                                    <td className="py-3 px-2">
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            {getIcon(item.method)}
                                            {item.method}
                                        </div>
                                    </td>

                                    {/* Amount */}
                                    <td className={`py-3 px-2 text-right font-semibold ${getAmountColor(item.status)}`}>
                                        {item.amount}
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