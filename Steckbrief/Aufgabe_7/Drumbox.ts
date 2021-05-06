
const drum1 = document.querySelector('.drum1');
const drum2 = document.querySelector('.drum2');
const drum3 = document.querySelector('.drum3');
const drum4 = document.querySelector('.drum4');
const drum5 = document.querySelector('.drum5');
const drum6 = document.querySelector('.drum6');
const drum7 = document.querySelector('.drum7');
const drum8 = document.querySelector('.drum8');
const drum9 = document.querySelector('.drum9');

const playButton = document.querySelector('.playbutton');

let sounds = [];
sounds[0] = new Audio("assets/A.mp3");
sounds[1] = new Audio("assets/C.mp3");
sounds[2] = new Audio("assets/F.mp3");
sounds[3] = new Audio("assets/G.mp3");
sounds[4] = new Audio("assets/hihat.mp3");
sounds[5] = new Audio("assets/kick.mp3");
sounds[6] = new Audio("assets/laugh-1.mp3");
sounds[7] = new Audio("assets/laugh-2.mp3");
sounds[8] = new Audio("assets/snare.mp3");

let beatfolge = [];
beatfolge[0] = sounds[5];
beatfolge[1] = sounds[8];
beatfolge[2] = sounds[4];

drum1.addEventListener("click", function () { sounds[0].play() });
drum2.addEventListener("click", function () { sounds[1].play() });
drum3.addEventListener("click", function () { sounds[2].play() });
drum4.addEventListener("click", function () { sounds[3].play() });
drum5.addEventListener("click", function () { sounds[4].play() });
drum6.addEventListener("click", function () { sounds[5].play() });
drum7.addEventListener("click", function () { sounds[6].play() });
drum8.addEventListener("click", function () { sounds[7].play() });
drum9.addEventListener("click", function () { sounds[8].play() });

playButton.addEventListener("click", beat);

function beat() {

    setTimeout(function () { beatfolge[0].play() }, 500);
    setTimeout(function () { beatfolge[1].play() }, 1000);
    setTimeout(function () { beatfolge[2].play() }, 1500);
    
}
