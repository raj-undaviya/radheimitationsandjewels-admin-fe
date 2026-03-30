import { useState, useEffect } from "react";
import { FiCamera } from "react-icons/fi";
import { IoClose, IoChevronDown } from "react-icons/io5";

export default function AddProductModal({ isOpen, onClose }) {
    const [active, setActive] = useState(true);
    const [images, setImages] = useState([]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [isOpen]);

    const MAX_IMAGES = 5;

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        if (images.length + files.length > MAX_IMAGES) {
            alert(`Max ${MAX_IMAGES} images allowed`);
            return;
        }

        const previews = files.map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...previews]);
    };

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

                    {/* Upload */}
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
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </label>

                    {/* 🔥 HORIZONTAL SCROLL IMAGES */}
                    <div className="mt-4 overflow-x-auto">
                        <div className="flex gap-3 min-w-max">

                            {images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    className="w-20 h-20 object-cover rounded-xl shrink-0"
                                />
                            ))}

                            {/* Add button (hide after 5 images) */}
                            {images.length < MAX_IMAGES && (
                                <label className="w-20 h-20 bg-[#e8e6e4] rounded-xl flex items-center justify-center text-gray-400 cursor-pointer shrink-0">
                                    +
                                    <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                                </label>
                            )}

                        </div>
                    </div>

                </div>

                {/* RIGHT - FORM */}
                <div className="w-full lg:w-[65%] p-6">

                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-[#2d2d2d]">
                                Add New Product
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                                Enter details to add product.
                            </p>
                        </div>

                        <button onClick={onClose}>
                            <IoClose className="text-xl text-gray-600" />
                        </button>
                    </div>

                    {/* FORM */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">
                                PRODUCT NAME
                            </label>
                            <input className="w-full bg-[#e9e7e5] px-4 py-2.5 rounded-full text-sm outline-none" />
                        </div>

                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">
                                SKU
                            </label>
                            <input className="w-full bg-[#e9e7e5] px-4 py-2.5 rounded-full text-sm outline-none" />
                        </div>

                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">
                                CATEGORY
                            </label>
                            <div className="relative">
                                <select className="w-full bg-[#e9e7e5] px-4 py-2.5 rounded-full appearance-none pr-10">
                                    <option>Necklaces</option>
                                </select>
                                <IoChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">
                                SUBCATEGORY
                            </label>
                            <div className="relative">
                                <select className="w-full bg-[#e9e7e5] px-4 py-2.5 rounded-full appearance-none pr-10">
                                    <option>Wedding Sets</option>
                                </select>
                                <IoChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">
                                PRICE
                            </label>
                            <input
                                placeholder="$ 0.00"
                                className="w-full bg-[#e9e7e5] px-4 py-2.5 rounded-full text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">
                                STOCK
                            </label>
                            <input
                                type="number"
                                defaultValue="1"
                                className="w-full bg-[#e9e7e5] px-4 py-2.5 rounded-full"
                            />
                        </div>

                    </div>

                    {/* STATUS */}
                    <div className="bg-[#ebe7e5] rounded-xl px-4 py-4 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>
                            <p className="text-sm font-medium">Listing Status</p>
                            <p className="text-xs text-gray-500">
                                Set product visibility
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div
                                onClick={() => setActive(!active)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${active ? "bg-[#c75b1f]" : "bg-gray-300"
                                    }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full transform ${active ? "translate-x-6" : ""
                                        }`}
                                ></div>
                            </div>

                            <span>{active ? "Active" : "Inactive"}</span>
                        </div>

                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button onClick={onClose} className="text-gray-500">
                            Cancel
                        </button>

                        <button className="bg-linear-to-r from-[#c75b1f] to-[#ff7a2f] text-white px-6 py-2 rounded-full shadow">
                            Save Product
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}