var zaehler = 0;
var userTask = (document.getElementById("new-task"));
var checkInputBool = false;
var preventEvent = false;
// close button
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
    zaehler--;
    counter();
}
//hide list items
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    };
}
//checked symbol - rausgenommen!
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);
//new list add button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("input").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    }
    else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("input").value = "";
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
            zaehler--;
            counter();
        };
    }
}
//Task Counter 
zaehler++; // hab versucht den Counter einzufügen nur will der bei mir nicht funktionieren. 
counter(); //es wird auch im HTML ein "are" angezeigt, das eigentlich gar nicht mehr da sein sollte... ich verstehe allerdings nicht wo das her kommt. 
function counter() {
    document.querySelector("#counter").innerHTML = zaehler + " tasks are";
}
//# sourceMappingURL=ToDoAppPrrogramm.js.map