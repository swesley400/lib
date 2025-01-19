import { useRef, useState, useEffect } from "react";
import { mockReport } from "../../mocks/report.mock";
import { ReportBody } from "../../components/ReportBody";
import { ReportPage } from "../../components/ReportPage";
import PDFActions from "../../components/PDFActions";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import "../../styles/pdf.css";

// Initialize pdfMake with fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
};

export interface PDFDocumentBuilderProps {
  report: any; // TODO: Add proper type for report
  isPrint: boolean;
  fieldValues?: any; // TODO: Add proper type for fieldValues
  updateFieldValue?: (fieldName: string, value: any) => void;
  onSave: (base64: string) => void;
}

const PDFDocumentBuilder: React.FC<PDFDocumentBuilderProps> = (props) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isPrint, setIsPrint] = useState<boolean>(false);
  const [pages, setPages] = useState<JSX.Element[]>([]);

  const [fieldValues, setFieldValues] = useState<{ [key: string]: any }>(
    mockReport.body.fields.reduce((acc: any, field: any) => {
      acc[field.name] = field.initialValue || "";
      return acc;
    }, {})
  );

  const updateFieldValue = (fieldName: string, value: any) => {
    setFieldValues(prevValues => ({
      ...prevValues,
      [fieldName]: value
    }));
  };

  return (
    <>
      <div className="m-1">
        <PDFActions
          report={props.report || mockReport}
          layout={props.report?.body.layout || mockReport.body.layout}
          fieldValues={props.fieldValues || fieldValues}
          className="mb-4"
        />
      </div>
      <ReportPage 
        report={props.report} 
        isPrint={props.isPrint} 
        fieldValues={props.fieldValues} 
        updateFieldValue={props.updateFieldValue} 
      />
    </>
  );
}

export default PDFDocumentBuilder;
