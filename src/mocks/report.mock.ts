import { Report } from "../interface/report.interface";

export const mockReport: Report = {
  header: {
    editorHtml:
      '<h1 class="ql-align-center">Instituto de Medicina Canedo</h1><h4 class="ql-align-center"><span style="background-color: rgb(194, 133, 255);">A 15 nos fazendo seu exame com qualidade</span></h4>',
    imageOptions: {
      url: "https://wes-videos.s3.us-east-2.amazonaws.com/n-design-de-logotipo-colorido-gradiente-inicial_343694-1755+(1).png",
      layout: "LEFT",
      width: "200",
      height: "200",
    },
    align: "center",
    justify: "center",
    textSize: 16,
    contextHtml:
      '<div class="preview-container">\n      <div class="header" style="\n      text-align: center;  /* Alinhamento geral do container */\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: left; /* Justificação do texto */\n      gap: 10px;\n    ">\n        <div style="display: flex;"><img src="https://img.freepik.com/vetores-gratis/n-design-de-logotipo-colorido-gradiente-inicial_343694-1755.jpg?t=st=1730042421~exp=1730046021~hmac=15968ae8311bc186d8f089b2f109382d8c14286dd5acd0ced8f22d76fbe7dee0&amp;w=1380" alt="Imagem" style="width: 200px; height: 200px; margin: 0 10px; display: ;"><div><h1 class="ql-align-center">Instituto de Medicina Canedo</h1><h4 class="ql-align-center"><span style="background-color: rgb(194, 133, 255);">A 15 nos fazendo seu exame com qualidade</span></h4></div></div>\n        \n      </div>\n    </div>',
  },
  body: {
    fields: [
      {
        type: "Text",
        name: "Procedimento",
        value:
          "Endoscopia digestiva alta realizada para avaliar a presença de lesões no esôfago, estômago e duodeno. Foi utilizada sedação leve e o exame durou aproximadamente 20 minutos.",
      },
      {
        type: "Label",
        name: "Biopsia",
        value: "",
      },
      {
        type: "CheckBox",
        name: "Sim",
        value: false,
      },
      {
        type: "CheckBox",
        name: "Nao",
        value: true,
      },
      {
        type: "Text",
        name: "Achados",
        value: `
          Foram observados os seguintes achados durante o exame:
          1. **Esôfago**: Presença de leve esofagite erosiva. As lesões são superficiais e limitadas à mucosa.
          2. **Estômago**: Presença de gastrite superficial com áreas de eritema. Não foram encontrados sinais de úlcera ou tumor.
          3. **Duodeno**: Observado padrão normal, sem evidências de lesões ou anormalidades.
        `,
      },
      {
        type: "Text",
        name: "Conclusão",
        value: `
          A endoscopia digestiva alta revelou alterações moderadas, com esofagite erosiva e gastrite superficial. Não foram encontradas lesões malignas ou úlceras graves. Recomenda-se acompanhamento com terapia medicamentosa para controle dos sintomas e revisão após 6 meses para reavaliação.
        `,
      },
      {
        type: "Text",
        name: "Recomendações",
        value: `
          1. **Tratamento**: Iniciar tratamento com inibidores da bomba de prótons (IBPs) para reduzir a acidez gástrica.
          2. **Dieta**: Adotar uma dieta leve, evitando alimentos irritantes e bebidas alcoólicas.
          3. **Acompanhamento**: Reavaliar o paciente em 6 meses para monitorar a evolução e eficácia do tratamento.
        `,
      },
      {
        type: "Line",
        name: "Recomendações",
      },
    ],
    layout: "RIGHT",
    images: [
      {
        url: "https://wes-videos.s3.us-east-2.amazonaws.com/estomago.jpg",
        altText: "Imagem do Exame",
        caption: "Imagem capturada durante o exame endoscópico",
      },
      {
        url: "https://wes-videos.s3.us-east-2.amazonaws.com/estomago.jpg",
        altText: "Gráfico de Análise",
        caption: "Gráfico demonstrando a gravidade das alterações encontradas",
      },
      {
        url: "https://wes-videos.s3.us-east-2.amazonaws.com/estomago.jpg",
        altText: "Gráfico de Análise",
        caption: "Gráfico demonstrando a gravidade das alterações encontradas",
      },
      {
        url: "https://wes-videos.s3.us-east-2.amazonaws.com/estomago.jpg",
        altText: "Gráfico de Análise",
        caption: "Gráfico demonstrando a gravidade das alterações encontradas",
      },

      {
        url: "https://wes-videos.s3.us-east-2.amazonaws.com/estomago.jpg",
        altText: "Gráfico de Análise",
        caption: "Gráfico demonstrando a gravidade das alterações encontradas",
      },
      {
        url: "https://wes-videos.s3.us-east-2.amazonaws.com/estomago.jpg",
        altText: "Gráfico de Análise",
        caption: "Gráfico demonstrando a gravidade das alterações encontradas",
      },
      {
        url: "https://wes-videos.s3.us-east-2.amazonaws.com/estomago.jpg",
        altText: "Gráfico de Análise",
        caption: "Gráfico demonstrando a gravidade das alterações encontradas",
      },
      {
        url: "https://wes-videos.s3.us-east-2.amazonaws.com/estomago.jpg",
        altText: "Gráfico de Análise",
        caption: "Gráfico demonstrando a gravidade das alterações encontradas",
      },
      {
        url: "https://wes-videos.s3.us-east-2.amazonaws.com/estomago.jpg",
        altText: "Gráfico de Análise",
        caption: "Gráfico demonstrando a gravidade das alterações encontradas",
      },
      {
        url: "https://wes-videos.s3.us-east-2.amazonaws.com/estomago.jpg",
        altText: "Gráfico de Análise",
        caption: "Gráfico demonstrando a gravidade das alterações encontradas",
      },
      {
        url: "https://wes-videos.s3.us-east-2.amazonaws.com/estomago.jpg",
        altText: "Gráfico de Análise",
        caption: "Gráfico demonstrando a gravidade das alterações encontradas",
      }
    ],
  },
  footer: {
    "editorHtml": "<p>Rua Brazil, Q 11 L6 Casa 3 Senador Canedo</p><p>Cep: 75251473 | 62 992295634</p>",
    "imageOptions": {
        "url": "",
        "layout": "RIGHT",
        "width": 100,
        "height": 100
    },
    "align": "center",
    "justify": "center",
    "textSize": 12,
    "contextHtml": "<div class=\"preview-container\">\n      <div class=\"header\" style=\"\n      text-align: left;  /* Alinhamento geral do container */\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: left; /* Justificação do texto */\n      gap: 10px;\n    \">\n        <div style=\"display: flex; flex-direction: row-reverse;\"><img src=\"\" alt=\"Imagem\" style=\"width: 100px; height: 100px; margin: 0 10px; display: none;\"><div><p>Rua Brazil, Q 11 L6 Casa 3 Senador Canedo</p><p>Cep: 75251473 | 62 992295634</p></div></div>\n        \n      </div>\n    </div>"
  }
};
