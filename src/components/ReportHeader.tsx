import { Report } from "interface/report.interface";

export function ReportHeader({ report }: { report: Report }) {
  return (
    <header className="header">
      <div dangerouslySetInnerHTML={{ __html: report.header.html }} />
    </header>
  );
}

export function getHeaderHeight(): number {
  const header = document.querySelector(".header");
  return header ? header.getBoundingClientRect().height : 50;
}
