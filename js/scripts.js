//Date variables
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; //January is 0!
let yyyy = today.getFullYear();

//Alarm variables
// const alarms = document.getElementById('alarmButton');
const alarmName = document.getElementById('alarmName');
const alarmTime = document.getElementById('alarmTime');
const currentAlarms = document.getElementById('currentAlarms')
const galaxyClock = document.getElementById('galaxyClock');
// const alarmButton = document.getElementById('alarmButton'),
//     alarmSound = new Audio();


//Listener
alarmButton.addEventListener('click', createAlarm);

//Date
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
    setInterval(() => {
        galaxyClock.innerText = new Date().toLocaleTimeString()
    }, 1000);
}
// function clock(){
//     let today = new Date();
//     let hr = today.getHours();
//     let min = today.getMinutes();
//     let sec = today.getSeconds();
//     min = checkTime(min);
//     sec = checkTime(sec);
//     document.getElementById('galaxyClock').innerHTML = 
//     hr + ":" + min + ":" + sec;

//     let t = setTimeout(clock, 500);

// function checkTime(i){
//     if (i < 10) {i = "0" + i};
//     return i;
// }
//     if (hr > 12){
//         hr = hr - 12;
//         if (hr == 12){
//             hr = checkTime(hr);
//             document.getElementById('galaxyclock').innerHTML = 
//             hr + ":" + min + ":" + sec + "AM";
//         }
//         else {
//             hr = checkTime(hr);
//             document.getElementById('galaxyClock').innerHTML = 
//             hr + ":" + min + ":" + sec + "PM";
//         }
//     }
//     else {
//         document.getElementById('galaxyClock').innerHTML = 
//         hr + ":" + min + ":" + sec + "AM";
//     }

// }

//Alarm
// function cancelAlarm(){
//     alarmButton.innerText = 'Set Alarm';
//     alarmButton.setAttribute('Onclick', 'setAlarm(this);');
// }

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

// function initAlarm(){
//     //Audio
// alarmSound.src = 'audio/Alarm Clock.mp3';

//     alarmSound.play();
//     document.getElementById('alarmBtns').style.display = '';
// }

// function stopAlarm(){
//     alarmSound.pause();
//     alarmSound.currentTime = 0;
//     document.getElementById('alarmBtns').style.display = 'none';
// }


function createAlarm(){
    const now = new Date();
    const name = alarmName.value;
    const time = alarmTime.value;
    const reqTime = new Date (time);

    const incompInputs = !name || !time;
    const invTime = now > reqTime;

    if (incompInputs || invTime) {
        alert("Please use a valid alarm name and time.");
        return;
    }

    const date = reqTime.toDateString();
    const hours = reqTime.getHours();
    const minutes = reqTime.getMinutes();
    const meridian = reqTime.getHours() > 11;
    const simpHours = (hours > 12 ? hours - 12 : hours);
    const simpTime = (simpHours ? simpHours : 12) + ":" + minutes + " " + (!meridian ? "AM" : "PM");

    const li = document.createElement("li");
    li.innerHTML = `
        <h3>${name}</h3>
        <span>${date} - ${simpTime}</span>
    `;
    
    currentAlarms.appendChild(li);
    
    const button = document.createElement('button');
    button.innerText = 'X';
    button.style.backgroundColor = 'red';
    button.style.color = 'white';

    li.appendChild(button);

    setAlert( alarmSound, now, reqTime, name, button);
 
}

function setAlert(alarmSound, currentTime, reqTime, name, button) {
    const difference = reqTime - currentTime;

    const timeout = setTimeout(() => {
        alert(`Time for ${name}`);
    }, difference);

    button.addEventListener("click", function() {
       clearTimeout(timeout);
       this.parentNode.remove();
    });

    alarmSound = new Audio();
  
    alarmSound.src = 'audio/Alarm Clock.mp3';

    alarmSound.play();
    document.getElementById('alarmBtns').style.display = '';
}

  //Audio
//   function audio(){
//     alarmSound = new Audio();
  
//     alarmSound.src = 'audio/Alarm Clock.mp3';

//     alarmSound.play();
//     document.getElementById('alarmBtns').style.display = '';
//   }
  
function stopAlarm(){
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById('alarmBtns').style.display = 'none';
}


// //Audio
// alarmSound.src = 'audio/Alarm Clock.mp3';

// const alarmButton = document.getElementById('alarmButton'),
//     alarmSound = new Audio();

//      //Audio
// alarmSound.src = 'audio/Alarm Clock.mp3';

// alarmSound.play();
// document.getElementById('button').style.display = '';

// function initAlarm(){
//     //Audio
// alarmSound.src = 'audio/Alarm Clock.mp3';

//     alarmSound.play();
//     document.getElementById('alarmBtns').style.display = '';
// }