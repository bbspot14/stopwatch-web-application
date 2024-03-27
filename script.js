let startTime;
let running = false;
let laps = [];
let interval;

function startStop() {
  if (running) {
    clearInterval(interval);
    running = false;
    document.getElementById("startStop").textContent = "Start";
  } else {
    startTime = Date.now() - laps.reduce((acc, lap) => acc + lap, 0);
    interval = setInterval(updateDisplay, 10);
    running = true;
    document.getElementById("startStop").textContent = "Stop";
  }
}

function reset() {
  clearInterval(interval);
  running = false;
  document.getElementById("startStop").textContent = "Start";
  document.getElementById("display").textContent = "00:00:00";
  laps = [];
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (running) {
    const lapTime = Date.now() - startTime - laps.reduce((acc, lap) => acc + lap, 0);
    laps.push(lapTime);
    const lapDisplay = document.createElement("li");
    lapDisplay.textContent = formatTime(lapTime);
    document.getElementById("laps").appendChild(lapDisplay);
  }
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  document.getElementById("display").textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  return date.toISOString().substr(11, 8);
}

document.getElementById("startStop").addEventListener("click", startStop);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
