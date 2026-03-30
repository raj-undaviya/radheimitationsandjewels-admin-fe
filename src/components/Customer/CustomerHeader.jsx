import { Filter, UserPlus } from "lucide-react";

export default function CustomerHeader() {
    return (
        <div className="flex flex-col gap-4">

            {/* TOP TEXT */}
            <div>
                <h1 className="text-xl sm:text-2xl font-semibold">
                    Customer Atelier
                </h1>
                <p className="text-gray-500 text-sm max-w-md">
                    Manage your elite clientele and their acquisition history.
                </p>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                {/* Filter */}
                <button className="flex items-center justify-center sm:justify-start gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm w-full sm:w-auto">
                    <Filter size={16} />
                    Status: All
                </button>

                {/* Add Customer */}
                {/* <button className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-3 rounded-full text-sm shadow w-full sm:w-auto">
                    <UserPlus size={16} />
                    Add New Customer
                </button> */}

            </div>

        </div>
    );
}