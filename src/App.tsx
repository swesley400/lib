import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GeneratePDF } from './lib/printer/printer'
import EditorWithTables from 'lib/template/generateHeader';

function App() {
  return (
    <>  
    <EditorWithTables></EditorWithTables>
    <GeneratePDF></GeneratePDF>
    </>
  
 
  );
}

export default App;
