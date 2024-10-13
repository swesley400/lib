export interface Report {
    header: {
      html: string;
      img?: {
        url: string;
        layout: "RIGHT" | "LEFT" | "UP" | "DOWN";
        altText?: string;  
        caption?: string;
      };
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
      html: string;
      img?: {
        url: string;
        layout: "RIGHT" | "LEFT" | "UP" | "DOWN";
        altText?: string;
        caption?: string;
      };
    };
}
  