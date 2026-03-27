import { useState } from "react";
import InventoryHeader from "../../components/inventory/InventoryHeader";
import InventoryStats from "../../components/inventory/InventoryStats";
import InventoryFilters from "../../components/inventory/InventoryFilters";
import InventoryTable from "../../components/inventory/InventoryTable";
import Pagination from "../../components/common/Pagination";
import AddProductModal from "../../components/inventory/AddProductModal";

export default function Inventory() {

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);

    // 🔥 FULL DATA
    const products = [
        { id: 1, name: "Ring", price: 5000 },
        { id: 2, name: "Necklace", price: 8000 },
        { id: 3, name: "Bracelet", price: 3000 },
        { id: 4, name: "Watch", price: 12000 },
        { id: 5, name: "Chain", price: 4000 },
        { id: 6, name: "Pendant", price: 2500 },
        { id: 7, name: "Earrings", price: 1500 },
    ];

    const itemsPerPage = 3;

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const paginatedProducts = products.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      
    );
      console.log(paginatedProducts);

    return (
        <div className="space-y-6">

            <InventoryHeader onAddClick={() => setOpen(true)} />

            <InventoryStats />

            <div className="bg-white p-5 rounded-2xl shadow">

                <InventoryFilters />

                {/* ✅ IMPORTANT */}
                <InventoryTable products={paginatedProducts} />
                

                {/* ✅ Pagination */}
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />

            </div>

            <AddProductModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />

        </div>
    );
}