import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

import API from "../../api/axiosInstance";
import { CreateCouponAPI, CouponEditAPI } from "../../api/api";
import toast from "react-hot-toast";

export default function CreateCouponModal({ isOpen, onClose, editData, addCoupon }) {
    const [loadingBtn, setLoadingBtn] = useState(false);

    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef();

    // close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (!dropdownRef.current?.contains(e.target)) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

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

    const {
        register,
        handleSubmit,
        watch,
        setValue
    } = useForm({
        defaultValues: {
            status: true,
            discountType: "percentage",
        },
    });

    const onSubmit = async (data) => {
        try {
            const payload = {
                code: data.code,
                type: data.discountType,
                value: Number(data.value),
                max_usage: Number(data.usageLimit),
                min_order_value: Number(data.minPurchase),
                expiry_date: data.expiry || null,
                status: data.status ? "active" : "inactive"
            };

            let res;

            if (editData) {
                // ✏️ EDIT API
                res = await API.put(
                    CouponEditAPI(editData.id),
                    payload
                );

                toast.success("Coupon updated successfully");

            } else {
                // ➕ CREATE API
                res = await API.post(
                    CreateCouponAPI(),
                    payload
                );

                toast.success("Coupon created successfully");
            }

            // 🔥 UPDATE UI WITHOUT REFRESH
            if (typeof addCoupon === "function") {
                addCoupon(res.data.data);
            }

            onClose();

        } catch (err) {
            console.error(err);

            toast.error(
                err?.response?.data?.message || "Something went wrong"
            );
        }
    };

    useEffect(() => {
        if (editData) {
            setValue("code", editData.code);
            setValue("discountType", editData.type);
            setValue("value", Number(editData.value));
            setValue("usageLimit", editData.max_usage);
            setValue("minPurchase", Number(editData.min_order_value));
            setValue("expiry", editData.expiry_date || "");
            setValue("status", editData.status === "active");
        }
    }, [editData, setValue]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">

            {/* Modal */}
            <div className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-xl max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold">
                            {editData ? "Edit Coupon" : "Create New Coupon"}
                        </h2>
                        <p className="text-gray-500 text-xs sm:text-sm">
                            {editData
                                ? "Update your coupon details."
                                : "Define the parameters of your exclusive offer."}
                        </p>
                    </div>

                    <button onClick={onClose}>
                        <X className="text-gray-400" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Coupon Code */}
                        <div>
                            <label className="text-xs text-gray-500">COUPON CODE</label>
                            <input
                                {...register("code", { required: true })}
                                placeholder="AURELIAN2024"
                                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 outline-none"
                            />
                        </div>

                        {/* Discount Type */}
                        <div className="relative w-full" ref={dropdownRef}>
                            <label className="text-xs text-gray-500">DISCOUNT TYPE</label>

                            {/* Selected */}
                            <div
                                onClick={() => setOpenDropdown(!openDropdown)}
                                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 flex justify-between items-center cursor-pointer"
                            >
                                <span className="text-sm">
                                    {watch("discountType") === "percentage"
                                        ? "Percentage (%)"
                                        : "Fixed ($)"}
                                </span>
                                <ChevronDown size={16} />
                            </div>

                            {/* Dropdown */}
                            {openDropdown && (
                                <div className="absolute mt-2 w-full bg-white shadow-lg rounded-xl overflow-hidden z-50">

                                    <div
                                        onClick={() => {
                                            setValue("discountType", "percentage");
                                            setOpenDropdown(false);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                    >
                                        Percentage (%)
                                    </div>

                                    <div
                                        onClick={() => {
                                            setValue("discountType", "fixed");
                                            setOpenDropdown(false);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                    >
                                        Fixed ($)
                                    </div>

                                </div>
                            )}
                        </div>

                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        <div>
                            <label className="text-xs text-gray-500">VALUE</label>
                            <input
                                type="number"
                                {...register("value")}
                                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500">USAGE LIMIT</label>
                            <input
                                type="number"
                                {...register("usageLimit")}
                                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500">MIN PURCHASE</label>
                            <input
                                type="number"
                                {...register("minPurchase")}
                                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 outline-none"
                            />
                        </div>

                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Expiry */}
                        <div>
                            <label className="text-xs text-gray-500">EXPIRY DATE</label>
                            <input
                                type="date"
                                {...register("expiry")}
                                className="w-full mt-1 px-4 py-3 rounded-full bg-gray-100 outline-none"
                            />
                        </div>

                        {/* Status Toggle */}
                        <div className="flex items-center justify-between bg-gray-100 rounded-full px-4 py-3 mt-5">
                            <span className="text-sm">Active Now</span>
                            <input
                                type="checkbox"
                                {...register("status")}
                                className="w-5 h-5 accent-orange-600"
                            />
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loadingBtn}
                            className={`px-6 py-2 rounded-full shadow text-white ${loadingBtn
                                ? "bg-orange-300 cursor-not-allowed"
                                : "bg-orange-600 hover:bg-orange-700"
                                }`}
                        >
                            {loadingBtn
                                ? editData
                                    ? "Updating..."
                                    : "Saving..."
                                : editData
                                    ? "Update Coupon"
                                    : "Save Coupon"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}