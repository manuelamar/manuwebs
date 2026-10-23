# Cheff Cómodo · Web del bar

Web estática adaptable a móvil. Diseño actual en crema y burdeos, títulos de estilo editorial con Georgia, texto de lectura en Arial, fotografías reales y accesos a reservas. HTML, CSS y JavaScript, sin dependencias de compilación.

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
- Servicio de terraza y posibilidad de ver deportes.

La web incluye una sección para reservar mesa por teléfono, accesos desde la portada, la navegación y la barra móvil, enlaces para llamar, indicaciones de Google Maps, horario semanal, galería ampliable, navegación móvil y una carta real de 30 opciones con precios, ingredientes y filtros por categoría. El día del horario se destaca usando Europe/Madrid. El estado abierto/cerrado se calcula con el horario semanal publicado; no consulta cierres extraordinarios ni disponibilidad de mesas.

## Imágenes

El logo sigue siendo una versión adaptada del adjunto (`assets/logo.png`), convertida a WebP de 192 px para mostrarlo en cabecera y pie. Las fotografías visibles de fachada, terraza y platos proceden de la galería pública del propio bar en Restaurant Guru; se contrastó el negocio por dirección y teléfono. Las fotos de la fachada y terraza sustituyen las anteriores versiones generadas. Se conservan los JPEG originales y las marcas de la fuente. Los WebP mantienen dimensiones y contenido, con compresión de calidad 82. `assets/photo-sources.json` registra la fuente, identificador, hash del original y derivado utilizado. Las ampliaciones muestran la imagen completa y enlazan a su fuente. Estas fotos no implican disponibilidad actual de todos los platos. Los PNG antiguos del local se conservan como archivo, sin cargarlos ni incluirlos en las descargas actuales.

## Pendiente

Información de alérgenos y archivo original del logo. La carta y los precios ya están transcritos de las dos fotografías facilitadas por el usuario. Las reservas se gestionan exclusivamente por llamada al 976 97 95 85. No hay agenda, formulario ni recogida de solicitudes en la web. Los horarios de cocina y la disponibilidad se confirman con el bar. La web de referencia no se pudo consultar por la política de red.

## Facebook

Página facilitada por el usuario: https://www.facebook.com/p/Bar-Cheff-C%C3%B3modo-100087839375241/ . La vista pública confirma el nombre y la dirección y contiene «Ven a disfrutar y sobre todo a comer». Se incorpora un acceso directo y esa idea en la presentación. No se han podido leer publicaciones suficientes para inferir platos, ofertas o cambios de horario.

## Fotos de platos encontradas en Internet

Fuente: https://es.restaurantguru.com/Comodo-Garrapinillos . Se han añadido seis fotografías nuevas (pescado, pulpo, arroz, aguacate y dos postres) y se han sustituido las versiones generadas de ensaladilla y huevos por fotografías de la misma galería. Los JPEG se conservaron sin alteraciones. Los horarios del directorio difieren de los facilitados por el usuario: se mantienen los del usuario.

## Subir la carpeta a Netlify

Descarga `cheff-comodo-netlify.zip` y descomprímelo. Arrastra la carpeta `cheff-comodo-netlify`, la que contiene `index.html`, a https://app.netlify.com/drop . Incluye HTML, CSS, JavaScript, las imágenes utilizadas y `netlify.toml`; no necesita compilación ni variables de entorno. Conserva la estructura de carpetas.

Para regenerar el paquete después de editar la web: `python3 scripts/export_netlify.py`. La carpeta generada se ignora en Git y se entrega dentro del ZIP.

## Carta original facilitada por el bar

`assets/menu.json` recoge 30 opciones: 7 bocadillos, 3 hamburguesas, 2 tostadas, 3 ensaladas, 10 raciones y 5 platos especiales. Los precios se guardan en céntimos y proceden de las dos fotos aportadas. Se normalizan acentos y redacción sin cambiar ingredientes ni cantidades. No se inventan alérgenos ni ofertas.

Los originales sin editar se conservan como fuente de transcripción en `assets/carta-bocadillos.jpg` y `assets/carta-raciones.jpg`. A petición del usuario, no se muestran ni enlazan en la web y no se incluyen en los paquetes de descarga actualizados. Para reflejar cambios del JSON en el HTML: `python3 scripts/update_menu.py`. Después regenera las descargas: `python3 scripts/export_download.py` y `python3 scripts/export_netlify.py`.

## Navegación por secciones

La cabecera permanece visible e incluye enlaces a Inicio, El bar, Carta, Fotos, Contacto y horarios, y Reservas. El servicio de terraza y la posibilidad de ver deportes se indican en la presentación del bar y en los datos de contacto, sin sección ni entrada propia en el menú. En móvil y tablet se abre mediante un botón «Menú», se cierra al elegir una sección o pulsar Escape y destaca la sección visible. Las anclas respetan la altura de la cabecera.

## Mejoras de octubre de 2026

- Tres destacados con precios derivados de `assets/menu.json`: ensaladilla del chef (8,50 €), huevos rotos (11,50 €) y categoría bocadillos desde el precio mínimo de 8,00 €. La foto de bocadillo ilustra la categoría, sin atribuirle una receta concreta.
- Estado de apertura calculado en `Europe/Madrid`, actualizado cada minuto y al regresar a la pestaña. Respeta cierres de madrugada, domingo y cambio de hora; muestra el próximo inicio de horario. Es horario de apertura del bar, no de cocina.
- Metadatos Open Graph y Twitter con URL pública y tarjeta JPEG de 1200 × 630 (`assets/social-card.jpg`), compuesta con fotografía real del local. Las plataformas pueden conservar su vista previa anterior en caché.
- Todas las imágenes cargadas por la web están optimizadas. Peso total de imágenes referenciadas reducido de 6.693.824 a 1.481.849 bytes (77,9 %). La foto de portada tiene prioridad alta; las fotos inferiores se cargan al acercarse a ellas.

Se comprobaron límites de horario (incluidas las 00:30 y 01:00 del domingo), cambio de hora, visitantes de otra zona horaria, actualización automática, filtros y 30 platos, seis enlaces de navegación en móvil y ordenador, galería con fuentes, reservas solo por llamada y apertura sin red del HTML y de la carpeta exportados.

## Aspecto cálido y nueva portada

Portada con fotografía real de huevos rotos, precio de la carta, acceso directo a la carta y llamada para reservar. Paleta crema, carbón cálido y burdeos; títulos con Georgia (serif de sistema) y cuerpo en Arial, sin descargar fuentes externas. La carta usa separadores finos, cifras alineadas y filtros redondeados. La galería muestra fotografías completas en marcos del mismo tamaño y pies de foto fuera de la imagen. Las transiciones suaves respetan `prefers-reduced-motion`. Terraza y deportes siguen apareciendo solo como información de servicios, sin entrada en el menú.

Comprobado a 1440, 1100, 900, 760, 390, 360 y 320 px: navegación, ausencia de desbordamientos, carta con los 30 nombres y precios del JSON, filtros, galería ampliable, horarios y reservas solo por llamada. Descargas HTML y ZIP regeneradas con el mismo diseño; HTML comprobado con todas las peticiones de red bloqueadas.
