import { useState } from "react";
import OrderHeader from "../../components/orders/OrderHeader";
import OrderTable from "../../components/orders/OrderTable";
import Pagination from "../../components/common/Pagination";

export default function Orders() {

    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState("All");

    // ✅ SAME STRUCTURE AS TABLE
    const orders = Array.from({ length: 30 }, (_, i) => {

        const names = [
            "Alexander Van Der Bellen",
            "Elena Sofia Rossi",
            "Marcus Thorne",
            "Maya Isabella Chen",
            "John Carter",
            "Sara Ali",
            "David Miller",
            "Chris Evans",
            "Amit Shah",
            "Riya Patel"
        ];

        const tags = ["VIP Member", "Platinum Tier", "New Customer", "Elite Collector"];

        const statuses = ["In Production", "Processing", "Shipped", "Delivered"];

        const progressSteps = [
            { text: "Initiated", value: 20 },
            { text: "Stone Selection", value: 40 },
            { text: "Quality Check", value: 60 },
            { text: "Out for Delivery", value: 80 },
            { text: "Delivered", value: 100 }
        ];

        const randomName = names[i % names.length];
        const randomTag = tags[i % tags.length];
        const randomStatus = statuses[i % statuses.length];
        const randomProgress = progressSteps[i % progressSteps.length];

        return {
            id: `#RJ-${8829 + i}`,
            name: randomName,
            tag: randomTag,
            amount: `$${(8000 + i * 4500).toLocaleString()}`,
            progress: randomProgress.value,
            progressText: randomProgress.text,
            status: randomStatus,
            date: `Oct ${24 - (i % 10)}, 2023`
        };
    });

    const itemsPerPage = 10;

    // ✅ FILTER BASED ON TAB (MATCH TABS EXACTLY)
    const filteredOrders =
        activeTab === "All"
            ? orders
            : orders.filter(order => order.status === activeTab);

    // ✅ TOTAL PAGES
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    // ✅ PAGINATION SLICE
    const paginatedOrders = filteredOrders.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div className="space-y-6">

            {/* 🔥 HEADER */}
            <OrderHeader />

            {/* 🔥 TABLE (NO PAGINATION INSIDE) */}
            <OrderTable orders={paginatedOrders} />

            {/* 🔥 PAGINATION FOOTER */}
            <div className="relative mt-6 h-10">

                {/* LEFT TEXT */}
                <p className="text-sm text-gray-500 absolute left-0 top-1/2 -translate-y-1/2">
                    Showing{" "}
                    {(page - 1) * itemsPerPage + 1}-
                    {Math.min(page * itemsPerPage, filteredOrders.length)}{" "}
                    of {filteredOrders.length} Luxury Orders
                </p>

                {/* CENTER PAGINATION */}
                <div className="flex justify-center">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={(newPage) => {
                            if (newPage >= 1 && newPage <= totalPages) {
                                setPage(newPage);
                            }
                        }}
                    />
                </div>

            </div>

        </div>
    );
}