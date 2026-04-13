"""
gerar_logos.py
Processa a logo original da Escola de Pós UFG e gera duas versões em base64:
  - logo_dark_bg_b64.txt              → ícone dourado + texto branco (fundo escuro)
  - logo_black_icon_white_text_b64.txt → ícone preto + texto branco (painel dourado)

Uso:
  pip install Pillow numpy
  python gerar_logos.py
"""

from PIL import Image
import numpy as np
import base64
import os

INPUT = "logo_original.png"  # logo com fundo claro (off-white)

if not os.path.exists(INPUT):
    raise FileNotFoundError(f"Coloque a logo original como '{INPUT}' nesta pasta.")

img = Image.open(INPUT).convert("RGBA")
data = np.array(img, dtype=np.float32)
r, g, b = data[:,:,0], data[:,:,1], data[:,:,2]

# Máscara de fundo (pixels claros/off-white)
bg_mask   = (r > 210) & (g > 205) & (b > 195)

# Máscara do ícone dourado
gold_mask = (~bg_mask) & (r > 140) & (r < 230) & (g > 120) & (g < 200) & (b > 60) & (b < 140) & (r > b + 30)

# Máscara do texto (preto)
text_mask = ~bg_mask & ~gold_mask

def save_version(filename, icon_color, text_color):
    out = np.zeros_like(data)
    out[bg_mask] = [0, 0, 0, 0]                    # fundo: transparente
    out[gold_mask] = list(icon_color) + [255]       # ícone
    out[text_mask] = list(text_color) + [255]       # texto
    result = Image.fromarray(out.astype(np.uint8), "RGBA")
    result.save(filename.replace("_b64.txt", ".png"))
    with open(filename, "w") as f:
        with open(filename.replace("_b64.txt", ".png"), "rb") as img_f:
            f.write(base64.b64encode(img_f.read()).decode())
    print(f"✅ Gerado: {filename}")

# Versão 1: ícone dourado + texto branco → para fundo escuro
save_version("logo_dark_bg_b64.txt",
             icon_color=(195, 173, 115),   # #C3AD73
             text_color=(255, 255, 255))   # branco

# Versão 2: ícone preto + texto branco → para painel dourado
save_version("logo_black_icon_white_text_b64.txt",
             icon_color=(26, 26, 26),      # #1A1A1A
             text_color=(255, 255, 255))   # branco

print("\n✅ Logos prontas! Agora rode: node template_escola_pos.js")
