import { useForm } from "react-hook-form";
import { Info } from "lucide-react";

const Settings = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            primaryColor: "#9D4380",
            accentColor: "#F97316",
            email: "concierge@radhejewels.com",
            phone: "+91 1234567890",
            address: "72 Madison Avenue, New York",
            instagram: "instagram.com/radhe.jewels",
            facebook: "facebook.com/your-page-id",
            pinterest: "pinterest.com/radhe_curated"
        }
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                    Site Settings
                </h1>
                <p className="text-xs md:text-sm text-gray-500">
                    Manage your boutique's digital identity and contact preferences.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* ================= GENERAL ================= */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow">

                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="font-semibold text-sm md:text-base">
                                General Settings
                            </h2>
                            <p className="text-xs md:text-sm text-gray-500">
                                Logo and branding
                            </p>
                        </div>
                        <Info size={16} className="text-gray-400 mt-1" />
                    </div>

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="text-xs text-gray-500">PRIMARY COLOR</label>
                            <input
                                {...register("primaryColor")}
                                className="w-full bg-gray-100 p-2 rounded-lg mt-1 text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500">ACCENT COLOR</label>
                            <input
                                {...register("accentColor")}
                                className="w-full bg-gray-100 p-2 rounded-lg mt-1 text-sm"
                            />
                        </div>

                    </div>
                </div>

                {/* ================= CONTACT ================= */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow">

                    <h2 className="font-semibold mb-3 text-sm md:text-base">
                        Contact Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                        <input
                            {...register("email")}
                            // disabled
                            className="bg-gray-100 p-3 rounded-xl text-sm w-full"
                        />

                        <div>
                            <input
                                {...register("phone", { required: "Phone required" })}
                                className="bg-gray-100 p-3 rounded-xl text-sm w-full"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                    </div>

                    <textarea
                        {...register("address")}
                        className="bg-gray-100 p-3 rounded-xl w-full text-sm"
                        rows={3}
                    />

                </div>

                {/* ================= SOCIAL ================= */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow">

                    <h2 className="font-semibold mb-3 text-sm md:text-base">
                        Social Media Links
                    </h2>

                    <div className="space-y-3">

                        <input
                            {...register("instagram")}
                            className="bg-gray-100 p-3 rounded-xl text-sm w-full"
                        />

                        <input
                            {...register("facebook")}
                            className="bg-gray-100 p-3 rounded-xl text-sm w-full"
                        />

                        <input
                            {...register("pinterest")}
                            className="bg-gray-100 p-3 rounded-xl text-sm w-full"
                        />

                    </div>

                </div>

                {/* ================= SAVE BAR ================= */}
                <div className="
                    left-0 md:left-64 right-0
                    bg-white p-3 md:p-4
                    flex flex-col md:flex-row
                    gap-3 md:gap-0
                    md:justify-between md:items-center
                    shadow-lg
                ">

                    <p className="text-xs text-gray-500 text-center md:text-left">
                        Auto-saved disabled
                    </p>

                    <div className="flex justify-center md:justify-end gap-3">

                        <button
                            type="button"
                            className="text-gray-500 text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-5 py-2 rounded-xl shadow text-sm"
                        >
                            Save Changes
                        </button>

                    </div>

                </div>

            </form>
        </div>
    );
};

export default Settings;