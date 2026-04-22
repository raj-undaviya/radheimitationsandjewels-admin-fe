import { ChevronDown, X, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";

export default function AddCustomerModal({ isOpen, onClose, editData }) {


    const [roleOpen, setRoleOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");

    const [active, setActive] = useState(true);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // cleanup (important)
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

            {/* Modal */}
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative animate-[fadeIn_.2s_ease-in-out]">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-black"
                >
                    <X size={18} />
                </button>

                {/* Header */}
                <div className="flex items-start gap-3 mb-6">
                    <div className="bg-orange-100 p-3 rounded-full">
                        <UserPlus size={18} className="text-orange-500" />
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold">
                            {editData ? "Edit User" : "Add New User"}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {editData
                                ? "Update user details and role."
                                : "Create a new account and assign a specific role."
                            }
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-5">

                    {/* Names */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">
                                First Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Aurelia"
                                className="mt-1 w-full bg-gray-100 px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-200"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">
                                Last Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Sterling"
                                className="mt-1 w-full bg-gray-100 px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-200"
                            />
                        </div>

                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="email@theatelier.com"
                            className="mt-1 w-full bg-gray-100 px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-200"
                        />
                    </div>

                    {/* Role */}
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-500 uppercase">
                            User Role
                        </label>

                        {/* Dropdown Button */}
                        <div
                            onClick={() => setRoleOpen(!roleOpen)}
                            className="mt-1 flex items-center justify-between bg-gray-100 px-3 py-2.5 rounded-lg text-sm cursor-pointer"
                        >
                            <span className={selectedRole ? "text-black" : "text-gray-400"}>
                                {selectedRole || "Select a role..."}
                            </span>

                            <ChevronDown
                                size={16}
                                className={`transition-transform ${roleOpen ? "rotate-180" : ""}`}
                            />
                        </div>

                        {/* Dropdown Menu */}
                        {roleOpen && (
                            <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg z-10 overflow-hidden">

                                {["Admin", "Customer"].map((role) => (
                                    <div
                                        key={role}
                                        onClick={() => {
                                            setSelectedRole(role);
                                            setRoleOpen(false);
                                        }}
                                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    >
                                        {role}
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">
                            Status
                        </label>

                        <div className="flex gap-3 mt-2">

                            {/* ACTIVE */}
                            <button
                                type="button"
                                onClick={() => setActive(true)}
                                className={`px-4 py-2 rounded-full text-sm ${active
                                    ? "bg-green-100 text-green-600"
                                    : "bg-gray-100 text-gray-500"
                                    }`}
                            >
                                Active
                            </button>

                            {/* INACTIVE */}
                            <button
                                type="button"
                                onClick={() => setActive(false)}
                                className={`px-4 py-2 rounded-full text-sm ${!active
                                    ? "bg-red-100 text-red-600"
                                    : "bg-gray-100 text-gray-500"
                                    }`}
                            >
                                Inactive
                            </button>

                        </div>
                    </div>


                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="text-sm text-gray-500 hover:text-black"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-6 py-2.5 rounded-full text-sm shadow-lg hover:bg-orange-600 transition"
                        >
                            {editData ? "Update User" : "Create User"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}