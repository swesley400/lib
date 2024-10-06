export interface ISubheaderField {
  type: "text" | "number" | "date" | string;
  name: string;
  value: string | number | Date;
}

export interface IExamDataProps {
  fields: ISubheaderField[];
}

export interface Report {
    header: {
      html: string;
      img?: {
        url: string;
        layout: "RIGHT" | "LEFT" | "UP" | "DOWN";
        altText?: string;  
        caption?: string;
      };
      subheaderFields: ISubheaderField[];
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
  