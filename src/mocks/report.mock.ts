import { Report } from "../interface/report.interface";

export const mockReport: Report = {
  header: {
    html: `
      <div class=\"preview-container\">\n      <div class=\"header\" style=\"\n      text-align: left;  /* Alinhamento geral do container */\n      display: flex;\n      flex-direction: row;\n      align-items: flex-start;\n      justify-content: left; /* Justificação do texto */\n      gap: 10px;\n    \">\n        <div style=\"display: flex;\"><img src=\"https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg?w=1380&amp;t=st=1725841146~exp=1725841746~hmac=be050db89bc0396eae5fcbd0e20ff8c75a792af97ed39d8231c02162437caf72\" alt=\"Imagem\" style=\"width: 250px; height: 250px; margin: 0 10px; display: ;\"><div><h1>Teste De TEste De teste De TEste</h1><h1>TESTE</h1><h1><br></h1><h1><span style=\"color: rgb(240, 102, 102);\">ATEA O CARALHO</span></h1></div></div>\n        \n      </div>\n    </div>
    `,
    img: {
      url: "https://example.com/header-image.jpg",
      layout: "RIGHT",
      altText: "Logo da Empresa",
      caption: "Relatório de Endoscopia - 2024"
    },
    subheaderFields: [
      {
        type: "text",
        name: "Nome do Paciente",
        value: "João da Silva"
      },
      {
        type: "text",
        name: "Data de Nascimento",
        value: "1985-02-15"
      },
      {
        type: "text",
        name: "Sexo",
        value: "Masculino"
      },
      {
        type: "text",
        name: "CPF",
        value: "123.456.789-00"
      },
      {
        type: "text",
        name: "Endereço",
        value: "Rua Brasil, Q 11, L6, Casa 3"
      },
      {
        type: "text",
        name: "CEP",
        value: "75251-473"
      },
      {
        type: "text",
        name: "Telefone",
        value: "62 992295634 / 62 3515-5634"
      }
    ]
  },
  body: {
    fields: [
      {
        type: "text",
        name: "Paciente",
        value: "João da Silva"
      },
      {
        type: "text",
        name: "Data da Exame",
        value: "2024-09-07"
      },
      {
        type: "text",
        name: "Médico Responsável",
        value: "Dr. Rafael Krescmer Junior"
      },
      {
        type: "text",
        name: "Tipo de Exame",
        value: "Endoscopia Digestiva Alta"
      },
      {
        type: "text",
        name: "Indicação",
        value: "Paciente apresenta sintomas de dor abdominal e dificuldade para engolir."
      },
      {
        type: "text",
        name: "Procedimento",
        value: "Endoscopia digestiva alta realizada para avaliar a presença de lesões no esôfago, estômago e duodeno. Foi utilizada sedação leve e o exame durou aproximadamente 20 minutos."
      },
      {
        type: "text",
        name: "Achados",
        value: `
          Foram observados os seguintes achados durante o exame:
          1. **Esôfago**: Presença de leve esofagite erosiva. As lesões são superficiais e limitadas à mucosa.
          2. **Estômago**: Presença de gastrite superficial com áreas de eritema. Não foram encontrados sinais de úlcera ou tumor.
          3. **Duodeno**: Observado padrão normal, sem evidências de lesões ou anormalidades.
        `
      },
      {
        type: "text",
        name: "Conclusão",
        value: `
          A endoscopia digestiva alta revelou alterações moderadas, com esofagite erosiva e gastrite superficial. Não foram encontradas lesões malignas ou úlceras graves. Recomenda-se acompanhamento com terapia medicamentosa para controle dos sintomas e revisão após 6 meses para reavaliação.
        `
      },
      {
        type: "text",
        name: "Recomendações",
        value: `
          1. **Tratamento**: Iniciar tratamento com inibidores da bomba de prótons (IBPs) para reduzir a acidez gástrica.
          2. **Dieta**: Adotar uma dieta leve, evitando alimentos irritantes e bebidas alcoólicas.
          3. **Acompanhamento**: Reavaliar o paciente em 6 meses para monitorar a evolução e eficácia do tratamento.
        `
      },
      {
        type: "text",
        name: "Paciente",
        value: "João da Silva"
      },
      {
        type: "text",
        name: "Data da Exame",
        value: "2024-09-07"
      },
      {
        type: "text",
        name: "Médico Responsável",
        value: "Dr. Rafael Krescmer Junior"
      },
      {
        type: "text",
        name: "Tipo de Exame",
        value: "Endoscopia Digestiva Alta"
      },
      {
        type: "text",
        name: "Indicação",
        value: "Paciente apresenta sintomas de dor abdominal e dificuldade para engolir."
      },
      {
        type: "text",
        name: "Procedimento",
        value: "Endoscopia digestiva alta realizada para avaliar a presença de lesões no esôfago, estômago e duodeno. Foi utilizada sedação leve e o exame durou aproximadamente 20 minutos."
      },
      {
        type: "text",
        name: "Achados",
        value: `
          Foram observados os seguintes achados durante o exame:
          1. **Esôfago**: Presença de leve esofagite erosiva. As lesões são superficiais e limitadas à mucosa.
          2. **Estômago**: Presença de gastrite superficial com áreas de eritema. Não foram encontrados sinais de úlcera ou tumor.
          3. **Duodeno**: Observado padrão normal, sem evidências de lesões ou anormalidades.
        `
      },
      {
        type: "text",
        name: "Paciente",
        value: "João da Silva"
      },
      {
        type: "text",
        name: "Data da Exame",
        value: "2024-09-07"
      },
      {
        type: "text",
        name: "Médico Responsável",
        value: "Dr. Rafael Krescmer Junior"
      },
      {
        type: "text",
        name: "Tipo de Exame",
        value: "Endoscopia Digestiva Alta"
      },
      {
        type: "text",
        name: "Indicação",
        value: "Paciente apresenta sintomas de dor abdominal e dificuldade para engolir."
      },
      {
        type: "text",
        name: "Procedimento",
        value: "Endoscopia digestiva alta realizada para avaliar a presença de lesões no esôfago, estômago e duodeno. Foi utilizada sedação leve e o exame durou aproximadamente 20 minutos."
      },
      {
        type: "text",
        name: "Achados",
        value: `
          Foram observados os seguintes achados durante o exame:
          1. **Esôfago**: Presença de leve esofagite erosiva. As lesões são superficiais e limitadas à mucosa.
          2. **Estômago**: Presença de gastrite superficial com áreas de eritema. Não foram encontrados sinais de úlcera ou tumor.
          3. **Duodeno**: Observado padrão normal, sem evidências de lesões ou anormalidades.
        `
      },
      {
        type: "text",
        name: "Conclusão",
        value: `
          A endoscopia digestiva alta revelou alterações moderadas, com esofagite erosiva e gastrite superficial. Não foram encontradas lesões malignas ou úlceras graves. Recomenda-se acompanhamento com terapia medicamentosa para controle dos sintomas e revisão após 6 meses para reavaliação.
        `
      },
      {
        type: "text",
        name: "Recomendações",
        value: `
          1. **Tratamento**: Iniciar tratamento com inibidores da bomba de prótons (IBPs) para reduzir a acidez gástrica.
          2. **Dieta**: Adotar uma dieta leve, evitando alimentos irritantes e bebidas alcoólicas.
          3. **Acompanhamento**: Reavaliar o paciente em 6 meses para monitorar a evolução e eficácia do tratamento.
        `
      },
      {
        type: "text",
        name: "Paciente",
        value: "João da Silva"
      },
      {
        type: "text",
        name: "Data da Exame",
        value: "2024-09-07"
      },
      {
        type: "text",
        name: "Médico Responsável",
        value: "Dr. Rafael Krescmer Junior"
      },
      {
        type: "text",
        name: "Tipo de Exame",
        value: "Endoscopia Digestiva Alta"
      },
      {
        type: "text",
        name: "Indicação",
        value: "Paciente apresenta sintomas de dor abdominal e dificuldade para engolir."
      },
      {
        type: "text",
        name: "Procedimento",
        value: "Endoscopia digestiva alta realizada para avaliar a presença de lesões no esôfago, estômago e duodeno. Foi utilizada sedação leve e o exame durou aproximadamente 20 minutos."
      },
      {
        type: "text",
        name: "Achados",
        value: `
          Foram observados os seguintes achados durante o exame:
          1. **Esôfago**: Presença de leve esofagite erosiva. As lesões são superficiais e limitadas à mucosa.
          2. **Estômago**: Presença de gastrite superficial com áreas de eritema. Não foram encontrados sinais de úlcera ou tumor.
          3. **Duodeno**: Observado padrão normal, sem evidências de lesões ou anormalidades.
        `
      },
      {
        type: "text",
        name: "Paciente",
        value: "João da Silva"
      },
      {
        type: "text",
        name: "Data da Exame",
        value: "2024-09-07"
      },
      {
        type: "text",
        name: "Médico Responsável",
        value: "Dr. Rafael Krescmer Junior"
      },
      {
        type: "text",
        name: "Tipo de Exame",
        value: "Endoscopia Digestiva Alta"
      },
      {
        type: "text",
        name: "Indicação",
        value: "Paciente apresenta sintomas de dor abdominal e dificuldade para engolir."
      },
      {
        type: "text",
        name: "Procedimento",
        value: "Endoscopia digestiva alta realizada para avaliar a presença de lesões no esôfago, estômago e duodeno. Foi utilizada sedação leve e o exame durou aproximadamente 20 minutos."
      },
      {
        type: "text",
        name: "Achados",
        value: `
          Foram observados os seguintes achados durante o exame:
          1. **Esôfago**: Presença de leve esofagite erosiva. As lesões são superficiais e limitadas à mucosa.
          2. **Estômago**: Presença de gastrite superficial com áreas de eritema. Não foram encontrados sinais de úlcera ou tumor.
          3. **Duodeno**: Observado padrão normal, sem evidências de lesões ou anormalidades.
        `
      },
      {
        type: "text",
        name: "Conclusão",
        value: `
          A endoscopia digestiva alta revelou alterações moderadas, com esofagite erosiva e gastrite superficial. Não foram encontradas lesões malignas ou úlceras graves. Recomenda-se acompanhamento com terapia medicamentosa para controle dos sintomas e revisão após 6 meses para reavaliação.
        `
      },
      {
        type: "text",
        name: "Recomendações",
        value: `
          1. **Tratamento**: Iniciar tratamento com inibidores da bomba de prótons (IBPs) para reduzir a acidez gástrica.
          2. **Dieta**: Adotar uma dieta leve, evitando alimentos irritantes e bebidas alcoólicas.
          3. **Acompanhamento**: Reavaliar o paciente em 6 meses para monitorar a evolução e eficácia do tratamento.
        `
      },
      {
        type: "text",
        name: "Paciente",
        value: "João da Silva"
      },
      {
        type: "text",
        name: "Data da Exame",
        value: "2024-09-07"
      },
      {
        type: "text",
        name: "Médico Responsável",
        value: "Dr. Rafael Krescmer Junior"
      },
      {
        type: "text",
        name: "Tipo de Exame",
        value: "Endoscopia Digestiva Alta"
      },
      {
        type: "text",
        name: "Indicação",
        value: "Paciente apresenta sintomas de dor abdominal e dificuldade para engolir."
      },
      {
        type: "text",
        name: "Procedimento",
        value: "Endoscopia digestiva alta realizada para avaliar a presença de lesões no esôfago, estômago e duodeno. Foi utilizada sedação leve e o exame durou aproximadamente 20 minutos."
      },
      {
        type: "text",
        name: "Achados",
        value: `
          Foram observados os seguintes achados durante o exame:
          1. **Esôfago**: Presença de leve esofagite erosiva. As lesões são superficiais e limitadas à mucosa.
          2. **Estômago**: Presença de gastrite superficial com áreas de eritema. Não foram encontrados sinais de úlcera ou tumor.
          3. **Duodeno**: Observado padrão normal, sem evidências de lesões ou anormalidades.
        `
      },
      {
        type: "text",
        name: "Conclusão",
        value: `
          A endoscopia digestiva alta revelou alterações moderadas, com esofagite erosiva e gastrite superficial. Não foram encontradas lesões malignas ou úlceras graves. Recomenda-se acompanhamento com terapia medicamentosa para controle dos sintomas e revisão após 6 meses para reavaliação.
        `
      },
      {
        type: "text",
        name: "Recomendações",
        value: `
          1. **Tratamento**: Iniciar tratamento com inibidores da bomba de prótons (IBPs) para reduzir a acidez gástrica.
          2. **Dieta**: Adotar uma dieta leve, evitando alimentos irritantes e bebidas alcoólicas.
          3. **Acompanhamento**: Reavaliar o paciente em 6 meses para monitorar a evolução e eficácia do tratamento.
        `
      },
      {
        type: "text",
        name: "Paciente",
        value: "João da Silva"
      },
      {
        type: "text",
        name: "Data da Exame",
        value: "2024-09-07"
      },
      {
        type: "text",
        name: "Médico Responsável",
        value: "Dr. Rafael Krescmer Junior"
      },
      {
        type: "text",
        name: "Tipo de Exame",
        value: "Endoscopia Digestiva Alta"
      },
      {
        type: "text",
        name: "Indicação",
        value: "Paciente apresenta sintomas de dor abdominal e dificuldade para engolir."
      },
      {
        type: "text",
        name: "Procedimento",
        value: "Endoscopia digestiva alta realizada para avaliar a presença de lesões no esôfago, estômago e duodeno. Foi utilizada sedação leve e o exame durou aproximadamente 20 minutos."
      },
      {
        type: "text",
        name: "Achados",
        value: `
          Foram observados os seguintes achados durante o exame:
          1. **Esôfago**: Presença de leve esofagite erosiva. As lesões são superficiais e limitadas à mucosa.
          2. **Estômago**: Presença de gastrite superficial com áreas de eritema. Não foram encontrados sinais de úlcera ou tumor.
          3. **Duodeno**: Observado padrão normal, sem evidências de lesões ou anormalidades.
        `
      },
      {
        type: "text",
        name: "Conclusão",
        value: `
          A endoscopia digestiva alta revelou alterações moderadas, com esofagite erosiva e gastrite superficial. Não foram encontradas lesões malignas ou úlceras graves. Recomenda-se acompanhamento com terapia medicamentosa para controle dos sintomas e revisão após 6 meses para reavaliação.
        `
      },
      {
        type: "text",
        name: "Recomendações",
        value: `
          1. **Tratamento**: Iniciar tratamento com inibidores da bomba de prótons (IBPs) para reduzir a acidez gástrica.
          2. **Dieta**: Adotar uma dieta leve, evitando alimentos irritantes e bebidas alcoólicas.
          3. **Acompanhamento**: Reavaliar o paciente em 6 meses para monitorar a evolução e eficácia do tratamento.
        `
      },
      {
        type: "text",
        name: "Paciente",
        value: "João da Silva"
      },
      {
        type: "text",
        name: "Data da Exame",
        value: "2024-09-07"
      },
      {
        type: "text",
        name: "Médico Responsável",
        value: "Dr. Rafael Krescmer Junior"
      },
      {
        type: "text",
        name: "Tipo de Exame",
        value: "Endoscopia Digestiva Alta"
      },
      {
        type: "text",
        name: "Indicação",
        value: "Paciente apresenta sintomas de dor abdominal e dificuldade para engolir."
      },
      {
        type: "text",
        name: "Procedimento",
        value: "Endoscopia digestiva alta realizada para avaliar a presença de lesões no esôfago, estômago e duodeno. Foi utilizada sedação leve e o exame durou aproximadamente 20 minutos."
      },
      {
        type: "text",
        name: "Achados",
        value: `
          Foram observados os seguintes achados durante o exame:
          1. **Esôfago**: Presença de leve esofagite erosiva. As lesões são superficiais e limitadas à mucosa.
          2. **Estômago**: Presença de gastrite superficial com áreas de eritema. Não foram encontrados sinais de úlcera ou tumor.
          3. **Duodeno**: Observado padrão normal, sem evidências de lesões ou anormalidades.
        `
      },
      {
        type: "text",
        name: "Conclusão",
        value: `
          A endoscopia digestiva alta revelou alterações moderadas, com esofagite erosiva e gastrite superficial. Não foram encontradas lesões malignas ou úlceras graves. Recomenda-se acompanhamento com terapia medicamentosa para controle dos sintomas e revisão após 6 meses para reavaliação.
        `
      },
      {
        type: "text",
        name: "Recomendações",
        value: `
          1. **Tratamento**: Iniciar tratamento com inibidores da bomba de prótons (IBPs) para reduzir a acidez gástrica.
          2. **Dieta**: Adotar uma dieta leve, evitando alimentos irritantes e bebidas alcoólicas.
          3. **Acompanhamento**: Reavaliar o paciente em 6 meses para monitorar a evolução e eficácia do tratamento.
        `
      }
    ],
    images: [
      {
        url: "https://example.com/endoscopy-image.jpg",
        layout: "LEFT",
        altText: "Imagem do Exame",
        caption: "Imagem capturada durante o exame endoscópico"
      },
      {
        url: "https://example.com/analysis-chart.jpg",
        layout: "RIGHT",
        altText: "Gráfico de Análise",
        caption: "Gráfico demonstrando a gravidade das alterações encontradas"
      }
    ]
  },
  footer: {
    html: `
      <div class="preview-container">
        <div class="header" style="
          text-align: left;  /* Alinhamento geral do container */
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center; /* Justificação do texto */
          gap: 10px;
        ">
          <div style="display: flex;">
            <img src="" alt="Imagem" style="width: 250px; height: 250px; margin: 0 10px; display: none;" />
            <div>
              <p>Rua Brasil, Q 11, L6, Casa 3</p>
              <p>CEP 75251-473</p>
              <p>Telefone: 62 992295634 / 62 3515-5634</p>
            </div>
          </div>
        </div>
      </div>
    `,
    img: {
      url: "https://example.com/footer-image.jpg",
      layout: "DOWN",
      altText: "Imagem de rodapé",
      caption: "Relatório gerado automaticamente"
    }
  }
};
