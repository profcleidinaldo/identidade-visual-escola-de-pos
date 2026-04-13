/**
 * ============================================================
 * TEMPLATE – APRESENTAÇÃO ESCOLA DE PÓS UFG
 * ============================================================
 * Identidade Visual Oficial:
 *   Cores  : Black Puma #1A1A1A | Gold Realness #C3AD73 | Branco #FFFFFF
 *   Fonte  : Barlow
 *   Logo   : 3 hexágonos sobrepostos + "ESCOLA DE PÓS UFG"
 *
 * Dependência: npm install -g pptxgenjs
 *
 * Logos necessárias (mesma pasta deste script):
 *   logo_dark_bg.png          → ícone dourado + texto branco (fundo escuro)
 *   logo_black_icon_white_text.png → ícone preto + texto branco (painel dourado)
 *
 * Como usar:
 *   1. Ajuste TITULO_APRESENTACAO, EVENTO e os slides de conteúdo
 *   2. node template_escola_pos.js
 * ============================================================
 */

const pptxgen = require("pptxgenjs");
const fs      = require("fs");
const path    = require("path");

// ── CONFIGURAÇÃO ─────────────────────────────────────────────
const TITULO_APRESENTACAO = "INFORME";          // Ex: "RELATÓRIO", "APRESENTAÇÃO"
const SUBTITULO           = "Escola de Pós-Graduação";
const EVENTO              = "Reunião Mensal PRPG";
const DIRETOR             = "Prof. Cleidinaldo";
const DIRETOR_ADJUNTO     = "Prof. Daniel";
const SITE                = "escoladepos.ufg.br";

// ── PALETA OFICIAL ────────────────────────────────────────────
const C = {
  black:  "1A1A1A",   // Black Puma
  gold:   "C3AD73",   // Gold Realness
  white:  "FFFFFF",
  offBg:  "F5F3EF",   // off-white quente (fundo slides de conteúdo)
};
const F = "Barlow";   // Fonte oficial

// ── LOGOS ─────────────────────────────────────────────────────
// Proporção original: 1732 x 552 → ratio ≈ 3.14
const DIR = __dirname;
const LOGO_DARK       = "image/png;base64," + fs.readFileSync(path.join(DIR, "logo_dark_bg_b64.txt"),              "utf8"); // fundo escuro
const LOGO_GOLD_PANEL = "image/png;base64," + fs.readFileSync(path.join(DIR, "logo_black_icon_white_text_b64.txt"),"utf8"); // painel dourado

// ── SLIDES DE CONTEÚDO ────────────────────────────────────────
// Edite aqui os itens da sua apresentação.
// Cada item vira um slide numerado automaticamente.
const SLIDES = [
  {
    titulo: "Título do Item 1",
    linhas: [
      "Primeiro ponto do item 1.",
      "Segundo ponto do item 1.",
    ]
  },
  {
    titulo: "Título do Item 2",
    linhas: [
      "Primeiro ponto do item 2.",
      "Segundo ponto do item 2.",
      "Terceiro ponto do item 2.",
    ]
  },
  // Adicione quantos quiser...
];

// ── SLIDE DE DESTAQUE (opcional) ─────────────────────────────
// Defina null para não incluir, ou preencha o objeto abaixo.
const DESTAQUE = {
  badge:      "DESTAQUE",
  supertitle: "LANÇAMENTO DO CURSO EAD",
  titulo:     '"Título do Curso"',
  cards: [
    { label: "DATA",    valor: "DD de mês\nHHh – HHh",       emoji: "📅" },
    { label: "LOCAL",   valor: "Nome do Local\nCidade",        emoji: "📍" },
    { label: "FORMATO", valor: "Online · Gratuito\nInscrições: XX a XX", emoji: "🖥️" },
  ],
  parceria: "Texto de parceria ou iniciativa.",
  link:     "escoladepos.ufg.br/cursos/nome-do-curso",
  linkUrl:  "https://escoladepos.ufg.br/cursos/nome-do-curso",
};
// const DESTAQUE = null; // descomente para remover o slide de destaque

// ═════════════════════════════════════════════════════════════
// GERAÇÃO DO PPTX — não é necessário editar abaixo desta linha
// ═════════════════════════════════════════════════════════════

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title  = TITULO_APRESENTACAO;

// ── HELPERS ───────────────────────────────────────────────────
function addFooter(slide) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.33, w: 10, h: 0.04,
    fill: { color: C.gold }, line: { color: C.gold }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.37, w: 10, h: 0.255,
    fill: { color: C.black }, line: { color: C.black }
  });
  slide.addImage({ data: LOGO_DARK, x: 0.3, y: 5.375, w: 0.88, h: 0.28 });
  slide.addText(EVENTO, {
    x: 1.35, y: 5.37, w: 8.4, h: 0.255,
    fontSize: 9, fontFace: F,
    color: C.gold, valign: "middle", align: "left", margin: 0
  });
}

function addHeader(slide, numero, titulo) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1,
    fill: { color: C.black }, line: { color: C.black }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 1.0, h: 1.1,
    fill: { color: C.gold }, line: { color: C.gold }
  });
  slide.addText(String(numero), {
    x: 0, y: 0, w: 1.0, h: 1.1,
    fontSize: 38, fontFace: F, bold: true,
    color: C.black, align: "center", valign: "middle", margin: 0
  });
  slide.addText(titulo.toUpperCase(), {
    x: 1.15, y: 0, w: 8.65, h: 1.1,
    fontSize: 19, fontFace: F, bold: true,
    color: C.white, valign: "middle", margin: 0, charSpacing: 1
  });
}

function makeItemSlide(numero, titulo, linhas) {
  let sl = pres.addSlide();
  sl.background = { color: C.offBg };
  addHeader(sl, numero, titulo);
  addFooter(sl);

  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 1.3, w: 9.1, h: 3.8,
    fill: { color: C.white },
    line: { color: "E5E0D8", width: 0.5 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.07 }
  });
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 1.3, w: 0.12, h: 3.8,
    fill: { color: C.gold }, line: { color: C.gold }
  });

  const items = linhas.map((l, i) => ({
    text: l,
    options: { bullet: { indent: 15 }, breakLine: i < linhas.length - 1, paraSpaceAfter: 10 }
  }));
  sl.addText(items, {
    x: 0.75, y: 1.45, w: 8.6, h: 3.55,
    fontSize: 15, fontFace: F, color: C.black,
    valign: "top", lineSpacingMultiple: 1.35
  });
}

// ── SLIDE 1 — CAPA ────────────────────────────────────────────
let s1 = pres.addSlide();
s1.background = { color: C.black };
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0,     w: 10, h: 0.06,  fill: { color: C.gold }, line: { color: C.gold } });
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06,  fill: { color: C.gold }, line: { color: C.gold } });
s1.addShape(pres.shapes.RECTANGLE, { x: 7.0, y: 0.06, w: 3.0, h: 5.505, fill: { color: C.gold }, line: { color: C.gold } });
s1.addImage({ data: LOGO_GOLD_PANEL, x: 7.1, y: 1.7, w: 2.7, h: 0.86 });

s1.addText(TITULO_APRESENTACAO, {
  x: 0.5, y: 0.75, w: 6.2, h: 1.3,
  fontSize: 78, fontFace: F, bold: true,
  color: C.white, align: "left", margin: 0, charSpacing: 5
});
s1.addText(SUBTITULO, {
  x: 0.5, y: 2.15, w: 6.2, h: 0.55,
  fontSize: 22, fontFace: F, color: C.gold, align: "left", margin: 0
});
s1.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.85, w: 4.2, h: 0.04, fill: { color: "3A3A3A" }, line: { color: "3A3A3A" } });
s1.addText(EVENTO, {
  x: 0.5, y: 3.05, w: 6.2, h: 0.42,
  fontSize: 15, fontFace: F, color: "AAAAAA", align: "left", margin: 0
});
s1.addText([{ text: DIRETOR, options: { bold: true } }, { text: "   |   Diretor", options: { bold: false, color: "AAAAAA" } }], {
  x: 0.5, y: 3.72, w: 6.2, h: 0.42,
  fontSize: 13.5, fontFace: F, color: C.white, valign: "middle", align: "left", margin: 0
});
s1.addText([{ text: DIRETOR_ADJUNTO, options: { bold: true } }, { text: "   |   Diretor Adjunto", options: { bold: false, color: "AAAAAA" } }], {
  x: 0.5, y: 4.18, w: 6.2, h: 0.42,
  fontSize: 13.5, fontFace: F, color: C.white, valign: "middle", align: "left", margin: 0
});

// ── SLIDES DE PAUTA ───────────────────────────────────────────
SLIDES.forEach((item, i) => makeItemSlide(i + 1, item.titulo, item.linhas));

// ── SLIDE DESTAQUE (opcional) ─────────────────────────────────
if (DESTAQUE) {
  let sD = pres.addSlide();
  sD.background = { color: C.black };
  sD.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0,     w: 10, h: 0.06, fill: { color: C.gold }, line: { color: C.gold } });
  sD.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.gold }, line: { color: C.gold } });

  sD.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.22, w: 1.9, h: 0.42, fill: { color: C.gold }, line: { color: C.gold } });
  sD.addText(DESTAQUE.badge, { x: 0.5, y: 0.22, w: 1.9, h: 0.42, fontSize: 11, fontFace: F, bold: true, color: C.black, align: "center", valign: "middle", margin: 0, charSpacing: 2 });
  sD.addText(DESTAQUE.supertitle, { x: 0.5, y: 0.82, w: 9.0, h: 0.42, fontSize: 13, fontFace: F, color: C.gold, align: "left", margin: 0, charSpacing: 3 });
  sD.addText(DESTAQUE.titulo, { x: 0.5, y: 1.24, w: 9.0, h: 1.1, fontSize: 36, fontFace: F, bold: true, color: C.white, align: "left", margin: 0 });
  sD.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.45, w: 9.0, h: 0.04, fill: { color: "333333" }, line: { color: "333333" } });

  const cardX = [0.5, 3.57, 6.64];
  DESTAQUE.cards.forEach((card, i) => {
    const x = cardX[i];
    const mkS = () => ({ type: "outer", blur: 12, offset: 3, angle: 135, color: "000000", opacity: 0.4 });
    sD.addShape(pres.shapes.RECTANGLE, { x, y: 2.62, w: 2.85, h: 1.75, fill: { color: "252525" }, line: { color: C.gold, width: 0.8 }, shadow: mkS() });
    sD.addShape(pres.shapes.RECTANGLE, { x, y: 2.62, w: 2.85, h: 0.05, fill: { color: C.gold }, line: { color: C.gold } });
    sD.addText(card.emoji, { x, y: 2.68, w: 2.85, h: 0.52, fontSize: 22, align: "center", margin: 0 });
    sD.addText(card.label, { x, y: 3.18, w: 2.85, h: 0.28, fontSize: 9, fontFace: F, color: C.gold, align: "center", margin: 0, charSpacing: 2 });
    sD.addText(card.valor, { x, y: 3.44, w: 2.85, h: 0.8, fontSize: 12.5, fontFace: F, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
  });

  sD.addText(DESTAQUE.parceria, { x: 0.5, y: 4.55, w: 9.0, h: 0.35, fontSize: 11, fontFace: F, italic: true, color: "888888", align: "left", margin: 0 });
  sD.addText(DESTAQUE.link, { x: 0.5, y: 4.92, w: 9.0, h: 0.3, fontSize: 11, fontFace: F, color: C.gold, align: "left", margin: 0, hyperlink: { url: DESTAQUE.linkUrl } });
}

// ── SLIDE FINAL ───────────────────────────────────────────────
let sf = pres.addSlide();
sf.background = { color: C.black };
sf.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0,     w: 10, h: 0.06,  fill: { color: C.gold }, line: { color: C.gold } });
sf.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06,  fill: { color: C.gold }, line: { color: C.gold } });
sf.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.06,  w: 3.5, h: 5.505, fill: { color: C.gold }, line: { color: C.gold } });
sf.addImage({ data: LOGO_GOLD_PANEL, x: 0.05, y: 2.1, w: 3.2, h: 1.02 });

sf.addText("Obrigado!", { x: 3.9, y: 1.0, w: 5.8, h: 1.3, fontSize: 62, fontFace: F, bold: true, color: C.white, align: "left", margin: 0 });
sf.addShape(pres.shapes.RECTANGLE, { x: 3.9, y: 2.45, w: 4.5, h: 0.04, fill: { color: "3A3A3A" }, line: { color: "3A3A3A" } });
sf.addText(SITE, { x: 3.9, y: 2.65, w: 5.8, h: 0.45, fontSize: 16, fontFace: F, color: C.gold, align: "left", margin: 0 });
sf.addText([{ text: DIRETOR, options: { bold: true } }, { text: "   |   Diretor", options: { bold: false, color: "888888" } }], {
  x: 3.9, y: 3.35, w: 5.8, h: 0.42, fontSize: 13, fontFace: F, color: C.white, valign: "middle", align: "left", margin: 0
});
sf.addText([{ text: DIRETOR_ADJUNTO, options: { bold: true } }, { text: "   |   Diretor Adjunto", options: { bold: false, color: "888888" } }], {
  x: 3.9, y: 3.82, w: 5.8, h: 0.42, fontSize: 13, fontFace: F, color: C.white, valign: "middle", align: "left", margin: 0
});

// ── GRAVAR ────────────────────────────────────────────────────
const OUTPUT = path.join(DIR, "apresentacao_escola_pos.pptx");
pres.writeFile({ fileName: OUTPUT })
  .then(() => console.log("✅ Gerado:", OUTPUT))
  .catch(e => { console.error("❌ Erro:", e); process.exit(1); });
