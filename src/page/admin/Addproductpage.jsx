import { useState } from "react";
import AddProductModal from "../../components/inventory/AddProductModal";

export default function Addproductpage() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <InventoryHeader onAddClick={() => setOpen(true)} />

            <AddProductModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </div>
    );
}