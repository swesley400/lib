import React, { forwardRef } from 'react';
import { Report } from 'interface/report.interface';
import htmlToPdfMake from 'html-to-pdfmake';
import { convertImageToBase64 } from 'utils/pdf.utils';
import { generateExamDataPdf } from './ExamData';

export const ReportHeader = forwardRef<HTMLDivElement, any>(({ report }, ref) => {
  const { editorHtml, imageOptions, textSize, align, justify } = report.header;

  return (
    <header
      className="header"
      ref={ref}
      style={{
        textAlign: align,
        justifyContent: justify,
        fontSize: `${textSize}px`,
        display: "flex",
        flexDirection: imageOptions.layout === "UP" || imageOptions.layout === "DOWN" ? "column" : "row",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {imageOptions.url && (
        <img
          src={imageOptions.url}
          alt={imageOptions.altText || "Header Image"}
          style={{
            width: `${typeof imageOptions.width === "number" ? imageOptions.width : parseInt(imageOptions.width)}px`,
            height: `${typeof imageOptions.height === "number" ? imageOptions.height : parseInt(imageOptions.height)}px`,
            objectFit: "contain", // Garante que a imagem mantenha proporção.
            display: "block", // Remove espaços brancos ao redor.
          }}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
    </header>
  );
});

export function getHeaderHeight(): number {
  const header = document.querySelector(".header");
  return header ? Math.min(header.getBoundingClientRect().height, 113.39) : 113.39; // 4 cm em pontos
}


export async function createPdfHeader(headerConfig: Report["header"]) {
  const widthTotal = 595.28; // Largura do A4 em pontos (portrait)
  const maxHeaderHeight = 113.4; // Altura máxima do cabeçalho (4 cm)

  const htmlContent = htmlToPdfMake(headerConfig.editorHtml);

  let base64Image: string | null = null;

  if (headerConfig.imageOptions.url && headerConfig.imageOptions.url !== "") {
    base64Image = await convertImageToBase64(headerConfig.imageOptions.url);
    
    debugger


    if (!base64Image) {
      console.warn("Imagem não encontrada ou falha na conversão para base64. Renderizando sem imagem.");
    }
  }

  const subHeader = generateExamDataPdf(headerConfig.subheaderFields);
  const subHeaderContent = subHeader.content || [];



  const textWidth = widthTotal * 0.7;
  const imageWidth = widthTotal * 0.3;

  const imageHeight = Math.min(
    headerConfig.imageOptions.height ? Number(headerConfig.imageOptions.height) : maxHeaderHeight,
    maxHeaderHeight
  );

  const convertPixelsToPoints = (pixels: number) => (pixels * 72) / 96; // Assumindo 96 dpi como padrão

  const defineContentPosition = () => {
    const imageElement: { image: string; width: number; height: number; alignment: string } | null = base64Image
      ? {
        image: base64Image,
        width: convertPixelsToPoints(imageWidth),
        height: convertPixelsToPoints(imageHeight),
        alignment: 'center',
      }
      : null;

    if (imageElement) {
      switch (headerConfig.imageOptions.layout) {
        case "UP":
          return {
            stack: [
              imageElement,
              { stack: htmlContent, alignment: 'center', fontSize: headerConfig.textSize * 0.9 },
            ],
            alignment: 'center',
            margin: [0, 5, 0, 5],
          };
        case "DOWN":
          return {
            stack: [
              { stack: htmlContent, alignment: 'center', fontSize: headerConfig.textSize * 0.9 },
              imageElement,
            ],
            alignment: 'center',
            margin: [0, 5, 0, 5],
          };
        case "LEFT":
          return {
            columns: [
              imageElement,
              {
                stack: [
                  { stack: htmlContent, alignment: 'center', fontSize: headerConfig.textSize * 0.9 },
                ],
                width: textWidth * 0.9,
                alignment: 'center',
              },
            ],
            alignment: headerConfig.justify,
          };
        case "RIGHT":
          return {
            columns: [
              {
                stack: [
                  { stack: htmlContent, alignment: 'center', fontSize: headerConfig.textSize * 0.9 },
                  ...subHeaderContent,
                ],
                width: textWidth * 0.9,
                alignment: 'center',
                margin: [0, (imageHeight - 20) / 2, 0, 0],
              },
              imageElement,
            ],
            alignment: headerConfig.justify,
          };
        default:
          return { stack: [...htmlContent, ...subHeaderContent], fontSize: headerConfig.textSize * 0.9 };
      }
    } else {
      return {
        stack: [...htmlContent, ...subHeaderContent],
        alignment: headerConfig.justify || 'center',
        fontSize: headerConfig.textSize * 0.9,
      };
    }
  };

  const headerPDFMake = {
    fontSize: headerConfig.textSize,
    stack: [
      { ...defineContentPosition() },
      subHeaderContent,
    ],
    margin: [40, 3, 40, 0],
    // layout: 'noBorders'
  };

  console.log(headerPDFMake);

  return headerPDFMake;
}