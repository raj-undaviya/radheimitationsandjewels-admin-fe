import { Plus, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import AddCategoryModal from "../collection/AddCategoryModal";
import Pagination from "../../components/common/Pagination";
import toast from "react-hot-toast";

import API from "../../api/axiosInstance";
import { CollectionAPI, SubCategoryAPI, SubCategoryEdiAPI, SubCategoryDeleteAPI } from "../../api/api";

export default function Subcategory() {

    const [editData, setEditData] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [parentOpen, setParentOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await API.get(CollectionAPI());

            const formatted = [
                { label: "All Parent Categories", value: "all" },
                ...(res.data.data || []).map(cat => ({
                    label: cat.name,
                    value: cat.id
                }))
            ];

            setCategories(formatted);

        } catch (err) {
            console.error(err);
        }
    };

    const [selectedParent, setSelectedParent] = useState({
        label: "All Parent Categories",
        value: "all"
    });

    const [selectedStatus, setSelectedStatus] = useState("all");

    //DATA 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
        fetchSubcategories();
    }, []);

    const fetchSubcategories = async (categoryId = null) => {
        try {
            setLoading(true);

            const res = await API.get(SubCategoryAPI(categoryId));

            setData(res.data.data || []);

        } catch (error) {
            console.error("Error:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const statusOptions = [
        { label: "All Status", value: "all" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" }
    ];

    const filteredData = data.filter(item => {
        const statusMatch =
            selectedStatus === "all"
                ? true
                : item.status === selectedStatus;

        return statusMatch;
    });

    //PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleEdit = async (item) => {
        try {
            const res = await API.get(SubCategoryEdiAPI(item.id));

            console.log("EDIT DATA:", res.data);

            setEditData(res.data.data); // full API data
            setOpenModal(true);

        } catch (error) {
            console.error("Edit fetch error:", error);
        }
    };

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
                                await API.delete(SubCategoryDeleteAPI(id)); // ✅ FIXED

                                toast.success("Subcategory deleted");
                                toast.dismiss(t.id);

                                fetchSubcategories(); // ✅ refresh list

                            } catch (error) {
                                console.log(error);
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
        <>
            <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold">
                        Subcategories Management
                    </h1>

                    <button
                        onClick={() => setOpenModal(true)}
                        className="flex items-center justify-center gap-2 bg-orange-600 text-white px-4 sm:px-5 py-2 rounded-full shadow hover:bg-orange-700 w-full sm:w-auto"
                    >
                        <Plus size={18} />
                        Add New Subcategory
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">

                    {/* Parent Dropdown */}
                    <div className="relative w-full sm:w-auto">
                        <button
                            onClick={() => setParentOpen(!parentOpen)}
                            className="w-full sm:w-auto flex justify-between items-center gap-2 px-4 py-2 rounded-full bg-gray-200 text-sm"
                        >
                            {selectedParent.label}
                            <ChevronDown size={16} />
                        </button>

                        {parentOpen && (
                            <div className="absolute mt-2 w-full sm:w-56 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                                {categories.map((option, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setSelectedParent(option);
                                            setParentOpen(false);
                                            setCurrentPage(1);

                                            fetchSubcategories(option.value); // 🔥 API CALL
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Status Dropdown */}
                    <div className="relative w-full sm:w-auto">
                        <button
                            onClick={() => setStatusOpen(!statusOpen)}
                            className="w-full sm:w-auto flex justify-between items-center gap-2 px-4 py-2 rounded-full bg-gray-200 text-sm"
                        >
                            {
                                statusOptions.find(s => s.value === selectedStatus)?.label
                            }
                            <ChevronDown size={16} />
                        </button>

                        {statusOpen && (
                            <div className="absolute mt-2 w-full sm:w-40 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                                {statusOptions.map((option, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setSelectedStatus(option.value);
                                            setStatusOpen(false);
                                            setCurrentPage(1);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow overflow-hidden">

                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-175 text-sm">

                            <thead className="bg-gray-50 text-gray-500 text-left">
                                <tr>
                                    <th className="px-6 py-3">Subcategory</th>
                                    <th className="px-6 py-3">Parent Category</th>
                                    <th className="px-6 py-3">Item Count</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    [...Array(6)].map((_, i) => (
                                        <tr key={i} className="border-t animate-pulse">

                                            {/* Subcategory */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-2">
                                                    <div className="w-32 h-3 bg-gray-200 rounded"></div>
                                                    <div className="w-24 h-2 bg-gray-200 rounded"></div>
                                                </div>
                                            </td>

                                            {/* Parent Category */}
                                            <td className="px-6 py-4">
                                                <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
                                            </td>

                                            {/* Item Count */}
                                            <td className="px-14 py-4">
                                                <div className="w-10 h-3 bg-gray-200 rounded"></div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ) : currentData.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-gray-400">
                                            No data found
                                        </td>
                                    </tr>
                                ) : (
                                    currentData.map((item, index) => (
                                        <tr key={index} className="border-t hover:bg-gray-50">

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-xs text-gray-500">ID: {item.name}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="bg-gray-200 text-xs px-3 py-1 rounded-full">
                                                    {item.parent_category_name}
                                                </span>
                                            </td>

                                            <td className="px-14 py-4">{item.items_count}</td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`text-xs px-3 py-1 rounded-full font-medium ${item.status === "active"
                                                        ? "bg-green-100 text-green-600"
                                                        : item.status === "inactive"
                                                            ? "bg-red-100 text-red-600"
                                                            : "bg-gray-200 text-gray-500"
                                                        }`}
                                                >
                                                    {item.status?.toUpperCase()}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">


                                                {/* Actions */}
                                                <div className="flex items-center gap-2">

                                                    {/* Edit */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(item)}
                                                        className="group p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-200"
                                                        aria-label="Edit"
                                                    >
                                                        <Pencil
                                                            size={16}
                                                            className="text-blue-600 group-hover:scale-110 transition-transform"
                                                        />
                                                    </button>

                                                    {/* Delete */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(item.id)}
                                                        className="group p-2 rounded-full bg-red-50 hover:bg-red-100 transition-all duration-200"
                                                        aria-label="Delete"
                                                    >
                                                        <Trash2
                                                            size={16}
                                                            className="text-red-600 group-hover:scale-110 transition-transform"
                                                        />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>
                    </div>

                    {/* Footer */}
                    <div className="px-4 sm:px-6 py-4 border-t flex justify-between items-center">

                        {/* <p className="text-sm text-gray-500 hidden sm:block">
                            Showing {currentData.length} of {data.length}
                        </p> */}

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                if (page >= 1 && page <= totalPages) {
                                    setCurrentPage(page);
                                    setOpenMenu(null);
                                }
                            }}
                        />
                    </div>
                </div>

            </div>

            <AddCategoryModal type="subcategory"
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditData(null); // reset after close
                }}
                editData={editData}
                onSuccess={fetchSubcategories}
            />
        </>
    );
}