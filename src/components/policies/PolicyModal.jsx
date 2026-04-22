import { X, Truck, ShieldCheck, Globe } from "lucide-react";
import { useEffect } from "react";

export default function PolicyModal({ isOpen, onClose, data }) {

    // 🔒 Lock background scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

            {/* MODAL */}
            <div className="bg-white w-full max-w-3xl rounded-3xl shadow-xl max-h-[90vh] overflow-y-auto">

                {/* HEADER */}
                <div className="flex justify-between items-start p-6 border-b">

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full">
                            <Truck className="text-orange-600" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                               {data?.title || "Policy"}
                                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                                    ACTIVE
                                </span>
                            </h2>
                            <p className="text-xs text-gray-400">
                                Last updated: October 12, 2023 • Version 4.2
                            </p>
                        </div>
                    </div>

                    <button onClick={onClose}>
                        <X className="text-gray-400 hover:text-black" />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-6">

                    {/* INTRO */}
                    <div>
                        <h3 className="font-semibold border-l-4 border-orange-500 pl-2 mb-2">
                            Introduction
                        </h3>
                        {data?.description ? (
                            <div
                                className="text-sm text-gray-600 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: data.description }}
                            />
                        ) : (
                            <p className="text-sm text-gray-400">
                                No policy content available
                            </p>
                        )}
                    </div>

                    {/* CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="bg-gray-100 p-4 rounded-2xl">
                            <Globe className="text-orange-600 mb-2" />
                            <h4 className="font-semibold text-sm">Global Reach</h4>
                            <p className="text-xs text-gray-500 mt-1">
                                We ship to 140+ countries with specialized logistics partners.
                            </p>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-2xl">
                            <ShieldCheck className="text-orange-600 mb-2" />
                            <h4 className="font-semibold text-sm">Full Insurance</h4>
                            <p className="text-xs text-gray-500 mt-1">
                                All shipments are insured for full retail value.
                            </p>
                        </div>

                    </div>

                    {/* HANDLING */}
                    <div>
                        <h3 className="font-semibold border-l-4 border-orange-500 pl-2 mb-4">
                            Handling & Processing
                        </h3>

                        <div className="space-y-4 text-sm">

                            <div className="flex gap-4">
                                <span className="text-orange-500 font-bold">01</span>
                                <p>
                                    <strong>Security Appraisal</strong> – Every item undergoes final quality check.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <span className="text-orange-500 font-bold">02</span>
                                <p>
                                    <strong>Discreet Packaging</strong> – No branding for safety.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <span className="text-orange-500 font-bold">03</span>
                                <p>
                                    <strong>Courier Hand-off</strong> – Direct bonded delivery only.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* FOOTER BOX */}
                    <div className="bg-orange-50 p-4 rounded-2xl text-sm text-orange-700">
                        <strong>Signature Requirement</strong> – Government ID and signature required.
                    </div>

                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center p-5 border-t">

                    <button className="text-sm text-gray-500">
                        Print Version
                    </button>

                    <div className="flex gap-3">
                        <button className="px-4 py-2 rounded-full border text-sm">
                            Edit Policy
                        </button>

                        <button
                            onClick={onClose}
                            className="px-5 py-2 bg-black text-white rounded-full text-sm"
                        >
                            Dismiss
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}