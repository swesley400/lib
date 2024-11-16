import React, { forwardRef } from 'react';
import { Report } from 'interface/report.interface';
import htmlToPdfMake from 'html-to-pdfmake';
import { convertImageToBase64 } from 'utils/pdf.utils';

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

  // Converte a imagem para Base64 apenas se a URL for válida
  let base64Image: string | null = null;

  if (headerConfig.imageOptions.url && headerConfig.imageOptions.url !== "") {
    base64Image = await convertImageToBase64(headerConfig.imageOptions.url);

    if (!base64Image) {
      console.warn("Imagem não encontrada ou falha na conversão para base64. Renderizando sem imagem.");
    }
  }

  // Define a largura para texto e imagem com base na largura total da página
  const textWidth = widthTotal * 0.7;
  const imageWidth = widthTotal * 0.3;

  // Limita a altura da imagem ao valor fornecido em headerConfig ou ao máximo de 4 cm
  const imageHeight = Math.min(
    headerConfig.imageOptions.height ? Number(headerConfig.imageOptions.height) : maxHeaderHeight,
    maxHeaderHeight
  );

  // Função para definir a posição do conteúdo com base no layout e presença da imagem
  const defineContentPosition = () => {
    // Define o elemento da imagem somente se base64Image existir
    const imageElement: { image: string; width: number; height: number; alignment: string } | null = base64Image
      ? {
          image: base64Image,
          width: imageWidth,
          height: imageHeight,
          alignment: 'center'
        }
      : null;

    const adjustedMargin = [0, 5, 0, 5]; // Margem reduzida para aproximar a imagem do texto

    if (imageElement) {
      // Com imagem
      switch (headerConfig.imageOptions.layout) {
        case "UP":
          return {
            stack: [
              { ...imageElement, margin: [0, 0, 0, 5] }, // Imagem acima do texto
              { stack: htmlContent, alignment: 'center' } // Texto centralizado horizontalmente
            ],
            alignment: 'center'
          };
        case "DOWN":
          return {
            stack: [
              { stack: htmlContent, alignment: 'center' }, // Texto acima da imagem
              { ...imageElement, margin: [0, 5, 0, 0] } // Imagem abaixo do texto
            ],
            alignment: 'center'
          };
        case "LEFT":
          return {
            columns: [
              { ...imageElement, margin: adjustedMargin }, // Imagem à esquerda do texto
              {
                stack: htmlContent,
                width: textWidth,
                alignment: 'center',
                margin: [0, (imageHeight - 20) / 2, 0, 0] // Centralização vertical do texto em relação à imagem
              }
            ],
            alignment: headerConfig.justify
          };
        case "RIGHT":
          return {
            columns: [
              {
                stack: htmlContent,
                width: textWidth,
                alignment: 'center',
                margin: [0, (imageHeight - 20) / 2, 0, 0] // Centralização vertical do texto em relação à imagem
              },
              { ...imageElement, margin: adjustedMargin } // Imagem à direita do texto
            ],
            alignment: headerConfig.justify
          };
        default:
          return { stack: htmlContent };
      }
    } else {
      return {
        stack: htmlContent,
        alignment: headerConfig.justify || 'center', // Alinha o texto conforme o valor de justify
        margin: [0, (maxHeaderHeight - 20) / 2, 0, 0] // Centralização vertical em relação ao cabeçalho
      };
    }
  };

  const headerPDFMake = {
    margin: [20, 10, 20, 10],
    fontSize: headerConfig.textSize,
    stack: [
      defineContentPosition()
    ]
  };

  console.log(headerPDFMake);

  return headerPDFMake;
}