import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';

export { default as PDFDocumentBuilder } from './lib/printer/PDFDocumentBuilder';
export type { PDFDocumentBuilderProps } from './lib/printer/PDFDocumentBuilder';

export { default as TemplatePreview } from './components/TemplatePreview';
export type { TemplatePreviewProps, Field } from './components/TemplatePreview';

export { default as PDFActions } from './components/PDFActions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
