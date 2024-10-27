// types/html2pdf.d.ts

declare module 'html2pdf.js' {
    namespace html2pdf {
      interface Options {
        margin?: number | number[];
        filename?: string;
        image?: {
          type?: string;
          quality?: number;
        };
        html2canvas?: {
          scale?: number;
          useCORS?: boolean;
          logging?: boolean;
          allowTaint?: boolean;
          [key: string]: any;
        };
        jsPDF?: {
          unit?: string;
          format?: string | number[];
          orientation?: 'portrait' | 'landscape';
          [key: string]: any;
        };
        pagebreak?: {
          mode?: string[];
          before?: string[];
          after?: string[];
          avoid?: string[];
          [key: string]: any;
        };
        callback?: (doc: any) => void;
        [key: string]: any;
      }
  
      interface Html2PdfInstance {
        from(element: HTMLElement | string): Html2PdfInstance;
        set(options: Options): Html2PdfInstance;
        save(): void;
        toPdf(): Promise<any>;
        output(type?: string): Promise<any>;
      }
    }
  
    const html2pdf: {
      (): html2pdf.Html2PdfInstance;
    };
  
    export default html2pdf;
  }
  