document.addEventListener('DOMContentLoaded', () => {
  const materias = document.querySelectorAll('li');

  // Guardar materias aprobadas en Set para fácil acceso
  let aprobadas = new Set();

  // Cargar aprobadas de localStorage y marcar en UI
  materias.forEach(materia => {
    const nombre = materia.textContent.trim();
    if (localStorage.getItem(nombre) === 'aprobada') {
      materia.classList.add('aprobada');
      aprobadas.add(nombre);
    }
  });

  // Función para saber si se cumplen todas las previaturas de una materia
  function cumplePrevias(materia) {
    const previasAttr = materia.getAttribute('data-previas');
    if (!previasAttr) return true; // Sin previaturas

    const previas = previasAttr.split(',').map(p => p.trim()).filter(p => p.length > 0);
    return previas.every(p => aprobadas.has(p));
  }

  // Función para actualizar estados (bloqueadas o activas)
  function actualizarEstados() {
    materias.forEach(materia => {
      if (materia.classList.contains('aprobada')) {
        // Aprobada siempre activa
        materia.classList.remove('bloqueada');
        materia.style.cursor = 'pointer';
      } else {
        if (cumplePrevias(materia)) {
          materia.classList.remove('bloqueada');
          materia.style.cursor = 'pointer';
        } else {
          materia.classList.add('bloqueada');
          materia.style.cursor = 'default';
        }
      }
    });
  }

  // Inicializamos estados
  actualizarEstados();

  // Agregamos evento click solo a materias no bloqueadas
  materias.forEach(materia => {
    materia.addEventListener('click', () => {
      if (materia.classList.contains('bloqueada')) return; // No hacer nada si está bloqueada

      const nombre = materia.textContent.trim();

      if (materia.classList.contains('aprobada')) {
        // Desmarcar aprobada
        materia.classList.remove('aprobada');
        aprobadas.delete(nombre);
        localStorage.removeItem(nombre);
      } else {
        // Marcar aprobada
        materia.classList.add('aprobada');
        aprobadas.add(nombre);
        localStorage.setItem(nombre, 'aprobada');
      }

      actualizarEstados();
    });
  });
});
