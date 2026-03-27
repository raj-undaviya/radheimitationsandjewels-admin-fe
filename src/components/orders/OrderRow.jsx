export default function OrderRow({ order }) {

    const statusColor = {
        "In Production": "bg-orange-100 text-orange-600",
        Delivered: "bg-gray-200 text-gray-600",
        Processing: "bg-yellow-100 text-yellow-600",
        Shipped: "bg-blue-100 text-blue-600",
    };

    return (
        <tr className="border-b hover:bg-gray-50 transition">

            <td className="py-3 font-semibold text-orange-600">{order.id}</td>

            <td>{order.name}</td>

            <td className="font-medium">{order.amount}</td>

            <td>
                <span className={`px-3 py-1 rounded-full text-xs ${statusColor[order.status]}`}>
                    {order.status}
                </span>
            </td>

            <td className="text-gray-500">Oct 24, 2023</td>

            <td className="text-orange-500 cursor-pointer text-sm">
                VIEW DETAILS
            </td>

        </tr>
    );
}