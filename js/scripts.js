//Date
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; //January is 0!
let yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yyyy;
document.getElementById('date').innerHTML = today;


//Clock
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
        hr + ":" + min + ":" + sec + "AM";;
    }
}

function alarmButton(button){
    let  = 
}
