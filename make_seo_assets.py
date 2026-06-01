"""Generate favicon set + OG share image for Bonnie Mara Animal Hospital."""
from PIL import Image, ImageDraw, ImageFont, ImageChops
import os

PROJ = os.path.dirname(os.path.abspath(__file__))
LOGO = os.path.join(PROJ, "assets/logo/logo-page-1.png")
IMG  = os.path.join(PROJ, "assets/images")
os.makedirs(IMG, exist_ok=True)

FONTS = "C:/Users/brees/AppData/Local/Programs/RingCentral/resources/app.asar.unpacked/node_modules/@ringcentral/rcvnc-jupiter-connector/app/current/resource/fonts/"
def f(name, size):
    return ImageFont.truetype(FONTS + name, size)

# Palette
NAVY  = (27, 47, 71)     # --ink-night #1B2F47
DEEP  = (42, 67, 96)     # --ink-deep  #2A4360
SEA   = (201, 216, 230)  # --sea-pale  #C9D8E6
CREAM = (249, 245, 238)  # --cream     #F9F5EE

# ---------- 1. Autocrop logo to the seal ----------
logo = Image.open(LOGO).convert("RGBA")
rgb = logo.convert("RGB")
bg = Image.new("RGB", rgb.size, (255, 255, 255))
diff = ImageChops.difference(rgb, bg)
bbox = diff.getbbox()
seal = logo.crop(bbox)
# pad to square
w, h = seal.size
side = max(w, h)
sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
sq.paste(seal, ((side - w) // 2, (side - h) // 2), seal)
seal = sq

def circle_mask(size):
    m = Image.new("L", (size * 4, size * 4), 0)
    d = ImageDraw.Draw(m)
    d.ellipse((0, 0, size * 4, size * 4), fill=255)
    return m.resize((size, size), Image.LANCZOS)

# ---------- 2. Favicon set (transparent circular) ----------
def make_icon(size):
    s = seal.resize((size, size), Image.LANCZOS)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(s, (0, 0), s)
    out.putalpha(circle_mask(size))
    return out

for sz in (16, 32, 48, 180, 192, 512):
    make_icon(sz).save(os.path.join(IMG, f"favicon-{sz}.png"))
# Multi-resolution .ico at project root
ico = make_icon(64)
ico.save(os.path.join(PROJ, "favicon.ico"),
         sizes=[(16, 16), (32, 32), (48, 48)])
# apple-touch (opaque cream bg, iOS ignores transparency)
at = Image.new("RGBA", (180, 180), CREAM + (255,))
s = seal.resize((164, 164), Image.LANCZOS)
at.paste(s, (8, 8), s)
at.convert("RGB").save(os.path.join(IMG, "apple-touch-icon.png"), quality=92)

# ---------- 3. OG share image 1200x630 ----------
W, H = 1200, 630
og = Image.new("RGB", (W, H), NAVY)
# vertical gradient navy -> deep
top = Image.new("RGB", (W, H), DEEP)
mask = Image.new("L", (1, H))
for y in range(H):
    mask.putpixel((0, y), int(255 * (y / H)))
og = Image.composite(top, og, mask.resize((W, H)))
d = ImageDraw.Draw(og)

# seal on left
SEAL = 300
s = make_icon(SEAL)
sx, sy = 90, (H - SEAL) // 2
og.paste(s, (sx, sy), s)

# text block right
tx = sx + SEAL + 70
def letterspace(draw, pos, text, font, fill, ls):
    x, y = pos
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + ls

# eyebrow
letterspace(d, (tx, 168), "SANTA BARBARA, CALIFORNIA", f("Inter-SemiBold.ttf", 22), SEA, 4)
# title (two lines)
d.text((tx, 210), "Bonnie Mara", font=f("Inter-ExtraBold.ttf", 72), fill=CREAM)
d.text((tx, 286), "Animal Hospital", font=f("Inter-ExtraBold.ttf", 72), fill=CREAM)
# divider
d.rectangle((tx, 384, tx + 120, 388), fill=SEA)
# subtitle
d.text((tx, 410), "A new kind of animal hospital", font=f("Inter-Medium.ttf", 30), fill=SEA)
d.text((tx, 448), "for dogs and cats.", font=f("Inter-Medium.ttf", 30), fill=SEA)
# opening tag
d.text((tx, 504), "OPENING SUMMER 2026", font=f("Inter-Bold.ttf", 24), fill=CREAM)

og.save(os.path.join(IMG, "og-bmah.jpg"), quality=90)

print("DONE")
print("favicon.ico + favicon-{16,32,48,180,192,512}.png + apple-touch-icon.png")
print("og-bmah.jpg", og.size)
