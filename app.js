const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menú');
}
toggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.menu-category').forEach(category => {
      category.hidden = button.dataset.filter !== 'todos' && category.dataset.category !== button.dataset.filter;
    });
    const visibleItems = [...document.querySelectorAll('.menu-category:not([hidden]) .menu-item')].length;
    document.querySelector('#menu-status').textContent = `${button.textContent.trim()}: ${visibleItems} opciones.`;
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();
// Horario facilitado por el bar. Minutos desde medianoche; 1500 = 01:00 del día siguiente.
const openingHours = [null, [480, 1020], [480, 1020], [480, 1020], [480, 1380], [480, 1500], [480, 1500]];
const madridClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
});
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
function formatTime(minutes) {
  return `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}
function getOpeningStatus(date = new Date()) {
  const parts = Object.fromEntries(madridClock.formatToParts(date).map(part => [part.type, part.value]));
  const day = weekdays.indexOf(parts.weekday);
  const minute = Number(parts.hour) * 60 + Number(parts.minute);
  // Comprobar ayer permite que el domingo a las 00:30 siga contando como abierto el sábado.
  for (const offset of [-1, 0]) {
    const hours = openingHours[(day + offset + 7) % 7];
    if (hours && minute >= offset * 1440 + hours[0] && minute < offset * 1440 + hours[1]) {
      return { day, state: 'open', text: `Abierto ahora · Cerramos a las ${formatTime(hours[1])}` };
    }
  }
  for (let offset = 0; offset < 8; offset++) {
    const nextDay = (day + offset) % 7;
    const hours = openingHours[nextDay];
    if (hours && (offset > 0 || minute < hours[0])) {
      const when = offset === 0 ? 'hoy' : offset === 1 ? 'mañana' : `el ${dayNames[nextDay]}`;
      return { day, state: 'closed', text: `Cerrado · Abrimos ${when} a las ${formatTime(hours[0])}` };
    }
  }
}
function updateOpeningStatus() {
  const status = getOpeningStatus();
  document.querySelectorAll('[data-opening-status]').forEach(element => {
    if (element.textContent !== status.text) element.textContent = status.text;
    element.dataset.state = status.state;
  });
  document.querySelectorAll('.opening-hours [data-day]').forEach(row => {
    row.classList.toggle('today', Number(row.dataset.day) === status.day);
  });
}
updateOpeningStatus();
setInterval(updateOpeningStatus, 60000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) updateOpeningStatus(); });
const photoDialog = document.querySelector('.photo-dialog');
const enlargedPhoto = document.querySelector('.dialog-photo');
let lastPhotoButton;
document.querySelectorAll('.gallery-item').forEach(button => {
  button.addEventListener('click', () => {
    lastPhotoButton = button;
    const originalPhoto = button.querySelector('img');
    enlargedPhoto.replaceChildren();
    enlargedPhoto.style.backgroundImage = originalPhoto ? 'none' : '';
    enlargedPhoto.className = originalPhoto ? 'dialog-photo original-photo' : `dialog-photo ${button.dataset.photo}`;
    if (originalPhoto) {
      const fullPhoto = originalPhoto.cloneNode();
      fullPhoto.removeAttribute('loading');
      enlargedPhoto.append(fullPhoto);
    }
    const note = document.querySelector('.dialog-note');
    note.replaceChildren();
    if (button.dataset.origin === 'restaurantguru') {
      const source = document.createElement('a');
      source.href = 'https://es.restaurantguru.com/Comodo-Garrapinillos';
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      source.textContent = 'Fuente: galería de Cheff Cómodo en Restaurant Guru. Disponibilidad a consultar con el bar.';
      note.append(source);

    } else {
      note.textContent = 'Versión adaptada de la fotografía facilitada.';
    }
    enlargedPhoto.setAttribute('aria-label', button.dataset.caption);
    document.querySelector('#photo-caption').textContent = button.dataset.caption;
    photoDialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', event => {
  const bounds = photoDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) photoDialog.close();
});
photoDialog.addEventListener('close', () => lastPhotoButton?.focus());


// Señala la sección visible; los enlaces siguen funcionando como anclas nativas.
const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const pageSections = [...document.querySelectorAll('main > section[id]')];
let navigationFramePending = false;
function updateCurrentSection() {
  const headerBottom = document.querySelector('.header').getBoundingClientRect().bottom;
  const anchorOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const threshold = Math.max(headerBottom + 24, anchorOffset + 32);
  let current = pageSections[0].id;
  for (const section of pageSections) {
    if (section.getBoundingClientRect().top <= threshold) current = section.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
    current = pageSections[pageSections.length - 1].id;
  }
  for (const link of sectionLinks) {
    const active = link.hash === `#${current}`;
    link.classList.toggle('is-current', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  navigationFramePending = false;
}
window.addEventListener('scroll', () => {
  if (!navigationFramePending) {
    navigationFramePending = true;
    requestAnimationFrame(updateCurrentSection);
  }
}, { passive: true });
window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 1101px)').matches) closeMenu();
  updateCurrentSection();
});
window.addEventListener('load', updateCurrentSection);
updateCurrentSection();
