import { useState } from "react";
import CustomerHeader from "../../components/Customer/CustomerHeader";
import CustomerTable from "../../components/Customer/CustomerTable";
import Pagination from "../../components/common/Pagination";

export default function CustomerPage() {

    const [page, setPage] = useState(1);

    // ✅ AUTO GENERATE 30 CUSTOMERS
    const customers = Array.from({ length: 30 }, (_, i) => {

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
            name: names[i % names.length],
            memberSince: `Jan ${2020 + (i % 5)}`,
            email: `user${i + 1}@example.com`,
            status: i % 3 === 0 ? "INACTIVE" : "ACTIVE",
            image: `https://i.pravatar.cc/40?img=${i + 1}`
        };
    });

    const itemsPerPage = 10;

    const totalPages = Math.ceil(customers.length / itemsPerPage);

    const paginatedCustomers = customers.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div className="p-3 sm:p-4 space-y-4">

            <CustomerHeader />

            <CustomerTable customers={paginatedCustomers} />

            {/* FOOTER */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

                <p className="text-sm text-gray-500">
                    Showing {(page - 1) * itemsPerPage + 1}-
                    {Math.min(page * itemsPerPage, customers.length)} of {customers.length} profiles
                </p>

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />

            </div>

        </div>
    );
}