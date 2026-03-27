import InventoryRow from "./InventoryRow";

export default function InventoryTable({ products }) {

    return (
        <div className="space-y-3">

            {/* Header */}
            <div className="hidden md:grid grid-cols-6 text-xs text-gray-400 px-4 mb-2">
                <span>PRODUCT</span>
                <span>SKU</span>
                <span>CATEGORY</span>
                <span>STOCK</span>
                <span>PRICE</span>
                <span>STATUS</span>
            </div>

            {/* Rows */}
            {products.map((item, i) => (
                <InventoryRow key={i} item={item} />
            ))}

        </div>
    );
}