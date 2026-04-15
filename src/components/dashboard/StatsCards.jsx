import StatCard from "./StatCard";

export default function StatsCards({ stats }) {

    // 🔥 SKELETON LOADER
    if (!stats) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {[1, 2, 3, 4].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white p-5 rounded-2xl shadow animate-pulse"
                    >
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                    </div>
                ))}

            </div>
        );
    }

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