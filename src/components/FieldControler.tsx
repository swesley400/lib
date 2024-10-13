import React, { useState } from 'react';
import TinyMCEEditor from './TinyMCEEditor'; // Importe o seu componente TinyMCEEditor

interface IFieldControllerInterface {
    type: 'CheckBox' | 'Text' | 'Line' | 'Label';
    name: string;
    label: string;
    initialValue?: string;
    changeEditor?: boolean;
    isPrint?:  boolean;
    onChange?: (value: any) => void;
}

export const FieldController: React.FC<IFieldControllerInterface> = (props) => {
    const [value, setValue] = useState<any>(props.type === 'CheckBox' ? false : '');
    const [editor, setEditor] = useState("");

    const handleChange = (newValue: string) => {
       
        if(props.type !== "Text") {
            setValue(newValue);
            
            if (props.onChange) {
                props.onChange(newValue);
            }
        } 

        if(props.type === "Text") {
            setEditor(newValue);
        } 
    };

    const labelStyle = {
        display: 'block',
        width: '100%',
        marginBottom: '8px',
        fontWeight: 'bold' as 'bold',
    };

    const checkboxContainerStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        marginRight: '16px',
        marginBottom: '8px',
    };

    const checkboxLabelStyle = {
        marginLeft: '8px',
        fontWeight: 'bold' as 'bold',
    };

    const textEditorStyle = {
        width: '100%',
        height: "auto"
    };

    const hrStyle = {
        margin: '16px 0',
    };

    const labelSpanStyle = {
        display: 'block',
        width: '100%',
        fontWeight: 'bold' as 'bold',
        color: '#333',
        marginBottom: '8px',
    };

    const fieldContainerStyle = {
        marginBottom: '16px',
        display: props.type === 'CheckBox' ? 'inline-flex' : 'block',
        flexWrap: props.type === 'CheckBox' ? 'wrap' : 'nowrap',
        alignItems: props.type === 'CheckBox' ? 'center' : 'initial',
    };

    return (
        <div style={fieldContainerStyle as any}>
            {props.type === 'Text' && (
                <label htmlFor={props.name} style={labelStyle}>{props.label}</label>
            )}
            {props.type === 'CheckBox' ? (
                <div style={checkboxContainerStyle}>
                    <input
                        type="checkbox"
                        name={props.name}
                        id={props.name}
                        checked={value}
                        onChange={(e) => handleChange(e.target.checked as any)}
                    />
                    <label htmlFor={props.name} style={checkboxLabelStyle}>{props.label}</label>
                </div>
            ) : props.type === 'Text' ? (
                props.isPrint ? (
                  <div style={textEditorStyle} dangerouslySetInnerHTML={{ __html: editor }} />
                ) : (
                  <div style={textEditorStyle}>
                    <TinyMCEEditor
                      initialValue={value}
                      onEditorChange={handleChange}
                    />
                  </div>
                )
            ) : props.type === 'Line' ? (
                <hr style={hrStyle} />
            ) : props.type === 'Label' ? (
                <span style={labelSpanStyle}>{props.label}</span>
            ) : (
                <div>Unsupported field type</div>
            )}
        </div>
    );
};
