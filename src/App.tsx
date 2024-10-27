import './styles/app.css';
import EditorWithTables from 'lib/template/generateHeader';
import PDFDocumentBuilder from 'lib/printer/PDFDocumentBuilder';
import { ImageUploadComponent } from 'components/ImageUpload';
import { IClinicaImage } from 'interface/clinicaImage.interface';
import { FieldController } from 'components/FieldController';

function App() {

  const clinicaImages: IClinicaImage[]  = [{
    imageName: "Logo",
    imageBase64: "",
    imageId: 1
  }];

  return (
    <> 
      {/* Exemplos de uso de nossos components */}
      {/* <EditorWithTables clinicImages={clinicaImages} />       */}
      <PDFDocumentBuilder></PDFDocumentBuilder>
      {/* <ImageUploadComponent onSave={(base64) => { return base64}}/>   */}
      {/* <FieldController key={1} label={"Teste"}  name={"TEste"} initialValue={"Teste"} type={"Text"} isPrint={false}/>
      <FieldController key={1} label={"Teste"}  name={"TEste"} initialValue={"Teste"} type={"Label"} isPrint={false}/>
      <FieldController key={1} label={"Teste"}  name={"TEste"} initialValue={"Teste"} type={"Line"} isPrint={false}/>
      <FieldController key={1} label={"Teste"}  name={"TEste"} initialValue={"Teste"} type={"CheckBox"} isPrint={false}/>
      <FieldController key={1} label={"Nao"}  name={"Nao"} initialValue={"Teste"} type={"CheckBox"} isPrint={false}/> */}
    </>
  );
}   

export default App;
