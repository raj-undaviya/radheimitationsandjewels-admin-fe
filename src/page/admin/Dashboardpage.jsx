import { useState } from "react";

//componnets
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsCards from "../../components/dashboard/StatsCards";
import SalesChart from "../../components/dashboard/SalesChart";
import Appointments from "../../components/dashboard/Appointments";
import OrdersTable from "../../components/dashboard/OrdersTable";
import PaymentsTable from "../../components/dashboard/PaymentsTable";

export default function Dashboard() {
    const [filter, setFilter] = useState("today");

    return (
        <div className="space-y-6 max-w-7xl mx-auto transition-all duration-300">

            <DashboardHeader filter={filter} setFilter={setFilter} />

            <StatsCards filter={filter} />

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