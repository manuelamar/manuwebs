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

## Carta y fotos desplegables

Se conserva el diseño de la versión `01460bf` (negro y rojo teja, portada con fachada), elegido por el usuario. La carta y la galería están cerradas al cargar y solo muestran el contenido al activar «Ver carta y precios» o «Ver fotos del bar». Son desplegables nativos `details`/`summary`: funcionan con ratón, pantalla táctil y teclado, incluso sin JavaScript. Se pueden abrir o cerrar por separado. Los enlaces de la cabecera llevan al apartado sin abrirlo automáticamente. Los 30 platos con precios, filtros y destacados permanecen dentro del desplegable de la carta; las diez fotos y su ampliación, dentro del de la galería. La regeneración de la carta conserva el desplegable.

## Cookies y documentación legal

Revisión técnica del 27/10/2026: el código no usa cookies, localStorage, sessionStorage, IndexedDB, service workers, analítica, píxeles, fuentes remotas ni contenido de terceros incrustado. Se comprobó la navegación y la apertura de la carta, galería y ampliación en un navegador sobre el código local; los quince recursos solicitados se contrastaron por hash con sus versiones públicas y sus cabeceras HTTPS no incluyeron Set-Cookie. No se han añadido un banner de consentimiento, una cookie de aceptación ni un gestor externo que no correspondan al uso real. El pie contiene «Cookies y navegación», disponible también sin JavaScript y en el HTML autosuficiente.

Las fotos se alojan localmente; Google Maps, Facebook y Restaurant Guru se abren solo al seguir sus enlaces. GitHub Pages registra IP por seguridad según su documentación; no confundir ausencia de cookies con ausencia de todo tratamiento de datos. Si cambia el alojamiento, revisar este texto. Si se añaden analítica o contenidos incrustados no exentos, bloquearlos hasta consentimiento y ofrecer aceptar y rechazar con la misma facilidad; no basta con un aviso informativo.

**Pendiente de datos del titular:** no se ha publicado un aviso legal ni una política de privacidad completa con identidades inventadas. El usuario indica que no conoce la razón social/nombre del responsable, NIF, correo de contacto ni datos registrales. Pedirlos al titular o su gestoría; suelen constar parcialmente en facturas o tickets. Confirmar domicilio del prestador, datos de autorización administrativa y registro cuando correspondan, y si los precios incluyen los impuestos aplicables. Para privacidad, confirmar además quién gestiona las reservas telefónicas, datos recogidos, finalidades, bases jurídicas, plazos de conservación, destinatarios/proveedores, transferencias que procedan y canal de derechos. No asumir plazos ni bases jurídicas sin conocer la operativa. La información técnica de cookies no sustituye esos documentos.

Fuentes oficiales consultadas:

- AEPD, Guía sobre el uso de las cookies, edición mayo de 2024, disponible al revisar: https://www.aepd.es/guias/guia-cookies.pdf .
- LSSI, información general del artículo 10 y almacenamiento/acceso del artículo 22.2: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758 .
- GitHub Pages, recogida de IP por seguridad: https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection .
- Declaración de privacidad del alojamiento: https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement .
