const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('[data-package]').forEach((link) => {
  link.addEventListener('click', () => {
    const select = document.querySelector('#package-select');
    if (select) select.value = link.dataset.package || 'En osaa vielä sanoa';
  });
});

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

function setStatus(message, type = '') {
  if (!status) return;
  status.textContent = message;
  status.className = `form-status ${type}`.trim();
}

function openMailFallback(data) {
  const subject = encodeURIComponent(`Yhteydenotto: ${data.package || 'VIDO Social'}`);
  const body = encodeURIComponent(
    `Nimi: ${data.name}\nYritys: ${data.company}\nSähköposti: ${data.email}\nPuhelin: ${data.phone || '-'}\nPalvelu: ${data.package}\n\n${data.message}`
  );
  window.location.href = `mailto:ville@vidosocial.com?subject=${subject}&body=${body}`;
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus('Tarkista pakolliset kentät.', 'error');
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form).entries());

    if (data.website) return;

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    setStatus('Lähetetään…');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Lähetys epäonnistui');

      form.reset();
      setStatus('Kiitos. Yhteydenottopyyntö on lähetetty.', 'success');
    } catch (error) {
      setStatus('Sähköpostiohjelma avataan varayhteydenottoa varten.', 'error');
      window.setTimeout(() => openMailFallback(data), 500);
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
    }
  });
}
