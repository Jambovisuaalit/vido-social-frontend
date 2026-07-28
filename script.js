const header = document.querySelector('[data-header]');
const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 20);
onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

document.getElementById('year').textContent = new Date().getFullYear();

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
form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const button = form.querySelector('button[type="submit"]');
  const data = Object.fromEntries(new FormData(form).entries());
  button.disabled = true;
  button.textContent = 'Lähetetään…';
  status.textContent = '';
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Viestin lähetys epäonnistui.');
    form.reset();
    status.textContent = 'Kiitos. Yhteydenottopyyntö on lähetetty.';
  } catch (error) {
    status.textContent = `${error.message} Voit lähettää viestin myös osoitteeseen ville@vidosocial.com.`;
  } finally {
    button.disabled = false;
    button.innerHTML = 'Pyydä ehdotus ja seuraavat askeleet <span>→</span>';
  }
});
