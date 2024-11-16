// ReportBody.tsx

import React, { useEffect } from 'react';
import { Report } from 'interface/report.interface';
import { FieldController } from 'components/FieldController';

interface ReportBodyProps {
  report: Report;
  isPrint: boolean;
  fieldValues: { [key: string]: any };
  updateFieldValue: (fieldName: string, value: any) => void;
  isDisabled?: boolean
}

export function ReportBody({ report, isPrint, fieldValues, updateFieldValue, isDisabled = false }: ReportBodyProps) {
  
  useEffect(() => {
    console.log("Atualizei");
    console.log(fieldValues);
  },[fieldValues, report])

  const { layout } = report.body;

  // Definição de estilos para os diferentes layouts
  const getLayoutStyles = (layout: string) => {
    switch (layout) {
      case "LEFT":
        return {
          display: 'flex',
          flexDirection: 'row',
          gap: '2rem', // Espaçamento horizontal entre imagens e campos
        } as React.CSSProperties;
      case "RIGHT":
        return {
          display: 'flex',
          flexDirection: 'row',
          gap: '2rem', // Espaçamento horizontal entre campos e imagens
        } as React.CSSProperties;
      case "DOWN":
      case "UP":
        return {
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem', // Espaçamento vertical entre imagens e campos
        } as React.CSSProperties;
      default:
        return {} as React.CSSProperties;
    }
  };

  // Definição de estilos para as seções de imagens e campos
  const getSectionStyles = (layout: string) => {
    switch (layout) {
      case "LEFT":
      case "RIGHT":
        return {
          width: '30%', // Imagens ocupando 30%
        } as React.CSSProperties;
      case "DOWN":
      case "UP":
        return {
          width: '100%', // Ocupando toda a largura
        } as React.CSSProperties;
      default:
        return {} as React.CSSProperties;
    }
  };

  const containerStyles = getLayoutStyles(layout);

  return (
    <div style={{ padding: '1rem', boxSizing: 'border-box' }}>
      {layout === "LEFT" || layout === "RIGHT" ? (
        <div style={containerStyles}>
          {layout === "LEFT" && (
            <ImagesSection images={report.body.images} style={getSectionStyles(layout)} />
          )}
          
          <FieldsSection 
            fields={report.body.fields} 
            fieldValues={fieldValues} 
            isPrint={isPrint} 
            updateFieldValue={updateFieldValue} 
            style={{ flex: 1 }} // Ocupa o espaço restante
            isDisabled={isDisabled}
          />

          {layout === "RIGHT" && (
            <ImagesSection images={report.body.images} style={getSectionStyles(layout)} />
          )}
        </div>
      ) : layout === "DOWN" ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <FieldsSection 
            fields={report.body.fields} 
            fieldValues={fieldValues} 
            isPrint={isPrint} 
            updateFieldValue={updateFieldValue} 
            style={{ width: '100%' }}
            isDisabled={isDisabled}
          />
          <ImagesGrid images={report.body.images} />
        </div>
      ) : layout === "UP" ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <ImagesGrid images={report.body.images} />
          <FieldsSection 
            fields={report.body.fields} 
            fieldValues={fieldValues} 
            isPrint={isPrint} 
            updateFieldValue={updateFieldValue} 
            style={{ width: '100%' }}
            isDisabled={isDisabled}
          />
        </div>
      ) : null}
    </div>
  );
}

// Componente para Renderizar Campos
interface FieldsSectionProps {
  fields: any[];
  fieldValues: { [key: string]: any };
  isPrint: boolean;
  updateFieldValue: (fieldName: string, value: any) => void;
  style?: React.CSSProperties;
  isDisabled?: boolean
}

function FieldsSection({ fields, fieldValues, isPrint, updateFieldValue, style, isDisabled = false }: FieldsSectionProps) {
  console.log("entrei em fildes section", fields);

  return (
    <div className="fields-section" style={{ ...style, padding: '0.5rem' }}>
      {fields.map((field: any) => (
        <div className='field-item' key={field.name} style={{ marginBottom: '1rem' }}>
          <FieldController
            type={field.type}
            name={field.name}
            label={field.label || field.name}
            initialValue={field.value}
            isPrint={isPrint}
            onChange={(value: any) => updateFieldValue && updateFieldValue(field.name, value)}
            isDisabled={isDisabled}
          />
        </div>
      ))}
    </div>
  );
}

// Componente para Renderizar Imagens no Layout LEFT e RIGHT
interface ImagesSectionProps {
  images: any[];
  style?: React.CSSProperties;
}

function ImagesSection({ images, style }: ImagesSectionProps) {
  return (
    <div className="images-section" style={{ ...style, padding: '0.5rem' }}>
      {images.map((image: any) => (
        <div className='image-item' key={image.name || image.url} style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <img
            src={image.url}
            alt={image.altText || "Imagem"}
            crossOrigin="anonymous"
            style={{ width: '100%', height: 'auto', marginBottom: '0.5rem' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'path/to/placeholder.png'; // Substitua pelo caminho real da imagem placeholder
            }}
          />
          <div style={{ fontSize: '10px', textAlign: 'center' }}>
            {image.caption || "Sem legenda"}
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente para Renderizar Imagens em Layout DOWN
interface ImagesGridProps {
  images: any[];
}

function ImagesGrid({ images }: ImagesGridProps) {
  const imageRows = splitImagesIntoRows(images, 3);

  return (
    <div className="images-grid"  style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '0.5rem',
        justifyContent: 'flex-start', // Alinha as imagens ao início da linha
      }}>
      {imageRows.map((row, rowIndex) => (
        <div className="image-row" key={rowIndex}  style={{
          flex: '1 1 calc(33.33% - 1rem)', // Ocupa aproximadamente 1/3 da linha, considerando o gap
          boxSizing: 'border-box', // Inclui padding e border no cálculo da largura
          textAlign: 'center',
        }}>
          {row.map((image: any, index: number) => (
            <div className='image-item' key={index} style={{
            flex: '1 1 calc(33.33% - 1rem)', // Ocupa aproximadamente 1/3 da linha, considerando o gap
            boxSizing: 'border-box', // Inclui padding e border no cálculo da largura
            textAlign: 'center',
          }}>
              <img
                src={image.url}
                alt={image.altText || "Imagem"}
                crossOrigin="anonymous"
                style={{ width: '100%', height: 'auto', marginBottom: '0.5rem' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'path/to/placeholder.png';
                }}
              />
              <div style={{ fontSize: '10px', textAlign: 'center', marginTop: '5px' }}>
                {image.caption || "Sem legenda"}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function splitImagesIntoRows(images: any[], imagesPerRow: number) {
  return images.reduce((rows: any[][], image: any, index: number) => {
    if (index % imagesPerRow === 0) rows.push([]);
    rows[rows.length - 1].push(image);
    return rows;
  }, []);
}
