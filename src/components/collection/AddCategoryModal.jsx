import { X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import API from "../../api/axiosInstance";
import { CollectionAPI, CollectionEditAPI } from "../../api/api";
import toast from "react-hot-toast";

export default function AddCategoryModal({
    isOpen,
    onClose,
    onSuccess,
    editData,
    showParent = true
}) {

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            name: "",
            parent: "None (Top Level)",
            description: "",
            image: null
        }
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [preview, setPreview] = useState(null);

    const categories = ["None (Top Level)", "Rings", "Necklaces", "Bangles"];
    const selectedParent = watch("parent");

    // STOP BACKGROUND SCROLL
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

    useEffect(() => {
        if (editData) {
            setValue("name", editData.name || "");
            setValue("description", editData.description || "");
            setPreview(editData.category_image || null);
        } else {
            reset();
            setPreview(null);
        }
    }, [editData, setValue, reset]);

    if (!isOpen) return null;

    // Image Upload
    const handleImageUpload = (file) => {
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        setValue("image", file);
    };

    // Submit

    const onSubmit = async (data) => {
        try {
            const payload = {
                name: data.name,
                description: data.description,
                category_image: preview || editData?.category_image || ""
            };

            console.log("PAYLOAD:", payload);

            let res;

            if (editData) {
                // ✅ EDIT
                res = await API.put(CollectionEditAPI(editData.id), payload);
                console.log("EDIT URL:", CollectionEditAPI(editData.id));
                toast.success("Category updated successfully");
            } else {
                // ✅ CREATE
                res = await API.post(CollectionAPI(), payload);
                toast.success("Category added successfully");
            }

            reset();
            setPreview(null);
            onClose();

            // 🔥 REFRESH TABLE
            if (onSuccess) onSuccess();

        } catch (error) {
            console.log("FULL ERROR:", error);
            console.log("RESPONSE:", error.response);
            console.log("DATA:", error.response?.data);
            toast.error("Failed to save category");
        }

    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-2xl h-[75vh] bg-white rounded-3xl shadow-xl flex flex-col">

                {/* HEADER */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">
                        {editData ? "Edit Category" : "Add New Category"}
                    </h2>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                {/* BODY (SCROLLABLE) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">

                    {/* FORM CONTENT */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Name */}
                            <div>
                                <label className="text-xs text-gray-400">CATEGORY NAME</label>
                                <input
                                    {...register("name", { required: "Category name required" })}
                                    className="w-full mt-1 px-4 py-2 rounded-xl bg-gray-100"
                                    placeholder="e.g. Wedding Bands"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Dropdown */}
                            {showParent && (
                                <div className="relative">
                                    <label className="text-xs text-gray-400">PARENT CATEGORY</label>

                                    <input type="hidden" {...register("parent")} />

                                    <div
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="mt-1 px-4 py-2 rounded-xl bg-gray-100 flex justify-between items-center cursor-pointer"
                                    >
                                        <span>{selectedParent}</span>
                                        <ChevronDown size={16} />
                                    </div>

                                    {dropdownOpen && (
                                        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-md z-20">
                                            {categories.map((cat, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => {
                                                        setValue("parent", cat);
                                                        setDropdownOpen(false);
                                                    }}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {cat}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-xs text-gray-400">DESCRIPTION</label>
                            <textarea
                                {...register("description")}
                                className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-100"
                                rows={3}
                                placeholder="Describe the essence..."
                            />
                        </div>

                        {/* Upload */}
                        <div>
                            <label className="text-xs text-gray-400">
                                CATEGORY THUMBNAIL
                            </label>

                            <label className="block mt-2 border-2 border-dashed border-orange-200 rounded-2xl p-6 text-center cursor-pointer hover:bg-gray-50">

                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="h-32 mx-auto object-contain"
                                    />
                                ) : (
                                    <>
                                        <p className="text-gray-500">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            PNG, JPG, WEBP (Max 5MB)
                                        </p>
                                    </>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) =>
                                        handleImageUpload(e.target.files[0])
                                    }
                                />
                            </label>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2 border rounded-full"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-5 py-2 bg-orange-500 text-white rounded-full"
                            >
                                {editData ? "Update Category" : "Save Category"}
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}