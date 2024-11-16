import './styles/app.css';
import EditorWithTables from 'lib/template/generateHeader';
import PDFDocumentBuilder from 'lib/printer/PDFDocumentBuilder';
import { ImageUploadComponent } from 'components/ImageUpload';
import { IClinicaImage } from 'interface/clinicaImage.interface';
import { FieldController } from 'components/FieldController';
import TemplatePreview from 'components/TemplatePreview';

function App() {

  const clinicaImages: IClinicaImage[]  = [{
    imageName: "Logo 1",
    imageBase64: "https://wes-videos.s3.us-east-2.amazonaws.com/n-design-de-logotipo-colorido-gradiente-inicial_343694-1755+(1).png",
    imageId: 1
  }, 
    {
      imageName: "Logo 2",
      imageBase64: "https://wes-videos.s3.us-east-2.amazonaws.com/n-design-de-logotipo-colorido-gradiente-inicial_343694-1755+(1).png",
      imageId: 2
    }
  ];

  return (
    <> 
      <TemplatePreview onSave={(report: any) => {console.log(report)}}></TemplatePreview>
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
