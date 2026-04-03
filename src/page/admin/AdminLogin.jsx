import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axiosInstance";
import { loginAdminAPI } from "../../api/api";

export default function AdminLogin() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({ mode: "onChange" });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // payload is passed
            const response = await API.post(loginAdminAPI(), {
                email: data.email,
                password: data.password
            });

            console.log("FULL RESPONSE:", response.data);

            const user = response.data?.data;   // 👈 full user object
            const token = user?.token;

            if (token && user?.is_staff) {
                localStorage.setItem("adminToken", token);
                localStorage.setItem("adminUser", JSON.stringify(user));

                navigate("/admin");
            } else {
                alert("Access denied: Not an admin");
            }

        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1c0f09] px-4">

            <div className="w-full max-w-md bg-[#2a140c] rounded-2xl p-8 shadow-2xl border border-[#3b2017]">

                <h2 className="text-3xl font-bold text-center text-white mb-2">
                    Admin Login
                </h2>

                <p className="text-gray-400 text-center text-sm mb-6">
                    Access admin dashboard
                </p>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                    {/* Email */}
                    <div>
                        <label className="text-xs text-gray-400">Email Address</label>

                        <input
                            type="email"
                            placeholder="admin@gmail.com"
                            {...register("email", {
                                required: "Email required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email"
                                }
                            })}
                            className="w-full mt-1 px-3 py-2 bg-[#1c0f09] border border-[#3b2017] rounded-md text-sm text-white outline-none focus:border-orange-500"
                        />

                        <p className="text-red-500 text-xs">{errors.email?.message}</p>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-xs text-gray-400">Password</label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="123456"
                                {...register("password", {
                                    required: "Password required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters"
                                    }
                                })}
                                className="w-full mt-1 px-3 py-2 bg-[#1c0f09] border border-[#3b2017] rounded-md text-sm text-white outline-none focus:border-orange-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-orange-400"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <p className="text-red-500 text-xs">{errors.password?.message}</p>
                    </div>

                    {/* Button */}
                    <button
                        disabled={!isValid || loading}
                        type="submit"
                        className={`w-full py-3 rounded-lg font-semibold transition
                        ${isValid
                                ? "bg-linear-to-r from-orange-400 to-orange-600 hover:opacity-90"
                                : "bg-gray-600 cursor-not-allowed"}`}
                    >
                        {loading ? "Signing In..." : "Login as Admin →"}
                    </button>

                </form>

            </div>
        </div>
    );
}