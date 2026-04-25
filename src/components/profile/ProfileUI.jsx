import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Upload, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


import API from "../../api/axiosInstance";
import {
    AdminProfileAPI,
    ChangePasswordAPI,
    RemoveProfileImageAPI
} from "../../api/api";

import logo from "../../assets/Logo.png";


export default function ProfileUI() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue
    } = useForm();

    // 🔥 FETCH PROFILE
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get(AdminProfileAPI());
                const data = res.data.data;

                setValue("firstName", data.first_name);
                setValue("lastName", data.last_name);
                setValue("email", data.email);
                setValue("phone", data.phonenumber);

                if (data.profile_image_url) {
                    setPreview(data.profile_image_url);
                }

            } catch {
                toast.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [setValue]);

    // 🔥 IMAGE UPLOAD PREVIEW
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setProfileImage(file);
        setPreview(URL.createObjectURL(file));
    };

    // 🔥 REMOVE IMAGE API
    const handleRemoveImage = async () => {
        try {
            await API.delete(RemoveProfileImageAPI());

            setProfileImage(null);
            setPreview(null);

            toast.success("Profile image removed");

        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Failed to remove image"
            );
        }
    };

    // 🔥 PASSWORD STRENGTH
    const getPasswordStrength = (password) => {
        if (!password) return { text: "", color: "" };

        if (password.length < 6)
            return { text: "Weak", color: "text-red-500" };

        if (password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])/))
            return { text: "Strong", color: "text-green-600" };

        return { text: "Medium", color: "text-yellow-500" };
    };

    const strength = getPasswordStrength(watch("newPassword"));

    // 🔥 CHANGE PASSWORD
    const onSubmit = async (data) => {

        if (data.newPassword !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setSaving(true);

            const payload = {
                current_password: data.currentPassword,
                new_password: data.newPassword,
                confirm_password: data.confirmPassword,
            };

            const res = await API.post(ChangePasswordAPI(), payload);

            toast.success(res.data.message);

            localStorage.removeItem("adminToken");

            setTimeout(() => {
                navigate("/admin/login");
            }, 1500);

        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                "Error changing password"
            );
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    //image drag drop
    const [showPreview, setShowPreview] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        if (!file) return;

        setProfileImage(file);
        setPreview(URL.createObjectURL(file));
    };

    //background scroll stop

    useEffect(() => {
        if (showPreview) {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        } else {
            document.body.style.overflow = "auto";
            document.body.style.touchAction = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
            document.body.style.touchAction = "auto";
        };
    }, [showPreview]);

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold">Admin Profile</h1>
                <p className="text-sm text-gray-500">
                    Manage your account settings
                </p>
            </div>

            {loading ? (
                <div className="space-y-4 animate-pulse">
                    <div className="h-24 bg-gray-200 rounded-2xl"></div>
                    <div className="h-40 bg-gray-200 rounded-2xl"></div>
                </div>
            ) : (

                <>
                    {/* PROFILE IMAGE */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">

                        <div className="flex flex-col items-center gap-5">

                            {/* IMAGE BOX */}
                            <div
                                className={`
                relative w-28 h-28 sm:w-32 sm:h-32
                rounded-2xl overflow-hidden cursor-pointer group
                border border-gray-200 bg-gray-50
                shadow-sm hover:shadow-md
                transition-all duration-300
                ${dragActive ? "border-orange-500 ring-2 ring-orange-200 scale-105" : ""}
            `}
                                onClick={() => setShowPreview(true)}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >

                                {/* IMAGE */}
                                <img
                                    src={preview || logo}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* HOVER OVERLAY */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-1">
                                    <Upload className="text-white" size={18} />
                                    <span className="text-[10px] text-white font-medium">
                                        Change
                                    </span>
                                </div>

                                {/* DRAG STATE */}
                                {dragActive && (
                                    <div className="absolute inset-0 flex items-center justify-center text-orange-600 text-xs font-medium bg-orange-50/80">
                                        Drop here
                                    </div>
                                )}

                            </div>

                            {/* BUTTONS */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

                                {/* UPLOAD */}
                                <label className="flex items-center justify-center gap-2 cursor-pointer px-5 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium hover:bg-orange-200 transition w-full sm:w-auto">
                                    <Upload size={16} />
                                    Upload
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>

                                {/* REMOVE */}
                                <button
                                    onClick={handleRemoveImage}
                                    disabled={!preview}
                                    className={`
                    flex items-center justify-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition w-full sm:w-auto
                    ${!preview
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-red-100 text-red-600 hover:bg-red-200"}
                `}
                                >
                                    <Trash2 size={16} />
                                    Remove
                                </button>

                            </div>

                            {/* HELP TEXT */}
                            <p className="text-xs text-gray-400 text-center">
                                Drag & drop or click to preview
                            </p>

                        </div>

                    </div>

                    {/* //image preview */}
                    {showPreview && (
                        <div
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                            onClick={() => setShowPreview(false)}
                        >
                            <div
                                className="bg-white p-4 rounded-2xl w-full max-w-md shadow-xl"
                                onClick={(e) => e.stopPropagation()}
                            >

                                {/* IMAGE */}
                                <div className="overflow-hidden rounded-xl">
                                    <img
                                        src={preview || logo}
                                        className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                                    />
                                </div>

                                {/* ACTION */}
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="mt-4 w-full bg-black text-white py-2 rounded-full text-sm hover:bg-gray-800 transition"
                                >
                                    Close
                                </button>

                            </div>
                        </div>
                    )}

                    {/* FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* PERSONAL INFO */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm">
                            <h3 className="font-semibold mb-4">Personal Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input {...register("firstName")} className="inputDash" placeholder="First Name" />
                                <input {...register("lastName")} className="inputDash" placeholder="Last Name" />
                                <input {...register("email")} className="inputDash" placeholder="Email" />
                                <input {...register("phone")} className="inputDash" placeholder="Phone" />
                            </div>
                        </div>

                        {/* SECURITY */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm ">
                            <h3 className="font-semibold mb-4">Security & Credentials</h3>

                            <input
                                {...register("currentPassword")}
                                className="inputDash mb-3"
                                placeholder="Current Password"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>
                                    <input
                                        {...register("newPassword")}
                                        className="inputDash"
                                        placeholder="New Password"
                                    />

                                    {watch("newPassword") && (
                                        <p className={`text-xs mt-1 ${strength.color}`}>
                                            {strength.text} password
                                        </p>
                                    )}
                                </div>

                                <input
                                    {...register("confirmPassword")}
                                    className="inputDash"
                                    placeholder="Confirm Password"
                                />

                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="flex justify-end gap-4">

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="bg-orange-600 text-white px-6 py-2 rounded-full"
                            >
                                Logout
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-orange-600 text-white px-6 py-2 rounded-full"
                            >
                                {saving ? "Changing..." : "Change Password"}
                            </button>

                        </div>

                    </form>
                </>
            )}

        </div>
    );
}