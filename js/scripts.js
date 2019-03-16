//Clock

function clock(){
    var date = new Date();
    var hours = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();

    ap = (hours < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hours = (hours == 0) ? 12 : hours;
    hours = (hours > 12) ? hours - 12 : hours;

    if (hours < 10){
        hours = "0" + hours;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    
    (document.getElementById('hour')).innerHTML = hours;
    (document.getElementById('minute')).innerHTML = ":" + mins;
    (document.getElementById('second')).innerHTML = ":" + secs;


}

setInterval(clock,100);