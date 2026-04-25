import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, } from "recharts";

import { useState, useEffect } from "react";
import API from "../../api/axiosInstance";
import { SalesChartAPI } from "../../api/api";

export default function SalesChart() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchChart();
    }, []);

    const fetchChart = async () => {
        try {
            setLoading(true);

            const res = await API.get(SalesChartAPI());

            //original data from api
            setChartData(res?.data?.chart_data || []);

        } catch (err) {
            console.error("Chart Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow w-full">

            {/* Responsive height */}
            <div className="w-full h-55 sm:h-65 md:h-75 lg:h-80">

                {loading ? (
                    <div className="h-full flex items-end gap-2 animate-pulse">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-gray-200 rounded"
                                style={{ height: `${Math.random() * 100 + 50}px` }}
                            />
                        ))}
                    </div>
                ) : chartData.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-400">
                        No data available
                    </div>
                ) : (

                    /*SCROLLABLE WRAPPER */
                    <div className="w-full">

                        {/*SCROLL ONLY ON SMALL SCREENS */}
                        <div className="overflow-x-auto">

                            {/* WIDTH ONLY FOR SMALL SCREENS */}
                            <div className="min-w-225 md:min-w-full h-62.5 sm:h-70 md:h-75">

                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>

                                        {/* Gradient */}
                                        <defs>
                                            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#F97316" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>

                                        <XAxis
                                            dataKey="period"
                                            tickFormatter={(date) =>
                                                new Date(date).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                })
                                            }
                                            tick={{ fontSize: 10 }}
                                        />

                                        <YAxis
                                            domain={[10000, "auto"]}
                                            tickFormatter={(value) =>
                                                `₹${value.toLocaleString("en-IN")}`
                                            }
                                            width={70}
                                            tick={{ fontSize: 10 }}
                                        />

                                        <Tooltip
                                            formatter={(value, name) => {
                                                if (name === "revenue") {
                                                    return [`₹${value.toLocaleString("en-IN")}`, "Revenue"];
                                                }
                                                return [value, "Orders"];
                                            }}
                                        />

                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#F97316"
                                            strokeWidth={2}
                                            fill="url(#revenueGrad)"
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="orders"
                                            stroke="#9CA3AF"
                                            strokeWidth={2}
                                            strokeDasharray="6 4"
                                            dot={false}
                                        />

                                    </AreaChart>
                                </ResponsiveContainer>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}