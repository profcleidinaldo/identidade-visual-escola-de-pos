"""
gerar_logos.py  –  Escola de Pós UFG
Gera as 3 versões da logo oficial a partir do arquivo de fundo claro.

Versões geradas:
  logo_fundo_escuro.png       → ícone dourado + texto branco  (slides fundo preto)
  logo_painel_dourado.png     → ícone preto  + texto branco  (painel dourado)
  logo_fundo_claro.png        → ícone dourado + texto preto   (slides fundo claro)
  + versões _b64.txt de cada uma (para uso no template_escola_pos.js)

Uso:
  pip install Pillow numpy
  python gerar_logos.py
"""

from PIL import Image
import numpy as np, base64, os

INPUT = "logos_reduzida-fundo-claros.png"
if not os.path.exists(INPUT):
    raise FileNotFoundError(f"Coloque '{INPUT}' nesta pasta.")

img = Image.open(INPUT).convert("RGBA")
data = np.array(img, dtype=np.float32)
r, g, b = data[:,:,0], data[:,:,1], data[:,:,2]

bg_mask   = (r > 230) & (g > 225) & (b > 215)
gold_mask = (~bg_mask) & (r>140) & (r<230) & (g>120) & (g<200) & (b>50) & (b<140) & (r > b+30)
text_mask = ~bg_mask & ~gold_mask

def save(fname, icon_color, text_color):
    out = np.zeros((*data.shape[:2], 4), dtype=np.uint8)
    out[bg_mask]   = [0, 0, 0, 0]
    out[gold_mask] = list(icon_color) + [255]
    out[text_mask] = list(text_color) + [255]
    Image.fromarray(out, "RGBA").save(fname)
    b64f = fname.replace(".png","_b64.txt")
    with open(b64f,"w") as f:
        with open(fname,"rb") as g: f.write(base64.b64encode(g.read()).decode())
    print(f"OK: {fname} + {b64f}")

save("logo_fundo_escuro.png",   (195,173,115), (255,255,255))
save("logo_painel_dourado.png", (26,26,26),    (255,255,255))
save("logo_fundo_claro.png",    (195,173,115), (26,26,26))
print("\nPronto! Rode: node template_escola_pos.js")
