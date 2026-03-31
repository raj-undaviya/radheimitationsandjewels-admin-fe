import { X, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function AddCategoryModal({ isOpen, onClose, onSave }) {

    const [form, setForm] = useState({
        name: "",
        parent: "None (Top Level)",
        description: "",
        image: null,
        preview: null,
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const categories = ["None (Top Level)", "Rings", "Necklaces", "Bangles"];

    if (!isOpen) return null;

    // ✅ Image Upload
    const handleImageUpload = (file) => {
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);

        setForm({
            ...form,
            image: file,
            preview: previewUrl,
        });
    };

    // ✅ Save
    const handleSave = () => {
        if (!form.name.trim()) {
            alert("Category name required");
            return;
        }

        onSave({
            name: form.name,
            desc: form.description,
            parent: form.parent,
            image: form.image,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-xl p-6 sm:p-8 z-10">

                {/* Header */}
                <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-semibold">Add New Category</h2>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                <div className="space-y-5">

                    {/* Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Name */}
                        <div>
                            <label className="text-xs text-gray-400">CATEGORY NAME</label>
                            <input
                                className="w-full mt-1 px-4 py-2 rounded-xl bg-gray-100"
                                placeholder="e.g. Wedding Bands"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />
                        </div>

                        {/* Custom Dropdown */}
                        <div className="relative">
                            <label className="text-xs text-gray-400">
                                PARENT CATEGORY
                            </label>

                            <div
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="mt-1 px-4 py-2 rounded-xl bg-gray-100 flex justify-between items-center cursor-pointer"
                            >
                                <span>{form.parent}</span>
                                <ChevronDown size={16} />
                            </div>

                            {dropdownOpen && (
                                <div className="absolute w-full mt-2 bg-white overflow-hidden rounded-xl shadow-md z-20">
                                    {categories.map((cat, i) => (
                                        <div
                                            key={i}
                                            onClick={() => {
                                                setForm({ ...form, parent: cat });
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
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-xs text-gray-400">DESCRIPTION</label>
                        <textarea
                            className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-100"
                            rows={3}
                            placeholder="Describe the essence..."
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />
                    </div>

                    {/* Upload */}
                    <div>
                        <label className="text-xs text-gray-400">
                            CATEGORY THUMBNAIL
                        </label>

                        <label className="block mt-2 border-2 border-dashed border-orange-200 rounded-2xl p-6 text-center cursor-pointer hover:bg-gray-50">

                            {form.preview ? (
                                <img
                                    src={form.preview}
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

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-full"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-5 py-2 bg-orange-500 text-white rounded-full"
                    >
                        Save Category
                    </button>
                </div>

            </div>
        </div>
    );
}