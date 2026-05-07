import { X, FileText, User, CreditCard, MapPin, Package, Printer } from "lucide-react";
import { useEffect } from "react";

import API from "../../api/axiosInstance";
import { exportPaymentsAPI } from "../../api/api";

export default function TransactionModal({ isOpen, onClose, data }) {

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [isOpen]);

    //csv file 
    const handleExport = async () => {
        try {
            const res = await API.get(exportPaymentsAPI(), {
                responseType: "blob",
            });

            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "payments-report.csv";

            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.log(err);
        }
    };

    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl md:rounded-3xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] md:max-h-[90vh] overflow-y-auto">

                {/* LEFT SIDE */}
                <div className="hidden md:flex md:w-1/3 bg-gray-50 p-8 flex-col justify-between">

                    <div>
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                            <FileText className="text-orange-500" size={22} />
                        </div>

                        <h3 className="text-xl font-semibold mb-2">
                            Transaction Overview
                        </h3>

                        <p className="text-gray-500 text-sm mb-6">
                            Detailed verification of funds and client records.
                        </p>

                        <div className="bg-white p-4 rounded-xl text-sm text-gray-500 border">
                            “Verified record. Pending final inventory adjustment.”
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="flex-1 p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">

                    {/* HEADER */}
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-gray-400 tracking-widest">REFERENCE</p>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
                                Transaction Details ({data.reference})
                            </h2>
                        </div>

                        <button onClick={onClose}>
                            <X size={20} className="text-gray-500 hover:text-black" />
                        </button>
                    </div>

                    {/* CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">

                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-gray-500 text-sm">Amount</p>
                            <h3 className="text-lg font-bold">₹{data.amount}</h3>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-gray-500 text-sm">Status</p>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-600 capitalize">
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                {data.status}
                            </span>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-gray-500 text-sm">Date</p>
                            <h3>
                                {data.date
                                    ? new Date(data.date).toLocaleDateString()
                                    : "-"}
                            </h3>
                        </div>

                    </div>

                    {/* CUSTOMER + PAYMENT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                        {/* CUSTOMER */}
                        <div>
                            <h4 className="flex items-center gap-2 text-sm text-orange-500 font-semibold mb-2">
                                <User size={16} /> CUSTOMER DETAILS
                            </h4>

                            <p className="font-medium">{data.customer?.name}</p>
                            <p className="text-sm text-gray-500">{data.customer?.email}</p>
                            <p className="text-sm text-gray-500">{data.customer?.phone}</p>

                            <div className="mt-4 text-sm text-gray-600">
                                {data.billing_address?.address},{" "}
                                {data.billing_address?.city} -{" "}
                                {data.billing_address?.pincode}
                            </div>
                        </div>

                        {/* PAYMENT */}
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <h4 className="flex items-center gap-2 text-sm text-orange-500 font-semibold mb-2">
                                <CreditCard size={16} /> PAYMENT INFORMATION
                            </h4>

                            <p className="text-sm">
                                Method:{" "}
                                <span className="font-medium">
                                    {data.payment_info?.method}
                                </span>
                            </p>

                            <p className="text-sm">
                                Razorpay Order:{" "}
                                <span className="font-medium">
                                    {data.payment_info?.razorpay_order_id}
                                </span>
                            </p>

                            <p className="text-sm">
                                Payment ID:{" "}
                                <span className="font-medium">
                                    {data.payment_info?.razorpay_payment_id}
                                </span>
                            </p>
                        </div>

                    </div>

                    {/* ITEMS */}
                    <div>
                        <h4 className="flex items-center gap-2 text-sm text-orange-500 font-semibold mb-2">
                            <Package size={16} /> ITEMS
                        </h4>

                        <div className="space-y-2">
                            {data.items?.map((item, i) => (
                                <div key={i} className="flex justify-between gap-3 border-b pb-2 text-sm">
                                    <span className="truncate">
                                        {item.product_name} (x{item.quantity})
                                    </span>
                                    <span>₹{item.total}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center pt-4">

                        <button onClick={onClose} className="text-gray-500">
                            Close
                        </button>

                        <button
                            onClick={handleExport}
                            className="bg-orange-500 text-white px-6 py-2 rounded-full shadow-lg w-full sm:w-auto text-center hover:scale-105 transition"
                        >
                            Print Receipt
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}