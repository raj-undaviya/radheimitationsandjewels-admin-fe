import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Pagination from "../../components/common/Pagination";

const data = [
    { name: "Bridal Necklaces", desc: "Traditional & heavy bridal sets", items: 24, status: "Active" },
    { name: "Signature Rings", desc: "Engagement & cocktail collections", items: 18, status: "Active" },
    { name: "Temple Collection", desc: "Antique heritage gold pieces", items: 0, status: "Inactive" },
    { name: "Bangles & Kadas", desc: "Ornate 22k gold traditional wristwear", items: 32, status: "Active" },
    { name: "Diamond Sets", desc: "Premium diamond jewelry", items: 10, status: "Active" },
    { name: "Silver Collection", desc: "Elegant silver items", items: 5, status: "Inactive" },
    { name: "Silver Collection", desc: "Elegant silver items", items: 5, status: "Inactive" },
    { name: "Silver Collection", desc: "Elegant silver items", items: 5, status: "Inactive" },
    { name: "Bridal Necklaces", desc: "Traditional & heavy bridal sets", items: 24, status: "Active" },
    { name: "Signature Rings", desc: "Engagement & cocktail collections", items: 18, status: "Active" },
    { name: "Temple Collection", desc: "Antique heritage gold pieces", items: 0, status: "Inactive" },
    { name: "Bangles & Kadas", desc: "Ornate 22k gold traditional wristwear", items: 32, status: "Active" },
    { name: "Diamond Sets", desc: "Premium diamond jewelry", items: 10, status: "Active" },
    { name: "Silver Collection", desc: "Elegant silver items", items: 5, status: "Inactive" },
    { name: "Silver Collection", desc: "Elegant silver items", items: 5, status: "Inactive" },
    { name: "Silver Collection", desc: "Elegant silver items", items: 5, status: "Inactive" },
];

export default function CollectionTable() {

    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            {/* TABLE WRAPPER (for scroll on mobile) */}
            <div className="w-full overflow-x-auto">

                <table className="w-full min-w-150">

                    {/* HEADER */}
                    <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-3 text-left">Category Details</th>
                            <th className="px-6 py-3 text-left">Total Items</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {currentData.map((item, i) => (
                            <tr
                                key={i}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                {/* Name */}
                                <td className="px-6 py-4">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </td>

                                {/* Items */}
                                <td className="px-6 py-4">
                                    {item.items}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full ${item.status === "Active"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-gray-100 text-gray-400"
                                            }`}
                                    >
                                        {item.status.toUpperCase()}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                            <Pencil size={14} />
                                        </button>
                                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* FOOTER */}
            <div className="px-4 sm:px-6 py-4">

                {/* <p className="text-sm text-gray-500 mb-3">
                    Showing {currentData.length} of {data.length} categories
                </p> */}

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
    );
}