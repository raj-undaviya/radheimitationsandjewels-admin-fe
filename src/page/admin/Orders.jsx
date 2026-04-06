import { useState } from "react";
import OrderHeader from "../../components/orders/OrderHeader";
import OrderTable from "../../components/orders/OrderTable";

export default function Orders() {

    const [page, setPage] = useState(1);

    const itemsPerPage = 5; // like your screenshot (1 to 4)

    return (
        <div className="space-y-6">

            <OrderHeader />

            <OrderTable
                page={page}
                setPage={setPage}
                itemsPerPage={itemsPerPage}
            />

        </div>
    );
}