import './styles/app.css';
import EditorWithTables from 'lib/template/generateHeader';
import PDFDocumentBuilder from 'lib/printer/PDFDocumentBuilder';
import { ImageUploadComponent } from 'components/ImageUpload';
import { IClinicaImage } from 'interface/clinicaImage.interface';

function App() {

  const clinicaImages: IClinicaImage[]  = [{
    imageName: "Logo",
    imageBase64: "",
    imageId: 1
  }];

  return (
    <> 
      {/* Exemplos de uso de nossos components */}
     <EditorWithTables clinicImages={clinicaImages} />      
      <ImageUploadComponent onSave={(base64) => { return base64}}/> 
      <PDFDocumentBuilder />
    </>
  );
}   

export default App;
