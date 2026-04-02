// Client Insight componet

export default function ClientInsights() {
    return (
        <div className="bg-white p-5 rounded-2xl shadow space-y-4">

            <div>
                <h2 className="font-semibold">Client Insights</h2>
                <p className="text-sm text-gray-500">
                    Acquisition and retention analysis.
                </p>
            </div>

            <div className="space-y-3">

                <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-full">
                    <span className="text-sm">High Net Worth Clients</span>
                    <span className="text-green-600 font-semibold">+18 New</span>
                </div>

                <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-full">
                    <span className="text-sm">Retention Rate</span>
                    <span className="font-semibold">72%</span>
                </div>

            </div>

            <div className="flex gap-3">
                <button className="flex-1 border rounded-full py-2 text-sm">CSV</button>
                <button className="flex-1 border rounded-full py-2 text-sm">PDF</button>
            </div>

        </div>
    );
}