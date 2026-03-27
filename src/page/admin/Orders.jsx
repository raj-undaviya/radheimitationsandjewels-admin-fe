import { useState } from "react";
import OrderHeader from "../../components/orders/OrderHeader";
import OrderTabs from "../../components/orders/OrderTabs";
import OrderTable from "../../components/orders/OrderTable";
import Pagination from "../../components/common/Pagination";

export default function Orders() {

    const [page, setPage] = useState(1);

    // ✅ Dummy Data (replace later with API)
    const orders = [
        { id: 1, name: "Alexander", amount: "$42,000" },
        { id: 2, name: "Elena", amount: "$18,500" },
        { id: 3, name: "Marcus", amount: "$125,000" },
        { id: 4, name: "Maya", amount: "$8,900" },
        { id: 5, name: "John", amount: "$50,000" },
        { id: 6, name: "Sara", amount: "$20,000" },
        { id: 7, name: "David", amount: "$70,000" },
        { id: 8, name: "Chris", amount: "$15,000" },
    ];

    const itemsPerPage = 3;

    // ✅ Calculate total pages
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    // ✅ Slice data for current page
    const paginatedOrders = orders.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div className="p-4 space-y-4">

            <OrderHeader />
            <OrderTabs />

            {/* ✅ Pass paginated data */}
            <OrderTable orders={paginatedOrders} />

            {/* ✅ Pagination */}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

        </div>
    );
}