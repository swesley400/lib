// components/ReportPage.tsx
import { Report } from 'interface/report.interface';
import { ReportFooter } from './ReportFooter';
import { ReportHeader } from './ReportHeader';

export function ReportPage({ report, content }: { report: Report; content: JSX.Element }) {
  return (
    <div className="page">
      <div className="header">
        <ReportHeader report={report} />
      </div>
      <div className="content">
        {content}
      </div>
      <div className="footer">
        <ReportFooter report={report} />
      </div>
    </div>
  );
}
