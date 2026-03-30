import { useState } from "react";
import InventoryHeader from "../../components/inventory/InventoryHeader";
import InventoryStats from "../../components/inventory/InventoryStats";
import InventoryTable from "../../components/inventory/InventoryTable";
import Pagination from "../../components/common/Pagination";
import AddProductModal from "../../components/inventory/AddProductModal";

export default function Inventory() {

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);

    // 🔥 DUMMY DATA (30 PRODUCTS)
    const products = Array.from({ length: 30 }, (_, i) => ({
        name: `Product ${i + 1}`,
        sku: `SKU-${i + 1}`,
        category: ["Ring", "Necklace", "Bangles"][i % 3],
        stock: Math.floor(Math.random() * 50),
        price: `${1000 + i * 100}`,
        image: "https://via.placeholder.com/40" // replace with real images
    }));
    
    // ✅ STATS
    const totalItems = products.length;
    const lowStock = products.filter(p => p.stock < 10 && p.stock > 0).length;
    const outOfStock = products.filter(p => p.stock === 0).length;
    const totalValue = products.reduce((acc, p) => {
        return acc + Number(p.price.replace("$", ""));
    }, 0);

    // ✅ PAGINATION
    const itemsPerPage = 10;

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const paginatedProducts = products.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div className="space-y-6">

            {/* Header */}
            <InventoryHeader onAddClick={() => setOpen(true)} />

            {/* Stats */}
            <InventoryStats
                totalItems={totalItems}
                lowStock={lowStock}
                outOfStock={outOfStock}
                totalValue={totalValue}
            />

            {/* Table Container */}
            <div className="bg-white p-5 rounded-2xl shadow-sm">

                <InventoryTable products={paginatedProducts} />

                {/* Pagination */}
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

            {/* Modal */}
            <AddProductModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />

        </div>
    );
}