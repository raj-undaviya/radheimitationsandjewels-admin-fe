import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";

export default function ProfileUI() {

    const user = JSON.parse(localStorage.getItem("adminUser"));

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        navigate("/admin/login");
    };

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            firstName: "Rajesh",
            lastName: "Sharma",
            email: "admin@radhe.com",
            phone: "+91 9876543210",
            bio: "Senior administrative professional...",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            alerts: true,
            summary: true,
        }
    });

    const onSubmit = (data) => {
        console.log("Profile Data:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="p-4 sm:p-6 bg-gray-50 min-h-screen">

            {/* Banner */}
            <div className="bg-orange-500 rounded-3xl p-6 text-white relative">
                {/* <button type="button" className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-xs">
                    Change Banner
                </button> */}

                <div className="flex items-end gap-4">
                    <div className="w-20 h-20 rounded-xl bg-white p-1">
                        <img
                            src={logo}
                            alt="not found"
                            className="rounded-xl"
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold">
                            {user?.email || "Admin"}
                        </h2>
                        {/* <p className="text-xs mt-1">Mumbai, India</p> */}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mt-6">

                {/* 2nd conetent */}
                <div className="space-y-4">

                    {/* Personal Info */}
                    <div className="bg-white rounded-2xl p-4 shadow">
                        <h3 className="font-semibold mb-3">Personal Information</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
                            <input {...register("firstName")} className="bg-gray-100 rounded-xl p-2" placeholder="First Name" />
                            <input {...register("lastName")} className="bg-gray-100 rounded-xl p-2" placeholder="Last Name" />
                            <input {...register("email")} className="bg-gray-100 rounded-xl p-2" placeholder="Email" />
                            <input {...register("phone")} className="bg-gray-100 rounded-xl p-2" placeholder="Phone" />
                        </div>

                        <textarea
                            {...register("bio")}
                            className="w-full mt-3 p-3 bg-gray-100 rounded-xl text-sm"
                            rows="3"
                            placeholder="Bio"
                        />
                    </div>

                    {/* Security */}
                    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow">

                        {/* Header */}
                        <h3 className="font-semibold text-gray-800 mb-4">
                            Security & Credentials
                        </h3>

                        {/* Current Password */}
                        <div className="mb-4">
                            <label className="text-xs text-gray-400">CURRENT PASSWORD</label>

                            <div className="relative mt-1">
                                <input
                                    type={showCurrent ? "text" : "password"}
                                    {...register("currentPassword", { required: "Required" })}
                                    placeholder="••••••••••••"
                                    className="w-full px-4 py-2 rounded-full bg-gray-100 outline-none text-sm"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute right-3 top-2 text-gray-400"
                                >
                                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            {errors.currentPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.currentPassword.message}
                                </p>
                            )}
                        </div>

                        {/* New + Confirm */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            {/* New */}
                            <div>
                                <label className="text-xs text-gray-400">NEW PASSWORD</label>

                                <div className="relative mt-1">
                                    <input
                                        type={showNew ? "text" : "password"}
                                        {...register("newPassword", {
                                            required: "Required",
                                            minLength: {
                                                value: 6,
                                                message: "Min 6 characters"
                                            }
                                        })}
                                        placeholder="Enter new password"
                                        className="w-full px-4 py-2 rounded-full bg-gray-100 outline-none text-sm"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                        className="absolute right-3 top-2 text-gray-400"
                                    >
                                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>

                                {errors.newPassword && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.newPassword.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm */}
                            <div>
                                <label className="text-xs text-gray-400">CONFIRM PASSWORD</label>

                                <div className="relative mt-1">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        {...register("confirmPassword", {
                                            required: "Required",
                                            validate: (value) =>
                                                value === watch("newPassword") || "Passwords do not match"
                                        })}
                                        placeholder="Repeat password"
                                        className="w-full px-4 py-2 rounded-full bg-gray-100 outline-none text-sm"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-2 text-gray-400"
                                    >
                                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>

                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6">

                <button
                    type="button"
                    onClick={handleLogout}
                    className="text-red-500 font-semibold"
                >
                    Logout
                </button>

                <button type="button" className="text-gray-500">
                    Discard
                </button>

                <button
                    type="submit"
                    className="bg-orange-600 text-white px-5 py-2 rounded-full"
                >
                    Update Account
                </button>

            </div>

        </form>
    );
}