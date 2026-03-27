export default function TrendsCard() {
    return (
        <div className="bg-white p-4 rounded-xl shadow">

            <h3 className="font-semibold mb-3">Top Regional Trends</h3>

            <div className="space-y-3 text-sm">
                <div>
                    <p>Paris, FR</p>
                    <div className="h-2 bg-gray-200 rounded mt-1">
                        <div className="h-2 bg-orange-500 w-[70%] rounded"></div>
                    </div>
                </div>

                <div>
                    <p>New York, US</p>
                    <div className="h-2 bg-gray-200 rounded mt-1">
                        <div className="h-2 bg-orange-500 w-[50%] rounded"></div>
                    </div>
                </div>
            </div>

        </div>
    );
}