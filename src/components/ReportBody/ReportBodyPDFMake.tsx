// ReportBodyPDFMake.ts

import { Report } from 'interface/report.interface';
import htmlToPdfmake from 'html-to-pdfmake';
import { convertImageToBase64 } from 'utils/pdf.utils';
import ReactDOM from 'react-dom';
import { ReportHeader, createPdfHeader } from 'components/ReportHeader';
import html2canvas from 'html2canvas';
import { createPdfFooter } from 'components/ReportFooter';

// Interfaces para os tipos de dados
interface Field {
  type: 'CheckBox' | 'Text' | string; // Adicione outros tipos conforme necessário
  name: string;
  label?: string;
  value?: any;
}

interface Image {
  url: string;
  altText?: string;
  caption?: string;
  name?: string;
}

interface ReportBodyPDFMakeProps {
  report: Report;
  layout: "LEFT" | "RIGHT" | "DOWN" | "UP";
  fieldValues: { [key: string]: any };
}

// Função principal para gerar o corpo do relatório em PDFMake
export async function ReportBodyPDFMake({
  report,
  layout,
  fieldValues
}: ReportBodyPDFMakeProps) {
  const content: any[] = [];

  // Adicionar Título
  content.push(getTitleContent());

  // Gerar Cabeçalho
  const header = await generateHeader(report);

  // Gerar Rodapé
  const footer = await generateFooter(report);

  // Processar conteúdo baseado no layout
  switch (layout) {
    case "LEFT":
      content.push(await generateLeftLayout(report.body.fields, report.body.images, fieldValues));
      break;
    case "RIGHT":
      content.push(await generateRightLayout(report.body.fields, report.body.images, fieldValues));
      break;
    case "DOWN":
      content.push(...await generateDownLayout(report.body.fields, report.body.images, fieldValues));
      break;
    case "UP":
      content.push(...await generateUpLayout(report.body.fields, report.body.images, fieldValues));
      break;
    default:
      throw new Error(`Layout "${layout}" não suportado.`);
  }

  return {
    content,
    styles: {
      avoidPageBreak: { margin: [0, 10] },
    },
    header,
    footer,
    pageMargins: [40, 140, 40, 100], // Ajuste da margem superior
  };
}

// Função para obter o conteúdo do título
function getTitleContent() {
  return {
    text: 'Endoscopia',
    fontSize: 18,
    bold: true,
    margin: [0, 10],
    alignment: 'center',
  };
}

// Função para processar os campos
function processFields(fields: Field[], fieldValues: { [key: string]: any }) {
  return fields.map((field: Field) => {
    const fieldValue = fieldValues[field.name] || '';
    const fieldTitle = field.label || field.name;

    switch (field.type) {
      case 'CheckBox':
        return {
          columns: [
            {
              width: 15,
              canvas: [
                // Quadrado do checkbox
                {
                  type: 'rect',
                  x: 0,
                  y: 0,
                  w: 12,
                  h: 12,
                  r: 2, // raio para cantos arredondados
                  lineWidth: 1,
                  lineColor: '#4A90E2',
                  color: fieldValue ? '#4A90E2' : '#E6F2FA',
                },
                // Marca do checkbox (apenas se marcado)
                ...(fieldValue
                  ? [
                      {
                        type: 'polyline',
                        lineWidth: 1.5,
                        closePath: false,
                        points: [
                          { x: 2, y: 6 },
                          { x: 5, y: 9 },
                          { x: 10, y: 2 },
                        ],
                        lineColor: '#FFFFFF',
                      },
                    ]
                  : []),
              ],
            },
            {
              text: fieldTitle,
              margin: [5, 0, 0, 0],
              alignment: 'left',
            },
          ],
          margin: [0, 5],
        };
      case 'Text':
        const htmlContent = `<strong>${fieldTitle}:</strong> ${fieldValue}`;
        return htmlToPdfmake(htmlContent);
      case 'Line':
        return {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 515, // largura da página menos margens
              y2: 0,
              lineWidth: 1,
              lineColor: '#000000',
            },
          ],
          margin: [0, 10],
        };
      default:
        return {
          text: `${fieldTitle}: ${fieldValue}`,
          margin: [0, 5],
        };
    }
  });
}

// Função para processar uma única imagem
// Função para processar uma única imagem
async function processImage(image: any) {
  const base64Image = await convertImageToBase64(image.url);
  if (base64Image) {
    return {
      stack: [
        {
          image: base64Image,
          width: 178.5,
          alignment: 'center',
          margin: [0, 5],
        },
        {
          text: image.caption || "Sem legenda",
          alignment: 'center',
          fontSize: 10,
          margin: [0, 5, 0, 10],
        },
      ],
    };
  } else {
    return {
      text: "Imagem não pôde ser carregada",
      italics: true,
      color: 'red',
      margin: [0, 5, 0, 10],
      alignment: 'left',
    };
  }
}

// Função para processar todas as imagens para LEFT e RIGHT
async function processImages(images: Image[]) {
  const processedImages = await Promise.all(images.map(image => processImage(image)));
  return {
    stack: processedImages.flat(),
    width: '30%',
    margin: [0, 0, 0, 10],
  };
}

// Função para gerar o conteúdo das colunas baseado no layout LEFT
async function generateLeftLayout(fields: Field[], images: Image[], fieldValues: { [key: string]: any }) {
  const imageContent = await processImages(images);
  const fieldsContent = {
    stack: processFields(fields, fieldValues),
    width: '70%',
    margin: [5, 0, 5, 0],
  };

  return {
    columns: [
      imageContent,
      fieldsContent
    ],
    columnGap: 20,
    margin: [0, 10],
  };
}

// Função para gerar o conteúdo das colunas baseado no layout RIGHT
async function generateRightLayout(fields: Field[], images: Image[], fieldValues: { [key: string]: any }) {
  const fieldsContent = {
    stack: processFields(fields, fieldValues),
    width: '70%',
    margin: [5, 0, 5, 0],
  };
  const imageContent = await processImages(images);

  return {
    columns: [
      fieldsContent,
      imageContent
    ],
    columnGap: 20,
    margin: [0, 10],
  };
}

// Função para gerar o conteúdo baseado no layout DOWN
async function generateDownLayout(fields: Field[], images: Image[], fieldValues: { [key: string]: any }) {
  const fieldsContent = processFields(fields, fieldValues);
  const imagesContent = await generateImagesRows(images);

  return [
    ...fieldsContent,
    ...imagesContent
  ];
}

// Função para gerar o conteúdo baseado no layout UP
async function generateUpLayout(fields: Field[], images: Image[], fieldValues: { [key: string]: any }) {
  const imagesContent = await generateImagesRows(images);
  const fieldsContent = processFields(fields, fieldValues);

  return [
    ...imagesContent,
    ...fieldsContent
  ];
}

// Função para gerar as linhas de imagens para DOWN e UP
// Função para gerar as linhas de imagens para DOWN e UP
// Função para gerar as linhas de imagens para DOWN e UP
async function generateImagesRows(images: any) {
  const imageRows = splitImagesIntoRows(images, 3);
  const rowsContent = [];

  for (const row of imageRows) {
    const processedRow = await Promise.all(row.map(image => processImage(image)));

    // Adiciona colunas vazias se a linha tiver menos de 3 imagens
    while (processedRow.length < 3) {
      //@ts-ignore
      processedRow.push({ text: '', width: 178.5 });
    }

    rowsContent.push({
      columns: processedRow,
      columnGap: 5,
      margin: [0, 10],
    });
  }

  return rowsContent;
}


// Função para dividir imagens em linhas
function splitImagesIntoRows(images: Image[], imagesPerRow: number) {
  return images.reduce((rows: Image[][], image: Image, index: number) => {
    if (index % imagesPerRow === 0) rows.push([]);
    rows[rows.length - 1].push(image);
    return rows;
  }, []);
}

// Função para gerar o cabeçalho
async function generateHeader(report: Report) {
  return createPdfHeader(report.header)
}

// Função para gerar o rodapé
async function generateFooter(report: Report) {
  return await createPdfFooter(report.footer);
}
