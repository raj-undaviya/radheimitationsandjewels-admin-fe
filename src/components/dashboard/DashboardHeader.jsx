import { useState, useEffect } from "react";

export default function DashboardHeader({ filter, setFilter }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user"));
        setUser(data);
    }, []);

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
                <h1 className="text-2xl font-bold">Portfolio Overview</h1>
                <p className="text-gray-500 text-sm">
                    Welcome back, {user?.name || "Admin"}.
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => setFilter("today")}
                    className={`px-4 py-1 rounded-full text-sm ${filter === "today"
                            ? "bg-orange-500 text-white"
                            : "text-gray-500"
                        }`}
                >
                    Today
                </button>

                <button
                    onClick={() => setFilter("weekly")}
                    className={`px-4 py-1 rounded-full text-sm ${filter === "weekly"
                            ? "bg-orange-500 text-white"
                            : "text-gray-500"
                        }`}
                >
                    Weekly
                </button>

                <button
                    onClick={() => setFilter("monthly")}
                    className={`px-4 py-1 rounded-full text-sm ${filter === "monthly"
                            ? "bg-orange-500 text-white"
                            : "text-gray-500"
                        }`}
                >
                    Monthly
                </button>
            </div>

        </div>
    );
}