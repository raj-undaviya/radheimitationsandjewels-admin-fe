import { Plus, Filter, Download, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import CreateCouponModal from "./CreateCouponModal";
import Pagination from "../../components/common/Pagination";

import API from "../../api/axiosInstance";
import { CouponViewAPI, CouponDeleteAPI } from "../../api/api";
import toast from "react-hot-toast";

export default function CouponsDashboard() {

    const [coupons, setCoupons] = useState([]);

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total_coupons: 0,
        active_coupons: 0,
        total_redeemed: 0
    });

    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                setLoading(true);

                const res = await API.get(CouponViewAPI());

                setCoupons(res.data.data || []);
                setStats(res.data.stats || {});

            } catch (err) {
                console.error("Coupon fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCoupons();
    }, []);

    const totalPages = Math.ceil(coupons.length / itemsPerPage);

    const currentData = coupons.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = (id) => {
        toast((t) => (
            <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">
                    Are you sure you want to delete this coupon?
                </p>

                <div className="flex justify-end gap-2">

                    {/* CANCEL */}
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        Cancel
                    </button>

                    {/* DELETE */}
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);

                            try {
                                await API.delete(CouponDeleteAPI(id));

                                // 🔥 REMOVE FROM UI
                                setCoupons((prev) =>
                                    prev.filter((c) => c.id !== id)
                                );

                                toast.success("Coupon deleted successfully");

                            } catch (err) {
                                console.error(err);
                                toast.error("Failed to delete coupon");
                            }
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <>
            <div className="md:p-3 bg-gray-50 min-h-screen">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Coupon Codes
                        </h1>
                        <p className="text-gray-500 text-xs sm:text-sm">
                            Manage and track promotional discounts.
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setEditData(null);
                            setOpenModal(true);
                        }}
                        className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full shadow"
                    >
                        <Plus size={18} />
                        Create New Coupon
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                    {/* TOTAL */}
                    <div className="bg-white rounded-2xl p-5 shadow">
                        <p className="text-gray-400 text-xs">TOTAL COUPONS</p>
                        {loading ? (
                            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mt-2"></div>
                        ) : (
                            <h2 className="text-3xl font-bold mt-2">
                                {stats.total_coupons}
                            </h2>
                        )}
                    </div>

                    {/* ACTIVE */}
                    <div className="rounded-2xl p-5 shadow bg-orange-600 text-white">
                        <p className="text-xs">ACTIVE NOW</p>
                        {loading ? (
                            <div className="h-8 w-24 bg-orange-300 rounded animate-pulse mt-2"></div>
                        ) : (
                            <h2 className="text-3xl font-bold mt-2">
                                {stats.active_coupons}
                            </h2>
                        )}
                    </div>

                    {/* REDEEMED */}
                    <div className="bg-white rounded-2xl p-5 shadow">
                        <p className="text-gray-400 text-xs">TOTAL REDEEMED</p>
                        {loading ? (
                            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mt-2"></div>
                        ) : (
                            <h2 className="text-3xl font-bold mt-2">
                                {stats.total_redeemed}
                            </h2>
                        )}
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
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="border-t animate-pulse">

                                            <td className="p-3">
                                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                            </td>

                                            <td className="p-3">
                                                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                            </td>

                                            <td className="p-3">
                                                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                            </td>

                                            <td className="p-3">
                                                <div className="h-2 w-full bg-gray-200 rounded"></div>
                                            </td>

                                            <td className="p-3">
                                                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                            </td>

                                            <td className="p-3">
                                                <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                                            </td>

                                            <td className="p-3">
                                                <div className="flex gap-2">
                                                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                                                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ) : currentData.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center p-6">
                                            No coupons found
                                        </td>
                                    </tr>
                                ) : (
                                    currentData.map((c) => {
                                        const used = c.used_count;
                                        const total = c.max_usage;
                                        const percent = total ? (used / total) * 100 : 0;

                                        return (
                                            <tr key={c.id} className="border-t hover:bg-gray-50">

                                                <td className="p-3 font-semibold">{c.code}</td>

                                                <td className="p-3 text-gray-500 capitalize">
                                                    {c.type}
                                                </td>

                                                <td className="p-3 font-semibold">
                                                    {c.type === "percentage"
                                                        ? `${c.value}%`
                                                        : `₹${c.value}`}
                                                </td>

                                                <td className="p-3">
                                                    <div className="text-xs text-gray-500 mb-1">
                                                        {used} / {total}
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-200 rounded-full">
                                                        <div
                                                            className="h-2 bg-orange-500 rounded-full"
                                                            style={{ width: `${percent}%` }}
                                                        ></div>
                                                    </div>
                                                </td>

                                                <td className="p-3 text-gray-500">
                                                    {new Date(c.expiry_date).toLocaleDateString()}
                                                </td>

                                                <td className="p-3">
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full ${c.status === "active"
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-gray-200 text-gray-500"
                                                            }`}
                                                    >
                                                        {c.status.toUpperCase()}
                                                    </span>
                                                </td>

                                                <td className="p-3">
                                                    <div className="flex gap-3">

                                                        <button
                                                            onClick={() => {
                                                                setEditData(c);
                                                                setOpenModal(true);
                                                            }}
                                                            className="p-2 bg-blue-50 rounded-full"
                                                        >
                                                            <Pencil size={16} className="text-blue-600" />
                                                        </button>

                                                        <button
                                                            onClick={() => handleDelete(c.id)}
                                                            className="p-2 bg-red-50 rounded-full"
                                                        >
                                                            <Trash2 size={16} className="text-red-600" />
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-4 py-4 border-t flex justify-between items-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                if (page >= 1 && page <= totalPages) {
                                    setCurrentPage(page);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <CreateCouponModal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditData(null);
                }}
                editData={editData}
                addCoupon={(coupon) =>
                    setCoupons((prev) => {
                        const exists = prev.find((c) => c.id === coupon.id);

                        if (exists) {
                            // ✏️ UPDATE
                            return prev.map((c) =>
                                c.id === coupon.id ? coupon : c
                            );
                        }

                        // ➕ ADD
                        return [coupon, ...prev];
                    })
                }
            />
        </>
    );
}