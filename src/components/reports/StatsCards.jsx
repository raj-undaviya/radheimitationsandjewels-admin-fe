import { DollarSign, TrendingUp, ShoppingBag } from "lucide-react";

export default function StatsCards() {

    const stats = [
        {
            title: "Total Sales",
            value: "$142,850.00",
            icon: <DollarSign size={18} />,
            change: "+12.4%"
        },
        {
            title: "Growth Rate",
            value: "18.5%",
            icon: <TrendingUp size={18} />,
            change: "+2.1%"
        },
        {
            title: "Avg. Order Value",
            value: "$2,450.00",
            icon: <ShoppingBag size={18} />,
            change: "STABLE"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {stats.map((s, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow">

                    <div className="flex justify-between items-center mb-4">
                        <div className="bg-gray-100 p-2 rounded-full">
                            {s.icon}
                        </div>
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
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