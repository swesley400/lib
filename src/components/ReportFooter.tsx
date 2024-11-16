import { Report } from "interface/report.interface";
import htmlToPdfMake from 'html-to-pdfmake';

export function ReportFooter({ report, medico = "Medico Sample" }: any) {
  const { editorHtml, imageOptions, textSize, align, justify } = report.footer;

  // Obtendo a data e hora atual formatada
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString("pt-BR")} às ${currentDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return (
    <footer
      className="footer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        justifyContent: justify,
        gap: "10px",
        fontSize: `${textSize}px`,
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: imageOptions.layout === "UP" || imageOptions.layout === "DOWN" ? "column" : "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {imageOptions.url && (
          <img
            src={imageOptions.url}
            alt={imageOptions.altText || "Footer Image"}
            style={{
              width: `${typeof imageOptions.width === "number" ? imageOptions.width : parseInt(imageOptions.width)}px`,
              height: `${typeof imageOptions.height === "number" ? imageOptions.height : parseInt(imageOptions.height)}px`,
              objectFit: "contain",
              margin: imageOptions.layout === "RIGHT" ? "0 0 0 auto" : "0 auto 0 0",
            }}
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
      </div>
      <p style={{ fontSize: "12px", textAlign: align, marginTop: "20px" , color: 'gray'}}>
        Laudo assinado eletronicamente pelo <strong>{medico}</strong> dia <strong>{formattedDate}</strong>
      </p>
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