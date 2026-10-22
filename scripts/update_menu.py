"""Render the menu transcribed from the two photographs supplied by the user."""
from pathlib import Path
from html import escape
import json
import re

ROOT = Path(__file__).resolve().parents[1]
menu = json.loads((ROOT / 'assets/menu.json').read_text())
categories = menu['categories']
count = sum(len(c['items']) for c in categories)

def euro(cents):
    return f'{cents // 100},{cents % 100:02d} €'

parts = ['''<section id="carta" class="menu-section section" aria-labelledby="menu-title">
<div class="section-heading"><div><p class="eyebrow">LA CARTA DE CHEFF CÓMODO</p><h2 id="menu-title">ELIGE A TU GUSTO.<br><em>LO DEMÁS ES DISFRUTAR.</em></h2></div><p>Bocadillos, hamburguesas y mucho más.<br>Encuentra tu próximo favorito.</p></div>
<div class="menu-toolbar"><div class="filters" role="group" aria-label="Filtrar la carta">
<button class="filter active" data-filter="todos" aria-pressed="true" aria-controls="menu-content">Toda la carta</button>''']
for category in categories:
    parts.append(f'<button class="filter" data-filter="{category["id"]}" aria-pressed="false" aria-controls="menu-content">{escape(category["title"])}</button>')
parts.append(f'''</div><a class="menu-original-link" href="#carta-original">Ver carta original <svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a></div>
<p class="visually-hidden" id="menu-status" role="status">{count} opciones en la carta.</p><div id="menu-content" class="menu-categories">''')
for index, category in enumerate(categories, 1):
    parts.append(f'<section class="menu-category" data-category="{category["id"]}" aria-labelledby="menu-{category["id"]}"><div class="category-heading"><span>{index:02d}</span><h3 id="menu-{category["id"]}">{escape(category["title"])}</h3></div><ul class="menu-items">')
    for item in category['items']:
        description = f'<p>{escape(item["description"])}</p>' if item.get('description') else ''
        parts.append(f'<li class="menu-item"><div class="menu-item-copy"><h4>{escape(item["name"])}</h4>{description}</div><span class="menu-price" data-cents="{item["price_cents"]}">{euro(item["price_cents"])}</span></li>')
    parts.append('</ul></section>')
parts.append('''</div><p class="menu-note">Precios según la carta facilitada por el bar. Consulta la disponibilidad y la información de alérgenos antes de pedir.</p>
<div class="menu-originals" id="carta-original"><div class="originals-heading"><div><p class="eyebrow">TAL COMO LA ENCONTRARÁS EN EL BAR</p><h3>La carta, de primera mano.</h3></div><p>Fotografías originales facilitadas por el bar.<br>Pulsa para ampliar y consultar cada página.</p></div><div class="originals-grid">
<article class="original-card"><button class="gallery-item menu-original" data-origin="menu-original" data-caption="Carta original · Bocadillos, hamburguesas y tostadas" aria-label="Ampliar la carta original de bocadillos, hamburguesas y tostadas"><img src="assets/carta-bocadillos.jpg" width="718" height="1600" alt="Fotografía original de la carta de bocadillos, hamburguesas y tostadas, con ingredientes y precios" loading="lazy"><span class="gallery-label">Bocadillos, hamburguesas y tostadas <b>+</b></span></button><a href="assets/carta-bocadillos.jpg" download="carta-cheff-comodo-bocadillos.jpg">Descargar esta página <span aria-hidden="true">↓</span></a></article>
<article class="original-card"><button class="gallery-item menu-original" data-origin="menu-original" data-caption="Carta original · Ensaladas, raciones y platos especiales" aria-label="Ampliar la carta original de ensaladas, raciones y platos especiales"><img src="assets/carta-raciones.jpg" width="718" height="1600" alt="Fotografía original de la carta de ensaladas, raciones y platos especiales, con precios" loading="lazy"><span class="gallery-label">Ensaladas, raciones y platos especiales <b>+</b></span></button><a href="assets/carta-raciones.jpg" download="carta-cheff-comodo-raciones.jpg">Descargar esta página <span aria-hidden="true">↓</span></a></article>
</div></div></section>
''')
path = ROOT / 'index.html'
html = path.read_text()
html, replaced = re.subn(r'<section id="carta".*?(?=<section id="reservas")', lambda _: '\n'.join(parts), html, flags=re.S)
assert replaced == 1, 'Could not find the current menu section'
path.write_text(html)
print(f'Menu updated: {count} items in {len(categories)} categories, with 2 original photographs.')
