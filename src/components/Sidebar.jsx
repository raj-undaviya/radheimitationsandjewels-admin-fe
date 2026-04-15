import { useEffect } from "react";
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart, X, FileText, ChevronRight, Ticket, Settings } from "lucide-react";
import logo from "../assets/Logo.png";
import { User } from "lucide-react";
import { Shapes } from "lucide-react";
import { NavLink } from "react-router-dom";


const Sidebar = ({ isOpen, setIsOpen }) => {
    const user = JSON.parse(localStorage.getItem("adminUser"));

    const menuItems = [
        { label: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
        { label: "Inventory", path: "/admin/inventory", icon: <Package size={18} /> },
        { label: "Orders", path: "/admin/orders", icon: <ShoppingCart size={18} /> },
        { label: "Customers", path: "/admin/customers", icon: <Users size={18} /> },
        { label: "Collection", path: "/admin/collection", icon: <Shapes size={18} /> },
        { label: "SubCategory", path: "/admin/subcategory", icon: <ChevronRight size={18} /> },
        { label: "Reports", path: "/admin/reports", icon: <BarChart size={18} /> },
        { label: "Coupons", path: "/admin/coupons", icon: <Ticket size={18} /> },
        { label: "Policies", path: "/admin/policies", icon: <FileText size={18} /> },
        { label: "Appointment", path: "/admin/appointment", icon: <FileText size={18} /> },
        { label: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
    ];

    // Disable background scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-dvh w-64 bg-gray-100 z-50 flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >

                {/* Scrollable Area */}
                <div className="flex-1 overflow-y-auto p-4">

                    {/* Mobile Header */}
                    <div className="flex justify-between items-center mb-6 lg:hidden">
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
                                end={item.path === "/admin"}
                                onClick={() => setIsOpen(false)}
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

                </div>

                {/* Bottom Profile */}
                <div className="bg-gray-100 p-4">
                    <NavLink
                        to="/admin/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl shadow cursor-pointer hover:bg-gray-50 transition"
                    >

                        <div className="bg-orange-100 text-orange-600 p-2 rounded-full">
                            <User size={18} />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-800">
                                {user?.email || "Admin"}
                            </p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>

                    </NavLink>
                </div>

            </div>
        </>
    );
};

export default Sidebar;