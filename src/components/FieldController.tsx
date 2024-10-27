import React, { useState, useEffect } from 'react';
import TinyMCEEditor from './TinyMCEEditor';

interface IFieldControllerInterface {
  type: 'CheckBox' | 'Text' | 'Line' | 'Label';
  name: string;
  label?: string;
  initialValue?: string;
  isPrint?: boolean;
  onChange?: (value: any) => void;
}

export const FieldController: React.FC<IFieldControllerInterface> = (props) => {
  const [value, setValue] = useState(props.initialValue || "");

  const handleChange = (newValue: string | boolean) => {
    setValue(newValue as any);
    if (props.onChange) props.onChange(newValue);
  };

  const fieldLabel = props.label || props.name;

  if (props.isPrint) {
    return (
      <div>
        {props.type === 'CheckBox' ? (
          `${fieldLabel}: ${value ? '[x]' : '[ ]'}`
        ) : props.type === 'Text' ? (
          <div>
            <strong>{fieldLabel}:</strong>
            <div dangerouslySetInnerHTML={{ __html: value as string }} />
          </div>
        ) : props.type === 'Label' ? (
          <div>
            <strong>{fieldLabel}</strong> {/* Exibe apenas o label como título */}
          </div>
        ) : (
          <hr />
        )}
      </div>
    );
  }

  return (
    <div>
      {props.type === 'CheckBox' ? (
        <label>
          <input 
            type="checkbox" 
            checked={!!value} 
            onChange={(e) => handleChange(e.target.checked)} 
          />
          <strong>{fieldLabel}:</strong>
        </label>
      ) : props.type === 'Text' ? (
        <div>
          <label>
            <strong>{fieldLabel}:</strong>
          </label>
          <TinyMCEEditor initialValue={value} onEditorChange={(content: any) => handleChange(content)} />
        </div>
      ) : props.type === 'Line' ? (
        <hr />
      ) : props.type === 'Label' ? (
        <strong>{fieldLabel}</strong> // Exibe apenas o label em modo de edição
      ) : (
        <span>{fieldLabel}</span>
      )}
    </div>
  );
};
