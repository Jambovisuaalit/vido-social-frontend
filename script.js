const mobileStyles = document.createElement('link');
mobileStyles.rel = 'stylesheet';
mobileStyles.href = '/mobile-v2.css';
document.head.appendChild(mobileStyles);

const header = document.querySelector('[data-header]');
const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 20);
onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('[data-package]').forEach((link) => {
  link.addEventListener('click', () => {
    const select = document.getElementById('package-select');
    if (select) select.value = link.dataset.package;
  });
});

const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12, rootMargin: '0px 0px -40px'}) : null;

document.querySelectorAll('.reveal').forEach((el) => {
  if (revealObserver) revealObserver.observe(el); else el.classList.add('visible');
});

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  const params = new URLSearchParams(window.location.search);
  ['utm_source', 'utm_medium', 'utm_campaign'].forEach((name) => {
    const field = form.elements.namedItem(name);
    if (field) field.value = params.get(name) || '';
  });
  const pageUrl = form.elements.namedItem('page_url');
  if (pageUrl) pageUrl.value = window.location.href;
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const button = form.querySelector('button[type="submit"]');
  const data = Object.fromEntries(new FormData(form).entries());
  const idleLabel = button.innerHTML;
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  button.textContent = 'Lähetetään…';
  status.textContent = '';
  delete status.dataset.state;
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Viestin lähetys epäonnistui.');
    form.reset();
    status.dataset.state = 'success';
    status.textContent = 'Kiitos. Yhteydenottopyyntö on lähetetty.';
  } catch (error) {
    status.dataset.state = 'error';
    status.textContent = `${error.message} Voit lähettää viestin myös osoitteeseen ville@vidosocial.com.`;
  } finally {
    button.disabled = false;
    button.removeAttribute('aria-busy');
    button.innerHTML = idleLabel;
  }
});
