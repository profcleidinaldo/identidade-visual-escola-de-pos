# Template – Apresentação Escola de Pós UFG

## Estrutura de arquivos

```
/
├── template_escola_pos.js              ← script principal (edite aqui)
├── gerar_logos.py                      ← processa as logos (rode 1x)
├── logo_original.png                   ← logo original (fundo claro)
├── logo_dark_bg_b64.txt                ← gerado pelo gerar_logos.py
├── logo_black_icon_white_text_b64.txt  ← gerado pelo gerar_logos.py
└── apresentacao_escola_pos.pptx        ← output gerado
```

---

## Como usar

### 1. Instalar dependência
```bash
npm install -g pptxgenjs
```

### 2. Processar as logos (apenas na primeira vez)
Coloque a logo original (fundo claro) como `logo_original.png` e rode:
```bash
pip install Pillow numpy
python gerar_logos.py
```

### 3. Editar o conteúdo
Abra `template_escola_pos.js` e edite a seção **CONFIGURAÇÃO**:

```js
const TITULO_APRESENTACAO = "INFORME";
const SUBTITULO           = "Escola de Pós-Graduação";
const EVENTO              = "Reunião Mensal PRPG";
```

Edite os slides em **SLIDES**:
```js
const SLIDES = [
  {
    titulo: "Meu Título",
    linhas: ["Ponto 1.", "Ponto 2."]
  },
];
```

Para remover o slide de destaque, comente a constante `DESTAQUE`:
```js
const DESTAQUE = null;
```

### 4. Gerar o PPTX
```bash
node template_escola_pos.js
```

---

## Identidade Visual

| Elemento     | Valor               |
|--------------|---------------------|
| Preto        | `#1A1A1A` (Black Puma)  |
| Dourado      | `#C3AD73` (Gold Realness) |
| Branco       | `#FFFFFF`           |
| Fonte        | Barlow              |
| Logo escuro  | ícone dourado + texto branco |
| Logo dourado | ícone preto + texto branco  |

---

## Estrutura dos slides

- **Capa**: fundo preto + painel dourado direito com logo
- **Conteúdo**: fundo off-white + cabeçalho preto numerado + caixa branca com barra dourada lateral + rodapé preto com logo
- **Destaque**: fundo preto + badge + 3 cards informativos
- **Final**: fundo preto + painel dourado esquerdo com logo
