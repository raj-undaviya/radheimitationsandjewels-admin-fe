export default function StatCard({ title, value, change, extra }) {

    const isLoading = value === undefined || value === null;

    return (
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">

            {isLoading ? (
                // 🔥 SKELETON
                <div className="animate-pulse">
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-sm text-gray-500">{title}</h2>

                        {change && (
                            <span className="text-green-500 text-xs">{change}</span>
                        )}

                        {extra && (
                            <span className="text-orange-500 text-xs">{extra}</span>
                        )}
                    </div>

                    <p className="text-xl font-bold">{value}</p>
                </>
            )}

        </div>
    );
}