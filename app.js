const modeToggle = document.getElementById("modeToggle");

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("kid");

  modeToggle.textContent =
    document.body.classList.contains("kid")
      ? "Normal Mode"
      : "Kid Mode";
});

let idx = 0;
let start = null;
let errors = 0;

const exEl = document.getElementById("exercise");
const input = document.getElementById("input");

const wps = document.getElementById("wps");
const accuracy = document.getElementById("accuracy");
const errorsEl = document.getElementById("errors");

function load() {
  input.value = "";
  errors = 0;
  start = null;

  const text = exercises[idx].text;
  exEl.innerHTML = [...text].map(c => `<span>${c}</span>`).join("");
}

input.addEventListener("input", () => {
  if (!start) start = Date.now();

  const expected = exercises[idx].text;
  const typed = input.value;
  errors = 0;

  [...exEl.children].forEach((s, i) => {
    if (!typed[i]) s.className = "";
    else if (typed[i] === expected[i]) s.className = "correct";
    else {
      s.className = "incorrect";
      errors++;
    }
  });

  const t = Date.now() - start;
  const chars = typed.length;
  const wps = t ? ((chars / 5) / t) * 1000 : 0;
  const acc = chars ? ((chars - errors) / chars) * 100 : 100;

  wps.textContent = `WPS: ${wps.toFixed(1)}`;
  accuracy.textContent = `Accuracy: ${acc.toFixed(0)}%`;
  errorsEl.textContent = `Errors: ${errors}`;

  if (typed === expected) {
    saveLog({ wps, acc, level: exercises[idx].level });
    unlockNext();
    idx = (idx + 1) % exercises.length;
    load();
  }
});

function saveLog(log) {
  const data = JSON.parse(localStorage.getItem("logs") || "[]");
  data.push({ ...log, time: Date.now() });
  localStorage.setItem("logs", JSON.stringify(data));
}

load();


