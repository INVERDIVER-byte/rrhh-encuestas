const form = document.getElementById('surveyForm');
const progressFill = document.getElementById('progressFill');
const statusMsg = document.getElementById('statusMsg');
const submitBtn = document.getElementById('submitBtn');
const formView = document.getElementById('formView');
const confirmView = document.getElementById('confirmView');

// Campo condicional: mostrar "diferencias" solo si no coincide totalmente
const funcionesRadios = document.querySelectorAll('input[name="funcionesCoinciden"]');
const diferenciasWrap = document.getElementById('diferenciasWrap');
funcionesRadios.forEach(r => {
  r.addEventListener('change', () => {
    diferenciasWrap.classList.toggle('visible', r.value !== 'Totalmente' && r.checked);
  });
});

// Barra de progreso según campos requeridos completados
const requiredFields = () => Array.from(form.querySelectorAll('[required]'));

function updateProgress() {
  const fields = requiredFields();
  const groups = {};
  fields.forEach(f => {
    if (f.type === 'radio') {
      groups[f.name] = groups[f.name] || false;
      if (f.checked) groups[f.name] = true;
    } else {
      groups[f.name] = !!f.value;
    }
  });
  const total = Object.keys(groups).length;
  const done = Object.values(groups).filter(Boolean).length;
  progressFill.style.width = total ? `${(done / total) * 100}%` : '0%';
}

form.addEventListener('input', updateProgress);
form.addEventListener('change', updateProgress);
updateProgress();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusMsg.textContent = '';
  statusMsg.classList.remove('error');

  if (!SCRIPT_URL || SCRIPT_URL.includes('PEGA_AQUI')) {
    statusMsg.textContent = 'Falta configurar la URL de Google Apps Script en js/config.js';
    statusMsg.classList.add('error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  const data = Object.fromEntries(new FormData(form).entries());
  data.formulario = 'PrimeraSemana';
  data.fechaEnvio = new Date().toISOString();

  try {
    // Apps Script no responde con cabeceras CORS accesibles desde otro origen,
    // así que usamos no-cors: no podemos leer la respuesta, pero el POST se procesa.
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    formView.style.display = 'none';
    confirmView.style.display = 'block';
  } catch (err) {
    statusMsg.textContent = 'Hubo un problema al enviar el formulario. Intenta de nuevo.';
    statusMsg.classList.add('error');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar respuestas';
  }
});
