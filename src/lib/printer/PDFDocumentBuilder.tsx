import { useRef, useState, useEffect } from "react";
import { mockReport } from "mocks/report.mock";
import "../../styles/pdf.css";
import { ReportBody } from "../../components/ReportBody";
import { calculatePages, handleGeneratePDF } from "utils/pdf.utils";

export default function PDFDocumentBuilder() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (pageRef.current) {
      const generatedPages = calculatePages(pageRef.current);
      setPages(generatedPages);
    }
  }, []);

  return (
    <div>
      <button onClick={handleGeneratePDF}>Generate PDF</button>
      <div className="classA4" ref={pageRef}>
        <ReportBody report={mockReport} />
      </div>
      <div className="pages-container">{pages}</div>
    </div>
  );
}
