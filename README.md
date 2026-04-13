# Identidade Visual – Escola de Pós UFG

Templates de apresentação e logos oficiais da Escola de Pós-Graduação UFG.

---

## Estrutura do repositório

```
identidade-visual-escola-de-pos/
│
├── 📄 template_escola_pos.js              ← Script principal — edite aqui para cada apresentação
├── 🐍 gerar_logos.py                      ← Processa as logos (rode apenas 1x ou ao atualizar)
├── 📖 README.md                           ← Este arquivo
│
├── 🎨 LOGOS OFICIAIS (CIAR/UFG)
│   ├── logos_reduzida-fundo-claros.png         ← Versão oficial fundo claro
│   ├── logos_reduzida-fundo-escuros.png        ← Versão oficial fundo escuro
│   ├── logos_reduzida-fundos-de-cor-intermediaria.png
│   ├── logos.pdf                               ← Arquivo vetorial PDF
│   └── logos.ai                                ← Arquivo vetorial Adobe Illustrator
│
├── 🎞️ MARCA ANIMADA (CIAR/UFG)
│   ├── Marca-animada-horizontal.gif / .mp4
│   └── Marca-animada-quadrada.gif / .mp4
│
└── ⚙️ LOGOS PROCESSADAS (para uso no template)
    ├── logo_fundo_escuro.png   + logo_fundo_escuro_b64.txt    ← slides fundo preto
    ├── logo_painel_dourado.png + logo_painel_dourado_b64.txt  ← painel dourado (capa/final)
    └── logo_fundo_claro.png    + logo_fundo_claro_b64.txt     ← slides fundo claro
```

---

## Identidade Visual Oficial

| Elemento       | Especificação                        |
|----------------|--------------------------------------|
| **Preto**      | `#1A1A1A` — Black Puma               |
| **Dourado**    | `#C3AD73` — Gold Realness            |
| **Branco**     | `#FFFFFF`                            |
| **Fonte**      | Barlow (Light · Regular · Bold · Extrabold) |
| **Ícone**      | 3 hexágonos sobrepostos              |

> Manual de Marca completo: [publica.ciar.ufg.br/projetos/manual_escola_de_pos](https://publica.ciar.ufg.br/projetos/manual_escola_de_pos/index.html)

---

## Como gerar uma apresentação

### 1. Instalar dependência (apenas 1x)
```bash
npm install -g pptxgenjs
```

### 2. Processar logos (apenas se atualizar as logos oficiais)
```bash
pip install Pillow numpy
python gerar_logos.py
```

### 3. Editar o conteúdo da apresentação
Abra `template_escola_pos.js` e edite a seção **CONFIGURAÇÃO**:

```js
const TITULO_APRESENTACAO = "PAUTA";         // ou "INFORME", "RELATÓRIO"...
const SUBTITULO           = "Reunião de Gestão";
const EVENTO              = "15/04/2026 · 14h30";

const SLIDES = [
  { titulo: "Item 1", linhas: ["Ponto A.", "Ponto B."] },
  { titulo: "Item 2", linhas: ["Ponto A.", "Ponto B.", "Ponto C."] },
];
```

### 4. Gerar o arquivo PPTX
```bash
node template_escola_pos.js
```

O arquivo `apresentacao_escola_pos.pptx` será gerado na mesma pasta.

---

## Versões da logo e quando usar

| Arquivo                    | Usar quando...                          |
|----------------------------|-----------------------------------------|
| `logo_fundo_escuro.png`    | Slide com fundo preto/escuro            |
| `logo_painel_dourado.png`  | Sobre painel dourado (capa e final)     |
| `logo_fundo_claro.png`     | Slide com fundo claro/off-white         |

---

## Estrutura dos slides gerados

| Slide        | Descrição                                              |
|--------------|--------------------------------------------------------|
| Capa         | Fundo preto · painel dourado com logo · data e hora   |
| Visão Geral  | Todos os itens da pauta em duas colunas               |
| Divisor      | Slide de transição entre partes (dourado ou preto)    |
| Conteúdo     | Um slide por item · cabeçalho numerado · barra dourada |
| Final        | Painel dourado com logo · nomes dos diretores         |

---

*Desenvolvido para a Escola de Pós-Graduação UFG*
*[escoladepos.ufg.br](https://escoladepos.ufg.br)*
