import React from 'react';
import { ISubheaderField } from 'interface/report.interface';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Report } from 'interface/report.interface';
import { fontSize } from 'pdfkit';
import { height, margins } from 'pdfkit/js/page';

export const ExamData: React.FC<any> = ({ fields }) => {
  if (fields) {
    // Divide os campos em três colunas
    const columnSize = Math.ceil(fields.headerFields.length / 3);
    const leftFields = fields.headerFields.slice(0, columnSize);
    const middleFields = fields.headerFields.slice(columnSize, columnSize * 2);
    const rightFields = fields.headerFields.slice(columnSize * 2);

    return (
      <div style={{ padding: '10px', fontSize: '12px' }}>
        {/* Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
            {fields.examTitle}
          </h2>
        </div>

        {/* Header Fields */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          {/* Coluna 1 */}
          <div style={{ flex: 1 }}>
            {leftFields.map((field: ISubheaderField, index: number) => (
              <div key={`left-${index}`} style={{ marginBottom: '4px' }}>
                <strong>{field.name}:</strong> {String(field.value)}
              </div>
            ))}
          </div>

          {/* Coluna 2 */}
          <div style={{ flex: 1 }}>
            {middleFields.map((field: ISubheaderField, index: number) => (
              <div key={`middle-${index}`} style={{ marginBottom: '4px' }}>
                <strong>{field.name}:</strong> {String(field.value)}
              </div>
            ))}
          </div>

          {/* Coluna 3 */}
          <div style={{ flex: 1 }}>
            {rightFields.map((field: ISubheaderField, index: number) => (
              <div key={`right-${index}`} style={{ marginBottom: '4px' }}>
                <strong>{field.name}:</strong> {String(field.value)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export const generateExamDataPdf = (subheaderFields: Report['header']['subheaderFields']) => {
  if (!subheaderFields || !subheaderFields.headerFields) {
    return { content: [] }; // Retorna vazio se não houver campos
  }

  const { headerFields, examTitle } = subheaderFields;

  // Divide os campos em três colunas
  const columnSize = Math.ceil(headerFields.length / 3);
  const leftFields = headerFields.slice(0, columnSize);
  const middleFields = headerFields.slice(columnSize, columnSize * 2);
  const rightFields = headerFields.slice(columnSize * 2);

  const mapFieldsToText = (fields: ISubheaderField[]) =>
    fields.map((field) => ({
      text: [
        { text: `${field.name}: `, bold: true }, // Nome do campo em negrito
        { text: `${field.value}` }, // Valor do campo
      ],
      fontSize: 10,
      margin: [0, 2, 0, 2], // Margem entre os itens
      alignment: 'left', // Alinha o texto à esquerda
    }));

  return {
    content: [
      {
        stack: [
          {
            text: examTitle, // Título do exame
            bold: true,
            fontSize: 14,
            alignment: 'center',
          },
          {
            columns: [
              {
                stack: mapFieldsToText(leftFields),
                width: '33.33%', // Cada coluna ocupa um terço do espaço
              },
              {
                stack: mapFieldsToText(middleFields),
                width: '33.33%',
              },
              {
                stack: mapFieldsToText(rightFields),
                width: '33.33%',
              },
            ],
            columnGap: 5, // Espaço entre colunas
          },
        ],
        margin: [2, 2, 2, 2], // Margem externa do subcabeçalho
      },
    ],
  };
};