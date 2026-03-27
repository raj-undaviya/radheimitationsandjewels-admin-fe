//single card

export default function StatCard({ title, value, change, extra }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">

            <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm text-gray-500">{title}</h2>
                {change && <span className="text-green-500 text-xs">{change}</span>}
                {extra && <span className="text-orange-500 text-xs">{extra}</span>}
            </div>

            <p className="text-xl font-bold">{value}</p>

        </div>
    );
}