document.addEventListener('DOMContentLoaded', () => {
  const materias = document.querySelectorAll('li');

  materias.forEach(materia => {
    const materiaText = materia.textContent.trim();

    // Cargar estado guardado
    if (localStorage.getItem(materiaText) === 'aprobada') {
      materia.classList.add('aprobada');
    }

    // Click para toggle aprobado
    materia.addEventListener('click', () => {
      materia.classList.toggle('aprobada');

      if (materia.classList.contains('aprobada')) {
        localStorage.setItem(materiaText, 'aprobada');
      } else {
        localStorage.removeItem(materiaText);
      }
    });
  });
});
