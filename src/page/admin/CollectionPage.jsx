import { useState, useEffect } from "react";
import CollectionHeader from "../../components/collection/CollectionHeader";
import CollectionTable from "../../components/collection/CollectionTable";
import AddCategoryModal from "../../components/collection/AddCategoryModal";

import API from "../../api/axiosInstance";
import { CollectionAPI, CollectionByIdAPI } from "../../api/api";

export default function CollectionPage() {

    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const [editLoading, setEditLoading] = useState(false);

    // NEW STATE
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        total: 0,
        subcategories: 0,
        active: 0,
        inactive: 0
    });

    //  FETCH API
    const fetchCollections = async () => {
        try {
            const res = await API.get(CollectionAPI());

            setCollections(res.data.data || []);

            setStats({
                total: res.data.total_categories || 0,
                subcategories: res.data.subcategory_count || 0,
                active: res.data.active || 0,
                inactive: res.data.inactive || 0
            });

        } catch (err) {
            console.error(err);
            setCollections([]);
        } finally {
            setLoading(false);
        }
    };

    //  LOAD ON PAGE LOAD
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
                stats={stats}
                loading={loading}
            />

            {/* TABLE */}
            <CollectionTable
                collections={collections}   //  PASS DATA
                loading={loading}           //  PASS LOADING
                onEdit={async (item) => {
                    try {
                        setEditLoading(true);

                        const res = await API.get(CollectionByIdAPI(item.id));

                        setEditData(res.data.data);
                        setOpenModal(true);

                    } catch (error) {
                        console.error(error);
                    } finally {
                        setEditLoading(false);
                    }
                }}
                onDeleteSuccess={fetchCollections}
            />

            {/* MODAL */}
            <AddCategoryModal type="category"
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditData(null);
                }}
                editData={editData}
                showParent={false}

                //REFRESH AFTER ADD/EDIT
                onSuccess={fetchCollections}
                onDeleteSuccess={fetchCollections}
            />

        </div>
    );
}