let timer;
let isRunning = false;
let startTime;
let laps = [];

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    } else {
        startTime = new Date().getTime();
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('display').textContent = '00:00:00';
    laps = [];
    displayLaps();
}

function lap() {
    if (isRunning) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        laps.push(formatTime(elapsedTime));
        displayLaps();
        startTime = currentTime;
    }
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);
    return `${padZero(minutes)}:${padZero(seconds)}:${padZero(millisecondsFormatted)}`;
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

function displayLaps() {
    const lapsList = document.getElementById('laps');
    lapsList.innerHTML = '';
    laps.forEach((lapTime, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lapTime}`;
        lapsList.appendChild(li);
    });
}
