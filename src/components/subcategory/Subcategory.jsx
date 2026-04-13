import { Plus, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import AddCategoryModal from "../collection/AddCategoryModal";
import Pagination from "../../components/common/Pagination";

export default function Subcategory() {

    const [editData, setEditData] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [parentOpen, setParentOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);

    const [selectedParent, setSelectedParent] = useState("All Parent Categories");
    const [selectedStatus, setSelectedStatus] = useState("All Status");

    //DATA 
    const data = [
        {
            name: "Diamond Rings",
            id: "SC-8821",
            parent: "Bridal & Engagement",
            items: 124,
            status: "active",
            image: "https://via.placeholder.com/40",
        },
        {
            name: "Pearl Necklaces",
            id: "SC-8822",
            parent: "High Jewelry",
            items: 48,
            status: "active",
            image: "https://via.placeholder.com/40",
        },
        {
            name: "Chronographs",
            id: "SC-8823",
            parent: "Timepieces",
            items: 92,
            status: "archived",
            image: "https://via.placeholder.com/40",
        },
        {
            name: "Cufflinks",
            id: "SC-8824",
            parent: "Men's Collections",
            items: 35,
            status: "active",
            image: "https://via.placeholder.com/40",
        },
        {
            name: "Diamond Rings",
            id: "SC-8821",
            parent: "Bridal & Engagement",
            items: 124,
            status: "active",
            image: "https://via.placeholder.com/40",
        },
        {
            name: "Pearl Necklaces",
            id: "SC-8822",
            parent: "High Jewelry",
            items: 48,
            status: "active",
            image: "https://via.placeholder.com/40",
        },
        {
            name: "Chronographs",
            id: "SC-8823",
            parent: "Timepieces",
            items: 92,
            status: "archived",
            image: "https://via.placeholder.com/40",
        },
        {
            name: "Cufflinks",
            id: "SC-8824",
            parent: "Men's Collections",
            items: 35,
            status: "active",
            image: "https://via.placeholder.com/40",
        }
    ];

    const parentOptions = [
        "All Parent Categories",
        "Bridal & Engagement",
        "High Jewelry",
        "Timepieces",
        "Men's Collections",
    ];

    const statusOptions = ["All Status", "Active", "Archived"];

    //PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleEdit = (item) => {
        setEditData(item);     // store clicked row data
        setOpenModal(true);    // open modal
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
                            {selectedParent}
                            <ChevronDown size={16} />
                        </button>

                        {parentOpen && (
                            <div className="absolute mt-2 w-full sm:w-56 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                                {parentOptions.map((option, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setSelectedParent(option);
                                            setParentOpen(false);
                                            setCurrentPage(1);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                    >
                                        {option}
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
                            {selectedStatus}
                            <ChevronDown size={16} />
                        </button>

                        {statusOpen && (
                            <div className="absolute mt-2 w-full sm:w-40 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                                {statusOptions.map((option, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setSelectedStatus(option);
                                            setStatusOpen(false);
                                            setCurrentPage(1);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow overflow-hidden">

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-175 text-sm">

                            <thead className="bg-gray-50 text-gray-500 text-left">
                                <tr>
                                    <th className="px-6 py-3">Subcategory</th>
                                    <th className="px-6 py-3">Parent Category</th>
                                    <th className="px-6 py-3">Items Count</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentData.map((item, index) => (
                                    <tr key={index} className="border-t hover:bg-gray-50">

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={item.image} className="w-10 h-10 rounded bg-gray-100" />
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-xs text-gray-500">ID: {item.id}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className=" md:px-6 md:py-4 ">
                                            <span className="bg-gray-200 text-xs px-3 py-1 rounded-full">
                                                {item.parent}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">{item.items} Items</td>

                                        <td className="px-6 py-4">
                                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${item.status === "active"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-gray-200 text-gray-500"
                                                }`}>
                                                {item.status.toUpperCase()}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end items-center gap-2">

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
                                                    // onClick={() => handleDelete(item)}
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
                                ))}
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

            <AddCategoryModal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditData(null); // reset after close
                }}
                editData={editData}
            />
        </>
    );
}