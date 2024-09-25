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
      fields: Array<{
        type: "text" | "number" | "date" | string;
        name: string;
        value?: string | number | Date; 
        placeholder?: string; 
        required?: boolean;   
      }>;
      images: Array<{
        url: string;
        layout: "RIGHT" | "LEFT" | "UP" | "DOWN";
        altText?: string;
        caption?: string;
      }>;
    };
    footer: {
      html: string;
      img?: {
        url: string;
        layout?: "RIGHT" | "LEFT" | "UP" | "DOWN";
        altText?: string;
        caption?: string;
      };
    };
}
  