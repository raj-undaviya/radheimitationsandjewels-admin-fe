import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, ShoppingBag } from "lucide-react";

import API from "../../api/axiosInstance";
import { PerformanceReportAPI } from "../../api/api";

export default function StatsCards() {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);

                const res = await API.get(PerformanceReportAPI());
                setStats(res.data.data);

            } catch (err) {
                console.error("Stats Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const data = stats ? [
        {
            title: "Total Sales",
            value: `₹${stats.total_sales?.value?.toLocaleString("en-IN")}`,
            icon: <DollarSign size={18} />,
            change: `${stats.total_sales?.change || 0}%`,
            trend: stats.total_sales?.trend
        },
        {
            title: "Growth Rate",
            value: `${stats.growth_rate?.value}%`,
            icon: <TrendingUp size={18} />,
            change: `${stats.growth_rate?.change || 0}%`,
            trend: stats.growth_rate?.trend
        },
        {
            title: "Avg. Order Value",
            value: `₹${stats.avg_order_value?.value?.toLocaleString("en-IN")}`,
            icon: <ShoppingBag size={18} />,
            change: stats.avg_order_value?.trend?.toUpperCase(),
            trend: stats.avg_order_value?.trend
        }
    ] : [];

    // 🔥 SKELETON LOADER
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl shadow animate-pulse">

                        <div className="flex justify-between mb-4">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div className="w-12 h-4 bg-gray-200 rounded"></div>
                        </div>

                        <div className="w-24 h-3 bg-gray-200 rounded mb-2"></div>
                        <div className="w-32 h-5 bg-gray-200 rounded"></div>

                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {data.map((s, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow">

                    <div className="flex justify-between items-center mb-4">
                        <div className="bg-gray-100 p-2 rounded-full">
                            {s.icon}
                        </div>

                        {/* ✅ FIXED: show change */}
                        <span className={`
                            text-xs px-2 py-1 rounded-full
                            ${s.trend === "up" ? "bg-green-100 text-green-600" : ""}
                            ${s.trend === "down" ? "bg-red-100 text-red-600" : ""}
                            ${s.trend === "stable" ? "bg-gray-200 text-gray-600" : ""}
                        `}>
                            {s.change}
                        </span>
                    </div>

                    <p className="text-xs text-gray-400 uppercase">{s.title}</p>
                    <h2 className="text-xl font-semibold">{s.value}</h2>

                </div>
            ))}

        </div>
    );
}