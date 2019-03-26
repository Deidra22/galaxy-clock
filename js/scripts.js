//Date variables
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; //January is 0!
let yyyy = today.getFullYear();

//Alarm variables
const setAlarm = document.getElementById('alarmButton');
const alarmName = document.getElementById('alarmName');
const alarmTime = document.getElementById('alarmTime');
const currentAlarms = document.getElementById('currentAlarms')

const alarmButton = document.getElementById('alarmButton'),
    alarmSound = new Audio();

//Audio
alarmSound.src = 'audio/Alarm Clock.mp3';

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yyyy;
document.getElementById('date').innerHTML = today;


//Clock function
function clock(){
    let today = new Date();
    let hr = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    min = checkTime(min);
    sec = checkTime(sec);
    document.getElementById('galaxyClock').innerHTML = 
    hr + ":" + min + ":" + sec;

    let t = setTimeout(clock, 500);



function checkTime(i){
    if (i < 10) {i = "0" + i};
    return i;
}
    if (hr > 12){
        hr = hr - 12;
        if (hr == 12){
            hr = checkTime(hr);
            document.getElementById('galaxyclock').innerHTML = 
            hr + ":" + min + ":" + sec + "AM";
        }
        else {
            hr = checkTime(hr);
            document.getElementById('galaxyClock').innerHTML = 
            hr + ":" + min + ":" + sec + "PM";
        }
    }
    else {
        document.getElementById('galaxyClock').innerHTML = 
        hr + ":" + min + ":" + sec + "AM";
    }

}

//Alarm
function cancelAlarm(){
    alarmButton.innerText = 'Set Alarm';
    alarmButton.setAttribute('Onclick', 'setAlarm(this);');
}

// function createAlarm (){
//     let millsec = document.getElementById('alarmTime').valueAsNumber;
//         if(isNaN(millsec)){
//             alert('Invalid Date');
//         }


//     let alarm = new Date(millsec);

//     let alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(), alarm.getUTCHours(), alarm.getUTCMinutes(), alarm.getUTCSeconds());

//     let diffMillSec = alarmTime.getTime() - (new Date()).getTime();

//         if(diffMillSec < 0){
//             alert('Specified time has passed!')
//             return;
//         }
    
//         setTimeout(initAlarm, diffMillSec);
//         alarmButton.innerText = 'Cancel Alarm';
//         alarmButton.setAttribute('onclick', 'cancelAlarm(this);');

// }

function initAlarm(){
    alarmSound.play();
    document.getElementById('alarmBtns').style.display = '';
}

function stopAlarm(){
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById('alarmBtns').style.display = 'none';
}

//Listener
alarmButton.addEventListener('click', createAlarm);

function createAlarm(){
    const name = alarmName.value;
    const time = alarmTime.value;

    if (!name || !time) {
        alert("Please enter a valid alarm name and time!")
        return
    };

    const li = document.createElement('li');

    li.innerHTML = `<h3>${alarmName.value}</h3>
                    <span>${alarmTime.value}</span>`
    currentAlarms.appendChild(li);
}
