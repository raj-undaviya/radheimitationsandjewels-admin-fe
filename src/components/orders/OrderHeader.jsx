import { ShoppingCart, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

import API from "../../api/axiosInstance";
import { StatsCardAPI } from "../../api/api";

export default function OrdersHeader() {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await API.get(StatsCardAPI());
                setStats(res?.data?.data);

            } catch (err) {
                console.error(err);
                setError(
                    err?.response?.data?.message || "Failed to load dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

            {/* Left */}
            <div>
                <h1 className="text-2xl font-bold">Orders Management</h1>
                <p className="text-gray-500 text-sm">
                    Oversee and curate your luxury clientele's acquisitions.
                </p>
            </div>

            {/* Right Cards */}
            <div className="flex gap-4">

                {/* Pending Orders */}
                <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-sm">
                    <div className="bg-orange-100 p-2 rounded-full">
                        <ShoppingCart size={18} className="text-orange-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Pending Orders</p>

                        {loading ? (
                            <p className="text-sm">Loading...</p>
                        ) : error ? (
                            <p className="text-sm text-red-500">Error</p>
                        ) : (
                            <p className="font-semibold text-lg">
                                {stats?.pending_orders ?? 0}
                            </p>
                        )}
                    </div>
                </div>

                {/* Revenue */}
                <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-sm">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <Wallet size={18} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Daily Revenue</p>

                        {loading ? (
                            <p className="text-sm">Loading...</p>
                        ) : error ? (
                            <p className="text-sm text-red-500">Error</p>
                        ) : (
                            <p className="font-semibold text-lg">
                                ₹{stats?.daily_revenue ?? 0}
                            </p>
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
}