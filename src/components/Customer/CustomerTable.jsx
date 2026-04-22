import { Trash2, Pencil } from "lucide-react";
import Pagination from "../common/Pagination";

export default function CustomerTable({
    customers,
    page,
    totalPages,
    onPageChange,
    onEdit,
    loading
}) {
    return (
        <div className="bg-white p-3 sm:p-5 rounded-2xl shadow mt-4">

            {/* TABLE WRAPPER */}
            <div className="w-full overflow-x-auto">

                <table className="min-w-200 w-full text-left">

                    {/* HEAD */}
                    <thead className="text-xs text-gray-400 border-b">
                        <tr>
                            <th className="py-3 whitespace-nowrap">Client Portfolio</th>
                            <th className="whitespace-nowrap">Communication</th>
                            <th className="whitespace-nowrap">Role</th>
                            <th className="whitespace-nowrap">Status</th>
                            <th className="whitespace-nowrap text-right">Actions</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {loading ? (
                            // 🔥 SKELETON
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="animate-pulse border-b">

                                    {/* CLIENT */}
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                            <div className="flex flex-col gap-2">
                                                <div className="w-28 h-3 bg-gray-200 rounded"></div>
                                                <div className="w-20 h-3 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* EMAIL */}
                                    <td>
                                        <div className="w-40 h-3 bg-gray-200 rounded"></div>
                                    </td>

                                    {/* ROLE */}
                                    <td>
                                        <div className="w-16 h-4 bg-gray-200 rounded-full"></div>
                                    </td>

                                    {/* STATUS */}
                                    <td>
                                        <div className="w-16 h-4 bg-gray-200 rounded-full"></div>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        ) : customers.length === 0 ? (
                            // 🔥 EMPTY STATE
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-gray-400">
                                    No customers found
                                </td>
                            </tr>
                        ) : (
                            // 🔥 REAL DATA
                            customers.map((c) => (
                                <tr key={c.id} className="border-b last:border-none hover:bg-gray-50 transition">

                                    {/* CLIENT */}
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={`https://i.pravatar.cc/40?img=${c.id}`}
                                                className="w-10 h-10 rounded-full object-cover"
                                                alt=""
                                            />
                                            <div>
                                                <p className="font-medium">
                                                    {c.email?.split("@")[0] || "User"}
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    Joined {new Date(c.date_joined).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* EMAIL */}
                                    <td className="text-sm text-gray-600 whitespace-nowrap">
                                        {c.email}
                                    </td>

                                    {/* Role */}
                                    <td>
                                        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                                            {c.role.charAt(0).toUpperCase() + c.role.slice(1)}
                                        </span>
                                    </td>

                                    {/* STATUS */}
                                    <td>
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full ${c.isActive !== false
                                                ? "bg-green-100 text-green-600"
                                                : "bg-gray-200 text-gray-600"
                                                }`}
                                        >
                                            {c.isActive !== false ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="text-right">
                                        <div className="flex justify-end items-center gap-3">

                                            <button
                                                onClick={() => onEdit(c)}
                                                title="Edit"
                                                className="p-2 rounded-full hover:bg-blue-100 transition"
                                            >
                                                <Pencil size={16} className="text-blue-500 hover:text-blue-700" />
                                            </button>

                                            <button className="p-2 rounded-full hover:bg-red-50 transition">
                                                <Trash2 size={16} className="text-red-400 hover:text-red-600" />
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 pt-4 border-t">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>

        </div>
    );
}