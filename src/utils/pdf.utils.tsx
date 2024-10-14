import { getFooterHeight } from "components/ReportFooter";
import { getHeaderHeight } from "components/ReportHeader";
import { ReportPage } from "components/ReportPage";
import { mockReport } from "mocks/report.mock";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export function calculatePages(container: HTMLDivElement): JSX.Element[] {
  const a4WidthPt = 595;
  const a4HeightPt = 842;

  const headerHeightPt = getHeaderHeight();
  const footerHeightPt = getFooterHeight();
  const contentAreaHeightPt = a4HeightPt - headerHeightPt - footerHeightPt;

  const result: JSX.Element[] = [];
  const contentChildren = Array.from(container.children);
  let currentContent: JSX.Element[] = [];
  let contentHeight = 0;

  contentChildren.forEach((child: Element) => {
    const childElement = child as HTMLElement;
    const tempDiv = document.createElement("div");
    tempDiv.style.visibility = "hidden";
    tempDiv.style.position = "absolute";
    tempDiv.style.width = `${a4WidthPt}px`;
    tempDiv.innerHTML = childElement.innerHTML;
    document.body.appendChild(tempDiv);

    const childHeightPt = tempDiv.scrollHeight;
    document.body.removeChild(tempDiv);

    if (contentHeight + childHeightPt > contentAreaHeightPt) {
      result.push(
        <ReportPage
          key={result.length}
          report={mockReport}
          content={currentContent}
        />
      );
      currentContent = [];
      contentHeight = 0;
    }

    currentContent.push(
      <div
        key={currentContent.length}
        dangerouslySetInnerHTML={{ __html: childElement.innerHTML }}
      />
    );
    contentHeight += childHeightPt;
  });

  if (currentContent.length > 0) {
    result.push(
      <ReportPage
        key={result.length}
        report={mockReport}
        content={currentContent}
      />
    );
  }

  return result;
}

export function handleGeneratePDF() {
  const pdf = new jsPDF("p", "pt", "a4");
  const a4Width = 595;
  const a4Height = 842;

  const pagesContainer = document.querySelector(".pages-container");
  const promises: Promise<any>[] = [];

  if (pagesContainer) {
    const pageElements = pagesContainer.querySelectorAll(".page");
   
    pageElements.forEach((page, index) => {
      promises.push(
        html2canvas(page as HTMLElement, {
          scale: 2,
          useCORS: true
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = a4Width;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let positionY = imgHeight < a4Height ? (a4Height - imgHeight) / 2 : 0;
    
          if (index === 0) {
            pdf.addImage(imgData, "PNG", 0, positionY, imgWidth, imgHeight);
          } else {
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, positionY, imgWidth, imgHeight);
          }
        })
      );
    });

    Promise.all(promises).then(() => {
      pdf.save("report.pdf");
    });
  }
}