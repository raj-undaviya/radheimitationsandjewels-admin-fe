import { useState } from "react";
import { FiUploadCloud, FiFileText, FiX, FiDownload, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";

import API from "../../api/axiosInstance";
import { BulkUploadAPI } from "../../api/api";

export default function BulkUploadModal({ onClose }) {

    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);

    // ================= FILE SELECT =================
    const handleFileChange = (e) => {
        const selected = e.target.files[0];

        if (!selected) return;

        if (!selected.name.endsWith(".csv")) {
            setError("Only CSV files are allowed");
            setFile(null);
            return;
        }

        setError("");
        setFile(selected);
        setProgress(0);
    };

    // ================= DOWNLOAD TEMPLATE =================
    const downloadTemplate = async () => {
        try {
            const res = await API.get(BulkUploadAPI(), {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");

            link.href = url;
            link.setAttribute("download", "template.csv");
            link.click();

        } catch (err) {
            console.log(err);
            toast.error("Failed to download template");
        }
    };

    // ================= UPLOAD =================
    const handleUpload = async () => {
        if (!file) return;

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("file", file); // ⚠️ confirm key with backend

            await API.post(
                BulkUploadAPI(),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (e) => {
                        const percent = Math.round(
                            (e.loaded * 100) / e.total
                        );
                        setProgress(percent);
                    },
                }
            );

            toast.success("Upload successful");

            setFile(null);
            setProgress(0);
            onClose();

        } catch (err) {
            console.log(err);
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-[95%] max-w-lg p-4 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">

                {/* GLASS LOADER */}
                {uploading && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl">

                        <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-2xl"></div>

                        <div className="relative z-10 flex flex-col items-center gap-3 px-6 py-5 
                        bg-white/40 backdrop-blur-lg border border-white/30 
                        rounded-2xl shadow-lg">

                            <FiLoader className="animate-spin text-orange-500" size={30} />

                            <p className="text-sm font-medium text-gray-700">
                                Uploading CSV...
                            </p>

                            <div className="w-32 h-1.5 bg-white/50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-orange-500 transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <span className="text-xs text-gray-600">
                                {progress}%
                            </span>

                        </div>

                    </div>
                )}

                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <FiX size={20} />
                </button>

                {/* HEADER */}
                <h2 className="text-xl font-semibold text-gray-800">
                    Bulk Upload Inventory
                </h2>
                <p className="text-gray-500 text-sm mt-1 mb-6">
                    Import multiple items using a CSV file.
                </p>

                {/* UPLOAD BOX */}
                <label className="border-2 border-dashed border-orange-300 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-orange-50 transition">

                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <FiUploadCloud className="text-orange-500 mb-3" size={40} />

                    <p className="text-gray-700 font-medium text-center">
                        Click to upload CSV
                    </p>

                    <p className="text-gray-400 text-sm">
                        Only CSV files (max 10MB)
                    </p>

                </label>

                {/* ERROR */}
                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                {/* FILE */}
                {file && (
                    <div className="flex items-center gap-2 mt-3 text-gray-700 text-sm">
                        <FiFileText className="text-orange-500" />
                        {file.name}
                    </div>
                )}

                {/* CSV TEMPLATE */}
                <div className="mt-5 bg-[#f5f5f5] rounded-2xl p-4 sm:p-5 
                flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 
                border border-gray-200 hover:shadow-sm transition">

                    <div className="flex items-start sm:items-center gap-3">
                        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                            <FiFileText size={18} />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-800">
                                CSV Template
                            </p>
                            <p className="text-xs text-gray-500">
                                Ensure your data matches the required format.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={downloadTemplate}
                        className="text-orange-500 text-sm font-semibold flex items-center gap-1 hover:text-orange-600 transition"
                    >
                        Download Template
                        <FiDownload size={16} />
                    </button>

                </div>

                {/* ACTIONS */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-black"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {uploading ? (
                            <>
                                <FiLoader className="animate-spin" size={16} />
                                Uploading...
                            </>
                        ) : (
                            "Upload"
                        )}
                    </button>

                </div>

            </div>
        </div>
    );
}