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
    document.querySelectorAll('.food-card').forEach(card => {
      card.hidden = button.dataset.filter !== 'todos' && card.dataset.category !== button.dataset.filter;
    });
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();
// Destaca el día local del negocio, también si el visitante está en otra zona.
const localWeekday = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Madrid', weekday: 'short' }).format(new Date());
const businessDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(localWeekday);
const todayRow = document.querySelector(`.opening-hours [data-day="${businessDay}"]`);
if (todayRow) todayRow.classList.add('today');
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
