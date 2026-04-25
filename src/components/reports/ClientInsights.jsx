import { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import { ClientInsightsAPI } from "../../api/api";

export default function ClientInsights() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await API.get(ClientInsightsAPI());
                setData(res.data);

            } catch (err) {
                console.error("Client Insights Error:", err);
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
                <h2 className="font-semibold">Client Insights</h2>
                <p className="text-sm text-gray-500">
                    Acquisition and retention analysis.
                </p>
            </div>

            {/* 🔥 SKELETON */}
            {loading ? (
                <div className="space-y-3">
                    {[1, 2].map((_, i) => (
                        <div key={i} className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-full animate-pulse">
                            <div className="h-3 w-40 bg-gray-200 rounded"></div>
                            <div className="h-3 w-20 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : data ? (

                <>
                    {/* DATA */}
                    <div className="space-y-3">

                        <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-full">
                            <span className="text-sm">High Net Worth Clients</span>
                            <span className="text-green-600 font-semibold">
                                {data.data.high_net_worth_clients.new}
                            </span>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-full">
                            <span className="text-sm">Retention Rate</span>
                            <span className="font-semibold">
                                {data.data.retention_rate.label}
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