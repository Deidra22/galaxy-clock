(function() {
    const alarmList = document.getElementById('listedAlarms'),
        alarmName = document.getElementById('alarmName'),
        alarmTime = document.getElementById('alarmTime'),
        galaxyClock = document.getElementById('galaxyClock'),
        alarmButton = document.getElementById('alarmButton'),
        stopButton = document.getElementById('blinker'),
        alarmSound = new Audio();

    alarmSound.src = 'audio/alarm_clock.mp3';

    let currentAlarm,
        currentNode;

    // Alarm Functions
    const clock = function() {
        let today = new Date(),
            day = today.getDate() > 10 ? today.getDate() : `0${today.getDate()}`,
            month = today.getMonth() + 1 > 10 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`,
            year = today.getFullYear();

        today = `${month}/${day}/${year}`;
        document.getElementById('date').innerHTML = today;

        setInterval(() => setCurrentTime, 1000);
    };

    const clearFields = function() {
        alarmName.value = null;
        alarmTime.value = null;
    };

    const createAlarm = function(name, time, store) {
        const now = new Date(),
            requestedTime = new Date(time);

        const incompleteInputs = !name || !time,
            invalidTime = now > requestedTime;

        if (incompleteInputs || invalidTime) {
            alert("Please be sure to provide a valid name and time.");
            return;
        }

        const date = requestedTime.toDateString(),
            simplifiedTime = getTime(requestedTime),
            alarm = document.createElement("li");

        alarm.classList.add('alarm');

        alarm.innerHTML = `
            <span>${name}</span>:
            <span>${date} - ${simplifiedTime}</span>
        `;
        const button = document.createElement("button");
        button.innerText = "X";
        button.classList.add('cancel-button');

        alarm.appendChild(button);
        alarmList.appendChild(alarm);

        setAlarm(now, requestedTime, name, button, store);
        clearFields();
    };

    const getTime = function(time) {
        const hours = time.getHours(),
            minutes = time.getMinutes() > 10 ? time.getMinutes() : `0${time.getMinutes()}`,
            meridian = time.getHours() > 11,
            simplifiedHours = (hours > 12 ? hours - 12 : hours);

        return `${simplifiedHours ? simplifiedHours : 12}:${minutes} ${(!meridian ? "AM" : "PM")}`
    }

    const setAlarm = function(currentTime, requestedTime, name, button, store) {
        const difference = requestedTime - currentTime,
            newAlarm = { name, time: requestedTime };

        currentAlarms.push(newAlarm);

        if(store) storeAlarms(currentAlarms);

        const timeout = setTimeout(() => {
            playAlarm(newAlarm, button.parentNode);
        }, difference);

        button.addEventListener("click", function() {
            clearTimeout(timeout);
            removeAlarm(newAlarm, this.parentNode);
        });
    };

    const playAlarm = function(alarm, node) {
        alarmSound.play();
        document.getElementById('alarmBtns').classList.add('show');
        currentAlarm = alarm;
        currentNode = node;

        // Stop the alarm after 1 minute
        setTimeout(stopAlarm, 60000);
    };

    const removeAlarm = function(alarm, element) {
        element.remove();
        currentAlarms = currentAlarms.filter(currentAlarm => currentAlarm.name !== alarm.name);

        storeAlarms(currentAlarms);
    };

    const setCurrentTime = () => galaxyClock.innerText = new Date().toLocaleTimeString();

    const stopAlarm = function() {
        removeAlarm(currentAlarm, currentNode);
        alarmSound.pause();
        alarmSound.currentTime = 0;
        document.getElementById('alarmBtns').classList.remove('show');
    };

    const storeAlarms = function(alarms) {
        Array.isArray(alarms)
         ? window.localStorage.setItem("alarms", JSON.stringify(alarms))
         : window.localStorage.setItem("alarms", JSON.stringify([alarms]));
    };

    // Event Listeners
    document.addEventListener('DOMContentLoaded', () => {
        clock();
        setCurrentTime();
    }, false);

    alarmButton.addEventListener('click', () => {
        createAlarm(alarmName.value, alarmTime.value, true);
    });

    stopButton.addEventListener('click', stopAlarm);

    // Init Alarms
    let currentAlarms = window.localStorage.getItem("alarms")
        ? JSON.parse(window.localStorage.getItem("alarms"))
        : [];

    if(currentAlarms && currentAlarms.length) currentAlarms.forEach(alarm => createAlarm(alarm.name, alarm.time, false));
}());