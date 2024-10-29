import { getFooterHeight } from "components/ReportFooter";
import { getHeaderHeight } from "components/ReportHeader";
import { ReportPage } from "components/ReportPage";
import { mockReport } from "mocks/report.mock";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React from 'react';

export function calculatePages(container: HTMLDivElement): JSX.Element[] {
  const result: JSX.Element[] = [];

  const tempDiv = document.createElement('div');
  tempDiv.style.height = '297mm';
  tempDiv.style.width = '210mm'; 
  tempDiv.style.visibility = 'hidden';
  document.body.appendChild(tempDiv);
  const pageHeightPx = tempDiv.offsetHeight;
  const pageWidthPx = tempDiv.offsetWidth;
  document.body.removeChild(tempDiv);

  const headerHeightPt = getHeaderHeight();
  const footerHeightPt = getFooterHeight(); 

  // Converte as alturas de pontos para pixels
  const headerHeightPx = headerHeightPt * 1.333; 
  const footerHeightPx = footerHeightPt * 1.333;

  const usablePageHeightPx = pageHeightPx - headerHeightPx - footerHeightPx;

  let currentPageContent = document.createElement('div');
  currentPageContent.style.width = `${pageWidthPx}px`;
  currentPageContent.style.position = 'relative';

  let currentPageHeight = 0;
  const pages: JSX.Element[] = [];

  const children = Array.from(container.children);

  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;
    const childClone = child.cloneNode(true) as HTMLElement;

    childClone.style.visibility = 'hidden';
    childClone.style.position = 'absolute';
    childClone.style.width = `${container.offsetWidth}px`;
    document.body.appendChild(childClone);
    const childHeight = childClone.offsetHeight;
    document.body.removeChild(childClone);

    if (currentPageHeight + childHeight <= usablePageHeightPx) {
      currentPageContent.appendChild(child.cloneNode(true));
      currentPageHeight += childHeight;
    } else {
      const reactElement = (
        <div
          key={pages.length}
          style={{
            width: `${pageWidthPx}px`,
            height: `${pageHeightPx}px`,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '0',
              width: '100%',
            }}
            dangerouslySetInnerHTML={{ __html: currentPageContent.innerHTML }}
          />
        </div>
      );

      pages.push(
        <ReportPage key={pages.length} report={mockReport} content={[reactElement] as any} />
      );

      currentPageContent = document.createElement('div');
      currentPageContent.style.width = `${pageWidthPx}px`;
      currentPageContent.style.position = 'relative';
      currentPageHeight = 0;

      if (childHeight <= usablePageHeightPx) {
        // Adiciona o elemento à nova página
        currentPageContent.appendChild(child.cloneNode(true));
        currentPageHeight += childHeight;
      } else {
        currentPageContent.appendChild(child.cloneNode(true));
        currentPageHeight += childHeight;
      }
    }
  }

  if (currentPageContent.children.length > 0) {
    const reactElement = (
      <div
        key={pages.length}
        style={{
          width: `${pageWidthPx}px`,
          height: `${pageHeightPx}px`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '0',
            width: '100%',
          }}
          dangerouslySetInnerHTML={{ __html: currentPageContent.innerHTML }}
        />
      </div>
    );

    pages.push(
      <ReportPage key={pages.length} report={mockReport} content={[reactElement] as any} />
    );
  }

  return pages;
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


export async function convertImageToBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error("Erro ao buscar a imagem:", response.statusText);
      return null;
    }
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Erro ao converter imagem para Base64:", error);
    return null;
  }
}