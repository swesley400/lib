// src/components/QuillEditor.tsx

import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa o estilo do Quill

// Importar a extensão das fontes
import 'quillFonts'; // Ajuste o caminho conforme a localização do arquivo quillFonts.ts

interface IQuillEditorProps {
    initialValue: string; // O valor inicial deve ser uma string
    onEditorChange: (content: string) => void; // Chama esta função ao mudar o conteúdo
}

const QuillEditor: React.FC<IQuillEditorProps> & {
    modules: object; // Define o tipo de modules
    formats: string[]; // Define o tipo de formats
} = ({ initialValue, onEditorChange }) => {
    const [value, setValue] = useState<string>(initialValue); // Armazena o valor do editor

    useEffect(() => {
        setValue(initialValue); // Atualiza o valor se o initialValue mudar
    }, [initialValue]);

    const handleChange = (content: string) => {
        setValue(content);
        onEditorChange(content); // Chama a função do pai com o novo conteúdo
    };

    return (
        <ReactQuill
            value={value}
            onChange={handleChange} // Atualiza o estado e chama a função de callback
            modules={QuillEditor.modules} // Configurações do Quill
            formats={QuillEditor.formats} // Formatos suportados
            style={{ minHeight: '300px', border: '1px solid #ddd', padding: '10px' }} // Estilos do editor
        />
    );
};

// Atualizar a barra de ferramentas para incluir a seleção de fontes
QuillEditor.modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // Estilos de texto
        ['blockquote', 'code-block'], // Blocos
        ['link', 'image', 'video'], // Mídia
        [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Listas
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Cabeçalhos
        [{ 'size': ['small', false, 'large', 'huge'] }], // Tamanhos de texto
        [{ 'color': [] }, { 'background': [] }], // Cores de texto e fundo
        ['clean'], // Limpar formatação
    ],
};



QuillEditor.formats = [
    'font',
    'header',
    'size',
    'list',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'link',
    'image',
    'video',
    'color',
    'background',
];

export default QuillEditor;
