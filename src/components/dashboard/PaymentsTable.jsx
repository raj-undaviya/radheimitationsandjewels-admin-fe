import { CreditCard, Landmark, Wallet } from "lucide-react";

export default function PaymentsTable({ loading, orders = [] }) {
  const getStatusDot = (status) => {
    return status === "pending" || status === "failed"
      ? "bg-orange-500"
      : "bg-green-500";
  };

  const getAmountColor = (status) => {
    return status === "pending" || status === "failed"
      ? "text-orange-500"
      : "text-green-600";
  };

  const getIcon = (method) => {
    if (method === "cod") return <Landmark size={14} />;
    if (method === "wallet") return <Wallet size={14} />;
    return <CreditCard size={14} />;
  };

  const formatMethod = (method) => {
    if (method === "cod") return "Cash on Delivery";
    if (method === "online") return "Online Payment";
    return method;
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Latest Payments</h2>
        <span className="text-orange-500 text-sm cursor-pointer hover:underline">
          VIEW ALL
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="text-xs text-gray-400 uppercase border-b">
            <tr>
              <th className="py-3 px-2">Order ID</th>
              <th className="py-3 px-2">Transaction ID</th>
              <th className="py-3 px-2">Method</th>
              <th className="py-3 px-2 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {loading
              ? [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b animate-pulse">
                    <td className="py-3 px-2">
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </td>
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
              : orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full " />
                        <span className="font-semibold text-gray-700">
                          {order.id}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${getStatusDot(order.payment_status)}`}
                        />
                        <span className="font-semibold text-gray-700">
                          {order.razorpay_payment_id || `ORD-${order.id}`}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        {getIcon(order.payment_method)}
                        {formatMethod(order.payment_method)}
                      </div>
                    </td>

                    <td
                      className={`py-3 px-2 text-right font-semibold ${getAmountColor(order.payment_status)}`}
                    >
                      ₹{order.total_amount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
