document.querySelectorAll(".materia").forEach(materia => {
  if (materia.dataset.previas) {
    materia.classList.add("bloqueada");
  }
});

function actualizarEstadoMaterias() {
  let aprobadas = Array.from(document.querySelectorAll(".materia.aprobada")).map(m => m.textContent.trim());
  let totalCreditos = 0;

  document.querySelectorAll(".materia").forEach(materia => {
    const creditos = parseInt(materia.dataset.creditos || 0);
    if (materia.classList.contains("aprobada")) {
      totalCreditos += creditos;
    }

    if (materia.dataset.previas) {
      const previas = materia.dataset.previas.split(",").map(p => p.trim());
      const desbloqueada = previas.every(p => aprobadas.includes(p));
      materia.classList.toggle("bloqueada", !desbloqueada);
    }
  });

  document.getElementById("creditosAprobados").textContent = totalCreditos;
  const porcentaje = (totalCreditos / 226) * 100;
  document.getElementById("barraProgreso").style.width = `${porcentaje}%`;
}

document.querySelectorAll(".materia").forEach(materia => {
  materia.addEventListener("click", () => {
    if (!materia.classList.contains("bloqueada")) {
      materia.classList.toggle("aprobada");
      actualizarEstadoMaterias();
    }
  });
});

actualizarEstadoMaterias();
