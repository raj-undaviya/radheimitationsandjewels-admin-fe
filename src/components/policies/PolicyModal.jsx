import { X, Truck } from "lucide-react";
import { useEffect, useState } from "react";

import API from "../../api/axiosInstance";
import { PolicyDetailsAPI } from "../../api/api";

export default function PolicyModal({ isOpen, onClose, policyId }) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    // 🔥 FETCH DATA
    useEffect(() => {
        if (!isOpen || !policyId) return;

        const fetchPolicy = async () => {
            try {
                setLoading(true);

                const res = await API.get(PolicyDetailsAPI(policyId));
                setData(res.data.data);

            } catch (err) {
                console.error("Error fetching policy:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPolicy();
    }, [isOpen, policyId]);

    // 🔒 LOCK SCROLL
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4 py-4">

            {/* OVERLAY */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* MODAL */}
            <div
                className="
                    relative z-10
                    bg-white w-full 
                    max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto
                    rounded-2xl sm:rounded-3xl shadow-xl
                    max-h-[95vh] overflow-y-auto
                "
            >

                {/* HEADER */}
                <div className="sticky top-0 bg-white p-4 sm:p-6 border-b">

                    {/* TOP ROW */}
                    <div className="flex justify-between items-start">

                        {/* LEFT CONTENT */}
                        <div className="flex items-center gap-3 sm:gap-4">

                            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-orange-100 rounded-full">
                                <Truck className="text-orange-600" size={20} />
                            </div>

                            <div>
                                <h2 className="text-base sm:text-lg lg:text-xl font-bold">
                                    {data?.title || "Policy"}
                                </h2>

                                <p className="text-xs text-gray-400">
                                    {data?.last_updated || "—"}
                                </p>
                            </div>

                        </div>

                        {/* CLOSE BUTTON */}
                        <button onClick={onClose}>
                            <X className="text-gray-400 hover:text-black" />
                        </button>

                    </div>

                </div>

                {/* CONTENT */}
                <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">

                    {loading ? (
                        <p className="text-gray-400 text-sm">Loading...</p>
                    ) : (
                        <>
                            {/* DESCRIPTION */}
                            <div>
                                <h3 className="font-semibold border-l-4 border-orange-500 pl-2 mb-2 text-sm sm:text-base">
                                    Description
                                </h3>

                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                    {data?.description || "No description"}
                                </p>
                            </div>

                            {/* CONTENT */}
                            <div>
                                <h3 className="font-semibold border-l-4 border-orange-500 pl-2 mb-2 text-sm sm:text-base">
                                    Content
                                </h3>

                                <div
                                    className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words"
                                    dangerouslySetInnerHTML={{
                                        __html: data?.content || "<p>No content</p>",
                                    }}
                                />
                            </div>

                            {/* INFO */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                                <div className="bg-gray-100 p-3 sm:p-4 rounded-xl">
                                    <p className="text-gray-400 text-xs">Policy Type</p>
                                    <p className="font-semibold text-sm break-words capitalize">
                                        {data?.policy_type?.replaceAll("_", " ")}
                                    </p>
                                </div>

                                <div className="bg-gray-100 p-3 sm:p-4 rounded-xl">
                                    <p className="text-gray-400 text-xs">Status</p>
                                    <p className="font-semibold text-sm">
                                        {data?.is_active ? "Active" : "Inactive"}
                                    </p>
                                </div>

                            </div>
                        </>
                    )}

                </div>

                {/* FOOTER */}
                <div className="sticky bottom-0 bg-white flex justify-end p-4 sm:p-5 border-t">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-5 py-2 bg-black text-white rounded-full text-sm"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
}