import { useState } from "react";
import CustomerHeader from "../../components/Customer/CustomerHeader";
import CustomerTable from "../../components/Customer/CustomerTable";

export default function CustomerPage() {

    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("ALL");

    // ✅ STATE CUSTOMERS
    const [customers, setCustomers] = useState(
        Array.from({ length: 30 }, (_, i) => {

            const names = [
                "Isabella Rossellini",
                "Sebastian Sterling",
                "Amara Okafor",
                "Dr. Julian Thorne",
                "Aarav Patel",
                "Riya Shah",
                "David Miller",
                "Chris Evans"
            ];

            return {
                id: i + 1,
                name: names[i % names.length],
                memberSince: `Jan ${2020 + (i % 5)}`,
                email: `user${i + 1}@example.com`,
                status: i % 3 === 0 ? "INACTIVE" : "ACTIVE",
                image: `https://i.pravatar.cc/40?img=${i + 1}`
            };
        })
    );

    const itemsPerPage = 10;

    // ✅ FILTER LOGIC
    const filteredCustomers = customers.filter((c) => {
        if (statusFilter === "ALL") return true;
        return c.status === statusFilter;
    });

    // ✅ PAGINATION ON FILTERED DATA
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const paginatedCustomers = filteredCustomers.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    // ✅ TOGGLE STATUS
    const toggleStatus = (id) => {
        setCustomers((prev) =>
            prev.map((c) =>
                c.id === id
                    ? {
                        ...c,
                        status: c.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
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
                    setPage(1); // 🔥 IMPORTANT
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
            />

        </div>
    );
}