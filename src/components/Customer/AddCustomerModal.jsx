import { ChevronDown, X, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import API from "../../api/axiosInstance";
import { RegisterUserAPI } from "../../api/api";

export default function AddCustomerModal({ isOpen, onClose, editData, refreshUsers, addUser }) {

    const [active, setActive] = useState(true);

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
        phonenumber: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [roleOpen, setRoleOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [isOpen]);

    useEffect(() => {
        if (editData) {
            setFormData({
                username: editData.username || "",
                first_name: editData.first_name || "",
                last_name: editData.last_name || "",
                email: editData.email || "",
                password: "", // keep empty
                role: editData.role || "",
                phonenumber: editData.phonenumber || ""
            });

            setSelectedRole(editData.role?.charAt(0).toUpperCase() + editData.role?.slice(1));

            setActive(editData.is_active ?? true);
        }
    }, [editData]);

    const [loadingBtn, setLoadingBtn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.role) {
            toast.error("Please select role");
            return;
        }

        if (!formData.email || !formData.password) {
            toast.error("Email and Password are required");
            return;
        }

        setLoadingBtn(true);
        try {
            setLoadingBtn(true);

            const payload = {
                ...formData,
                username: formData.email.split("@")[0]
            };

            let res;

            if (editData) {
                // ✏️ UPDATE USER
                res = await API.put(CustomerEditAPI(editData.id), payload);

                const updatedUser = {
                    ...res.data.data,
                    isActive: res.data.data.is_active ?? true
                };

                // update existing user in table
                if (typeof addUser === "function") {
                    addUser(updatedUser); // we will fix below
                }

                toast.success("User updated successfully");

            } else {
                // ➕ CREATE USER
                res = await API.post(RegisterUserAPI(), payload);

                const newUser = {
                    ...res.data.data,
                    isActive: res.data.data.is_active ?? true
                };

                if (typeof addUser === "function") {
                    addUser(newUser);
                }

                toast.success("User created successfully");
            }

            onClose();

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoadingBtn(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative">

                {/* Close */}
                <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-black">
                    <X size={18} />
                </button>

                {/* Header */}
                <div className="flex items-start gap-3 mb-6">
                    <div className="bg-orange-100 p-3 rounded-full">
                        <UserPlus size={18} className="text-orange-500" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">
                            {editData ? "Edit User" : "Add New User"}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Create a new account and assign role
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Names */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="bg-gray-100 px-3 py-2 rounded-lg"
                        />

                        <input
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="bg-gray-100 px-3 py-2 rounded-lg"
                        />
                    </div>

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full bg-gray-100 px-3 py-2 rounded-lg"
                    />

                    {/* Password */}
                    {!editData && (
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full bg-gray-100 px-3 py-2 rounded-lg"
                        />
                    )}

                    {/* Phone */}
                    <input
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full bg-gray-100 px-3 py-2 rounded-lg"
                    />

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

                    {/* Role */}
                    <div className="relative">
                        <div
                            onClick={() => setRoleOpen(!roleOpen)}
                            className="bg-gray-100 px-3 py-2 rounded-lg cursor-pointer flex justify-between"
                        >
                            <span>{selectedRole || "Select role"}</span>
                            <ChevronDown size={16} />
                        </div>

                        {roleOpen && (
                            <div className="absolute w-full bg-white shadow rounded mt-2">
                                {["Admin", "Customer"].map((role) => (
                                    <div
                                        key={role}
                                        onClick={() => {
                                            setSelectedRole(role);
                                            setFormData({ ...formData, role: role.toLowerCase() });
                                            setRoleOpen(false);
                                        }}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {role}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loadingBtn}
                            className={`px-5 py-2 rounded-full text-white ${loadingBtn
                                    ? "bg-orange-300 cursor-not-allowed"
                                    : "bg-orange-500"
                                }`}
                        >
                            {loadingBtn
                                ? editData
                                    ? "Updating..."
                                    : "Creating..."
                                : editData
                                    ? "Update User"
                                    : "Create User"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}