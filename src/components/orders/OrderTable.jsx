export default function OrdersTable({ orders }) {

    return (
        <div className="bg-white p-3 sm:p-5 rounded-2xl shadow">

            {/* TABLE WRAPPER */}
            <div className="w-full overflow-x-auto">

                <table className="min-w-225 w-full text-left">

                    {/* HEADER */}
                    <thead className="text-xs text-gray-400 border-b">
                        <tr>
                            <th className="py-3 whitespace-nowrap">Order ID</th>
                            <th className="whitespace-nowrap">Customer</th>
                            <th className="whitespace-nowrap">Amount</th>
                            <th className="whitespace-nowrap">Progress</th>
                            <th className="whitespace-nowrap">Status</th>
                            <th className="whitespace-nowrap">Date</th>
                            <th className="text-right whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {orders.map((o, i) => (
                            <tr key={i} className="border-b last:border-none hover:bg-gray-50 transition">

                                {/* ORDER ID */}
                                <td className="py-4 font-semibold text-orange-600 whitespace-nowrap">
                                    {o.id}
                                </td>

                                {/* CUSTOMER */}
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0"></div>

                                        <div className="min-w-0">
                                            <p className="font-medium truncate">{o.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{o.tag}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* AMOUNT */}
                                <td className="font-semibold whitespace-nowrap">
                                    {o.amount}
                                </td>

                                {/* PROGRESS */}
                                <td className="min-w-35">
                                    <div className="w-full bg-gray-200 h-2 rounded-full">
                                        <div
                                            className="bg-orange-500 h-2 rounded-full"
                                            style={{ width: `${o.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs mt-1 text-gray-500 whitespace-nowrap">
                                        {o.progressText}
                                    </p>
                                </td>

                                {/* STATUS */}
                                <td className="whitespace-nowrap">
                                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100">
                                        {o.status}
                                    </span>
                                </td>

                                {/* DATE */}
                                <td className="text-sm text-gray-500 whitespace-nowrap">
                                    {o.date}
                                </td>

                                {/* ACTION */}
                                <td className="text-right whitespace-nowrap">
                                    <button className="text-orange-600 text-sm font-semibold hover:underline">
                                        VIEW DETAILS
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}