import { FaSpinner, FaSave } from 'react-icons/fa';

interface IPreviewUploadProps {
    preview: string;
    fileName: string;
    onSave: Function;
    isLoading: boolean;
    fileSize?: number;
    progress?: number;  
}

export const PreviewUpload = ({ preview, fileName, onSave, isLoading, fileSize, progress }: IPreviewUploadProps) => {
    return (
        <div className="mt-4 flex items-center justify-start w-full bg-gray-300 rounded p-2 border-1">

            <div className="w-2/4">
                <img src={preview} alt="Preview" className="w-auto h-48 object-contain border rounded-lg shadow-lg" />
            </div>
            
          
            <div className="w-2/4 px-4">
                {fileName && <p className="mt-2 text-sm text-gray-500">{fileName}</p>}
                
                {fileSize && (
                    <p className="mt-1 text-xs text-gray-500">
                        Tamanho: {(fileSize / 1024).toFixed(2)} KB
                    </p>
                )}
            </div>

            <div>
                <button
                    className={`mt-4 px-4 py-2 text-white rounded ${!isLoading ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
                    onClick={() => onSave()}
                    disabled={isLoading}
                >
                    {isLoading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                </button>
            </div>
        </div>
    );
};
