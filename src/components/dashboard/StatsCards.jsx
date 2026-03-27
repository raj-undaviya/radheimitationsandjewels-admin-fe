import StatCard from "./StatCard";

export default function StatsCards() {

    const data = [
        { title: "Total Revenue", value: "$1,284,500", change: "+12%" },
        { title: "Today Revenue", value: "$42,390", change: "+8%" },
        { title: "Active Customers", value: "1,402" },
        { title: "Active Bookings", value: "28", extra: "4 New" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map((item, i) => (
                <StatCard key={i} {...item} />
            ))}
        </div>
    );
}