import { Report } from "interface/report.interface";

export function ReportFooter({ report }: { report: Report }) {
  return (
    <footer className="footer">
      <div dangerouslySetInnerHTML={{ __html: report.footer.html }} />
    </footer>
  );
}

export function getFooterHeight(): number {
  const footer = document.querySelector(".footer");
  return footer ? Math.min(footer.getBoundingClientRect().height, 113.39) : 113.39; // 4 cm em pontos
}