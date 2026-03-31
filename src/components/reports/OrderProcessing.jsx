export default function OrderProcessing() {
    return (
        <div className="bg-white p-5 rounded-2xl shadow space-y-4">

            <div>
                <h2 className="font-semibold">Order Processing</h2>
                <p className="text-sm text-gray-500">
                    Track fulfillment and return metrics.
                </p>
            </div>

            <div className="space-y-3">

                <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-full">
                    <span className="text-sm">Pending Fulfillment</span>
                    <span className="font-semibold">148 Orders</span>
                </div>

                <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-full">
                    <span className="text-sm">Return Requests</span>
                    <span className="font-semibold">12 Cases</span>
                </div>

            </div>

            <div className="flex gap-3">
                <button className="flex-1 border rounded-full py-2 text-sm">CSV</button>
                <button className="flex-1 border rounded-full py-2 text-sm">PDF</button>
            </div>

        </div>
    );
}