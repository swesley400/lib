import { useRef, useState, useEffect } from "react";
import { mockReport } from "mocks/report.mock";
import "../../styles/pdf.css";
import { ReportBody } from "../../components/ReportBody";
import { calculatePages, handleGeneratePDF } from "utils/pdf.utils";

export default function PDFDocumentBuilder() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isPrint, setIsPrint] = useState<boolean>(false);
  const [pages, setPages] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (pageRef.current) {
      const generatedPages = calculatePages(pageRef.current);
      setPages(generatedPages);
    }
  }, [isPrint]); 

  const generateA4 = () => {
    setIsPrint((prev) => !prev);

    if (!isPrint) {
      setTimeout(() => {
        handleGeneratePDF(); 
        setIsPrint((prev) => !prev);
      }, 1000);
    }
  };

  return (
    <div>
      <button onClick={generateA4}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">Generate PDF</button>
      <div className="flex justify-center">
        <div className="classA4" ref={pageRef} >
          <ReportBody report={mockReport} isPrint={isPrint} />
        </div>
      </div>
      {isPrint && <div className="pages-container">{pages}</div>} {/* Renderização condicional simplificada */}
    </div>
  );
}
