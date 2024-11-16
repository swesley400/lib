// components/ReportPage.tsx
import { Report } from 'interface/report.interface';
import { ReportFooter } from './ReportFooter';
import { ReportHeader } from './ReportHeader';
import { ReportBody } from './ReportBody';
import 'styles/pdf.css'

export function ReportPage({ report, isPrint, fieldValues, updateFieldValue, isDisabled = false }: { report: Report, isPrint: boolean, fieldValues: any, updateFieldValue: any, isDisabled?: any }) {
  return (
    <div className="page">
      {
        report?.header ? <div className="header"> <ReportHeader report={report} /> </div> : ""
      }

      <div>
        <ReportBody isPrint={isPrint} report={report} fieldValues={fieldValues as any} updateFieldValue={updateFieldValue} isDisabled={isDisabled}></ReportBody>
      </div>

      { 
        report?.footer ? <div className="footer"><ReportFooter report={report} /> </div> : ""
      }
     
    </div>
  );
}
