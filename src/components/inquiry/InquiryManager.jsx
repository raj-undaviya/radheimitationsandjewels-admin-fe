import { Phone, Mail, MoreVertical, ChevronDown } from "lucide-react";
import Pagination from "../../components/common/Pagination";
import { useState } from "react";

export default function AppointmentDashboard({
    data = [],
    stats,
    loading,
}) {

    const [filterOpen, setFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // FILTER
    const filteredData =
        statusFilter === "All"
            ? data
            : data.filter(item => item.status === statusFilter);

    // PAGINATION
    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <div className="flex gap-3 justify-between items-center flex-col sm:flex-row">
                <div>
                    <h1 className="text-2xl font-bold">Appointments Management</h1>
                    <p className="text-gray-500 text-xs md:text-sm">
                        Manage and track your private consultations
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-gray-200 rounded-full text-sm">
                        Export CSV
                    </button>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-full text-sm">
                        Schedule Call
                    </button>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="bg-white p-5 rounded-2xl shadow">
                    <p className="text-xs text-gray-400">TOTAL APPOINTMENTS</p>
                    <h2 className="text-3xl font-bold mt-2">
                        {stats?.total ?? 0}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow border-l-4 border-orange-500">
                    <p className="text-xs text-gray-400">PENDING REQUESTS</p>
                    <h2 className="text-3xl font-bold mt-2 text-orange-600">
                        {stats?.pending ?? 0}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow">
                    <p className="text-xs text-gray-400">COMPLETED</p>
                    <h2 className="text-3xl font-bold mt-2">
                        {stats?.completed ?? 0}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow">
                    <p className="text-xs text-gray-400">CONFIRMED</p>
                    <h2 className="text-3xl font-bold mt-2">
                        {stats?.confirmed ?? 0}
                    </h2>
                </div>

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">

                {/* HEADER */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="font-semibold">Recent Bookings</h2>

                    {/* FILTER */}
                    <div className="relative">
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="flex items-center gap-2 text-sm text-gray-500 border px-3 py-1 rounded-lg hover:bg-gray-100"
                        >
                            {statusFilter}

                            <ChevronDown
                                size={16}
                                className={`transition ${filterOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {filterOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow z-10">
                                {["All", "pending", "confirmed", "cancelled"].map((item) => (
                                    <div
                                        key={item}
                                        onClick={() => {
                                            setStatusFilter(item);
                                            setFilterOpen(false);
                                            setCurrentPage(1);
                                        }}
                                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer capitalize"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">

                        <thead className="bg-gray-100 text-xs text-gray-500 uppercase">
                            <tr>
                                <th className="p-3 text-left">Customer</th>
                                <th className="p-3 text-left">Type</th>
                                <th className="p-3 text-left">Date & Time</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Contact</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {/* LOADING */}
                            {loading ? (
                                [...Array(6)].map((_, i) => (
                                    <tr key={i} className="border-t animate-pulse">
                                        <td className="p-3"><div className="h-3 bg-gray-200 w-24 rounded"></div></td>
                                        <td className="p-3"><div className="h-3 bg-gray-200 w-20 rounded"></div></td>
                                        <td className="p-3"><div className="h-3 bg-gray-200 w-28 rounded"></div></td>
                                        <td className="p-3"><div className="h-5 bg-gray-200 w-20 rounded"></div></td>
                                        <td className="p-3"><div className="h-3 bg-gray-200 w-16 rounded"></div></td>
                                        <td className="p-3"><div className="h-3 bg-gray-200 w-10 rounded"></div></td>
                                    </tr>
                                ))
                            ) : currentData.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500">
                                        No appointments found
                                    </td>
                                </tr>
                            ) : (
                                currentData.map((item) => (
                                    <tr key={item.id} className="border-t hover:bg-gray-50">

                                        {/* CUSTOMER */}
                                        <td className="p-3 font-semibold">
                                            {item.customer_name}
                                        </td>

                                        {/* TYPE */}
                                        <td className="p-3 capitalize">
                                            {item.appointment_type}
                                        </td>

                                        {/* DATE */}
                                        <td className="p-3">
                                            <p>{new Date(item.date).toLocaleDateString()}</p>
                                            <p className="text-xs text-gray-400">{item.time_slot}</p>
                                        </td>

                                        {/* STATUS */}
                                        <td className="p-3">
                                            <span className={`px-3 py-1 text-xs rounded-full ${item.status === "confirmed"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-orange-100 text-orange-600"
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        {/* CONTACT */}
                                        <td className="p-3 flex gap-2">
                                            <a href={`tel:${item.phone_number}`}>
                                                <Phone size={16} />
                                            </a>
                                            <a href={`mailto:${item.email}`}>
                                                <Mail size={16} />
                                            </a>
                                        </td>

                                        {/* ACTION */}
                                        <td className="p-3">
                                            <MoreVertical size={18} />
                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>

                    </table>
                </div>

                {/* PAGINATION */}
                <div className="p-4 border-t">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(p) => setCurrentPage(p)}
                    />
                </div>

            </div>

        </div>
    );
}