import './styles/app.css';
import EditorWithTables from 'lib/template/generateHeader';
import PDFDocumentBuilder from 'lib/printer/PDFDocumentBuilder';
import { ImageUploadComponent } from 'components/ImageUpload';
import { ClinicaImage } from 'interface/clinicaImage.interface';
import { useState } from 'react';

function App() {

  const clinicaImages: ClinicaImage[]  = [{
    imageName: "Logo",
    imageBase64: "",
    imageId: 1
  }];


  return (
    <> 
      {/*Exemplos de uso de nossos components*/ } 
      <EditorWithTables clinicImages={clinicaImages} />      
      <PDFDocumentBuilder />
      <ImageUploadComponent onSave={() => {}}/>
    </>
  );
}   

export default App;
