import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiCamera } from "react-icons/fi";
import { IoClose, IoChevronDown } from "react-icons/io5";
import toast from "react-hot-toast";

import API from "../../api/axiosInstance";
import { ProductAPI } from "../../api/api";

export default function AddProductModal({ isOpen, onClose, onSuccess, editData }) {

    const [catOpen, setCatOpen] = useState(false);
    const [subOpen, setSubOpen] = useState(false);

    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");

    const [active, setActive] = useState(true);
    const [images, setImages] = useState([]); // preview
    const [imageFiles, setImageFiles] = useState([]); // ✅ actual files

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [isOpen]);

    const MAX_IMAGES = 5;

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const validFiles = files.filter(file =>
            file.type.startsWith("image/")
        );

        if (validFiles.length !== files.length) {
            alert("Only image files allowed");
            return;
        }

        if (images.length + validFiles.length > MAX_IMAGES) {
            alert(`Max ${MAX_IMAGES} images allowed`);
            return;
        }

        // preview (same UI)
        const previews = validFiles.map(file =>
            URL.createObjectURL(file)
        );

        setImages(prev => [...prev, ...previews]);

        // ✅ store real files
        setImageFiles(prev => [...prev, ...validFiles]);
    };

    const onSubmit = async (data) => {
        const loadingToast = toast.loading(
            editData ? "Updating product..." : "Adding product..."
        );

        try {
            const payload = {
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                category: data.category,        // ✅ dynamic
                subcategory: data.subcategory,  // ✅ dynamic
                product_images: images,         // ✅ FIXED (was wrong before)
            };

            console.log("FINAL PAYLOAD:", payload); // ✅ DEBUG

            let res;

            if (editData) {
                res = await API.put(`${ProductAPI()}${editData.id}`, payload);
                toast.success("Product updated successfully");
            } else {
                res = await API.post(ProductAPI(), payload);
                toast.success("Product added successfully");
            }

            toast.dismiss(loadingToast);

            reset();
            setCategory("");
            setSubcategory("");
            setImages([]);
            setImageFiles([]);

            onClose();
            if (onSuccess) onSuccess(res.data.data);

        } catch (error) {
            toast.dismiss(loadingToast);

            console.error(error);
            toast.error(
                error.response?.data?.message || "Failed to save product"
            );
        }
    };

    useEffect(() => {
        if (!isOpen) {
            reset();
            setCategory("");
            setSubcategory("");
        }
    }, [isOpen]);

    useEffect(() => {
        if (editData?.images) {
            setImages(editData.images.map(img => img.image_url));
        }
    }, [editData]);

    useEffect(() => {
        if (editData) {
            setValue("name", editData.name);
            setValue("sku", editData.sku || "");
            setValue("price", editData.price);
            setValue("stock", editData.stock);
            setValue("description", editData.description || "");

            setCategory(editData.category_name || `Category ${editData.category}`);
            setSubcategory(editData.subcategory_name || "");

            setValue("category", editData.category);
            setValue("subcategory", editData.subcategory);
        }
    }, [editData, setValue]);

    if (!isOpen) return null;



    return (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative z-10 w-[95%] max-w-5xl bg-[#f8f6f4] rounded-[30px] shadow-xl flex flex-col-reverse lg:flex-row max-h-[90vh] overflow-y-auto">

                {/* LEFT - IMAGES */}
                <div className="w-full lg:w-[35%] bg-[#f3efec] p-6 border-t lg:border-t-0 lg:border-r border-[#e5ddd6]">

                    <h3 className="text-[15px] font-semibold text-[#2d2d2d]">
                        Product Images
                    </h3>

                    <p className="text-xs text-gray-500 mt-1 mb-4">
                        High-resolution photography recommended.
                    </p>

                    <label className="border-2 border-dashed border-[#e5a88a] rounded-2xl h-44 flex flex-col items-center justify-center text-center cursor-pointer bg-[#f8f4f1] hover:bg-[#fff5ef] transition">
                        <div className="bg-[#ffe9dc] p-3 rounded-full mb-2">
                            <FiCamera className="text-[#d46a2e] text-xl" />
                        </div>

                        <p className="text-sm text-[#444]">
                            Drag images or <span className="text-[#d46a2e]">browse</span>
                        </p>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </label>

                    <div className="mt-4 overflow-x-auto">
                        <div className="flex gap-3 min-w-max">
                            {images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    className="w-20 h-20 object-cover rounded-xl shrink-0"
                                />
                            ))}

                            {images.length < MAX_IMAGES && (
                                <label className="w-20 h-20 bg-[#e8e6e4] rounded-xl flex items-center justify-center text-gray-400 cursor-pointer shrink-0">
                                    +
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                </div>

                {/* RIGHT - FORM */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full lg:w-[65%] p-6"
                >

                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-[#2d2d2d]">
                                {editData ? "Edit Product" : "Add New Product"}
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                                Enter details to add product.
                            </p>
                        </div>

                        <button type="button" onClick={onClose}>
                            <IoClose className="text-xl text-gray-600" />
                        </button>
                    </div>

                    {/* FORM */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        {/* PRODUCT NAME */}
                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">
                                PRODUCT NAME
                            </label>
                            <input
                                {...register("name", { required: "Product name required" })}
                                className="w-full bg-[#e9e7e5] px-4 py-2.5 rounded-full text-sm outline-none"
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>

                        {/* SKU */}
                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">
                                SKU
                            </label>
                            <input
                                {...register("sku", { required: "SKU required" })}
                                className="w-full bg-[#e9e7e5] px-4 py-2.5 rounded-full text-sm outline-none"
                            />
                            {errors.sku && <p className="text-red-500 text-xs">{errors.sku.message}</p>}
                        </div>

                        {/* CATEGORY */}
                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">
                                CATEGORY
                            </label>

                            {/* hidden input for RHF */}
                            <input
                                type="hidden"
                                {...register("category", { required: "Category required" })}
                            />

                            <div className="relative">

                                {/* Selected */}
                                <div
                                    onClick={() => setCatOpen(!catOpen)}
                                    className="w-full bg-[#e9e7e5] px-4 py-2.5 rounded-full flex justify-between items-center cursor-pointer"
                                >
                                    <span className="text-sm">
                                        {category || "Select Category"}
                                    </span>

                                    <IoChevronDown className={`transition ${catOpen ? "rotate-180" : ""}`} />
                                </div>

                                {/* Dropdown */}
                                {catOpen && (
                                    <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg z-50 overflow-hidden">
                                        {[
                                            { id: 2, name: "Mia" },
                                            { id: 3, name: "Aveen" }
                                        ].map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => {
                                                    setCategory(item.name);
                                                    setValue("category", item.id); // ✅ IMPORTANT
                                                    setCatOpen(false);
                                                }}
                                                className="px-4 py-2 text-sm hover:bg-[#f5f5f5] cursor-pointer"
                                            >
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>

                            {errors.category && (
                                <p className="text-red-500 text-xs">{errors.category.message}</p>
                            )}
                        </div>

                        {/* SUBCATEGORY */}
                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">
                                SUBCATEGORY
                            </label>

                            {/* hidden input for RHF */}
                            <input type="hidden" {...register("subcategory")} />

                            <div className="relative">

                                {/* Selected */}
                                <div
                                    onClick={() => setSubOpen(!subOpen)}
                                    className="w-full bg-[#e9e7e5] px-4 py-2.5 rounded-full flex justify-between items-center cursor-pointer"
                                >
                                    <span className="text-sm">
                                        {subcategory || "Select Subcategory"}
                                    </span>

                                    <IoChevronDown className={`transition ${subOpen ? "rotate-180" : ""}`} />
                                </div>

                                {/* Dropdown */}
                                {subOpen && (
                                    <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg z-50 overflow-hidden">
                                        {[
                                            { id: 2, name: "Wedding Sets" },
                                            // { id: 2, name: "Casual" },
                                            // { id: 3, name: "Party Wear" }
                                        ].map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => {
                                                    setSubcategory(item.name);        // UI
                                                    setValue("subcategory", item.id); // ✅ API
                                                    setSubOpen(false);
                                                }}
                                                className="px-4 py-2 text-sm hover:bg-[#f5f5f5] cursor-pointer"
                                            >
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* PRICE */}
                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">
                                PRICE
                            </label>
                            <input
                                type="number"
                                {...register("price", {
                                    required: "Price required",
                                    min: { value: 1, message: "Must be > 0" }
                                })}
                                placeholder="$ 0.00"
                                className="w-full bg-[#e9e7e5] px-4 py-2.5 rounded-full text-sm"
                            />
                            {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
                        </div>

                        {/* STOCK */}
                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">
                                STOCK
                            </label>
                            <input
                                type="number"
                                defaultValue="1"
                                {...register("stock")}
                                className="w-full bg-[#e9e7e5] px-4 py-2.5 rounded-full"
                            />
                        </div>

                    </div>

                    {/* STATUS */}
                    <div className="bg-[#ebe7e5] rounded-xl px-4 py-4 mt-6 flex justify-between items-center">
                        <span>{active ? "Active" : "Inactive"}</span>
                        <div
                            onClick={() => setActive(!active)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${active ? "bg-[#c75b1f]" : "bg-gray-300"}`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full transform ${active ? "translate-x-6" : ""}`}
                            ></div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" onClick={onClose} className="text-gray-500">
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-linear-to-r from-[#c75b1f] to-[#ff7a2f] text-white px-6 py-2 rounded-full shadow"
                        >
                            {editData ? "Update Product" : "Save Product"}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}