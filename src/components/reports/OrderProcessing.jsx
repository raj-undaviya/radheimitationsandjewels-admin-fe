import { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import { OrderProcessingAPI } from "../../api/api";

export default function OrderProcessing() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await API.get(OrderProcessingAPI());
                setData(res.data);

            } catch (err) {
                console.error("Order Processing Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-white p-5 rounded-2xl shadow space-y-4">

            {/* HEADER */}
            <div>
                <h2 className="font-semibold">Order Processing</h2>
                <p className="text-sm text-gray-500">
                    Track fulfillment and return metrics.
                </p>
            </div>

            {/* 🔥 SKELETON LOADER */}
            {loading ? (
                <div className="space-y-3">

                    {[1, 2].map((_, i) => (
                        <div key={i} className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-full animate-pulse">
                            <div className="h-3 w-32 bg-gray-200 rounded"></div>
                            <div className="h-3 w-16 bg-gray-200 rounded"></div>
                        </div>
                    ))}

                </div>
            ) : data ? (

                <>
                    {/* DATA */}
                    <div className="space-y-3">

                        <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-full">
                            <span className="text-sm">Pending Fulfillment</span>
                            <span className="font-semibold">
                                {data.data.pending_fulfillment.label}
                            </span>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-full">
                            <span className="text-sm">Return Requests</span>
                            <span className="font-semibold">
                                {data.data.return_requests.label}
                            </span>
                        </div>

                    </div>

                    {/* DOWNLOAD BUTTONS */}
                    {/* <div className="flex gap-3">
                        <button className="flex-1 border rounded-full py-2 text-sm hover:bg-gray-100">
                            CSV
                        </button>
                        <button className="flex-1 border rounded-full py-2 text-sm hover:bg-gray-100">
                            PDF
                        </button>
                    </div> */}
                </>

            ) : (
                <p className="text-gray-400 text-sm">No data available</p>
            )}

        </div>
    );
}