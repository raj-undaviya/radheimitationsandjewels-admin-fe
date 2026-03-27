export default function OrderHeader() {
    return (
        <div className="flex flex-col md:flex-row justify-between gap-4">

            <div>
                <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
                <p className="text-gray-500 text-sm">
                    Oversee and curate your luxury clientele's acquisitions.
                </p>
            </div>

            <div className="flex gap-4">

                <div className="bg-white px-4 py-3 rounded-xl shadow flex items-center gap-3">
                    <span className="text-orange-500 text-xl">🛒</span>
                    <div>
                        <p className="text-xs text-gray-500">Pending Orders</p>
                        <p className="font-semibold">24</p>
                    </div>
                </div>

                <div className="bg-white px-4 py-3 rounded-xl shadow flex items-center gap-3">
                    <span className="text-blue-500 text-xl">💰</span>
                    <div>
                        <p className="text-xs text-gray-500">Daily Revenue</p>
                        <p className="font-semibold">$124,500</p>
                    </div>
                </div>

            </div>
        </div>
    );
}