import { useRef, useState, useEffect } from "react";
import { mockReport } from "mocks/report.mock";
import "../../styles/pdf.css";
import { ReportBody, ReportBodyPDFMake } from "../../components/ReportBody";
import { calculatePages } from "utils/pdf.utils";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function PDFDocumentBuilder() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isPrint, setIsPrint] = useState<boolean>(false);
  const [pages, setPages] = useState<JSX.Element[]>([]);

  const [fieldValues, setFieldValues] = useState<{ [key: string]: any }>(
    mockReport.body.fields.reduce((acc: any, field: any) => {
      acc[field.name] = field.initialValue || ""; // Valor inicial
      return acc;
    }, {})
  );

  useEffect(() => {
    if (pageRef.current) {
      const generatedPages = calculatePages(pageRef.current);
      setPages(generatedPages);
    }
  }, [isPrint]);

  const updateFieldValue = (fieldName: string, value: any) => {
    setFieldValues(prevValues => ({
      ...prevValues,
      [fieldName]: value
    }));
  };

  const generateA4 = () => {
    setIsPrint((prev) => !prev);

    if (!isPrint) {
      setTimeout(async () => {
        const pdfDocDefinition = await ReportBodyPDFMake({report: mockReport, layout: mockReport.body.layout, fieldValues});
        pdfMake.createPdf(pdfDocDefinition as any).download('Report.pdf');
        setIsPrint((prev) => !prev);
      }, 1000);
    }
  };

  return (
    <div>
      <button onClick={generateA4} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">
        Generate PDF
      </button>
      <div className="flex justify-center">
        <div className="classA4" ref={pageRef}>
          <ReportBody 
            report={mockReport} 
            isPrint={isPrint} 
            fieldValues={fieldValues as any} 
            updateFieldValue={updateFieldValue} 
          />
        </div>
      </div>
    </div>
  );
}
