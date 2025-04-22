import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import { IClinicaImage } from '../../interface/clinicaImage.interface';
import 'react-quill/dist/quill.snow.css';
import "../../styles/styles.css";

// Interface para as opções de imagem
export interface IImageOptions {
  url: string;
  layout: 'RIGHT' | 'LEFT' | 'UP' | 'DOWN';
  altText?: string;
  caption?: string;
  width: number;
  height: number;
}

// Interface para os dados de edição que podem vir via props
export interface IEditionData {
  editorHtml?: string;
  imageOptions?: IImageOptions;
  align?: 'left' | 'center' | 'right';
  justify?: 'left' | 'center' | 'right' | 'justify';
  textSize?: number;
}

// Interface das propriedades do componente
interface EditorComponenteProps {
  clinicImages: IClinicaImage[];
  editionData?: IEditionData;
  onSave: (data: IEditionData) => void;
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['clean'],
  ],
};

const formats = [
  'header',
  'font',
  'size',
  'list',
  'bold',
  'italic',
  'underline',
  'align',
  'link',
  'image',
  'color',
  'background',
];

const EditorWithPreview: React.FC<EditorComponenteProps> = ({
  clinicImages: clinicImagesProp,
  editionData,
  onSave,
}) => {
  // Inicializa os estados utilizando os dados de edição (se fornecidos) ou os valores padrão.
  const [headerHtml, setHeaderHtml] = useState<string>(
    editionData?.editorHtml || '<h1>Meu Cabeçalho</h1>'
  );

  const [imageOptions, setImageOptions] = useState<IImageOptions>(
    editionData?.imageOptions || {
      url: '',
      layout: 'RIGHT',
      width: 100,
      height: 100,
    }
  );

  const [align, setAlign] = useState<'left' | 'center' | 'right'>(
    editionData?.align || 'left'
  );

  const [justify, setJustify] = useState<'left' | 'center' | 'right' | 'justify'>(
    editionData?.justify || 'left'
  );

  const [textSize, setTextSize] = useState<number>(
    editionData?.textSize || 16
  );

  const [clinicImages, setClinicImages] = useState<IClinicaImage[]>(clinicImagesProp);

  // Referência para a div de preview
  const previewHtmlRef = useRef<HTMLDivElement | null>(null);

  // Atualiza o conteúdo HTML do editor (ReactQuill)
  const handleHtmlChange = (value: string) => setHeaderHtml(value);

  const handleImageChange = useCallback((event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setImageOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleLayoutChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setImageOptions((prev) => ({
      ...prev,
      layout: event.target.value as IImageOptions['layout'],
    }));
  }, []);

  const handleAlignChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setAlign(event.target.value as 'left' | 'center' | 'right');
  }, []);

  const handleJustifyChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setJustify(event.target.value as 'left' | 'center' | 'right' | 'justify');
  }, []);

  const handleTextSizeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTextSize(Number(event.target.value));
  }, []);

  // Gera o HTML de pré-visualização com base nos estados atuais
  const generatePreviewHtml = useCallback(() => {
    const { layout, url, altText, caption, width, height } = imageOptions;
    const imageStyle = `width: ${width}px; height: ${height}px; margin: 0 10px; display: ${
      url === "" ? 'none' : 'block'
    };`;

    const containerStyle = `
      text-align: ${align};
      display: flex;
      flex-direction: ${layout === 'UP' || layout === 'DOWN' ? 'column' : 'row'};
      align-items: ${layout === 'UP' || layout === 'DOWN' ? 'center' : 'flex-start'};
      justify-content: ${justify === 'justify' ? 'space-between' : justify};
      gap: 10px;
    `;

    const imageHtml = `<img src="${url}" alt="${altText || 'Imagem'}" style="${imageStyle}" />`;

    let imagePositionHtml = '';
    switch (layout) {
      case 'UP':
        imagePositionHtml = `${imageHtml}<div>${headerHtml}</div>`;
        break;
      case 'DOWN':
        imagePositionHtml = `<div>${headerHtml}</div>${imageHtml}`;
        break;
      case 'LEFT':
        imagePositionHtml = `<div style="display: flex;">${imageHtml}<div>${headerHtml}</div></div>`;
        break;
      case 'RIGHT':
        imagePositionHtml = `<div style="display: flex; flex-direction: row-reverse;">${imageHtml}<div>${headerHtml}</div></div>`;
        break;
    }

    return `
      <div class="header" style="${containerStyle}">
        ${imagePositionHtml}
        ${caption ? `<p class="caption">${caption}</p>` : ''}
      </div>
    `;
  }, [imageOptions, headerHtml, align, justify]);

  // Função que gera o objeto com os dados do editor (incluindo o HTML do preview)
  const handleSave = useCallback(() => {
    const contextHtml = previewHtmlRef.current?.outerHTML || '';
    const result = {
      editorHtml: headerHtml,
      imageOptions,
      align,
      justify,
      textSize,
      contextHtml,
    };
    onSave(result);
  }, [headerHtml, imageOptions, align, justify, textSize]);

  // Atualiza a pré-visualização sempre que os estados mudam
  useEffect(() => {
    const previewHtml = generatePreviewHtml();
    if (previewHtmlRef.current) {
      previewHtmlRef.current.innerHTML = previewHtml;
    }
  }, [generatePreviewHtml]);

  // Atualiza as imagens da clínica se a prop mudar
  useEffect(() => {
    setClinicImages(clinicImagesProp);
  }, [clinicImagesProp]);

  return (
    <div
      className="editor-preview-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '20px',
        width: '100%',
      }}
    >
      {/* Container do Editor */}
      <div
        className="editor-container"
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <h2 className="editor-title">Editor de Cabeçalho</h2>
        <ReactQuill
          value={headerHtml}
          onChange={handleHtmlChange}
          modules={modules}
          formats={formats}
          className="quill-editor"
        />

        {/* Formulário para edição */}
        <div className="form-group">
          <label htmlFor="image-select">Selecione a imagem:</label>
          <select
            name="url"
            id="image-select"
            onChange={handleImageChange}
            value={imageOptions.url}
          >
            <option value="" disabled>
              Selecione uma imagem...
            </option>
            {clinicImages.map((image) => (
              <option key={image.imageId} value={image.imageBase64}>
                {image.imageName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>
            Texto Alternativo:
            <input
              type="text"
              name="altText"
              value={imageOptions.altText || ''}
              onChange={handleImageChange}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Legenda:
            <input
              type="text"
              name="caption"
              value={imageOptions.caption || ''}
              onChange={handleImageChange}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Layout da Imagem:
            <select
              onChange={handleLayoutChange}
              value={imageOptions.layout}
              className="form-input"
            >
              <option value="RIGHT">Direita</option>
              <option value="LEFT">Esquerda</option>
              <option value="UP">Cima</option>
              <option value="DOWN">Baixo</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Largura da Imagem (em pixels):
            <input
              type="number"
              name="width"
              value={imageOptions.width}
              onChange={handleImageChange}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Altura da Imagem (em pixels):
            <input
              type="number"
              name="height"
              value={imageOptions.height}
              onChange={handleImageChange}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Alinhamento do Texto:
            <select onChange={handleAlignChange} value={align} className="form-input">
              <option value="left">Esquerda</option>
              <option value="center">Centro</option>
              <option value="right">Direita</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Justificação do Texto:
            <select onChange={handleJustifyChange} value={justify} className="form-input">
              <option value="left">Esquerda</option>
              <option value="center">Centro</option>
              <option value="right">Direita</option>
              <option value="justify">Justificado</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Tamanho do Texto:
            <input
              type="number"
              name="textSize"
              value={textSize}
              onChange={handleTextSizeChange}
              className="form-input"
            />
          </label>
        </div>
        <button onClick={handleSave} className="save-button">
          Salvar Configurações
        </button>
      </div>

      {/* Container de Pré-visualização com largura de uma folha A4 */}
      <div
        className="preview-container"
        ref={previewHtmlRef}
        style={{
          width: '210mm', // Largura de uma folha A4
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '400px',
        }}
      ></div>
    </div>
  );
};

export default EditorWithPreview;
