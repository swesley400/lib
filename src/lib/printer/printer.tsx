import React, { useRef, useState, useEffect } from 'react';
import { Report } from 'interface/report.interface';
import { mockReport } from 'mocks/report.mock';
import './printer.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const GeneratePDF = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (pageRef.current) {
      const pages = calculatePages(pageRef.current);
      setPages(pages);
    }
  }, []);

  const getHeaderHeight = (): number => {
    const header = document.querySelector('.header');
    return header ? header.getBoundingClientRect().height : 50; // Default to 50 if not found
  };

  const getFooterHeight = (): number => {
    const footer = document.querySelector('.footer');
    return footer ? footer.getBoundingClientRect().height : 50; // Default to 50 if not found
  };

  const calculatePages = (container: HTMLDivElement): JSX.Element[] => {
    const a4WidthPt = 595; // A4 width in points
    const a4HeightPt = 842; // A4 height in points
  
    // Dynamically calculate header and footer height
    const headerHeightPt = getHeaderHeight();
    const footerHeightPt = getFooterHeight();
  
    // Calculate content area height
    const contentAreaHeightPt = a4HeightPt - headerHeightPt - footerHeightPt;
  
    const result: JSX.Element[] = [];
    const contentChildren = Array.from(container.children);
    let currentContent: JSX.Element[] = [];
    let contentHeight = 0;
  
    const processContent = (child: Element, childHeightPt: number) => {
      if (contentHeight + childHeightPt > contentAreaHeightPt) {
        // Add current page with header and footer
        result.push(
          <div className="page" key={result.length}>
            {generateHeader(mockReport)}
            <div className='body-paper'>
              {currentContent}
            </div>
            {generateFooter(mockReport)}
          </div>
        );
        currentContent = [];
        contentHeight = 0;
      }
  
      // If adding this child alone exceeds page area, split the child
      if (childHeightPt > contentAreaHeightPt) {
        const childElement = child as HTMLElement;
        const tempDiv = document.createElement('div');
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.position = 'absolute';
        tempDiv.style.width = `${a4WidthPt}px`;
        tempDiv.innerHTML = childElement.innerHTML;
        document.body.appendChild(tempDiv);
  
        while (tempDiv.scrollHeight > contentAreaHeightPt) {
          const splitChild = document.createElement('div');
          splitChild.style.width = `${a4WidthPt}px`;
          splitChild.style.position = 'relative';
          splitChild.innerHTML = tempDiv.innerHTML.slice(0, tempDiv.innerHTML.lastIndexOf('<br/>'));
          tempDiv.innerHTML = tempDiv.innerHTML.slice(tempDiv.innerHTML.lastIndexOf('<br/>'));
  
          currentContent.push(<div key={currentContent.length} dangerouslySetInnerHTML={{ __html: splitChild.innerHTML }} />);
          contentHeight += splitChild.scrollHeight;
  
          if (contentHeight >= contentAreaHeightPt) {
            result.push(
              <div className="page" key={result.length}>
                {generateHeader(mockReport)}
                <div className='body-paper'>
                  {currentContent}
                </div>
                {generateFooter(mockReport)}
              </div>
            );
            currentContent = [];
            contentHeight = 0;
          }
        }
        document.body.removeChild(tempDiv);
      } else {
        currentContent.push(<div key={currentContent.length} dangerouslySetInnerHTML={{ __html: (child as HTMLElement).innerHTML }} />);
        contentHeight += childHeightPt;
      }
    };
  
    contentChildren.forEach((child: Element) => {
      const childElement = child as HTMLElement;
      const tempDiv = document.createElement('div');
      tempDiv.style.visibility = 'hidden';
      tempDiv.style.position = 'absolute';
      tempDiv.style.width = `${a4WidthPt}px`;
      tempDiv.innerHTML = childElement.innerHTML;
      document.body.appendChild(tempDiv);
  
      // Calculate height in points
      const childHeightPt = tempDiv.scrollHeight;
      document.body.removeChild(tempDiv);
  
      // Process content for pagination
      processContent(childElement, childHeightPt);
    });
  
    // Add the last page if there's remaining content
    if (currentContent.length > 0) {
      result.push(
        <div className="page" key={result.length}>
          {generateHeader(mockReport)}
          <div className='body-paper'>
            {currentContent}
          </div>
          {generateFooter(mockReport)}
        </div>
      );
    }
  
    return result;
  };

  const handleGeneratePDF = () => {
    const pdf = new jsPDF('p', 'pt', 'a4'); // Using 'pt' (points) for A4 precision
    const a4Width = 595; // A4 width in points
    const a4Height = 842; // A4 height in points

    const promises: Promise<any>[] = [];

    // Select all pages in the pages-container
    const pagesContainer = document.querySelector('.pages-container');
    if (pagesContainer) {
      const pageElements = pagesContainer.querySelectorAll('.page'); // Select all pages

      pageElements.forEach((page, index) => {
        promises.push(
          html2canvas(page as HTMLElement, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = a4Width;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let positionY = 0;

            if (imgHeight < a4Height) {
              // If image height is less than A4 height, center vertically
              positionY = (a4Height - imgHeight) / 2;
            }

            if (index === 0) {
              // Add the first page
              pdf.addImage(imgData, 'PNG', 0, positionY, imgWidth, imgHeight);
            } else {
              // Add subsequent pages
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', 0, positionY, imgWidth, imgHeight);
            }
          })
        );
      });

      // After all pages are processed, save the PDF
      Promise.all(promises).then(() => {
        pdf.save('report.pdf');
      });
    }
  };

  return (
    <div>
      <button onClick={handleGeneratePDF}>Generate PDF</button>
      <div className='classA4' ref={pageRef}>
        {generateBody(mockReport)}
      </div>
      <div className='pages-container'>
        {pages}
      </div>
    </div>
  );
};

const generateHeader = (report: Report) => {
  return (
    <header className='header'>
      <div dangerouslySetInnerHTML={{ __html: report.header.html }} />
    </header>
  );
};

const generateFooter = (report: Report) => {
  return (
    <footer className='footer'>
      <div dangerouslySetInnerHTML={{ __html: report.footer.html }} />
    </footer>
  );
};

const generateBody = (report: Report) => {
  return (
    <>
      {report.body.fields && report.body.fields.map((field: any, index) => (
        <div key={index}>
          <strong>{field.name}:</strong> {field.value}
        </div>
      ))}
      {report.body.images && report.body.images.map((image, index) => (
        <div key={index}>
          <img
            src={image.url}
            alt={image.altText}
            style={{ float: image.layout.toLowerCase() as any, margin: '10px' }}
          />
          <div>{image.caption}</div>
        </div>
      ))}
    </>
  );
};

export { GeneratePDF };
