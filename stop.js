let timer;
let elapsedTime = 0;
let isRunning = false;
let laps = [];

const timeDisplay = document.getElementById('time-display');
const lapsList = document.getElementById('laps-list');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        timer = setInterval(updateTime, 1000);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    updateTime();
    laps = [];
    updateLaps();
}

function updateTime() {
    elapsedTime++;
    const seconds = elapsedTime % 60;
    const minutes = Math.floor(elapsedTime / 60) % 60;
    const hours = Math.floor(elapsedTime / 3600);

    timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function recordLap() {
    if (isRunning) {
        laps.push(timeDisplay.textContent);
        updateLaps();
    }
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}
