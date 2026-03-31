import { Calendar } from "lucide-react";

export default function ReportsHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

            {/* LEFT */}
            <div>
                <h1 className="text-xl sm:text-2xl font-semibold">
                    Performance Reports
                </h1>
                <p className="text-gray-500 text-sm">
                    Comprehensive analysis of your atelier's digital performance.
                </p>
            </div>

            {/* RIGHT */}
            <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm w-fit">
                <Calendar size={16} />
                Last 30 Days
            </button>

        </div>
    );
}