// components/ReportPage.tsx
import React from 'react';
import { Report } from 'interface/report.interface';
import { ReportHeader } from './ReportHeader';
import { ReportBody } from './ReportBody';
import { ReportFooter } from './ReportFooter';
import { ExamData } from './ExamData';
import 'styles/pdf.css'
export function ReportPage({ report, isPrint, fieldValues, updateFieldValue, isDisabled = false }: { report: Report, isPrint: boolean, fieldValues: any, updateFieldValue: any, isDisabled?: any }) {
  return (
    <div className="page">
      {
        report?.header ? <div className="header"> <ReportHeader report={report} />  <ExamData fields={report.header?.subheaderFields || null} /></div> : ""
      }

      <div>
        <ReportBody isPrint={isPrint} report={report} fieldValues={fieldValues as any} updateFieldValue={updateFieldValue} isDisabled={isDisabled}></ReportBody>
      </div>

      {
        report?.footer ? <div className="footer"><ReportFooter report={report} /> </div> : ""
      }

    </div>
  );
};
