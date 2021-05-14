//sounds
var drum1 = document.querySelector('.drum1');
var drum2 = document.querySelector('.drum2');
var drum3 = document.querySelector('.drum3');
var drum4 = document.querySelector('.drum4');
var drum5 = document.querySelector('.drum5');
var drum6 = document.querySelector('.drum6');
var drum7 = document.querySelector('.drum7');
var drum8 = document.querySelector('.drum8');
var drum9 = document.querySelector('.drum9');
var playstop = document.querySelector('.playstop');
var playButtonStyle = document.getElementById("playbutton");
var stopButtonStyle = document.getElementById("stopbutton");
var playRandom = document.querySelector('.randombutton');
var interval = setInterval(function () {
}, 2000);
var sounds = [];
sounds[0] = new Audio("assets/A.mp3");
sounds[1] = new Audio("assets/C.mp3");
sounds[2] = new Audio("assets/F.mp3");
sounds[3] = new Audio("assets/G.mp3");
sounds[4] = new Audio("assets/hihat.mp3");
sounds[5] = new Audio("assets/kick.mp3");
sounds[6] = new Audio("assets/laugh-1.mp3");
sounds[7] = new Audio("assets/laugh-2.mp3");
sounds[8] = new Audio("assets/snare.mp3");
var beatfolge = [];
beatfolge[0] = sounds[5];
beatfolge[1] = sounds[8];
beatfolge[2] = sounds[4];
var i;
drum1.addEventListener("click", function () { sounds[0].play(); });
drum2.addEventListener("click", function () { sounds[1].play(); });
drum3.addEventListener("click", function () { sounds[2].play(); });
drum4.addEventListener("click", function () { sounds[3].play(); });
drum5.addEventListener("click", function () { sounds[4].play(); });
drum6.addEventListener("click", function () { sounds[5].play(); });
drum7.addEventListener("click", function () { sounds[6].play(); });
drum8.addEventListener("click", function () { sounds[7].play(); });
drum9.addEventListener("click", function () { sounds[8].play(); });
playstop.addEventListener("click", beat);
playstop.addEventListener("click", changebutton);
playRandom.addEventListener("click", random);
//beat 
function beat() {
    if (stopButtonStyle.style.display == "block") {
        clearInterval(interval);
    }
    if (playButtonStyle.style.display == "block") {
        setTimeout(function () { beatfolge[0].play(); }, 500); //LOOP!
        setTimeout(function () { beatfolge[1].play(); }, 1000);
        setTimeout(function () { beatfolge[2].play(); }, 1500);
        interval = setInterval(function () {
            setTimeout(function () { beatfolge[0].play(); }, 500); //LOOP!
            setTimeout(function () { beatfolge[1].play(); }, 1000);
            setTimeout(function () { beatfolge[2].play(); }, 1500);
        }, 2000);
    }
}
function changebutton() {
    if (playButtonStyle.style.display == "none") {
        playButtonStyle.style.display = "block";
        stopButtonStyle.style.display = "none";
        //weil es jetzt so funktioniert!
    }
    else {
        playButtonStyle.style.display = "none";
        stopButtonStyle.style.display = "block";
    }
}
function random() {
    var number1 = Math.floor(Math.random() * 8);
    var number2 = Math.floor(Math.random() * 8);
    var number3 = Math.floor(Math.random() * 8);
    setTimeout(function () { sounds[number1].play(); }, 500); //LOOP!
    setTimeout(function () { sounds[number2].play(); }, 1000);
    setTimeout(function () { sounds[number3].play(); }, 1500);
}
// cleart das inreval da es immer wieder abgespielt wurde.
clearInterval(interval);
//# sourceMappingURL=Drumbox.js.map