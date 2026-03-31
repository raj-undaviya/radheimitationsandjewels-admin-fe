import { Plus } from "lucide-react";
import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

export default function CollectionHeader() {

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/* LEFT */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold">
                        Categories Management
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Organize and curate your jewelry boutique’s main collections.
                    </p>
                </div>

                {/* RIGHT */}
                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center justify-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-full shadow-md hover:bg-orange-600 transition"
                >
                    <Plus size={16} />
                    Add New Category
                </button>

            </div>

            {/* MODAL */}
            <AddCategoryModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
}