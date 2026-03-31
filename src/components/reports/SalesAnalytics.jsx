import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

/* 🔥 CUSTOM DROPDOWN COMPONENT */
function CustomDropdown({ options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative w-full">

            {/* BUTTON */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full px-5 py-3 rounded-full bg-white text-left text-sm flex justify-between items-center shadow-sm hover:bg-gray-50 transition"
            >
                {value}
                <ChevronDown size={18} className={`transition ${open ? "rotate-180" : ""}`} />
            </button>

            {/* MENU */}
            {open && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in duration-150">

                    {options.map((option, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                            className="px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                            {option}
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

/* 🔥 MAIN COMPONENT */
export default function SalesAnalytics() {

    const [filters, setFilters] = useState({
        date: "Current Month",
        type: "Product Category",
        currency: "USD ($)"
    });

    const handleChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleGenerate = () => {
        console.log("Filters:", filters);
        alert(`Report Generated:\n${JSON.stringify(filters, null, 2)}`);
    };

    return (
        <div className="bg-white p-5 rounded-2xl shadow space-y-4">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                    <h2 className="font-semibold text-lg">Sales Analytics</h2>
                    <p className="text-sm text-gray-500">
                        Configure parameters to generate customized sales performance data.
                    </p>
                </div>

                <div className="flex gap-2">
                    <button className="bg-gray-100 px-3 py-2 rounded-full text-xs hover:bg-gray-200">
                        Download CSV
                    </button>
                    <button className="bg-gray-100 px-3 py-2 rounded-full text-xs hover:bg-gray-200">
                        Download PDF
                    </button>
                </div>
            </div>

            {/* FILTER BOX */}
            <div className="bg-gray-50 p-4 rounded-xl flex flex-col lg:flex-row items-center gap-3">

                {/* DATE */}
                <CustomDropdown
                    value={filters.date}
                    onChange={(val) => handleChange("date", val)}
                    options={[
                        "Current Month",
                        "Last Month",
                        "Last 3 Months",
                        "Last Year"
                    ]}
                />

                {/* TYPE */}
                <CustomDropdown
                    value={filters.type}
                    onChange={(val) => handleChange("type", val)}
                    options={[
                        "Product Category",
                        "Orders",
                        "Customers"
                    ]}
                />

                {/* CURRENCY */}
                <CustomDropdown
                    value={filters.currency}
                    onChange={(val) => handleChange("currency", val)}
                    options={[
                        "USD ($)",
                        "INR (₹)",
                        "EUR (€)"
                    ]}
                />

                {/* BUTTON */}
                <button
                    onClick={handleGenerate}
                    className="w-full lg:w-auto bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-orange-600 transition whitespace-nowrap"
                >
                    Generate Report
                </button>

            </div>

        </div>
    );
}