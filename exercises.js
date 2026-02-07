const exercises = [
  { id: 1, level: 1, text: "asdf jkl;" },
  { id: 2, level: 1, text: "f j d k s l a ;" },
  { id: 3, level: 2, text: "sad dad fall ask" },
  { id: 4, level: 3, text: "ask dad to fall" }
];

function unlockedLevels() {
  return Number(localStorage.getItem("level") || 1);
}

function unlockNext() {
  const lvl = unlockedLevels();
  localStorage.setItem("level", lvl + 1);
}
