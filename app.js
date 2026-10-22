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
    enlargedPhoto.className = `dialog-photo ${button.dataset.photo}`;
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

// La agenda prepara una propuesta; no envía ni confirma reservas por su cuenta.
const bookingForm = document.querySelector('#booking-form');
const bookingDate = document.querySelector('#booking-date');
const bookingTime = document.querySelector('#booking-time');
const bookingError = document.querySelector('#booking-error');
const bookingResult = document.querySelector('#booking-result');
function madridDateTime() {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(new Date()).map(part => [part.type, part.value]));
  return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` };
}
bookingDate.min = madridDateTime().date;
function refreshBookingTimes() {
  const meal = bookingForm.elements.meal.value;
  const times = meal === 'comida'
    ? ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30']
    : ['20:00', '20:30', '21:00', '21:30', '22:00'];
  bookingTime.replaceChildren(...times.map(time => new Option(time, time, false, time === (meal === 'comida' ? '14:00' : '21:00'))));
}
refreshBookingTimes();
bookingForm.addEventListener('input', event => {
  bookingError.hidden = true;
  bookingResult.hidden = true;
  if (event.target.name === 'meal') refreshBookingTimes();
});
bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  bookingError.hidden = true;
  bookingResult.hidden = true;
  const now = madridDateTime();
  bookingDate.min = now.date;
  const date = bookingDate.value;
  const time = bookingTime.value;
  const meal = bookingForm.elements.meal.value;
  const guests = Number(bookingForm.elements.guests.value);
  const weekday = new Date(`${date}T12:00:00Z`).getUTCDay();
  let error = '';
  if (!date || date < now.date) error = 'Elige una fecha de hoy en adelante.';
  else if (weekday === 0) error = 'Los domingos estamos cerrados. Elige otro día.';
  else if (meal === 'cena' && weekday >= 1 && weekday <= 3) error = 'De lunes a miércoles cerramos a las 17:00. Elige una comida o una cena de jueves a sábado.';
  else if (date === now.date && time <= now.time) error = 'Esa hora ya ha pasado. Elige una hora posterior o una fecha distinta.';
  else if (!Number.isSafeInteger(guests) || guests < 1) error = 'Indica un número entero de personas, como mínimo una.';
  if (error) {
    bookingError.textContent = error;
    bookingError.hidden = false;
    return;
  }
  const readableDate = new Intl.DateTimeFormat('es-ES', {
    timeZone: 'Europe/Madrid', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date(`${date}T12:00:00Z`));
  document.querySelector('#booking-summary').textContent = `${meal === 'comida' ? 'Comida' : 'Cena'} para ${guests} ${guests === 1 ? 'persona' : 'personas'}, el ${readableDate} a las ${time}.`;
  bookingResult.hidden = false;
});
