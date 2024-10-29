import { Report } from "interface/report.interface";
import htmlToPdfMake from 'html-to-pdfmake';

export function ReportFooter({ report }: { report: Report }) {
  return (
    <footer className="footer">
      <div dangerouslySetInnerHTML={{ __html: report.footer.contextHtml }} />
    </footer>
  );
}

export function getFooterHeight(): number {
  const footer = document.querySelector(".footer");
  return footer ? Math.min(footer.getBoundingClientRect().height, 113.39) : 113.39; // 4 cm em pontos
}

export async function createPdfFooter(footerConfig: Report["footer"]) {
  const htmlContent = htmlToPdfMake(footerConfig.editorHtml);
  const signatureContent = `Laudo assinado eletronicamente pelo Wesley Santos dia 28/10/2024 às 20:40`;

  const defineFooterPosition = () => {
    const adjustedMargin = [0, 5, 0, 5];

    return {
      stack: [
        { 
          stack: htmlContent, 
          alignment: footerConfig.justify || 'center',
          margin: adjustedMargin 
        },
        signatureContent && { 
          text: signatureContent,
          alignment: 'center',
          margin: [0, 10, 0, 0],
          fontSize: 8,
          color: 'gray'
        }
      ].filter(Boolean),
      alignment: footerConfig.justify || 'center',
      margin: [20, 10, 20, 10]
    };
  };

  const footerPDFMake = {
    fontSize: footerConfig.textSize || 10,
    stack: [
      defineFooterPosition()
    ]
  };

  console.log("Footer PDF Make:", footerPDFMake); // Verificar a estrutura final do rodapé

  return footerPDFMake;
}