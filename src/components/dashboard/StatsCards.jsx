import StatCard from "./StatCard";

export default function StatsCards({ stats }) {

    if (!stats) return <p>Loading...</p>;

    const data = [
        {
            title: "Total Users",
            value: stats.total_users
        },
        {
            title: "Total Orders",
            value: stats.total_orders
        },
        {
            title: "Total Revenue",
            value: `₹${stats.total_revenue}`
        },
        {
            title: "Orders (7 Days)",
            value: stats.orders_last_7_days
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map((item, i) => (
                <StatCard key={i} {...item} />
            ))}
        </div>
    );
}