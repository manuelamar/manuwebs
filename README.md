# Cheff Cómodo · Web del bar

Web estática adaptable a móvil. Diseño actual con tipografía de palo seco, negro y rojo teja, fotografías grandes y accesos a reservas. HTML, CSS y JavaScript, sin dependencias de compilación.

## Descargar y abrir

`cheff-comodo.html` es la web completa en un solo archivo, con diseño, imágenes y JavaScript integrados. Descárgalo y ábrelo con tu navegador; no requiere ZIP ni carpetas adicionales.

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

La web incluye una sección para reservar mesa por teléfono, accesos desde la portada, la navegación y la barra móvil, enlaces para llamar, indicaciones de Google Maps, horario semanal, galería ampliable, navegación móvil y filtros de carta. El día del horario se destaca usando Europe/Madrid; no se afirma disponibilidad en tiempo real.

## Imágenes

Los adjuntos se podían ver en el chat pero no estaban disponibles como archivos originales en el entorno. `assets/logo.png`, `assets/cristalera.png` y `assets/gallery.png` son versiones adaptadas mediante generación de imagen a partir de los adjuntos. No son los archivos originales y pueden tener diferencias. La web lo indica. Sustituir por los originales antes de la versión definitiva. Solo las imágenes adaptadas del local usan cuadrantes del archivo gallery.png. Las fotografías de platos son archivos JPEG individuales, sin generar ni retocar, descargados de la galería pública de Cheff Cómodo en Restaurant Guru; se ha contrastado el negocio por dirección y teléfono. Se conservan las marcas que contiene la fuente. assets/photo-sources.json registra la página, URL de imagen, identificador y hash de cada archivo. La galería y cada ampliación enlazan a la fuente. No implican disponibilidad actual de esos platos.

## Pendiente

Carta real, precios, alérgenos y archivos originales de las fotografías y el logo. Las reservas se gestionan exclusivamente por llamada al 976 97 95 85. No hay agenda, formulario ni recogida de solicitudes en la web. Los horarios de cocina y la disponibilidad se confirman con el bar. La web de referencia no se pudo consultar por la política de red.

## Facebook

Página facilitada por el usuario: https://www.facebook.com/p/Bar-Cheff-C%C3%B3modo-100087839375241/ . La vista pública confirma el nombre y la dirección y contiene «Ven a disfrutar y sobre todo a comer». Se incorpora un acceso directo y esa idea en la presentación. No se han podido leer publicaciones suficientes para inferir platos, ofertas o cambios de horario.

## Fotos de platos encontradas en Internet

Fuente: https://es.restaurantguru.com/Comodo-Garrapinillos . Se han añadido seis fotografías nuevas (pescado, pulpo, arroz, aguacate y dos postres) y se han sustituido las versiones generadas de ensaladilla y huevos por fotografías de la misma galería. Los JPEG se conservaron sin alteraciones. Los horarios del directorio difieren de los facilitados por el usuario: se mantienen los del usuario.

## Subir la carpeta a Netlify

Descarga `cheff-comodo-netlify.zip` y descomprímelo. Arrastra la carpeta `cheff-comodo-netlify`, la que contiene `index.html`, a https://app.netlify.com/drop . Incluye HTML, CSS, JavaScript, las imágenes utilizadas y `netlify.toml`; no necesita compilación ni variables de entorno. Conserva la estructura de carpetas.

Para regenerar el paquete después de editar la web: `python3 scripts/export_netlify.py`. La carpeta generada se ignora en Git y se entrega dentro del ZIP.
