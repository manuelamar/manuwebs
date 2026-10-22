"""Package the static site in a folder ready for a manual Netlify deployment."""
from pathlib import Path
import re
import shutil
import zipfile

ROOT = Path(__file__).resolve().parents[1]
FOLDER = ROOT / 'cheff-comodo-netlify'
FOLDER.mkdir(exist_ok=True)

html = (ROOT / 'index.html').read_text()
css = (ROOT / 'styles.css').read_text()
assets = set(re.findall(r'''(?:src|href)=["'](assets/[^"']+)["']''', html))
assets.update(re.findall(r'''url\(["']?(assets/[^\s)"']+)["']?\)''', css))
assets.update(['assets/photo-sources.json', 'assets/menu.json'])
files = ['index.html', 'styles.css', 'app.js', *sorted(assets)]
for name in files:
    source = (ROOT / name).resolve()
    if not source.is_relative_to(ROOT):
        raise ValueError(f'Unexpected path: {name}')
    destination = FOLDER / name
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, destination)

(FOLDER / 'netlify.toml').write_text('[build]\n  publish = "."\n')
(FOLDER / 'LEEME-NETLIFY.txt').write_text('''CHEFF CÓMODO - WEB LISTA PARA NETLIFY

1. Descomprime cheff-comodo-netlify.zip.
2. Abre https://app.netlify.com/drop e inicia sesión en tu cuenta.
3. Arrastra la carpeta cheff-comodo-netlify completa, la que contiene index.html.
4. Espera a que Netlify termine y abre el enlace público que te proporcione.

No necesitas instalar dependencias, ejecutar un build ni configurar variables.
Conserva styles.css, app.js y la carpeta assets junto a index.html.
También puedes abrir index.html localmente después de descomprimir toda la carpeta.

Contenido: HTML, CSS, JavaScript, imágenes, fuentes de las fotos y netlify.toml.
Reservas únicamente por llamada al 976 97 95 85.
Las fotos de platos enlazan a su fuente. Logo e imágenes del local son versiones adaptadas.
''')
files.extend(['netlify.toml', 'LEEME-NETLIFY.txt'])
archive = ROOT / 'cheff-comodo-netlify.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as bundle:
    for name in files:
        bundle.write(FOLDER / name, f'{FOLDER.name}/{name}')
with zipfile.ZipFile(archive) as bundle:
    assert bundle.testzip() is None
    assert len(bundle.namelist()) == len(files)
print(f'Netlify: {len(files)} files, folder {FOLDER.name}, ZIP {archive.stat().st_size:,} bytes.')
