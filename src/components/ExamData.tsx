import { IExamDataProps } from 'interface/report.interface';
import React from 'react';

export const ExamData: React.FC<IExamDataProps> = ({ fields }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', fontSize: '12px' }}>
      <div style={{ flex: 1 }}>
        {fields.slice(0, Math.ceil(fields.length / 2)).map((field, index) => (
          <div key={index}>
            <strong>{field.name}:</strong> {String(field.value)}
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        {fields.slice(Math.ceil(fields.length / 2)).map((field, index) => (
          <div key={index}>
            <strong>{field.name}:</strong> {String(field.value)}
          </div>
        ))}
      </div>
    </div>
  );
};
