import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface ITinyMCEEditorProps {
    initialValue: string;
    onEditorChange: (content: string) => void;
}

const TinyMCEEditor: React.FC<ITinyMCEEditorProps> = ({ initialValue, onEditorChange }) => {
    const editorRef = useRef<any>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setContent(initialValue);
            adjustHeight();
        }
    }, [initialValue]);

    const adjustHeight = () => {
        if (editorRef.current) {
            const contentHeight = editorRef.current.getBody().scrollHeight; 
            editorRef.current.getContainer().style.height = `${Math.max(contentHeight, 300)}px`; // Altura mínima de 300px
        }
    };

    const handleEditorChange = (content: string) => {
        console.log(content);
        onEditorChange(content);
        adjustHeight();
    };

    return (
        <Editor
            apiKey={"wnrw1njq9i3f1r42mqaklg55ffghf7ihzsa3sumht3y8wpaj"}
            onInit={(evt: any, editor: any) => {
                editorRef.current = editor;
                adjustHeight();
            }}
            initialValue={initialValue}
            init={{
                height: 300,
                menubar: true, 
                statusbar: false, 
                branding: false,
                language: 'pt_BR', 
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks',
                    'insertdatetime', 'media'
                ],
                toolbar: 'undo redo | blocks | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                table_default_attributes: {
                    border: '1',
                    cellpadding: '5',
                    cellspacing: '0',
                },
                table_default_styles: {
                    width: '100%',
                    borderCollapse: 'collapse',
                },
                content_style: "table { border-collapse: collapse; } td, th { border: 1px solid black; padding: 5px; }",
            }}
            onEditorChange={handleEditorChange}
        />
    );
};

export default TinyMCEEditor;
