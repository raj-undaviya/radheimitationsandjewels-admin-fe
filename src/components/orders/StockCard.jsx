export default function StockCard() {
    return (
        <div className="md:col-span-2 bg-linear-to-r from-gray-800 to-gray-900 text-white p-6 rounded-2xl flex flex-col justify-between">

            <div>
                <h3 className="text-lg font-semibold">Luxury Stock Management</h3>
                <p className="text-sm text-gray-300 mt-2">
                    Your top-selling 'Emerald Eternity' rings are running low.
                </p>
            </div>

            <button className="mt-4 bg-white text-black px-4 py-2 rounded-full text-sm w-fit">
                Review Inventory Now
            </button>

        </div>
    );
}