import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../../api/axiosInstance";
import { CreatePolicyAPI, UpdatePolicyAPI } from "../../api/api";

import {
    Editor,
    EditorProvider,
    Toolbar,
    BtnBold,
    BtnItalic,
    BtnUnderline,
    BtnLink,
    BtnUndo,
    BtnRedo,
} from "react-simple-wysiwyg";

export default function AddPolicyModal({
    isOpen,
    onClose,
    onSave,
    editData,
    policies = [],
}) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm();

    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(false);

    // Prefill edit
    useEffect(() => {
        if (editData) {
            setValue("title", editData.title || "");
            setValue("policy_type", editData.policy_type || "");
            setContent(editData.content || "");
        }
    }, [editData, setValue]);

    // Lock scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    if (!isOpen) return null;

    // Convert type
    const normalizeType = (value) => {
        return value.toLowerCase().trim().replace(/\s+/g, "_");
    };

    const isEmptyContent = (html) => {
        const text = html.replace(/<[^>]+>/g, "").trim();
        return text.length === 0;
    };

    const onSubmit = async (data) => {
        if (isEmptyContent(content)) {
            toast.error("Description required");
            return;
        }

        try {
            setLoading(true);

            const normalizedType = normalizeType(data.policy_type);

            const existing = policies.find(
                (p) => p.policy_type === normalizedType
            );

            const payload = {
                title: data.title,
                policy_type: normalizedType,
                description: content.replace(/<[^>]+>/g, ""),
                content: content,
                is_active: true,
            };

            let res;

            if (existing) {
                res = await API.put(UpdatePolicyAPI(existing.id), payload);
                toast.success("Policy updated ✅");
            } else {
                res = await API.post(CreatePolicyAPI(), payload);
                toast.success("Policy created ✅");
            }

            onSave(res.data.data);

            reset();
            setContent("");
            onClose();

        } catch (err) {
            console.error(err);

            const msg =
                err?.response?.data?.errors?.policy_type?.[0] ||
                err?.response?.data?.message ||
                "Something went wrong";

            toast.error(msg);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">

            {/* OVERLAY */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* MODAL */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                    relative z-10 w-full max-w-2xl 
                    bg-white rounded-2xl sm:rounded-3xl shadow-2xl 
                    p-4 sm:p-6 space-y-4 sm:space-y-5
                    max-h-[95vh] overflow-y-auto
                "
            >

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-semibold">
                        {editData ? "Edit Policy" : "Create Policy"}
                    </h2>

                    <button type="button" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* TITLE */}
                <div>
                    <label className="text-xs text-gray-400">TITLE</label>
                    <input
                        {...register("title", { required: "Title required" })}
                        className="w-full mt-1 px-4 py-2.5 rounded-full bg-gray-100 text-sm"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs">{errors.title.message}</p>
                    )}
                </div>

                {/* POLICY TYPE */}
                <div>
                    <label className="text-xs text-gray-400">
                        POLICY TYPE
                    </label>

                    <input
                        placeholder="e.g. Shipping Policy"
                        {...register("policy_type", { required: "Type required" })}
                        className="w-full mt-1 px-4 py-2.5 rounded-full bg-gray-100 text-sm"
                    />

                    <p className="text-xs text-gray-400 mt-1">
                        Auto converts to backend format
                    </p>

                    {errors.policy_type && (
                        <p className="text-red-500 text-xs">
                            {errors.policy_type.message}
                        </p>
                    )}
                </div>

                {/* EDIT / PREVIEW */}
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setPreview(false)}
                        className={`px-4 py-1.5 rounded-full text-xs sm:text-sm ${!preview ? "bg-orange-500 text-white" : "bg-gray-100"
                            }`}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => setPreview(true)}
                        className={`px-4 py-1.5 rounded-full text-xs sm:text-sm ${preview ? "bg-orange-500 text-white" : "bg-gray-100"
                            }`}
                    >
                        Preview
                    </button>
                </div>

                {/* EDITOR */}
                {!preview ? (
                    <div className="border rounded-xl overflow-hidden">

                        <EditorProvider>

                            <Toolbar className="border-b bg-gray-50 px-2 flex flex-wrap gap-2 text-xs sm:text-sm">
                                <BtnUndo />
                                <BtnRedo />
                                <BtnBold />
                                <BtnItalic />
                                <BtnUnderline />
                                <BtnLink />
                            </Toolbar>

                            <Editor
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="min-h-[180px] sm:min-h-[220px] p-3 sm:p-4 text-sm"
                            />

                        </EditorProvider>

                    </div>
                ) : (
                    <div className="border rounded-xl p-3 sm:p-4 bg-gray-50 min-h-[180px] sm:min-h-[220px] overflow-auto">
                        <div
                            className="text-sm"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                )}

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto text-sm text-gray-600"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto bg-orange-500 text-white px-6 py-2 rounded-full text-sm"
                    >
                        {loading ? "Saving..." : "Save Policy"}
                    </button>

                </div>

            </form>
        </div>
    );
}