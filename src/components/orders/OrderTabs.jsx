export default function OrderTabs() {
    return (
        <div className="flex justify-between items-center mt-4">

            <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-sm">
                    All Orders
                </button>
                <button className="px-4 py-1.5 text-gray-600 hover:bg-gray-100 rounded-full text-sm">
                    In Production
                </button>
                <button className="px-4 py-1.5 text-gray-600 hover:bg-gray-100 rounded-full text-sm">
                    Shipping
                </button>
                <button className="px-4 py-1.5 text-gray-600 hover:bg-gray-100 rounded-full text-sm">
                    Delivered
                </button>
            </div>

            <span className="text-sm text-gray-500 hidden md:block">
                Sort by: Newest First
            </span>

        </div>
    );
}