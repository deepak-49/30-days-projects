function updateClock() {
  const now = new Date();

  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let ampm = h >= 12 ? "PM" : "AM";

  h = h % 12 || 12;

  document.getElementById("time").textContent =
    `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  document.getElementById("ampm").textContent = ampm;
}

setInterval(updateClock, 1000);
updateClock();