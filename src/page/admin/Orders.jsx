import { useState, useEffect } from "react";
import OrderHeader from "../../components/orders/OrderHeader";
import OrderTable from "../../components/orders/OrderTable";

import API from "../../api/axiosInstance";
import { OrderAPI, StatsCardAPI } from "../../api/api";

export default function Orders() {

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // BOTH APIs
            const [orderRes, statsRes] = await Promise.all([
                API.get(OrderAPI()),
                API.get(StatsCardAPI())
            ]);

            const orderData = orderRes?.data?.data || [];

            // sort latest
            const sorted = orderData.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );

            setOrders(sorted);
            setStats(statsRes?.data?.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            <OrderHeader stats={stats} loading={loading} />

            <OrderTable
                orders={orders}
                loading={loading}
                page={page}
                setPage={setPage}
                itemsPerPage={itemsPerPage}
                refreshOrders={fetchData}
            />

        </div>
    );
}