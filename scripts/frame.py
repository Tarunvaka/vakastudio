# Puts LastMark screenshots into Apple's iPhone 16 Pro Max frame (Apple Design Resources PSD).
# uv run --no-project --with psd-tools python -I scripts/frame.py "<frame>.psd" src/assets/img phone-light=<light.jpg> phone-dark=<dark.jpg>
import sys
from psd_tools import PSDImage
from PIL import Image, ImageDraw
psd_path, out_dir = sys.argv[1], sys.argv[2]
shots = sys.argv[3:]  # name=path pairs
psd = PSDImage.open(psd_path)
W, H = psd.size
layers = {l.name: l for l in psd}
def full(layer):
    img = layer.composite()
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    canvas.paste(img, layer.bbox[:2], img)
    return canvas
hw = full(layers["Hardware"])
screen = full(layers["Screen"])
mask = screen.split()[3]
x0, y0, x1, y1 = layers["Screen"].bbox
# Dynamic Island: a pill centred on the device, drawn at 4x and scaled down for smooth edges
SS = 4
big = Image.new("L", (W * SS, H * SS), 0)
ImageDraw.Draw(big).rounded_rectangle((549 * SS, 108 * SS, 921 * SS, 216 * SS), radius=54 * SS, fill=255)
island = big.resize((W, H), Image.LANCZOS)
for pair in shots:
    name, path = pair.split("=", 1)
    s = Image.open(path).convert("RGBA").resize((x1 - x0, y1 - y0), Image.LANCZOS)
    # hardware first, then the screenshot clipped to the screen, then the island back on top
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0)); layer.paste(s, (x0, y0))
    canvas = hw.copy()
    canvas.paste(layer, (0, 0), mask)
    canvas.paste(hw, (0, 0), island)
    small = canvas.resize((760, round(760 * H / W)), Image.LANCZOS)
    small.save(f"{out_dir}/{name}.webp", "WEBP", quality=88, method=6)
    print(name, small.size)
