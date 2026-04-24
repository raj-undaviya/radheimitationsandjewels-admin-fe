import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

import API from "../../api/axiosInstance";
import { updateOrderStatusAPI } from "../../api/api";

export default function EditOrderModal({ isOpen, onClose, order, onUpdate }) {

    const [saving, setSaving] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm();

    // 🔥 Load order data into form
    useEffect(() => {
        if (order) {
            reset({
                status: order.status || "pending"
            });
        }
    }, [order, reset]);

    if (!isOpen || !order) return null;

    const onSubmit = async (data) => {
        try {
            setSaving(true);

            await API.patch(
                updateOrderStatusAPI(order.id),
                {
                    status: data.status
                }
            );

            toast.success("Order status updated successfully ✅");

            onUpdate(); // refresh table
            onClose();

        } catch (err) {
            console.error(err);

            const message =
                err?.response?.data?.message || "Failed to update order ❌";

            toast.error(message);

        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[400px] rounded-2xl p-5 shadow-lg relative">

                {/* Close */}
                <button onClick={onClose} className="absolute top-3 right-3">
                    <IoClose size={20} />
                </button>

                <h2 className="text-lg font-semibold mb-4">Edit Order</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

                    <div className="space-y-4">

                        {/* Order ID */}
                        <div>
                            <label className="text-sm text-gray-500">Order ID</label>
                            <p className="font-semibold text-orange-600">#{order.id}</p>
                        </div>

                        {/* Product */}
                        <div>
                            <label className="text-sm text-gray-500">Product</label>
                            <p>
                                {order.items?.[0]?.product_details?.name || "N/A"}
                            </p>
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="text-sm text-gray-500">Amount</label>
                            <p className="font-medium">₹{order.total_amount}</p>
                        </div>

                        {/* Status (EDITABLE 🔥) */}
                        <div>
                            <label className="text-sm text-gray-500">Status</label>

                            <div className="flex gap-2 mt-2 flex-wrap">

                                {["pending", "shipped", "delivered", "confirmed"].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setValue("status", s)}
                                        className={`px-3 py-1 rounded-full text-sm border 
        ${watch("status") === s
                                                ? "bg-orange-500 text-white border-orange-500"
                                                : "bg-gray-100 text-gray-600 border-gray-200"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}

                            </div>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="text-sm text-gray-500">Date</label>
                            <p>
                                {order.created_at
                                    ? new Date(order.created_at).toLocaleDateString()
                                    : "N/A"}
                            </p>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className={`px-4 py-2 rounded text-white 
    ${saving ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"}
  `}
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}