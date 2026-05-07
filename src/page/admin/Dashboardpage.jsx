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

    const [appointments, setAppointments] = useState([]);

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
                const res = await API.get(StatsCardAPI());
                setStats(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchStats();

        const interval = setInterval(fetchStats, 10000); // every 10 sec

        return () => clearInterval(interval);

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
            } finally {
                setOrdersLoading(false);
            }
        };

        fetchOrders(); // initial

        const interval = setInterval(fetchOrders, 5000); // every 5 sec

        return () => clearInterval(interval);

    }, []);

    // useEffect(() => {
    //     const updateOrders = () => fetchOrders();

    //     window.addEventListener("orderUpdated", updateOrders);

    //     return () => window.removeEventListener("orderUpdated", updateOrders);
    // }, []);

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
                <PaymentsTable loading={loading} orders={orders} />
            </div>

        </div>
    );
}