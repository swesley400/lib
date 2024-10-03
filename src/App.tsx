import './styles/app.css';
import EditorWithTables from 'lib/template/generateHeader';
import PDFDocumentBuilder from 'lib/printer/PDFDocumentBuilder';

function App() {
  return (
    <>  
      <EditorWithTables></EditorWithTables>
      <PDFDocumentBuilder />
    </>
  );
}

export default App;
