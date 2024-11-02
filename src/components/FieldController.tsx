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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{fieldLabel}:</span>
            <div style={{
              width: '12px',
              height: '12px',
              border: '1px solid #4A90E2',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: value ? '#4A90E2' : '#E6F2FA'
            }}>
              {value && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline
                    points="2,6 5,9 10,2"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              )}
            </div>
          </div>
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
