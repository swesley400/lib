import { Report } from 'interface/report.interface';
import { ReportFooter } from './ReportFooter';
import { ReportHeader } from './ReportHeader';

export function ReportPage({ report, content }: { report: Report, content: JSX.Element[] }) {
  return (
    <div className="page">
      <ReportHeader report={report} />
      <div className="body-paper">
        {content}
      </div>
      <ReportFooter report={report} />
    </div>
  );
}
