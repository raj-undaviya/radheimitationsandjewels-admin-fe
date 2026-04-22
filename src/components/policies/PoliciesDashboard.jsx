import { FileText, Truck, Shield, RotateCcw, Eye, Pencil } from "lucide-react";
import { useState } from "react";
import AddPolicyModal from "./AddPolicyModal";
import PolicyModal from "./PolicyModal";

export default function PoliciesDashboard() {

    const [openModal, setOpenModal] = useState(false);

    const [viewModal, setViewModal] = useState(false);

    return (
        <>
            <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 space-y-6">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                            Site Policies
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Manage your store's legal framework and customer guidelines.
                        </p>
                    </div>
                    <button
                        onClick={() => setOpenModal(true)}
                        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm shadow"
                    >
                        + Add New Policy
                    </button>
                </div>

                {/* CARDS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">

                    {/* TERMS */}
                    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
                        <div>
                            <FileText className="text-orange-500 mb-3" />
                            <h3 className="font-semibold text-base sm:text-lg">Terms & Conditions</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-2">
                                Governing document defining legal relationship between store and clients.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
                            <span className="text-xs text-gray-400">
                                Last updated: Oct 24, 2023
                            </span>

                            <div className="flex gap-2">
                                <button onClick={() => setViewModal(true)}>
                                    <Eye size={16} />
                                </button>
                                <Pencil size={16} />
                            </div>
                        </div>
                    </div>

                    {/* SHIPPING */}
                    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
                        <div>
                            <Truck className="text-orange-500 mb-3" />
                            <h3 className="font-semibold text-base sm:text-lg">Shipping Policy</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-2">
                                Details about delivery, courier handling, and logistics.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
                            <span className="text-xs text-gray-400">
                                Updated 12 days ago
                            </span>

                            <div className="flex gap-3 text-gray-500">
                                <button onClick={() => setViewModal(true)}>
                                    <Eye size={16} />
                                </button>
                                <Pencil size={16} />
                            </div>
                        </div>
                    </div>

                    {/* REFUND */}
                    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
                        <div>
                            <RotateCcw className="text-orange-500 mb-3" />
                            <h3 className="font-semibold text-base sm:text-lg">Refund & Return</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-2">
                                Guidelines for returns, inspections, and refund process.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
                            <span className="text-xs text-gray-400">
                                Updated Aug 15, 2023
                            </span>

                            <div className="flex gap-3 text-gray-500">
                                <button onClick={() => setViewModal(true)}>
                                    <Eye size={16} />
                                </button>
                                <Pencil size={16} />
                            </div>
                        </div>
                    </div>

                    {/* PRIVACY */}
                    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
                        <div>
                            <Shield className="text-orange-500 mb-3" />
                            <h3 className="font-semibold text-base sm:text-lg">Privacy Policy</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-2">
                                Commitment to client confidentiality and data security.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
                            <span className="text-xs text-gray-400">
                                Updated Sep 20, 2023
                            </span>

                            <div className="flex gap-3 text-gray-500">
                                <button onClick={() => setViewModal(true)}>
                                    <Eye size={16} />
                                </button>
                                <Pencil size={16} />
                            </div>
                        </div>
                    </div>

                    {/* EXTEND */}
                    <div className="border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                        <FileText className="text-gray-400 mb-3" />
                        <h3 className="font-semibold text-sm sm:text-base">Extend Compliance</h3>
                        <p className="text-xs text-gray-400 mt-1">
                            Create Cookie Policy or Disclaimer
                        </p>

                        <button className="mt-3 text-orange-500 text-xs font-semibold">
                            GENERATE NOW
                        </button>
                    </div>

                </div>

                {/* FOOTER STATS */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">

                    <div>
                        <p className="text-xs text-gray-400">TOTAL POLICIES</p>
                        <h2 className="text-lg sm:text-xl font-bold">04</h2>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400">NEXT AUDIT</p>
                        <h2 className="text-lg sm:text-xl font-bold">Jan 2024</h2>
                    </div>

                    <div className="w-full md:w-1/3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 w-[85%]"></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 md:text-right">
                            85% Compliance Score
                        </p>
                    </div>

                </div>

            </div>

            {/* AddPolicyModel opens on click */}
            <AddPolicyModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSave={(data) => {
                    console.log("Saved Policy:", data);
                }}
            />

            <PolicyModal
                isOpen={viewModal}
                onClose={() => setViewModal(false)}
            />
        </>
    );
}