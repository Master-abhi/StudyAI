import os
import base64
from PIL import Image

src_path = r"C:\Users\hp\Downloads\CG_GURU.png"
base_dir = r"E:\Drive D\abhi's coding\New start"

img = Image.open(src_path).convert("RGBA")

# 1. PWA icons
pwa_sizes = {
    os.path.join(base_dir, "public", "icon-192.png"): (192, 192),
    os.path.join(base_dir, "public", "icon-512.png"): (512, 512),
}

for dest, (w, h) in pwa_sizes.items():
    resized = img.resize((w, h), Image.Resampling.LANCZOS)
    resized.save(dest, "PNG")
    print(f"Saved {dest}")

# 2. Favicons (SVG wrapper for base64 PNG)
favicon_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
scratch_dir = os.path.join(base_dir, "scratch")
os.makedirs(scratch_dir, exist_ok=True)
temp_png = os.path.join(scratch_dir, "temp_fav.png")
favicon_512.save(temp_png, "PNG")

with open(temp_png, "rb") as f:
    b64 = base64.b64encode(f.read()).decode("utf-8")

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,{b64}" width="512" height="512"/>
</svg>'''

fav_paths = [
    os.path.join(base_dir, "public", "favicon.svg"),
    os.path.join(base_dir, "mcq-practice", "public", "favicon.svg")
]

for p in fav_paths:
    with open(p, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Saved {p}")

if os.path.exists(temp_png):
    os.remove(temp_png)

# 3. Android mipmaps
android_res = os.path.join(base_dir, "mcq-practice", "android", "app", "src", "main", "res")

mipmap_dims = {
    "mipmap-mdpi": (48, 108),
    "mipmap-hdpi": (72, 162),
    "mipmap-xhdpi": (96, 216),
    "mipmap-xxhdpi": (144, 324),
    "mipmap-xxxhdpi": (192, 432),
}

for folder, (size, fg_size) in mipmap_dims.items():
    folder_path = os.path.join(android_res, folder)
    if os.path.exists(folder_path):
        res_img = img.resize((size, size), Image.Resampling.LANCZOS)
        res_img.save(os.path.join(folder_path, "ic_launcher.png"), "PNG")
        res_img.save(os.path.join(folder_path, "ic_launcher_round.png"), "PNG")
        
        fg_img = Image.new("RGBA", (fg_size, fg_size), (0, 0, 0, 0))
        logo_scale = int(fg_size * 0.72)
        scaled_logo = img.resize((logo_scale, logo_scale), Image.Resampling.LANCZOS)
        offset = (fg_size - logo_scale) // 2
        fg_img.paste(scaled_logo, (offset, offset), scaled_logo)
        fg_img.save(os.path.join(folder_path, "ic_launcher_foreground.png"), "PNG")
        print(f"Updated Android {folder}")

# 4. iOS AppIcon
ios_path = os.path.join(base_dir, "mcq-practice", "ios", "App", "App", "Assets.xcassets", "AppIcon.appiconset", "AppIcon-512@2x.png")
if os.path.exists(ios_path):
    ios_img = img.resize((1024, 1024), Image.Resampling.LANCZOS)
    ios_img.save(ios_path, "PNG")
    print(f"Updated iOS AppIcon at {ios_path}")

print("All icons successfully generated!")
