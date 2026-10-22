"""Build the downloadable website as a self-contained HTML file, using Python 3."""
from pathlib import Path
import base64
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]

def inline_asset(name):
    path = (ROOT / name).resolve()
    if not path.is_relative_to(ROOT / 'assets'):
        raise ValueError(f'Unexpected asset path: {name}')
    mime = {'png': 'image/png', 'jpg': 'image/jpeg', 'webp': 'image/webp'}[path.suffix[1:]]
    return f'data:{mime};base64,' + base64.b64encode(path.read_bytes()).decode('ascii')

html = (ROOT / 'index.html').read_text()
css = (ROOT / 'styles.css').read_text()
assert '@import' not in css, 'Download must not depend on remote stylesheets'
# Keep embedded images out of custom properties: browsers cap expanded variable
# values, so a multi-megabyte data URL can otherwise silently lose the image.
css, gallery_declarations = re.subn(r':root\{--gallery-image:url\("assets/gallery.png"\)\}', '', css)
assert gallery_declarations == 1, 'Gallery variable declaration changed'
css = css.replace('var(--gallery-image)', 'url("' + inline_asset('assets/gallery.png') + '")')
css = re.sub(r'''url\(["']?(assets/[^\s\)"']+)["']?\)''', lambda m: 'url("' + inline_asset(m[1]) + '")', css)
html, stylesheet_count = re.subn(r'<link rel="stylesheet" href="styles\.css(?:\?[^"]*)?">', lambda _: '<style>' + css + '</style>', html)
html, script_count = re.subn(r'<script src="app\.js(?:\?[^"]*)?" defer></script>', '', html)
assert stylesheet_count == script_count == 1, 'Source HTML format changed; update exporter'
html = re.sub(r'(src|href)="(assets/[^\"]+)"', lambda m: m[1] + '="' + inline_asset(m[2]) + '"', html)
html = html.replace('</body>', '<script>' + (ROOT / 'app.js').read_text() + '</script></body>')
assert 'src="assets/' not in html and 'href="assets/' not in html and 'url("assets/' not in html
output = ROOT / 'dist'
output.mkdir(exist_ok=True)
(output / 'index.html').write_text(html)
(ROOT / 'cheff-comodo.html').write_text(html)
with zipfile.ZipFile(ROOT / 'cheff-comodo-web.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    archive.writestr('index.html', html)
    archive.writestr('LEEME.txt', 'CHEFF COMODO\n\nExtrae index.html y abrelo con Chrome, Edge, Firefox o Safari.\nEl diseno, las imagenes y los botones estan integrados en ese unico archivo.\nNo necesita otras carpetas ni conexion a Internet. Llamadas y Google Maps requieren sus servicios habituales.\nSi tu gestor de archivos solo muestra una vista previa, elige Abrir con un navegador.\n')
with zipfile.ZipFile(ROOT / 'cheff-comodo-web.zip') as archive:
    assert archive.testzip() is None
print('Download rebuilt: index.html includes styles, images and JavaScript.')
