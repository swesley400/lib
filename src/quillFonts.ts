// src/config/quillFonts.ts

import Quill from 'quill';

// Importar o formato de fonte do Quill
const Font = Quill.import('formats/font');

// Adicionar as novas fontes à whitelist
Font.whitelist.push(
  'roboto',
  'lato',
  'open-sans',
  'montserrat',
  'oswald',
  'source-sans-pro',
  'merriweather',
  'pt-sans',
  'raleway',
  'nunito'
);

// Registrar o formato de fonte com as novas fontes
Quill.register(Font, true);
