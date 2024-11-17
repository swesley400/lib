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
      subheaderFields?: { examTitle: string, headerFields: ISubheaderField[] };
    };
    subHeader?: {
      subHeaderFields:  Array<{
        [key: string]: {
          isActive: boolean,
          fieldName: string,
          value?: string,
          type: any
        }
      }>
    };
    body: {
      layout: "RIGHT" | "LEFT" | "UP" | "DOWN";
      fields: Array<{
        type: "Text" | "Number" | "Date" | "Label" | "CheckBox"| "Line";
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
  