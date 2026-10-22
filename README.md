# Cheff Cómodo · Web del bar

Web estática adaptable a móvil. HTML, CSS y JavaScript, sin dependencias de compilación.

## Descargar y abrir

`cheff-comodo-web.zip` contiene un `index.html` autosuficiente: incluye el diseño, las imágenes y los botones. Extrae ese archivo y ábrelo con Chrome, Edge, Firefox o Safari. No necesita carpetas adicionales ni conexión a Internet para mostrar el contenido. La vista previa del gestor de archivos puede no ejecutar páginas web: usa un navegador.

Para regenerar la descarga después de editar el código: `python3 scripts/export_download.py`. El HTML generado también queda en `dist/index.html`.

## Desarrollo

Desde `/workspace/manuwebs`:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Verificación interna: `curl -f http://127.0.0.1:8000/` y `node --check app.js`.

## Datos facilitados por el usuario

- Av. Jota, 18, 50190 Garrapinillos, Zaragoza.
- Teléfono: 976 97 95 85.
- Lunes, martes y miércoles: 08:00–17:00.
- Jueves: 08:00–23:00.
- Viernes y sábado: 08:00–01:00 del día siguiente.
- Domingo: cerrado.
- Terraza y espacio ideal para ver deportes.

La web incluye enlaces para llamar, indicaciones de Google Maps, horario semanal, galería ampliable, navegación móvil y filtros de carta. El día del horario se destaca usando Europe/Madrid; no se afirma disponibilidad en tiempo real.

## Imágenes

Los adjuntos se podían ver en el chat pero no estaban disponibles como archivos originales en el entorno. `assets/logo.png`, `assets/cristalera.png` y `assets/gallery.png` son versiones adaptadas mediante generación de imagen a partir de los adjuntos. No son los archivos originales y pueden tener diferencias. La web lo indica. Sustituir por los originales antes de la versión definitiva. La galería usa cuatro cuadrantes de un único archivo.

## Pendiente

Carta real, precios, alérgenos y archivos originales de las fotografías y el logo. No hay reservas ni formularios conectados. La web de referencia no se pudo consultar por la política de red.
