export default function InventoryStats() {

    const stats = [
        { title: "Total Stock Items", value: "1,240" },
        { title: "Low Stock Alerts", value: "18" },
        { title: "Out of Stock", value: "5" },
        { title: "Total Inventory Value", value: "$45,200", highlight: true },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {stats.map((item, i) => (
                <div
                    key={i}
                    className={`p-4 rounded-xl shadow ${item.highlight
                            ? "bg-orange-500 text-white"
                            : "bg-white"
                        }`}
                >
                    <p className="text-sm">{item.title}</p>
                    <h2 className="text-xl font-bold">{item.value}</h2>
                </div>
            ))}

        </div>
    );
}