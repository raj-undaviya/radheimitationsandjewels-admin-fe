import { useState, useEffect } from "react";
import CollectionHeader from "../../components/collection/CollectionHeader";
import CollectionTable from "../../components/collection/CollectionTable";
import AddCategoryModal from "../../components/collection/AddCategoryModal";

import API from "../../api/axiosInstance";
import { CollectionAPI } from "../../api/api";

export default function CollectionPage() {

    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);

    // ✅ NEW STATE
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ FETCH API
    const fetchCollections = async () => {
        try {
            const res = await API.get(CollectionAPI());

            // 🔥 your API → res.data.data
            setCollections(res.data.data || []);

        } catch (err) {
            console.error("Error fetching collections:", err);
            setCollections([]);
        } finally {
            setLoading(false);
        }
    };

    // ✅ LOAD ON PAGE LOAD
    useEffect(() => {
        fetchCollections();
    }, []);

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <CollectionHeader
                onAdd={() => {
                    setEditData(null);
                    setOpenModal(true);
                }}
            />

            {/* TABLE */}
            <CollectionTable
                collections={collections}   // ✅ PASS DATA
                loading={loading}           // ✅ PASS LOADING
                onEdit={(item) => {
                    setEditData(item);
                    setOpenModal(true);
                }}
            />

            {/* MODAL */}
            <AddCategoryModal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditData(null);
                }}
                editData={editData}
                showParent={false}

                // 🔥 REFRESH AFTER ADD/EDIT
                onSuccess={fetchCollections}
                onDeleteSuccess={fetchCollections}
            />

        </div>
    );
}