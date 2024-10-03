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
  return footer ? footer.getBoundingClientRect().height : 50; // Default to 50 if not found
}
