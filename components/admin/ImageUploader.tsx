'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
    image: string | null;
    onImageChange: (url: string | null) => void;
}

export default function ImageUploader({ image, onImageChange }: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            console.log('Original file details:', { name: file.name, type: file.type, size: (file.size / 1024 / 1024).toFixed(2) + 'MB' });

            // Image Compression Options
            const options = {
                maxSizeMB: 1, // Target smaller size
                maxWidthOrHeight: 1200, // Resize to max 1200px
                useWebWorker: true,
                fileType: 'image/webp', // Convert to WebP
                initialQuality: 0.8 // 80% quality
            };

            // Dynamically import to avoid SSR issues if any, though "use client" handles it usually.
            // But library usage is straightforward.
            const imageCompression = (await import('browser-image-compression')).default;
            const compressedFile = await imageCompression(file, options);

            console.log('Compressed file details:', { name: compressedFile.name, type: compressedFile.type, size: (compressedFile.size / 1024 / 1024).toFixed(2) + 'MB' });

            // Generate path
            const fileExt = 'webp'; // Force webp extension
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            console.log('Attempting upload to bucket: articles');

            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('articles')
                .upload(filePath, compressedFile);

            if (uploadError) {
                console.error('Supabase Upload Error:', uploadError);
                throw uploadError;
            }

            console.log('Upload successful:', uploadData);

            const { data } = supabase.storage.from('articles').getPublicUrl(filePath);
            onImageChange(data.publicUrl);
        } catch (error: any) {
            console.error('Upload failed:', error);
            alert('Upload failed: ' + error.message);
        } finally {
            setIsUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const removeImage = () => {
        onImageChange(null);
    };

    return (
        <div className="w-full">
            {image ? (
                <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                    <Image
                        src={image}
                        alt="Featured"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-sm"
                        title="Remove image"
                    >
                        <X size={16} />
                    </button>
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        Representative Image
                    </span>
                </div>
            ) : (
                <label className={`
                    flex flex-col items-center justify-center w-full aspect-video rounded-lg border-2 border-dashed border-gray-300 
                    cursor-pointer hover:border-[var(--color-solar-orange)] hover:bg-orange-50 transition-all group
                    ${isUploading ? 'opacity-50 cursor-not-allowed hidden' : ''}
                `}>
                    <div className="flex flex-col items-center text-gray-400 group-hover:text-[var(--color-solar-orange)] transition-colors">
                        {isUploading ? (
                            <Loader2 className="w-10 h-10 animate-spin mb-3" />
                        ) : (
                            <ImageIcon className="w-10 h-10 mb-3" />
                        )}
                        <span className="text-sm font-medium">
                            {isUploading ? 'Uploading...' : 'Click to upload representative image'}
                        </span>
                        <span className="text-xs mt-1 text-gray-400">
                            SVG, PNG, JPG (Max 5MB)
                        </span>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        disabled={isUploading}
                        onChange={handleUpload}
                    />
                </label>
            )}

            {isUploading && !image && (
                <div className="w-full aspect-video flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex flex-col items-center text-[var(--color-solar-orange)]">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <span className="text-sm">Uploading...</span>
                    </div>
                </div>
            )}
        </div>
    );
}
