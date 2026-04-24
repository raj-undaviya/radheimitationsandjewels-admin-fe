import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import API from "../../api/axiosInstance";
import { SalesChartAPI } from '../../api/api';

export default function SalesChart({ loading }) {
    
    return (
        <div className="bg-white p-4 rounded-xl shadow h-72">

            {loading ? (
                // SKELETON LOADER
                <div className="h-full flex items-end gap-2 animate-pulse">

                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-gray-200 rounded"
                            style={{ height: `${Math.random() * 100 + 50}px` }}
                        />
                    ))}

                </div>
            ) : (
                // ACTUAL CHART (later)
                <div className="h-full flex items-center justify-center text-gray-400">
                    Chart will come here (Recharts)
                </div>
            )}

        </div>
    );
}