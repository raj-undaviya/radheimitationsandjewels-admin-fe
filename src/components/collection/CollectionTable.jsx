import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Pagination from "../common/Pagination";
import AddCategoryModal from "./AddCategoryModal";

import { CollectionDeleteAPI } from "../../api/api";
import API from "../../api/axiosInstance";
import toast from "react-hot-toast";


export default function CollectionTable({ collections = [], loading, onEdit, onDeleteSuccess }) {

    // const [openModal, setOpenModal] = useState(false);
    // const [editData, setEditData] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(collections.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = collections.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const handleDelete = (id) => {
        toast((t) => (
            <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">
                    Are you sure you want to delete?
                </p>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 text-sm border rounded-full"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {
                            try {
                                await API.delete(CollectionDeleteAPI(id));

                                toast.success("Category deleted");
                                toast.dismiss(t.id);

                                if (onDeleteSuccess) onDeleteSuccess();

                            } catch (error) {
                                console.log("DELETE ERROR:", error.response?.data);
                                toast.error("Failed to delete");
                            }
                        }}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-full"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ));
    };

    
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
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="py-10">
                                    <div className="flex justify-center items-center">
                                        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : currentData.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-6">
                                    No categories found
                                </td>
                            </tr>
                        ) : (
                            currentData.map((item) => (
                                <tr key={item.id} className="border-t hover:bg-gray-50 transition">

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">

                                            <img
                                                src={item.category_image_url}
                                                alt={item.name}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />

                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">--</td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`text-xs px-3 py-1 rounded-full font-medium ${item.status === "active"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {item.status?.toUpperCase()}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">

                                            <button
                                                onClick={() => onEdit(item)}
                                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                                            >
                                                <Pencil size={14} />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                                            >
                                                <Trash2 size={14} />
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
                {/* 
                <AddCategoryModal
                    isOpen={openModal}
                    onClose={() => {
                        setOpenModal(false);
                        setEditData(null);
                    }}
                    editData={editData}
                    showParent={false}
                /> */}
            </div>

            <AddCategoryModal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditData(null); // reset after close
                }}
                editData={editData}
                showParent={false}
            />

        </div>
    );
}