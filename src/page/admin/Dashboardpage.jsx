import { useEffect, useState } from "react";

import API from "../../api/axiosInstance";
import { StatsCardAPI } from "../../api/api";

//componnets
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsCards from "../../components/dashboard/StatsCards";
import SalesChart from "../../components/dashboard/SalesChart";
import Appointments from "../../components/dashboard/Appointments";
import OrdersTable from "../../components/dashboard/OrdersTable";
import PaymentsTable from "../../components/dashboard/PaymentsTable";

export default function Dashboard() {
    const [filter, setFilter] = useState("today");

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);   // 
                setError(null);    // reset error

                const res = await API.get(StatsCardAPI());

                setStats(res.data.data); //

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
        <div className="space-y-6 max-w-7xl mx-auto transition-all duration-300">

            <DashboardHeader filter={filter} setFilter={setFilter} />

            {/* 🔥 Loading State */}
            {loading && <p>Loading dashboard...</p>}

            {/* 🔥 Error State */}
            {error && <p className="text-red-500">{error}</p>}

            {/* 🔥 Data */}
            {!loading && !error && <StatsCards stats={stats} />}


            {/* Chart + Appointments */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <SalesChart filter={filter} />
                </div>
                <Appointments />
            </div>

            {/* Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OrdersTable />
                <PaymentsTable />
            </div>

        </div>
    );
}