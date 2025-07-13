const subjects = {
  "Primer Año": {
    "Anuales": [
      { name: "Microbiología General" },
      { name: "Fisicoquímica" },
      { name: "Química Analítica 1" },
      { name: "Int. Química Industrial" },
      { name: "Inglés 1" }
    ],
    "1er Semestre": [
      { name: "Economía" },
      { name: "Estadística" }
    ],
    "2do Semestre": [
      { name: "Legislación Laboral" },
      { name: "Control de Calidad", requires: ["Estadística"] },
      { name: "Análisis de Aguas (Optativa)" }
    ]
  },
  "Segundo Año": {
    "Anuales": [
      { name: "Análisis Microbiológico", requires: ["Microbiología General", "Química Analítica 1"] },
      { name: "Química Analítica 2", requires: ["Química Analítica 1", "Estadística"] },
      { name: "Gestión Ambiental y Ecología", requires: ["Int. Química Industrial"] },
      { name: "Inglés 2", requires: ["Inglés 1"] }
    ],
    "1er Semestre": [
      { name: "Gestión de Calidad", requires: ["Control de Calidad"] },
      { name: "Seguridad Industrial", requires: ["Int. Química Industrial"] },
      { name: "Int. Industria Farmacéutica (Optativa)", requires: ["Microbiología General", "Int. Química Industrial"] }
    ],
    "2do Semestre": [
      { name: "Higiene Industrial", requires: ["Int. Química Industrial"] }
    ]
  },
  "Tercer Año": {
    "1er Semestre": [
      { name: "Control de Calidad en Ind. Farmacéutica (Optativa)", requires: ["Química Analítica 1", "Química Analítica 2", "Control de Calidad", "Int. Industria Farmacéutica (Optativa)"] }
    ],
    "2do Semestre": [
      { name: "Pasantía" }
    ]
  }
};

let completed = new Set(JSON.parse(localStorage.getItem("completedSubjects") || "[]"));

function createSubjectEl(subject) {
  const el = document.createElement("div");
  el.className = "subject";
  el.textContent = subject.name;

  const isCompleted = completed.has(subject.name);
  const isUnlocked = !subject.requires || subject.requires.every(req => completed.has(req));

  if (isCompleted) {
    el.classList.add("completed");
  } else if (isUnlocked) {
    el.classList.add("unlocked");
  } else {
    el.classList.add("locked");
  }

  // Permitir marcar y desmarcar solo si está desbloqueada
  if (isUnlocked || isCompleted) {
    el.addEventListener("click", () => {
      if (completed.has(subject.name)) {
        completed.delete(subject.name);
      } else {
        completed.add(subject.name);
      }
      localStorage.setItem("completedSubjects", JSON.stringify([...completed]));
      location.reload();
    });
  }

  return el;
}

function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (const [year, semesters] of Object.entries(subjects)) {
    const yearDiv = document.createElement("div");
    yearDiv.className = "year";

    const yearTitle = document.createElement("h2");
    yearTitle.textContent = year;
    yearDiv.appendChild(yearTitle);

    for (const [semester, subjectList] of Object.entries(semesters)) {
      const semDiv = document.createElement("div");
      semDiv.className = "semester";

      const semTitle = document.createElement("h3");
      semTitle.textContent = semester;
      semDiv.appendChild(semTitle);

      for (const subject of subjectList) {
        semDiv.appendChild(createSubjectEl(subject));
      }

      yearDiv.appendChild(semDiv);
    }

    grid.appendChild(yearDiv);
  }
}

renderGrid();
