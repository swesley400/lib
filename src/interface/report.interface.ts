export interface Report {
    header: {
      editorHtml: string,
      html?: string;
      imageOptions: {
        url: string;
        layout: "RIGHT" | "LEFT" | "UP" | "DOWN";
        width: string | number;
        height: string | number;
        altText?: string;  
        caption?: string;
      };
      textSize: number,
      align: string
      justify: string
      contextHtml: string
    };
    body: {
      layout: "RIGHT" | "LEFT" | "UP" | "DOWN";
      fields: Array<{
        type: "Text" | "Number" | "Date" | "Label" | "Chebock"|string;
        name: string;
        value?: string | number | Date | boolean; 
        placeholder?: string; 
        required?: boolean;   
      }>;
      images: Array<{
        url: string;
        altText?: string;
        caption?: string;
      }>;
    };
    footer: {
      editorHtml: string,
      html?: string;
      imageOptions: {
        url: string;
        layout: "RIGHT" | "LEFT" | "UP" | "DOWN";
        width: string | number;
        height:string | number;
        altText?: string;  
        caption?: string;
      };
      textSize: number,
      align: string
      justify: string
      contextHtml: string
    };
}
  