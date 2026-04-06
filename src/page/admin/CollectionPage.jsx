import { useState } from "react";
import CollectionHeader from "../../components/collection/CollectionHeader";
import CollectionTable from "../../components/collection/CollectionTable";
import AddCategoryModal from "../../components/collection/AddCategoryModal";

export default function CollectionPage() {

    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <CollectionHeader
                onAdd={() => {
                    setEditData(null); // add mode
                    setOpenModal(true);
                }}
            />

            {/* TABLE */}
            <CollectionTable
                onEdit={(item) => {
                    setEditData(item); // edit mode
                    setOpenModal(true);
                }}
            />

            {/* ✅ SINGLE MODAL */}
            <AddCategoryModal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditData(null);
                }}
                editData={editData}
                showParent={false}
            />

        </div>
    );
}