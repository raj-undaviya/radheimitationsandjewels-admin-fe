import { Plus, Filter, Download, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import CreateCouponModal from "./CreateCouponModal";

export default function CouponsDashboard() {

    const [open, setOpen] = useState(false);

    const coupons = [
        {
            code: "GOLD20",
            type: "Percentage",
            value: "20%",
            usage: "325 / 500",
            expiry: "Dec 31, 2024",
            status: "ACTIVE",
        },
        {
            code: "WELCOME50",
            type: "Fixed",
            value: "$50.00",
            usage: "880 / 1000",
            expiry: "Jun 15, 2024",
            status: "ACTIVE",
        },
        {
            code: "SPRING10",
            type: "Percentage",
            value: "10%",
            usage: "100 / 100",
            expiry: "Mar 20, 2024",
            status: "INACTIVE",
        },
        {
            code: "DIAMOND5",
            type: "Percentage",
            value: "5%",
            usage: "12 / 100",
            expiry: "No Expiry",
            status: "ACTIVE",
        },
    ];

    return (
        <>
            <div className="md:p-3 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    {/* Left Content */}
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Coupon Codes
                        </h1>
                        <p className="text-gray-500 text-xs sm:text-sm">
                            Manage and track promotional discounts for Radhe Jewels.
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full shadow w-full sm:w-auto">
                        <Plus size={18} />
                        <span className="text-sm sm:text-base">Create New Coupon</span>
                    </button>


                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Total */}
                    <div className="bg-white rounded-2xl p-5 shadow">
                        <p className="text-gray-400 text-xs">TOTAL COUPONS</p>
                        <h2 className="text-3xl font-bold mt-2">24</h2>
                        <p className="text-green-500 text-xs mt-2">
                            +12% from last month
                        </p>
                    </div>

                    {/* Active */}
                    <div className="rounded-2xl p-5 shadow bg-linear-to-r from-orange-700 to-orange-500 text-white">
                        <p className="text-xs">ACTIVE NOW</p>
                        <h2 className="text-3xl font-bold mt-2">12</h2>
                        <p className="text-xs mt-2">Currently live on storefront</p>
                    </div>

                    {/* Redeemed */}
                    <div className="bg-white rounded-2xl p-5 shadow">
                        <p className="text-gray-400 text-xs">TOTAL REDEEMED</p>
                        <h2 className="text-3xl font-bold mt-2">1,450</h2>
                        <p className="text-gray-400 text-xs mt-2">
                            Total value saved: $12,400
                        </p>
                    </div>
                </div>

                {/* Table Header */}
                <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold">Active Promotions</h2>
                    <div className="flex gap-3 text-gray-500">
                        <Filter size={18} />
                        <Download size={18} />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm min-w-175">
                            <thead className="bg-gray-100 text-gray-500 text-xs uppercase">
                                <tr>
                                    <th className="p-3 text-left">Coupon</th>
                                    <th className="p-3 text-left">Type</th>
                                    <th className="p-3 text-left">Value</th>
                                    <th className="p-3 text-left">Usage</th>
                                    <th className="p-3 text-left">Expiry</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {coupons.map((c, i) => {
                                    const [used, total] = c.usage.split("/").map(Number);
                                    const percent = (used / total) * 100;

                                    return (
                                        <tr key={i} className="border-t hover:bg-gray-50">
                                            {/* Coupon */}
                                            <td className="p-3 font-semibold">{c.code}</td>

                                            {/* Type */}
                                            <td className="p-3 text-gray-500">{c.type}</td>

                                            {/* Value */}
                                            <td className="p-3 font-semibold">{c.value}</td>

                                            {/* Usage with Progress */}
                                            <td className="p-3">
                                                <div className="text-xs text-gray-500 mb-1">
                                                    {c.usage}
                                                </div>
                                                <div className="w-full h-2 bg-gray-200 rounded-full">
                                                    <div
                                                        className="h-2 bg-orange-500 rounded-full"
                                                        style={{ width: `${percent}%` }}
                                                    ></div>
                                                </div>
                                            </td>

                                            {/* Expiry */}
                                            <td className="p-3 text-gray-500">{c.expiry}</td>

                                            {/* Status */}
                                            <td className="p-3">
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full ${c.status === "ACTIVE"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-gray-200 text-gray-500"
                                                        }`}
                                                >
                                                    {c.status}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="p-3">
                                                <div className="flex gap-3 text-gray-400">

                                                    <button className="hover:text-blue-500 transition">
                                                        <Pencil size={16} />
                                                    </button>

                                                    <button className="hover:text-red-500 transition">
                                                        <Trash2 size={16} />
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-xs text-gray-400 mt-4">
                    Showing 4 of 24 coupons
                </p>
            </div>

            <CreateCouponModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}