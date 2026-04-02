import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function AddPolicyModal({ isOpen, onClose, onSave }) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm();

    // ✅ Tiptap Editor for bold-italic
    const editor = useEditor({
        extensions: [StarterKit],
        content: "",
        onUpdate: ({ editor }) => {
            setValue("description", editor.getHTML()); // sync with RHF (linked to React Hook Form)
        }
    });

    if (!isOpen) return null;

    const onSubmit = (data) => {
        onSave(data);
        reset();
        editor?.commands.setContent(""); // reset editor
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-10 w-full max-w-lg sm:max-w-xl bg-white rounded-3xl shadow-xl p-5 sm:p-6"
            >

                {/* Header */}
                <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">Edit Policy</h2>
                    <button type="button" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* TITLE */}
                <div className="mb-4">
                    <label className="text-xs text-gray-400">POLICY TITLE</label>
                    <input
                        {...register("title", { required: "Title required" })}
                        className="w-full mt-1 px-4 py-2.5 rounded-full bg-gray-100"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs">{errors.title.message}</p>
                    )}
                </div>

                {/* 🔥 TOOLBAR */}
                <div className="flex gap-3 mb-2 text-sm border p-2 rounded-xl bg-gray-50">
                    <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>
                        <b>B</b>
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>
                        <i>I</i>
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>
                        • List
                    </button>
                </div>

                {/* 🔥 EDITOR */}
                <div className="border rounded-xl p-3 min-h-30 bg-white">
                    <EditorContent editor={editor} />
                </div>

                {/* hidden field for RHF */}
                <input
                    type="hidden"
                    {...register("description", { required: "Description required" })}
                />

                {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.description.message}
                    </p>
                )}

                {/* FOOTER */}
                <div className="flex justify-end gap-4 mt-6">
                    <button type="button" onClick={onClose} className="text-gray-500">
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="bg-orange-500 text-white px-5 py-2 rounded-full"
                    >
                        Save Changes
                    </button>
                </div>

            </form>
        </div>
    );
}