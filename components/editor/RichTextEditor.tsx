'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import {
    Bold, Italic, List, ListOrdered, Quote,
    Heading2, Heading3, ImageIcon, Undo, Redo, Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const [isUploading, setIsUploading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: true,
            })
        ],
        immediatelyRender: false,
        content: content,
        editorProps: {
            attributes: {
                class: 'min-h-[300px] p-4 focus:outline-none prose max-w-none prose-img:rounded-lg prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl'
            }
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        }
    });

    // Clean up on unmount
    useEffect(() => {
        return () => {
            editor?.destroy();
        };
    }, [editor]);

    if (!editor) {
        return null;
    }

    const uploadImage = async (file: File) => {
        try {
            setIsUploading(true);
            const fileExt = file.name.split('.').pop();
            // Create a simpler, safer filename to avoid issues with special encoding
            const cleanFileName = file.name.replace(/[^a-zA-Z0-9]/g, '');
            const fileName = `${Date.now()}-${cleanFileName}.${fileExt}`;
            const filePath = `editor/${fileName}`;

            // console.log('Uploading to:', filePath);

            console.log('Editor: Attempting upload to bucket: articles');
            console.log('Editor: File details:', { name: file.name, type: file.type, size: file.size });

            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('articles')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                console.error('Editor: Supabase Upload Error:', uploadError);
                throw uploadError;
            }

            console.log('Editor: Upload successful:', uploadData);

            const { data } = supabase.storage.from('articles').getPublicUrl(filePath);

            if (!data.publicUrl) {
                throw new Error('Failed to get public URL');
            }

            // console.log('Image uploaded successfully:', data.publicUrl);
            editor.chain().focus().setImage({ src: data.publicUrl }).run();

        } catch (error: any) {
            console.error('Error uploading image:', error);
            alert('Image upload failed: ' + (error.message || 'Unknown error'));
        } finally {
            setIsUploading(false);
        }
    };

    const addImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                await uploadImage(file);
            }
        };
        input.click();
    };

    const MenuButton = ({ children, onClick, isActive, disabled }: any) => (
        <button
            onClick={(e) => { e.preventDefault(); onClick(); }}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-100 transition-colors 
                ${isActive ? 'bg-gray-200 text-black shadow-inner' : 'text-gray-600'} 
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="button"
        >
            {children}
        </button>
    );

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center sticky top-0 z-10">
                <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
                    <Bold size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
                    <Italic size={18} />
                </MenuButton>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
                    <Heading2 size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })}>
                    <Heading3 size={18} />
                </MenuButton>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
                    <List size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
                    <ListOrdered size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}>
                    <Quote size={18} />
                </MenuButton>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <MenuButton onClick={addImage} isActive={false} disabled={isUploading}>
                    {isUploading ? <Loader2 size={18} className="animate-spin text-[var(--color-solar-orange)]" /> : <ImageIcon size={18} />}
                </MenuButton>
                <div className="flex-grow"></div>
                <MenuButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                    <Undo size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                    <Redo size={18} />
                </MenuButton>
            </div>
            <div className="bg-white">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
