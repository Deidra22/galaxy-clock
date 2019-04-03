const storedAlarms = window.localStorage.getItem("alarms");
const alarms = typeof(storedAlarms) === "Array" ? storedAlarms : [];

window.localStorage.setItem("alarms", JSON.stringify(alarms));

//Clock function
function clock(){
    setInterval(() => {
        galaxyClock.innerText = new Date().toLocaleTimeString()
    }, 1000);
}

//Date variables
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; //January is 0!
let yyyy = today.getFullYear();

//Date
if(dd<10) {
    dd = '0'+dd
} 
if(mm<10) {
    mm = '0'+mm
} 
today = mm + '/' + dd + '/' + yyyy;
document.getElementById('date').innerHTML = today;

//Audio File
let alarmSound = new Audio();
alarmSound.src = 'audio/Alarm Clock.mp3';

//Alarm Variables
let alarmName = document.getElementById('alarmName');
let alarmTime = document.getElementById('alarmTime');
let listedAlarms = document.getElementById('listedAlarms');
let galaxyClock = document.getElementById('galaxyClock');
let alarmButton = document.getElementById('alarmButton');

//Setting the Alarm
function makeAlarm(){
    const now = new Date();
    const name = alarmName.value;
    const time = alarmTime.value;
    const requestedTime = new Date(time);

    const incompleteInputs = !name || !time;
    const invalidTime = now > requestedTime;

    if (incompleteInputs || invalidTime) {
        alert("Please be sure to provide a valid name and time.");
        return;
    }

    const date = requestedTime.toDateString();
    const hours = requestedTime.getHours();
    const minutes = requestedTime.getMinutes();
    const meridian = requestedTime.getHours() > 11;
    const simplifiedHours = (hours > 12 ? hours - 12 : hours);
    const simplifiedTime = (simplifiedHours ? simplifiedHours : 12) + ":" + minutes + " " + (!meridian ? "AM" : "PM");
    const li = document.createElement("li");

    li.innerHTML = `
        <span>${name}</span>:
        <span>${date} - ${simplifiedTime}</span>
    `;

    listedAlarms.appendChild(li);
    const button = document.createElement("button");
    button.innerText = "X";
    button.style.backgroundColor = "red";
    button.style.color = "white";

    li.appendChild(button);

    setAlarm(now, requestedTime, name, button);
}

function setAlarm(currentTime, requestedTime, name, button) {
    const difference = requestedTime - currentTime;

    alarms.push({ name, requestedTime});

    window.localStorage.setItem("alarms", JSON.stringify(alarms));

    const timeout = setTimeout(() => {
        initAlarm();
    }, difference);

    button.addEventListener("click", function() {
       clearTimeout(timeout);
       this.parentNode.remove();
    });
}

function initAlarm(){
    alarmSound.play();
    document.getElementById('alarmBtns').style.display = '';
}

function stopAlarm(){
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById('stop');
}
