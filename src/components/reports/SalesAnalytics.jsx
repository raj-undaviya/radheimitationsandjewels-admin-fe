import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

import API from "../../api/axiosInstance";
import { SalesAnalyticsAPI, SalesAnalyticsDownloadAPI } from "../../api/api";

export default function SalesAnalytics() {

    const [filters, setFilters] = useState({
        date: "Current Month",
        currency: "INR (₹)"
    });

    const [openDropdown, setOpenDropdown] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const dropdownRef = useRef();

    // close dropdown outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // AUTO LOAD ON PAGE LOAD
    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);

            const periodMap = {
                "Current Month": "current_month",
                "Last Month": "last_month",
                "Last 3 Months": "last_3_months",
                "Last Year": "last_year"
            };

            const currencyMap = {
                "USD ($)": "USD",
                "INR (₹)": "INR",
                "EUR (€)": "EUR"
            };

            const res = await API.get(
                SalesAnalyticsAPI(
                    periodMap[filters.date],
                    currencyMap[filters.currency]
                )
            );

            setData(res.data.data || []);

        } catch (err) {
            console.error("Analytics Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (type = "pdf") => {
        try {
            const periodMap = {
                "Current Month": "current_month",
                "Last Month": "last_month",
                "Last 3 Months": "last_3_months",
                "Last Year": "last_year"
            };

            const currencyMap = {
                "USD ($)": "USD",
                "INR (₹)": "INR",
                "EUR (€)": "EUR"
            };

            const res = await API.get(
                SalesAnalyticsDownloadAPI(
                    periodMap[filters.date],
                    currencyMap[filters.currency],
                    type
                ),
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");

            link.href = url;
            link.setAttribute("download", `sales-report.${type}`);
            document.body.appendChild(link);

            link.click();
            link.remove();

        } catch (err) {
            console.error("Download Error:", err);
        }
    };

    return (
        <div className="bg-white p-5 rounded-2xl shadow space-y-4">

            {loading ? (

                <>
                    {/* HEADER SKELETON */}
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3 animate-pulse">

                        <div className="space-y-2">
                            <div className="h-5 w-40 bg-gray-200 rounded"></div>
                            <div className="h-3 w-64 bg-gray-200 rounded"></div>
                        </div>

                        <div className="flex gap-2">
                            <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                            <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                        </div>

                    </div>

                    {/* FILTER SKELETON */}
                    <div className="bg-gray-50 p-4 rounded-xl flex flex-col lg:flex-row gap-3 animate-pulse">

                        <div className="h-10 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-10 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-10 bg-gray-200 rounded-full w-full"></div>

                    </div>

                    {/* CARD SKELETON */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl shadow animate-pulse">

                                <div className="flex justify-between mb-3">
                                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                    <div className="h-3 w-10 bg-gray-200 rounded"></div>
                                </div>

                                <div className="h-6 w-32 bg-gray-200 rounded"></div>

                            </div>
                        ))}

                    </div>
                </>

            ) : (

                <>
                    {/*  HEADER */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                        <div>
                            <h2 className="font-semibold text-lg">Sales Analytics</h2>
                            <p className="text-sm text-gray-500">
                                Configure parameters to generate customized sales performance data.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleDownload("csv")}
                                className="bg-gray-100 px-3 py-2 rounded-full text-xs hover:bg-gray-200"
                            >
                                Download CSV
                            </button>

                            <button
                                onClick={() => handleDownload("pdf")}
                                className="bg-gray-100 px-3 py-2 rounded-full text-xs hover:bg-gray-200"
                            >
                                Download PDF
                            </button>
                        </div>

                    </div>

                    {/* FILTERS */}
                    <div ref={dropdownRef} className="bg-gray-50 p-4 rounded-xl flex flex-col lg:flex-row gap-3">

                        {/* DATE */}
                        <div className="relative w-full">
                            <button
                                onClick={() => setOpenDropdown(openDropdown === "date" ? null : "date")}
                                className="w-full px-5 py-3 rounded-full bg-white flex justify-between items-center text-sm"
                            >
                                {filters.date}
                                <ChevronDown className={`transition ${openDropdown === "date" ? "rotate-180" : ""}`} />
                            </button>

                            {openDropdown === "date" && (
                                <div className="absolute w-full mt-2 bg-white rounded-xl shadow z-10">
                                    {["Current Month", "Last Month", "Last 3 Months", "Last Year"].map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={() => {
                                                setFilters({ ...filters, date: item });
                                                setOpenDropdown(null);
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* CURRENCY */}
                        <div className="relative w-full">
                            <button
                                onClick={() => setOpenDropdown(openDropdown === "currency" ? null : "currency")}
                                className="w-full px-5 py-3 rounded-full bg-white flex justify-between items-center text-sm"
                            >
                                {filters.currency}
                                <ChevronDown className={`transition ${openDropdown === "currency" ? "rotate-180" : ""}`} />
                            </button>

                            {openDropdown === "currency" && (
                                <div className="absolute w-full mt-2 bg-white rounded-xl shadow z-10">
                                    {["USD ($)", "INR (₹)", "EUR (€)"].map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={() => {
                                                setFilters({ ...filters, currency: item });
                                                setOpenDropdown(null);
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={fetchAnalytics}
                            className="bg-orange-500 text-white px-6 py-3 rounded-full text-sm hover:bg-orange-600"
                        >
                            Generate Report
                        </button>

                    </div>

                    {/* DATA */}
                    {data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div className="bg-white p-4 rounded-xl shadow">
                                <p className="text-xs text-gray-400">Total Revenue</p>
                                <h2 className="text-lg font-semibold">
                                    ₹{data[0].total_revenue.toLocaleString("en-IN")}
                                </h2>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow">
                                <p className="text-xs text-gray-400">Total Orders</p>
                                <h2 className="text-lg font-semibold">
                                    {data[0].total_orders}
                                </h2>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow">
                                <p className="text-xs text-gray-400">Avg Order Value</p>
                                <h2 className="text-lg font-semibold">
                                    ₹{data[0].avg_value.toLocaleString("en-IN")}
                                </h2>
                            </div>

                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm">No data available</p>
                    )}

                </>
            )}

        </div>
    );
}