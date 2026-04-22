import { X, User, Phone, Mail, Calendar, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function EditAppointmentModal({
    isOpen,
    onClose,
    editData,
    onSave,
}) {

    const [status, setStatus] = useState(editData?.status || "pending");

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (editData) {
            reset(editData);
            setStatus(editData.status || "pending");
        }
    }, [editData, reset]);

    const onSubmit = (data) => {
        onSave({
            ...data,
            status, // ✅ ADD THIS
        });
        onClose();
    };

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* MODAL */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-xl p-6 sm:p-8"
            >

                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Edit Appointment
                        </h2>
                        <p className="text-xs text-gray-400">
                            Update booking details
                        </p>
                    </div>

                    <button type="button" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* FORM GRID */}
                <div className="space-y-4">

                    {/* NAME */}
                    <div>
                        <label className="text-xs text-gray-400">Customer</label>
                        <div className="flex items-center bg-gray-100 rounded-full px-3 mt-1">
                            <User size={14} className="text-gray-400 mr-2" />
                            <input
                                {...register("customer_name")}
                                className="w-full bg-transparent py-2 outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="text-xs text-gray-400">Phone</label>
                        <div className="flex items-center bg-gray-100 rounded-full px-3 mt-1">
                            <Phone size={14} className="text-gray-400 mr-2" />
                            <input
                                {...register("phone_number")}
                                className="w-full bg-transparent py-2 outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="text-xs text-gray-400">Email</label>
                        <div className="flex items-center bg-gray-100 rounded-full px-3 mt-1">
                            <Mail size={14} className="text-gray-400 mr-2" />
                            <input
                                {...register("email")}
                                className="w-full bg-transparent py-2 outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* DATE */}
                    <div>
                        <label className="text-xs text-gray-400">Date</label>
                        <div className="flex items-center bg-gray-100 rounded-full px-3 mt-1">
                            <Calendar size={14} className="text-gray-400 mr-2" />
                            <input
                                type="date"
                                {...register("date")}
                                className="w-full bg-transparent py-2 outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* TIME */}
                    <div>
                        <label className="text-xs text-gray-400">Time</label>
                        <div className="flex items-center bg-gray-100 rounded-full px-3 mt-1">
                            <Clock size={14} className="text-gray-400 mr-2" />
                            <input
                                {...register("time_slot")}
                                className="w-full bg-transparent py-2 outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="text-xs text-gray-400">Status</label>

                        <div className="flex gap-2 mt-2 flex-wrap">

                            {["pending", "confirmed", "cancelled", "completed"].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setStatus(s)}
                                    className={`px-4 py-1.5 rounded-full text-xs capitalize transition ${status === s
                                        ? s === "confirmed"
                                            ? "bg-green-100 text-green-600"
                                            : s === "cancelled"
                                                ? "bg-red-100 text-red-600"
                                                : s === "completed"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-orange-100 text-orange-600"
                                        : "bg-gray-100 text-gray-500"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}

                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 mt-6">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-full border text-sm"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-5 py-2 bg-orange-600 text-white rounded-full text-sm shadow hover:bg-orange-700"
                    >
                        Save Changes
                    </button>

                </div>

            </form>
        </div>
    );
}