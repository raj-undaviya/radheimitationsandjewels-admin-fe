import { CreditCard, Eye, ChevronDown } from "lucide-react";
import Pagination from "../common/Pagination";
import { useState, useEffect } from "react";
import TransactionModal from "./TransactionModal";

import API from "../../api/axiosInstance";
import { getPaymentStatsAPI, getPaymentsListAPI, getPaymentDetailAPI } from "../../api/api";

export default function PaymentLayout() {

    const [openDropdown, setOpenDropdown] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTxn, setSelectedTxn] = useState(null);

    const [filters, setFilters] = useState({
        days: "",
        method: "",
        status: ""
    });

    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // LOADING STATES
    const [loading, setLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(true);

    // CLOSE DROPDOWN
    useEffect(() => {
        const close = () => setOpenDropdown(null);
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, []);

    // FETCH STATS
    useEffect(() => {
        const fetchStats = async () => {
            try {
                setStatsLoading(true);
                const res = await API.get(getPaymentStatsAPI());
                setStats(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setStatsLoading(false);
            }
        };
        fetchStats();
    }, []);

    // FETCH PAYMENTS
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                setLoading(true);

                let query = `page=${currentPage}`;
                if (filters.days) query += `&days=${filters.days}`;
                if (filters.method) query += `&method=${filters.method}`;
                if (filters.status) query += `&status=${filters.status}`;

                const res = await API.get(getPaymentsListAPI(query));

                setTransactions(res.data?.results || []);
                setTotalPages(res.data?.pages || 1);

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [currentPage, filters]);

    const statusStyle = (status) => {
        if (status === "paid") return "bg-green-100 text-green-600";
        if (status === "pending") return "bg-orange-100 text-orange-600";
        if (status === "failed") return "bg-red-100 text-red-600";
        return "bg-gray-100 text-gray-600";
    };

    const handleOpen = async (txn) => {
        try {
            const id = txn.order_id.replace("#RJ-", "");
            const res = await API.get(getPaymentDetailAPI(id));
            setSelectedTxn(res.data);
            setOpenModal(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Payment Transactions</h1>
                    <p className="text-gray-500 text-sm">
                        Monitor and manage all incoming payments
                    </p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                    {[
                        { label: "Total Revenue", value: `₹${stats.total_revenue || 0}` },
                        { label: "Today's Collections", value: `₹${stats.todays_collections || 0}` },
                        { label: "Pending Transactions", value: stats.pending_transactions || 0 },
                        { label: "Success Rate", value: `${stats.success_rate || 0}%` },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow">
                            <p className="text-gray-500 text-sm">{item.label}</p>

                            {statsLoading ? (
                                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mt-2"></div>
                            ) : (
                                <h2 className="font-bold mt-2">{item.value}</h2>
                            )}
                        </div>
                    ))}

                </div>

                {/* FILTERS */}
                <div className="flex flex-wrap gap-3 mb-4">

                    {/* DAYS */}
                    <div className="relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdown(openDropdown === "days" ? null : "days");
                            }}
                            className="px-4 py-2 bg-white rounded-lg text-sm shadow flex items-center gap-2"
                        >
                            {filters.days ? `Last ${filters.days} Days` : "All Days"}
                            <ChevronDown size={16} className={`transition ${openDropdown === "days" ? "rotate-180" : ""}`} />
                        </button>

                        {openDropdown === "days" && (
                            <div className="absolute mt-2 w-40 bg-white rounded-lg shadow z-50">
                                {["", "7", "30"].map((d) => (
                                    <div
                                        key={d}
                                        onClick={() => {
                                            setFilters({ ...filters, days: d });
                                            setOpenDropdown(null);
                                        }}
                                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    >
                                        {d === "" ? "All Days" : `Last ${d} Days`}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* METHOD */}
                    <div className="relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdown(openDropdown === "method" ? null : "method");
                            }}
                            className="px-4 py-2 bg-white rounded-lg text-sm shadow flex items-center gap-2 capitalize"
                        >
                            {filters.method || "All Methods"}
                            <ChevronDown size={16} className={`transition ${openDropdown === "method" ? "rotate-180" : ""}`} />
                        </button>

                        {openDropdown === "method" && (
                            <div className="absolute mt-2 w-40 bg-white rounded-lg shadow z-50">
                                {["", "online", "cod"].map((m) => (
                                    <div
                                        key={m}
                                        onClick={() => {
                                            setFilters({ ...filters, method: m });
                                            setOpenDropdown(null);
                                        }}
                                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer capitalize"
                                    >
                                        {m || "All Methods"}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* STATUS */}
                    <div className="relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdown(openDropdown === "status" ? null : "status");
                            }}
                            className="px-4 py-2 bg-white rounded-lg text-sm shadow flex items-center gap-2 capitalize"
                        >
                            {filters.status || "All Status"}
                            <ChevronDown size={16} className={`transition ${openDropdown === "status" ? "rotate-180" : ""}`} />
                        </button>

                        {openDropdown === "status" && (
                            <div className="absolute mt-2 w-40 bg-white rounded-lg shadow z-50">
                                {["", "paid", "pending", "failed"].map((s) => (
                                    <div
                                        key={s}
                                        onClick={() => {
                                            setFilters({ ...filters, status: s });
                                            setOpenDropdown(null);
                                        }}
                                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer capitalize"
                                    >
                                        {s || "All Status"}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">

                    <table className="w-full text-sm min-w-[700px]">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="py-3">Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Method</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading
                                ? [...Array(6)].map((_, i) => (
                                    <tr key={i} className="border-b animate-pulse">
                                        <td className="py-4"><div className="h-4 w-20 bg-gray-200 rounded"></div></td>
                                        <td><div className="h-4 w-28 bg-gray-200 rounded"></div></td>
                                        <td><div className="h-4 w-32 bg-gray-200 rounded"></div></td>
                                        <td><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
                                        <td><div className="h-4 w-16 bg-gray-200 rounded"></div></td>
                                        <td><div className="h-4 w-16 bg-gray-200 rounded"></div></td>
                                        <td><div className="h-6 w-6 bg-gray-200 rounded-full mx-auto"></div></td>
                                    </tr>
                                ))
                                : transactions.map((t, i) => (
                                    <tr key={i} className="border-b hover:bg-gray-50">
                                        <td className="py-4 text-orange-500 font-medium">{t.order_id}</td>
                                        <td>{t.customer_name}</td>
                                        <td>
                                            <div>{new Date(t.date).toLocaleDateString()}</div>
                                            <div className="text-gray-400 text-xs">
                                                {new Date(t.date).toLocaleTimeString()}
                                            </div>
                                        </td>
                                        <td className="flex items-center gap-2 py-4">
                                            <CreditCard size={16} />
                                            {t.payment_method}
                                        </td>
                                        <td>₹{t.amount}</td>
                                        <td>
                                            <span className={`px-2 py-1 rounded-full text-xs ${statusStyle(t.payment_status)}`}>
                                                {t.payment_status}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button onClick={() => handleOpen(t)}>
                                                <Eye size={18} className="text-orange-500" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            <TransactionModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                data={selectedTxn}
            />
        </div>
    );
}