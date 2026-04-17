import { Ban, Trash2 } from "lucide-react";
import Pagination from "../common/Pagination";

export default function CustomerTable({
    customers,
    page,
    totalPages,
    onPageChange,
    // totalItems,
    // itemsPerPage,
    onToggleStatus  
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
                            <th className="whitespace-nowrap">Status</th>
                            <th className="whitespace-nowrap text-right">Actions</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {customers.map((c, i) => (
                            <tr key={c.id} className="border-b last:border-none hover:bg-gray-50 transition">

                                {/* CLIENT */}
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={c.image}
                                            className="w-10 h-10 rounded-full object-cover"
                                            alt=""
                                        />
                                        <div>
                                            <p className="font-medium">{c.name}</p>
                                            <p className="text-xs text-gray-400">
                                                Member since {c.memberSince}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* EMAIL */}
                                <td className="text-sm text-gray-600 whitespace-nowrap">
                                    {c.email}
                                </td>

                                {/* STATUS */}
                                <td>
                                    <span
                                        className={`px-3 py-1 text-xs rounded-full ${c.status === "ACTIVE"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {c.status}
                                    </span>
                                </td>

                                {/* ACTIONS */}
                                <td className="text-right">
                                    <div className="flex justify-end items-center gap-3">

                                        {/* TOGGLE STATUS */}
                                        <button
                                            onClick={() => onToggleStatus(c.id)}
                                            title={c.status === "ACTIVE" ? "Disable" : "Activate"}
                                            className="p-2 rounded-full hover:bg-gray-100 transition"
                                        >
                                            <Ban
                                                size={16}
                                                className={`${c.status === "ACTIVE"
                                                        ? "text-gray-400 hover:text-gray-700"
                                                        : "text-green-500 hover:text-green-700"
                                                    }`}
                                            />
                                        </button>

                                        {/* DELETE */}
                                        <button className="p-2 rounded-full hover:bg-red-50 transition">
                                            <Trash2 size={16} className="text-red-400 hover:text-red-600" />
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 pt-4 border-t">

                {/* <p className="text-sm text-gray-500">
                    Showing {(page - 1) * itemsPerPage + 1}-
                    {Math.min(page * itemsPerPage, totalItems)} of {totalItems} profiles
                </p> */}

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>

        </div>
    );
}