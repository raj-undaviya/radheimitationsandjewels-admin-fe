import { useEffect, useState } from "react";

import API from "../../api/axiosInstance";
import { StatsCardAPI, OrderAPI } from "../../api/api";

//componnets
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsCards from "../../components/dashboard/StatsCards";
import SalesChart from "../../components/dashboard/SalesChart";
import Appointments from "../../components/dashboard/Appointments";
import OrdersTable from "../../components/dashboard/OrdersTable";
import PaymentsTable from "../../components/dashboard/PaymentsTable";

export default function Dashboard() {

    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    const [filter, setFilter] = useState("today");

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //status card api
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

    //order api
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setOrdersLoading(true);

                const res = await API.get(OrderAPI());

                const latestFive = res.data.data.slice(0, 5);
                setOrders(latestFive);

            } catch (err) {
                console.error("Error fetching orders:", err);
                setOrders([]);
            } finally {
                setOrdersLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="space-y-6 max-w-7xl mx-auto transition-all duration-300">

            <DashboardHeader filter={filter} setFilter={setFilter} />

            {/* Error State */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Data */}
            <StatsCards stats={stats} />


            {/* Chart + Appointments */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <SalesChart filter={filter} />
                </div>
                <Appointments />
            </div>

            {/* Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OrdersTable orders={orders} loading={ordersLoading} />
                <PaymentsTable loading={loading} orders={orders}/>
            </div>

        </div>
    );
}