import { CreditCard, Landmark, Wallet } from "lucide-react";

export default function PaymentsTable() {

    const payments = [
        { id: "TXN-482910", method: "Visa Ending 4291", amount: "$4,500.00", status: "success" },
        { id: "TXN-482911", method: "Bank Transfer", amount: "$18,200.00", status: "success" },
        { id: "TXN-482912", method: "Apple Pay", amount: "$1,250.00", status: "success" },
        { id: "TXN-482913", method: "MasterCard 8821", amount: "$6,800.00", status: "failed" },
        { id: "TXN-482914", method: "Internal Credit", amount: "$950.00", status: "success" },
    ];

    const getStatusDot = (status) => {
        return status === "failed"
            ? "bg-orange-500"
            : "bg-green-500";
    };

    const getAmountColor = (status) => {
        return status === "failed"
            ? "text-orange-500"
            : "text-green-600";
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

            {/* Table Header */}
            <div className="grid grid-cols-3 text-xs text-gray-400 font-semibold px-3 py-2 bg-gray-100 rounded-full">
                <span>TRANSACTION ID</span>
                <span>METHOD</span>
                <span className="text-right">AMOUNT</span>
            </div>

            {/* Rows */}
            <div className="space-y-3 mt-3">
                {payments.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-3 items-center px-3 py-3 rounded-xl hover:bg-gray-50 transition"
                    >

                        {/* Transaction */}
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${getStatusDot(item.status)}`} />
                            <span className="font-semibold text-gray-700">
                                {item.id}
                            </span>
                        </div>

                        {/* Method */}
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                            {getIcon(item.method)}
                            {item.method}
                        </div>

                        {/* Amount */}
                        <div className={`text-right font-semibold ${getAmountColor(item.status)}`}>
                            {item.amount}
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}