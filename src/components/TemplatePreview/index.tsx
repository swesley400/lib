import { useEffect, useMemo, useState } from "react";
import { Report } from "interface/report.interface";
import FieldList from "./FieldList"; // Importar o novo componente
import "../../styles/pdf.css";
import { ReportPage } from "components/ReportPage";

type Field = {
    type: "Text" | "Number" | "Date" | "Label" | "Checkbox" | "Line" | string;
    name: string;
    value?: string | number | Date | boolean;
    placeholder?: string;
    required?: boolean;
};

interface TemplatePreviewProps {
    onSave: (report: Report) => void;
    fields?: Field[];
}

export default function TemplatePreview({ onSave, fields: initialFields = [] }: TemplatePreviewProps) {
    const [layout, setLayout] = useState<Report["body"]["layout"]>("RIGHT");
    const [imageCount, setImageCount] = useState(6);

    const baseImage = useMemo(() => ({
        url: "https://public-images-b573dd662d7c89a635d85c00405f50b1.s3.us-east-1.amazonaws.com/image.jpg",
        altText: "Imagem do Exame",
        caption: "Legenda Sample",
    }), []);

    const [fields, setFields] = useState<Field[]>(initialFields);
    const [report, setReport] = useState<Report>({
        header: null as any,
        body: { layout: layout, fields: initialFields as any, images: Array(imageCount).fill(baseImage) },
        footer: null as any,
    });

    const [newField, setNewField] = useState<{ name: string; type: Field["type"] }>({
        name: "",
        type: "Text",
    });

    const handleAddField = () => {
        if (newField.name) {
            const field: Field = {
                ...newField,
                required: false,
            };
            setFields((prevFields) => [...prevFields, field]);
            setNewField({ name: "", type: "Text" });
        }
    };

    useEffect(() => {
        //@ts-ignore
        setReport((prevReport) => ({
            ...prevReport,
            body: {
                ...prevReport.body,
                layout: layout,
                images: Array(imageCount).fill(baseImage),
                fields: fields,
            },
        }));
    }, [fields, layout, imageCount, baseImage]);

    return (
        <div className="p-4 bg-gray-100 min-h-screen flex flex-row gap-6">
            {/* Área de visualização do relatório */}
            <div className="flex-1 bg-white p-6 rounded shadow">
                <div className="mt-6">
                    <button
                        onClick={() => onSave(report)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Save Report
                    </button>
                </div>
                <h1 className="text-2xl font-semibold mb-4">Template Preview</h1>
                <div className="classA4">
                    <ReportPage report={report} isPrint={false} fieldValues={fields} updateFieldValue={null as any} isDisabled={true} />
                </div>
            </div>

            {/* Painel de configuração e adição de campo à direita */}
            <div className="w-80 bg-white p-6 rounded shadow-md flex flex-col gap-4">
                <h2 className="text-xl font-medium mb-2 text-gray-800">Configurations</h2>

                {/* Seletor de Layout */}
                <label className="block text-gray-700">Layout</label>
                <select
                    value={layout}
                    onChange={(e) => setLayout(e.target.value as Report["body"]["layout"])}
                    className="border border-gray-300 rounded p-2 w-full focus:border-blue-500 focus:outline-none"
                >
                    <option value="RIGHT">Right</option>
                    <option value="LEFT">Left</option>
                    <option value="DOWN">Down</option>
                    <option value="UP">Up</option>
                </select>

                {/* Seletor de Quantidade de Imagens */}
                <label className="block text-gray-700">Number of Images</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={imageCount}
                    onChange={(e) => setImageCount(parseInt(e.target.value))}
                    className="border border-gray-300 rounded p-2 w-full focus:border-blue-500 focus:outline-none"
                    disabled={true}
                />

                <h2 className="text-xl font-medium mt-4 mb-2 text-gray-800">Add New Field</h2>
                <input
                    type="text"
                    placeholder="Field Name"
                    value={newField.name}
                    onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                    className="border border-gray-300 rounded p-2 w-full focus:border-blue-500 focus:outline-none"
                />
                <select
                    value={newField.type}
                    onChange={(e) => setNewField({ ...newField, type: e.target.value as Field["type"] })}
                    className="border border-gray-300 rounded p-2 w-full focus:border-blue-500 focus:outline-none"
                >
                    <option value="Text">Text</option>
                    <option value="Label">Label</option>
                    <option value="CheckBox">Checkbox</option>
                    <option value="Line">Line</option>
                </select>
                <button
                    onClick={handleAddField}
                    className="px-4 py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Add Field
                </button>

                <FieldList fields={fields} />
            </div>
        </div>
    );
}
