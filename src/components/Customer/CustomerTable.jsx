import { Trash2, Pencil } from "lucide-react";
import Pagination from "../common/Pagination";

export default function CustomerTable({
    customers = [],
    page,
    totalPages,
    onPageChange,
    onEdit,
    loading,
    onDelete,
}) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow mt-4">

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">

                    {/* HEAD */}
                    <thead className="text-sm text-gray-500 border-b">
                        <tr className="bg-gray-50">
                            <th className="py-3 px-4 w-[220px]">Client</th>
                            <th className="px-4 w-[140px]">First Name</th>
                            <th className="px-4 w-[140px]">Last Name</th>
                            <th className="px-4 w-[220px]">Email</th>
                            <th className="px-4 w-[120px]">Role</th>
                            <th className="px-4 w-[120px]">Status</th>
                            <th className="px-4 text-right w-[120px]">Actions</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="animate-pulse border-b">

                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                            <div className="space-y-2">
                                                <div className="w-28 h-3 bg-gray-200 rounded"></div>
                                                <div className="w-20 h-3 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4"><div className="h-3 bg-gray-200 rounded w-20"></div></td>
                                    <td className="px-4"><div className="h-3 bg-gray-200 rounded w-20"></div></td>
                                    <td className="px-4"><div className="h-3 bg-gray-200 rounded w-32"></div></td>
                                    <td className="px-4"><div className="h-4 bg-gray-200 rounded-full w-16"></div></td>
                                    <td className="px-4"><div className="h-4 bg-gray-200 rounded-full w-16"></div></td>

                                    <td className="px-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : customers.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-gray-400">
                                    No customers found
                                </td>
                            </tr>
                        ) : (
                            customers.map((c) => (
                                <tr key={c.id} className="border-b hover:bg-gray-50 transition">

                                    {/* CLIENT */}
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={`https://i.pravatar.cc/40?img=${c.id}`}
                                                className="w-10 h-10 rounded-full object-cover"
                                                alt=""
                                            />
                                            <div className="min-w-0">
                                                <p className="font-medium truncate">
                                                    {c.username || "User"}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {c.date_joined
                                                        ? new Date(c.date_joined).toLocaleDateString()
                                                        : "-"}
                                                    {/* .toLocaleDateString()} */}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* FIRST NAME */}
                                    <td className="px-4 text-sm truncate">
                                        {c.first_name || "-"}
                                    </td>

                                    {/* LAST NAME */}
                                    <td className="px-4 text-sm truncate">
                                        {c.last_name || "-"}
                                    </td>

                                    {/* EMAIL */}
                                    <td className="px-4 text-sm text-gray-600 truncate">
                                        {c.email}
                                    </td>

                                    {/* ROLE */}
                                    <td className="px-4">
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full ${c.role === "admin"
                                                ? "bg-orange-100 text-orange-600"
                                                : "bg-blue-100 text-blue-600"
                                                }`}
                                        >
                                            {c.role === "admin" ? "Admin" : "Customer"}
                                        </span>
                                    </td>

                                    {/* STATUS */}
                                    <td className="px-4">
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full ${(c.isActive ?? c.is_active)
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-gray-200 text-gray-600"
                                                }`}
                                        >
                                            {(c.isActive ?? c.is_active) ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(c)}
                                                className="p-2 rounded-full hover:bg-blue-100"
                                            >
                                                <Pencil size={16} className="text-blue-500" />
                                            </button>

                                            <button
                                                onClick={() => onDelete(c.id)}
                                                className="p-2 rounded-full hover:bg-red-100"
                                            >
                                                <Trash2 size={16} className="text-red-500" />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center mt-5">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>

        </div>
    );
}