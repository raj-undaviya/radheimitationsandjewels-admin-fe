import { X, Link as LinkIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import Link from "@tiptap/extension-link";

export default function AddPolicyModal({ isOpen, onClose, onSave, editData }) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm();

    // 🔥 TIPTAP EDITOR
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: true,
                orderedList: true,
                link: false, // ✅ disable duplicate
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
            }),
        ],
        content: editData?.description || "",
        onUpdate: ({ editor }) => {
            setValue("description", editor.getHTML());
        }
    });

    // 🔥 Prefill (EDIT MODE)
    useEffect(() => {
        if (editData && editor) {
            setValue("title", editData.title || "");
            editor.commands.setContent(editData.description || "");
        }
    }, [editData, editor, setValue]);

    // 🔒 Lock scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [isOpen]);

    if (!isOpen) return null;

    const onSubmit = (data) => {

        // ✅ FORCE latest editor content
        const html = editor?.getHTML();

        const finalData = {
            ...data,
            description: html,
        };

        console.log("FINAL DATA:", finalData); // debug

        onSave(finalData);

        reset();
        editor?.commands.setContent("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-10 w-full max-w-lg sm:max-w-xl bg-white rounded-3xl shadow-xl p-5 sm:p-6"
            >

                {/* HEADER */}
                <div className="flex justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-semibold">
                            {editData ? "Edit Policy" : "Create Policy"}
                        </h2>
                        <p className="text-xs text-gray-400">
                            {editData ? "Update legal framework" : "Create new policy"}
                        </p>
                    </div>

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
                        placeholder="Enter policy title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs">{errors.title.message}</p>
                    )}
                </div>

                {/* DESCRIPTION */}
                <label className="text-xs text-gray-400 mt-2 block">
                    POLICY DESCRIPTION
                </label>

                <div className="mt-1 border rounded-2xl overflow-hidden bg-white">

                    {/* TOOLBAR */}
                    <div className="flex gap-2 px-3 py-2 border-b bg-gray-50">

                        {/* BOLD */}
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleBold().run()}
                            className={`px-2 py-1 rounded ${editor?.isActive("bold") ? "bg-gray-200" : ""
                                }`}
                        >
                            <b>B</b>
                        </button>

                        {/* ITALIC */}
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleItalic().run()}
                            className={`px-2 py-1 rounded ${editor?.isActive("italic") ? "bg-gray-200" : ""
                                }`}
                        >
                            <i>I</i>
                        </button>

                        {/* BULLET */}
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleBulletList().run()}
                            className={`px-2 py-1 rounded ${editor?.isActive("bulletList") ? "bg-gray-200" : ""
                                }`}
                        >
                            •
                        </button>

                        {/* NUMBER LIST */}
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                            className="px-2 py-1 rounded hover:bg-gray-200"
                        >
                            1.
                        </button>

                        {/* LINK */}
                        <button
                            type="button"
                            onClick={() => {
                                if (!editor) return;

                                const { from, to } = editor.state.selection;

                                // ❗ ensure text is selected
                                if (from === to) {
                                    alert("Please select text first");
                                    return;
                                }

                                const previousUrl = editor.getAttributes("link").href || "";
                                const url = window.prompt("Enter URL", previousUrl);

                                if (url === null) return;

                                if (url === "") {
                                    editor.chain().focus().unsetLink().run();
                                    return;
                                }

                                editor
                                    .chain()
                                    .focus()
                                    .extendMarkRange("link")
                                    .setLink({ href: url })
                                    .run();
                            }}
                            className={`px-2 py-1 rounded ${editor?.isActive("link") ? "bg-gray-200" : ""
                                }`}
                        >
                            <LinkIcon size={16} />
                        </button>

                    </div>

                    {/* EDITOR */}
                    <div className="p-4 min-h-37.5 text-sm">
                        <EditorContent editor={editor} />
                    </div>

                </div>

                {/* hidden field */}
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
                        {editData ? "Save Changes" : "Create Policy"}
                    </button>
                </div>

            </form>
        </div>
    );
}