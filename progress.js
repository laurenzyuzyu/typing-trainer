function drawProgress() {
  const logs = JSON.parse(localStorage.getItem("logs") || "[]");
  const ctx = document.getElementById("progressChart").getContext("2d");

  const labels = logs.map((_, i) => i + 1);
  const data = logs.map(l => l.wps);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{ label: "WPS", data }]
    }
  });
}

window.onload = drawProgress;
