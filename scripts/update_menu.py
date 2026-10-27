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
''']
items_by_name = {item['name']: item for category in categories for item in category['items']}
featured = [
    ('Ensaladilla del chef', items_by_name['Ensaladilla del chef']['price_cents'], 'ensaladilla', 553,
     'Una ración para abrir boca y compartir.', False),
    ('Huevos rotos', items_by_name['Huevos rotos']['price_cents'], 'huevos', 900,
     items_by_name['Huevos rotos']['description'], False),
    ('Bocadillos', min(item['price_cents'] for category in categories if category['id'] == 'bocadillos' for item in category['items']),
     'bocadillo', 900, 'Ramos, Busquets, Del Bosque y más. Elige el tuyo en la carta.', True),
]
parts.append('<details class="content-disclosure" id="menu-disclosure"><summary><span class="disclosure-show">Ver carta y precios</span><span class="disclosure-hide">Ocultar carta</span><span class="disclosure-icon" aria-hidden="true">+</span></summary><div class="disclosure-content" id="menu-disclosure-content">')
parts.append('<h3 class="featured-heading">PARA IR ABRIENDO BOCA</h3><div class="featured-grid" aria-label="Destacados de la carta">')
for title, cents, photo, height, description, starting_price in featured:
    qualifier = '<small>Desde</small>' if starting_price else ''
    parts.append(f'<article class="featured-card"><img src="assets/{photo}.webp" width="1200" height="{height}" loading="lazy" decoding="async" alt="{escape(title)}, fotografía publicada en la galería del bar"><div class="featured-copy"><div class="featured-top"><h4>{escape(title)}</h4><span class="featured-price" data-cents="{cents}">{qualifier}{euro(cents)}</span></div><p>{escape(description)}</p></div></article>')
parts.append('''</div><div class="menu-toolbar"><div class="filters" role="group" aria-label="Filtrar la carta">
<button class="filter active" data-filter="todos" aria-pressed="true" aria-controls="menu-content">Toda la carta</button>''')
for category in categories:
    parts.append(f'<button class="filter" data-filter="{category["id"]}" aria-pressed="false" aria-controls="menu-content">{escape(category["title"])}</button>')
parts.append(f'''</div></div>
<p class="visually-hidden" id="menu-status" role="status">{count} opciones en la carta.</p><div id="menu-content" class="menu-categories">''')
for index, category in enumerate(categories, 1):
    parts.append(f'<section class="menu-category" data-category="{category["id"]}" aria-labelledby="menu-{category["id"]}"><div class="category-heading"><span>{index:02d}</span><h3 id="menu-{category["id"]}">{escape(category["title"])}</h3></div><ul class="menu-items">')
    for item in category['items']:
        description = f'<p>{escape(item["description"])}</p>' if item.get('description') else ''
        parts.append(f'<li class="menu-item"><div class="menu-item-copy"><h4>{escape(item["name"])}</h4>{description}</div><span class="menu-price" data-cents="{item["price_cents"]}">{euro(item["price_cents"])}</span></li>')
    parts.append('</ul></section>')
parts.append('''</div><p class="menu-note">Precios según la carta facilitada por el bar. Consulta la disponibilidad y la información de alérgenos antes de pedir.</p>
</div></details>
</section>
''')
path = ROOT / 'index.html'
html = path.read_text()
html, replaced = re.subn(r'<section id="carta".*?(?=<section id="reservas")', lambda _: '\n'.join(parts), html, flags=re.S)
assert replaced == 1, 'Could not find the current menu section'
path.write_text(html)
print(f'Menu updated: {count} items in {len(categories)} categories, without displaying the source photographs.')
