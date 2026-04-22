import { useEffect, useState } from "react";
import CustomerHeader from "../../components/Customer/CustomerHeader";
import CustomerTable from "../../components/Customer/CustomerTable";
import AddCustomerModal from "../../components/Customer/AddCustomerModal";

import API from "../../api/axiosInstance";
import { CustomerViewAPI } from "../../api/api";

export default function CustomerPage() {

    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await API.get(CustomerViewAPI());

                // 👇 your API structure
                setCustomers(
                    (res.data.data || []).map((item) => ({
                        ...item,
                        isActive: true   // ✅ ADD THIS
                    }))
                );

            } catch (error) {
                console.error("Customer fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

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

    return (
        <div className="p-3 sm:p-4 space-y-4">

            <CustomerHeader
                statusFilter={statusFilter}
                setStatusFilter={(value) => {
                    setStatusFilter(value);
                    setPage(1);

                    // show skeleton
                    setLoading(true);

                    // simulate API delay (or real API call)
                    setTimeout(() => {
                        setLoading(false);
                    }, 500); // 0.5 sec
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
            />

            <AddCustomerModal
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