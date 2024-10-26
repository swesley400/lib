import { Report } from "interface/report.interface";

export function ReportHeader({ report }: { report: Report }) {
  return (
    <header className="header">
      <div dangerouslySetInnerHTML={{ __html: report.header.html }}/>
    </header>
  );
}

export function getHeaderHeight(): number {
  const header = document.querySelector(".header");
  return header ? Math.min(header.getBoundingClientRect().height, 113.39) : 113.39; // 4 cm em pontos
}

