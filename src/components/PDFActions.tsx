import React from 'react';
import { ReportBodyPDFMake } from './ReportBody';
import pdfMake from 'pdfmake/build/pdfmake';

interface PDFActionsProps {
  report: any;
  layout: any;
  fieldValues: any;
  className?: string;
}

const PDFActions: React.FC<PDFActionsProps> = ({ report, layout, fieldValues, className = '' }) => {
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);

  const generatePDF = async () => {
    const pdfDocDefinition = await ReportBodyPDFMake({
      report,
      layout,
      fieldValues
    });

    const pdfDoc = pdfMake.createPdf({ ...pdfDocDefinition } as any);
    
    // Gerar URL do PDF para visualização
    pdfDoc.getBlob((blob: Blob) => {
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    });
  };

  const downloadPDF = async () => {
    const pdfDocDefinition = await ReportBodyPDFMake({
      report,
      layout,
      fieldValues
    });
    pdfMake.createPdf({ ...pdfDocDefinition } as any).download('Report.pdf');
  };

  const printPDF = async () => {
    const pdfDocDefinition = await ReportBodyPDFMake({
      report,
      layout,
      fieldValues
    });
    pdfMake.createPdf({ ...pdfDocDefinition } as any).print();
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={generatePDF}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Visualizar PDF
      </button>
      <button
        onClick={downloadPDF}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Gerar PDF
      </button>
      <button
        onClick={printPDF}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Imprimir
      </button>

      {pdfUrl && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-11/12 h-5/6 flex flex-col">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setPdfUrl(null)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                Fechar
              </button>
            </div>
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              title="PDF Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFActions;
