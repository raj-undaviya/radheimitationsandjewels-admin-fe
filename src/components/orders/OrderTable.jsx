import OrderRow from "./OrderRow";

export default function OrderTable({ orders }) {

    return (
        <div className="mt-4 overflow-x-auto">

            <table className="w-full text-sm">

                <thead className="text-gray-400 text-xs uppercase">
                    <tr className="text-left">
                        <th className="py-2">Order ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, i) => (
                        <OrderRow key={i} order={order} />
                    ))}
                </tbody>

            </table>

        </div>
    );
}