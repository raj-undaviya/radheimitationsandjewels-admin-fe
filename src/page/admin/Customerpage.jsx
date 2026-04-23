import { useEffect, useState } from "react";
import CustomerHeader from "../../components/Customer/CustomerHeader";
import CustomerTable from "../../components/Customer/CustomerTable";
import AddCustomerModal from "../../components/Customer/AddCustomerModal";
import toast from "react-hot-toast";

import API from "../../api/axiosInstance";
import { CustomerViewAPI, CustomerDeleteAPI } from "../../api/api";

export default function CustomerPage() {

    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        setLoading(true);

        try {
            const res = await API.get(CustomerViewAPI());

            setCustomers(
                (res.data.data || []).map((item) => ({
                    ...item,
                    isActive: item.isActive ?? true
                }))
            );

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const itemsPerPage = 10;

    //  FILTER LOGIC
    const filteredCustomers = customers.filter((c) => {
        if (statusFilter === "ALL") return true;
        if (statusFilter === "ACTIVE") return c.isActive === true;
        if (statusFilter === "INACTIVE") return c.isActive === false;
        return true;
    });

    //  PAGINATION ON FILTERED DATA
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const paginatedCustomers = filteredCustomers.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    //  TOGGLE STATUS
    const toggleStatus = (id) => {
        setCustomers((prev) =>
            prev.map((c) =>
                c.id === id
                    ? {
                        ...c,
                        isActive: !c.isActive
                    }
                    : c
            )
        );
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
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);

                            try {
                                await API.delete(CustomerDeleteAPI(id));

                                setCustomers((prev) =>
                                    prev.filter((c) => c.id !== id)
                                );

                                toast.success("User deleted successfully");

                            } catch (err) {
                                console.error(err);
                                toast.error("Failed to delete user");
                            }
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <div className="p-3 sm:p-4 space-y-4">

            <CustomerHeader
                statusFilter={statusFilter}
                setStatusFilter={(value) => {
                    setStatusFilter(value);
                    setPage(1);
                }}
            />

            <CustomerTable
                customers={paginatedCustomers}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                totalItems={filteredCustomers.length}
                itemsPerPage={itemsPerPage}
                onToggleStatus={toggleStatus}
                loading={loading}   // ✅ ADD THIS
                onEdit={(customer) => {
                    setEditData(customer);
                    setOpenModal(true);
                }}
                 onDelete={handleDelete}
            />

            <AddCustomerModal
                addUser={(user) =>
                    setCustomers((prev) => {
                        const exists = prev.find((c) => c.id === user.id);

                        if (exists) {
                            // 🔥 UPDATE
                            return prev.map((c) =>
                                c.id === user.id ? user : c
                            );
                        }

                        // 🔥 ADD
                        return [user, ...prev];
                    })
                }
                refreshUsers={fetchCustomers}
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditData(null);
                }}
                editData={editData}
            />

        </div>
    );
}