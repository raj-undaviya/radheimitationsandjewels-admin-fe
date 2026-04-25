import { useState, useEffect } from "react";
import InventoryHeader from "../../components/inventory/InventoryHeader";
import InventoryStats from "../../components/inventory/InventoryStats";
import InventoryTable from "../../components/inventory/InventoryTable";
import Pagination from "../../components/common/Pagination";
import AddProductModal from "../../components/inventory/AddProductModal";

import API from "../../api/axiosInstance";
import { ProductAPI } from "../../api/api";

export default function Inventory() {

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState(null);

    const itemsPerPage = 10;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true); // 🔥 ADD THIS

            const res = await API.get(ProductAPI());

            const apiData = res.data;

            setProducts(apiData.data || []);

            setStats({
                totalItems: apiData.total_stock_quantity,
                totalValue: apiData.total_inventory_value,
                lowStock: apiData.data.filter(p => p.stock < 10 && p.stock > 0).length,
                outOfStock: apiData.data.filter(p => p.stock === 0).length,
            });

        } catch (err) {
            console.error(err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // pagination
    const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));

    const paginatedProducts = products.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6">

            <InventoryHeader onAddClick={() => setOpen(true)} />

            <InventoryStats
                totalItems={stats?.totalItems}
                lowStock={stats?.lowStock}
                outOfStock={stats?.outOfStock}
                totalValue={stats?.totalValue}
            />

            <div className="bg-white p-5 rounded-2xl shadow-sm">

                <InventoryTable
                    products={paginatedProducts}
                    loading={loading}
                />

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

            <AddProductModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onSuccess={(newProduct) => {
                    setProducts(prev => [newProduct, ...prev]);
                    setPage(1);
                    fetchProducts();
                }}
            />

        </div>
    );
}