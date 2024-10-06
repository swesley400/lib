import React from 'react';
import { Report } from 'interface/report.interface';
import { ReportHeader } from './ReportHeader';
import { ReportFooter } from './ReportFooter';
import { ExamData } from './ExamData';
interface ReportPageProps {
  report: Report;
  content: JSX.Element[];
}

export const ReportPage: React.FC<ReportPageProps> = ({ report, content }) => {
  return (
    <div className="page">
      <ReportHeader report={report} />
      <ExamData fields={report.header.subheaderFields} />
      <div className="body-paper">
        {content}
      </div>
      <ReportFooter report={report} />
    </div>
  );
};
