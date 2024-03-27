document.addEventListener("DOMContentLoaded", function() {
  let startTime;
  let pausedTime;
  let running = false;
  let paused = false;
  let laps = [];
  let interval;

  function start() {
    if (!running) {
      if (paused) {
        const pausedDuration = Date.now() - pausedTime;
        startTime += pausedDuration;
        paused = false;
      } else {
        startTime = Date.now() - laps.reduce((acc, lap) => acc + lap, 0);
      }
      interval = setInterval(updateDisplay, 10);
      running = true;
    }
  }

  function pause() {
    if (running && !paused) {
      clearInterval(interval);
      pausedTime = Date.now();
      paused = true;
    }
  }

  function unpause() {
    if (running && paused) {
      const pausedDuration = Date.now() - pausedTime;
      startTime += pausedDuration;
      interval = setInterval(updateDisplay, 10);
      paused = false;
    }
  }

  function stop() {
    if (running) {
      clearInterval(interval);
      running = false;
      paused = false;
    }
  }

  function reset() {
    clearInterval(interval);
    running = false;
    paused = false;
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

  document.getElementById("start").addEventListener("click", start);
  document.getElementById("pause").addEventListener("click", pause);
  document.getElementById("unpause").addEventListener("click", unpause);
  document.getElementById("stop").addEventListener("click", stop);
  document.getElementById("reset").addEventListener("click", reset);
  document.getElementById("lap").addEventListener("click", lap);
});
