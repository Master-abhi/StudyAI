import os
from PIL import Image, ImageDraw

BASE_RES = r"E:\Drive D\abhi's coding\New start\mcq-practice\android\app\src\main\res"
LOGO_PATH = r"E:\Drive D\abhi's coding\New start\CG GURU logo.png"

# App dark background color
BG_COLOR = (18, 22, 32, 255) # #121620

def create_splash_images():
    raw_logo = Image.open(LOGO_PATH).convert("RGBA")
    bbox = raw_logo.getbbox()
    if bbox:
        logo = raw_logo.crop(bbox)
    else:
        logo = raw_logo

    splash_specs = [
        ('drawable/splash.png', 480, 480),
        ('drawable-land-mdpi/splash.png', 480, 320),
        ('drawable-land-hdpi/splash.png', 800, 480),
        ('drawable-land-xhdpi/splash.png', 1280, 720),
        ('drawable-land-xxhdpi/splash.png', 1600, 960),
        ('drawable-land-xxxhdpi/splash.png', 1920, 1280),
        ('drawable-port-mdpi/splash.png', 320, 480),
        ('drawable-port-hdpi/splash.png', 480, 800),
        ('drawable-port-xhdpi/splash.png', 720, 1280),
        ('drawable-port-xxhdpi/splash.png', 960, 1600),
        ('drawable-port-xxxhdpi/splash.png', 1280, 1920),
    ]

    for rel_path, target_w, target_h in splash_specs:
        out_path = os.path.join(BASE_RES, rel_path.replace('/', os.sep))
        os.makedirs(os.path.dirname(out_path), exist_ok=True)

        canvas = Image.new("RGBA", (target_w, target_h), BG_COLOR)

        # For Android 12 animated icon in drawable/splash.png, keep inside safe zone ~50-55%
        if 'drawable' + os.sep + 'splash.png' in out_path or 'drawable/splash.png' in rel_path:
            max_size = int(min(target_w, target_h) * 0.52)
        else:
            max_size = int(min(target_w, target_h) * 0.45)

        # Scale logo maintaining aspect ratio
        w_ratio = max_size / logo.width
        h_ratio = max_size / logo.height
        scale = min(w_ratio, h_ratio)
        new_w = int(logo.width * scale)
        new_h = int(logo.height * scale)

        scaled_logo = logo.resize((new_w, new_h), Image.Resampling.LANCZOS)

        pos_x = (target_w - new_w) // 2
        pos_y = (target_h - new_h) // 2

        canvas.paste(scaled_logo, (pos_x, pos_y), scaled_logo)
        canvas.save(out_path, "PNG")
        print(f"Generated splash: {rel_path} ({target_w}x{target_h}) -> Logo size: {new_w}x{new_h}")

def create_launcher_icons():
    raw_logo = Image.open(LOGO_PATH).convert("RGBA")
    bbox = raw_logo.getbbox()
    if bbox:
        logo = raw_logo.crop(bbox)
    else:
        logo = raw_logo

    mipmap_specs = [
        ('mipmap-mdpi', 48, 108),
        ('mipmap-hdpi', 72, 162),
        ('mipmap-xhdpi', 96, 216),
        ('mipmap-xxhdpi', 144, 324),
        ('mipmap-xxxhdpi', 192, 432),
    ]

    for folder, icon_size, fg_size in mipmap_specs:
        folder_path = os.path.join(BASE_RES, folder)
        os.makedirs(folder_path, exist_ok=True)

        # 1. ic_launcher_foreground.png (transparent background, logo in safe zone 66%)
        fg_canvas = Image.new("RGBA", (fg_size, fg_size), (0, 0, 0, 0))
        max_fg = int(fg_size * 0.62)
        scale = min(max_fg / logo.width, max_fg / logo.height)
        new_w = int(logo.width * scale)
        new_h = int(logo.height * scale)
        scaled_logo = logo.resize((new_w, new_h), Image.Resampling.LANCZOS)
        pos_x = (fg_size - new_w) // 2
        pos_y = (fg_size - new_h) // 2
        fg_canvas.paste(scaled_logo, (pos_x, pos_y), scaled_logo)
        fg_canvas.save(os.path.join(folder_path, "ic_launcher_foreground.png"), "PNG")

        # 2. ic_launcher.png (square / rounded with BG_COLOR)
        icon_canvas = Image.new("RGBA", (icon_size, icon_size), BG_COLOR)
        max_ic = int(icon_size * 0.72)
        scale_ic = min(max_ic / logo.width, max_ic / logo.height)
        ic_w = int(logo.width * scale_ic)
        ic_h = int(logo.height * scale_ic)
        scaled_ic_logo = logo.resize((ic_w, ic_h), Image.Resampling.LANCZOS)
        pos_x = (icon_size - ic_w) // 2
        pos_y = (icon_size - ic_h) // 2
        icon_canvas.paste(scaled_ic_logo, (pos_x, pos_y), scaled_ic_logo)
        icon_canvas.save(os.path.join(folder_path, "ic_launcher.png"), "PNG")

        # 3. ic_launcher_round.png (circle mask with BG_COLOR)
        round_canvas = Image.new("RGBA", (icon_size, icon_size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(round_canvas)
        draw.ellipse([(0, 0), (icon_size - 1, icon_size - 1)], fill=BG_COLOR)
        round_canvas.paste(scaled_ic_logo, (pos_x, pos_y), scaled_ic_logo)
        round_canvas.save(os.path.join(folder_path, "ic_launcher_round.png"), "PNG")

        print(f"Generated icons for {folder}: icon {icon_size}x{icon_size}, fg {fg_size}x{fg_size}")

if __name__ == "__main__":
    create_splash_images()
    create_launcher_icons()
    print("All splash and icon drawables generated successfully! ✅")
