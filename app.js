const fingerMap = {
  a: "L_PINKY",
  s: "L_RING",
  d: "L_MIDDLE",
  f: "L_INDEX",
  j: "R_INDEX",
  k: "R_MIDDLE",
  l: "R_RING",
};

let svgReady = false;

let expected = "";

const fingerObject = document.getElementById("fingerSvg");
fingerObject.addEventListener("load", () => {
  svgReady = true;
});

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

iinput.addEventListener("input", () => {
  if (!start) start = Date.now();

  const typed = input.value;
  const nextChar = expected[typed.length];

  highlightFinger(nextChar);

  if (typed === expected) {
    loadExercise();
  }
});
);

loadExercise();

function saveLog(log) {
  const data = JSON.parse(localStorage.getItem("logs") || "[]");
  data.push({ ...log, time: Date.now() });
  localStorage.setItem("logs", JSON.stringify(data));
}

function highlightFinger(char) {
  if (!char) return;

  const obj = document.getElementById("fingerSvg");
  if (!svgReady) return;

  const svgDoc = obj.contentDocument;

  // Reset all fingers
  svgDoc.querySelectorAll(".finger").forEach(f => {
    f.classList.remove("active");
  });

  const fingerId = fingerMap[char.toLowerCase()];
  if (!fingerId) return;

  const finger = svgDoc.getElementById(fingerId);
  if (finger) {
    finger.classList.add("active");
  }
}

function loadExercise() {
  expected = exercises[idx].text;
  exerciseEl.textContent = expected;
  input.value = "";

  highlightFinger(expected[0]);

  idx = (idx + 1) % exercises.length;
}


load();





