import { Filter, UserPlus, Check } from "lucide-react";
import { useState } from "react";
import AddCustomerModal from "./AddCustomerModal";

export default function CustomerHeader({ statusFilter, setStatusFilter }) {

    const [openModal, setOpenModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const options = ["ALL", "ACTIVE", "INACTIVE"];

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/* LEFT */}
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">
                        Customer Atelier
                    </h1>
                    <p className="text-gray-500 text-sm max-w-md">
                        Manage your elite clientele and their acquisition history.
                    </p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col sm:flex-row gap-3 relative">

                    {/* FILTER DROPDOWN */}
                    <div className="relative">

                        <button
                            onClick={() => setOpenFilter(!openFilter)}
                            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm hover:bg-gray-200"
                        >
                            <Filter size={16} />
                            Status: {statusFilter}
                        </button>

                        {/* DROPDOWN */}
                        {openFilter && (
                            <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-xl z-50 overflow-hidden">

                                {options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            setStatusFilter(option);
                                            setOpenFilter(false);
                                        }}
                                        className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                        {option}

                                        {statusFilter === option && (
                                            <Check size={16} className="text-green-500" />
                                        )}
                                    </button>
                                ))}

                            </div>
                        )}

                    </div>

                    {/* ADD BUTTON */}
                    <button
                        onClick={() => setOpenModal(true)}
                        className="flex items-center justify-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-full text-sm shadow hover:bg-orange-600"
                    >
                        <UserPlus size={16} />
                        Add New Customer
                    </button>

                </div>
            </div>

            {/* MODAL */}
            <AddCustomerModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
}