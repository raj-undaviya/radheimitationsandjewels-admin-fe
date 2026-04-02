import { Filter, UserPlus } from "lucide-react";
import { useState } from "react";
import AddCustomerModal from "./AddCustomerModal";

export default function CustomerHeader() {

    const [openModal, setOpenModal] = useState(false);

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
                <div className="flex flex-col sm:flex-row gap-3">

                    <button className="flex items-center justify-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm">
                        <Filter size={16} />
                        Status: All
                    </button>

                    <button
                        onClick={() => setOpenModal(true)}
                        className="flex items-center justify-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-full text-sm shadow hover:bg-orange-600"
                    >
                        <UserPlus size={16} />
                        Add New Customer
                    </button>

                </div>
            </div>

            {/* Modal */}
            <AddCustomerModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
}