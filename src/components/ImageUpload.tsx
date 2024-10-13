import { useState, useRef } from "react";
import { PreviewUpload } from "./ImagePreviewUpload";

interface IImageUploadComponentProps {
    onSave: (imageBase64: string) => string;
    imageUrl?: string;
    isLoading?: boolean;
}

export const ImageUploadComponent = ({ onSave, imageUrl, isLoading: parentLoading }: IImageUploadComponentProps) => {
    const [preview, setPreview] = useState<string | null>(imageUrl || null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileSize, setFileSize] = useState<number | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(parentLoading || false); 

    const fileInputRef = useRef<HTMLInputElement>(null);

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/svg+xml"];

    const handleImageUpload = (file: File) => {
        if (!allowedTypes.includes(file.type)) {
            setError("Apenas arquivos de imagem (PNG, JPG, JPEG, GIF, SVG) são permitidos.");
            return;
        }

        setFileSize(file.size);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setPreview(base64String);
            setFileName(file.name);
            setError(null);
            setImageBase64(base64String);
        };
        reader.readAsDataURL(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleSave = async () => {
        if (imageBase64) {
            setIsLoading(true); 
            try {
                setUploadProgress(0); 

                for (let progress = 0; progress <= 100; progress += 10) {
                    await new Promise((resolve) => setTimeout(resolve, 100));
                    setUploadProgress(progress);
                }

                await onSave(imageBase64); 
            } catch (error) {
                console.error("Erro ao salvar a imagem:", error);
            } finally {
                setIsLoading(false); 
                setUploadProgress(null);
            }
        }
    };

    const handleAreaClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
        
        <div className="flex flex-col items-center justify-center p-1 w-full" >
            <div
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer
                    ${isDragging ? 'border-blue-500 bg-white' : 'border-gray-300 bg-white'} hover:bg-gray-100`}
                onClick={handleAreaClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                        aria-hidden="true"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Clique aqui</span> ou arraste e solte
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG ou GIF (Máx. 800x400px)</p>
                </div>
                <input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange} 
                    accept={allowedTypes.join(',')}
                />
            </div>

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

            {preview && (
                <PreviewUpload
                    preview={preview}
                    fileName={fileName as string}
                    onSave={handleSave}
                    isLoading={isLoading}
                    fileSize={fileSize as number}  
                    progress={uploadProgress as number}   
                />
            )}
        </div>
        </>
    );
};
