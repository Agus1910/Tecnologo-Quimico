document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");
  const estado = JSON.parse(localStorage.getItem("estadoMaterias")) || {};

  function actualizarEstado() {
    materias.forEach(btn => {
      const nombre = btn.dataset.nombre;
      const previaturas = btn.dataset.previaturas?.split(",") || [];

      // Habilitar si no tiene previaturas o si todas están aprobadas
      const habilitada = previaturas.every(p => estado[p]);
      btn.disabled = !habilitada && !estado[nombre];

      // Estilo si está aprobada
      if (estado[nombre]) {
        btn.classList.add("aprobada");
      } else {
        btn.classList.remove("aprobada");
      }
    });
  }

  materias.forEach(btn => {
    const nombre = btn.dataset.nombre;

    btn.addEventListener("click", () => {
      estado[nombre] = !estado[nombre]; // Toggle
      localStorage.setItem("estadoMaterias", JSON.stringify(estado));
      actualizarEstado();
    });
  });

  actualizarEstado();
});
