function actualizarEstadoMaterias() {
  let aprobadas = Array.from(document.querySelectorAll(".materia.aprobada")).map(m => m.textContent.trim());
  let totalCreditos = 0;

  document.querySelectorAll(".materia").forEach(materia => {
    const creditos = parseInt(materia.dataset.creditos || 0);
    const previas = materia.dataset.previas ? materia.dataset.previas.split(",").map(p => p.trim()) : [];
    const esPasantia = materia.dataset.especial === "pasantia";

    if (materia.classList.contains("aprobada")) {
      totalCreditos += creditos;
    }

    if (esPasantia) {
      materia.classList.toggle("bloqueada", totalCreditos < 70);
    } else if (previas.length > 0) {
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
