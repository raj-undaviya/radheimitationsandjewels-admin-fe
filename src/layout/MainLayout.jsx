import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50 overflow-hidden">

            {/* Sidebar */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col w-full lg:ml-64 transition-all duration-300">

                {/* Mobile Navbar */}
                <div className="lg:hidden flex items-center p-4 shadow bg-white sticky top-0 z-50">
                    <button onClick={() => setIsOpen(true)}>
                        <Menu size={26} />
                    </button>
                    <h1 className="ml-4 font-semibold">
                        Radhe Imitations & Jewels
                    </h1>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <Outlet />
                </div>

            </div>
        </div>
    );
};

export default MainLayout;