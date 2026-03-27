import { useState } from "react";
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart, X } from "lucide-react";
import logo from "../assets/logo.png";
import { User } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {

    const [activeItem, setActiveItem] = useState("Dashboard");

    const menuItems = [
        { label: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
        { label: "Inventory", path: "/admin/inventory", icon: <Package size={18} /> },
        { label: "Orders", path: "/admin/orders", icon: <ShoppingCart size={18} /> },
        { label: "Customers", path: "/admin/customers", icon: <Users size={18} /> },
        { label: "Reports", path: "/admin/reports", icon: <BarChart size={18} /> },
    ];

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-100 p-4 z-50
                        transform transition-transform duration-300
                        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                {/* Mobile Header */}
                <div className="flex justify-between items-center mb-6 md:hidden">
                    <h1 className="text-orange-600 font-bold">Menu</h1>
                    <button onClick={() => setIsOpen(false)}>
                        <X />
                    </button>
                </div>

                {/* Logo */}
                <div className="flex items-center justify-center mb-5">
                    <img
                        src={logo}
                        alt="Radhe Jewels Logo"
                        className="w-24 h-24 object-contain"
                    />
                </div>

                {/* Menu */}

                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            end={item.path === "/admin"} //for ending hover on dashboard
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                                ${isActive
                                    ? "bg-white shadow text-orange-600 border-l-4 border-orange-500"
                                    : "text-gray-600 hover:bg-white"}`
                            }
                        >
                            {item.icon}
                            <span className="text-sm">{item.label}</span>
                        </NavLink>
                    ))}
                </div>

                <div className="absolute bottom-4 left-0 w-full px-4">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow cursor-pointer hover:bg-gray-50 transition">

                        {/* Profile Icon */}
                        <div className="bg-orange-100 text-orange-600 p-2 rounded-full">
                            <User size={18} />
                        </div>

                        {/* User Info */}
                        <div>
                            <p className="text-sm font-semibold text-gray-800">Akshita</p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

const SidebarItem = ({ icon, label, active, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all
            ${active
                    ? "bg-white shadow text-orange-600 border-l-4 border-orange-500"
                    : "text-gray-600 hover:bg-white"
                }`}
        >
            {icon}
            <span className="text-sm">{label}</span>
        </div>
    );
};

export default Sidebar;