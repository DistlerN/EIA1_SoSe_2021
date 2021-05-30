  
/**
 * Die ToDos werden in dem Array todosText gespeichert
 * Jedes ToDo hat aber, neben dem ToDo-Text, einen zweiten
 * Wert, nämlich ob es erledigt ist oder nicht
 * (checked / unchecked). Der Einsatz von einem eindimensionalen
 * Array ermöglicht aber nur, dass wir ein Wert nach dem anderen auflisten.
 * Den zweiten Wert zu einem ToDo speichern wir also in einem
 * zweiten Array. Beide Arrays beinhalten also Infos zu einem ToDo,
 * den ToDo-Text und den Erledigtstatus eines ToDos. Die entsprechende
 * Stelle eines ToDos zeigt jetzt in den Arrays auf die entsprechenden
 * Werte, bspw. Stelle 0 im Array todosText und Stelle 0 im Array
 * todosChecked gehören zusammen zu einem ToDo.
 */

 interface TodoInterface {
    text: string;
    checked: boolean;
}

var todosArray: TodoInterface[] = [
    {
        text: "Lorem",
        checked: true
    },
    {
        text: "Ipsum",
        checked: false
    },
    {
        text: "Dolor",
        checked: false
    }

];
/**
 * Die Anwendung wird immer wieder auf die selben
 * DOM-Elemente zugreifen müssen. Damit diese Elemente nicht 
 * jedes mal neu selektiert werden müssen, werden hier
 * Variablen deklariert, die später die entsprechenden DOM-Elemente
 * speichern.
 */
var inputDOMElement: HTMLInputElement; 
var addButtonDOMElement: HTMLElement;
var todosDOMElement: HTMLElement;
var counterDOMElement: HTMLElement;
var openDOMElement: HTMLElement;
var doneDOMElement: HTMLElement;
var artyomOn: boolean = false;

/**
 * Sobald der DOM geladen wurde können grundlegende DOM-Interaktionen
 * initialisiert werden
 */
window.addEventListener("load", function(): void {

    /**
     * Jetzt da der DOM verfügbar ist können die wichtigsten Elemente
     * in ihre Variablen gespeichert werden, um später auf sie 
     * zugreifen zu können
     */
    inputDOMElement = document.querySelector("#inputTodo");
    addButtonDOMElement = document.querySelector("#addButton");
    todosDOMElement = document.querySelector("#todos");
    counterDOMElement = document.querySelector("#counter");
    openDOMElement = document.querySelector("#open");
    doneDOMElement = document.querySelector("#done");
    /**
     * Jetzt da der DOM verfügbar ist kann auch ein Event-Listener
     * auf den AddToDo Button gesetzt werden.
     */
    addButtonDOMElement.addEventListener("click", function(): void {
        addTodo(inputDOMElement.value);
    });

    /**
     * Initial soll einmal die Liste an bereit definierten ToDos
     * aus den Arrays in den DOM gezeichnet werden.
     */
    drawListToDOM();
});

function drawListToDOM(): void {
    // alle todos erst einmal aus dem DOM löschen
    todosDOMElement.innerHTML = "";

    // das ToDo-Array durchlaufen (iterieren) und Todo für Todo in den DOM schreiben
    for (let index: number = 0; index < todosArray.length; index++) {

        /**
         * Neues DIV-Element erstellen (würde auch mit innerHTML = "<div class='todo'></div>" gehen, 
         * die Objekt-Instansierung ist aber übersichtlicher)
         */
        let todo: HTMLElement = document.createElement("div");
        todo.classList.add("todo");

        /**
         * Jedes Todo besteht aus etwas Markup, also aus HTML-Elementen
         * wie der Check-Anzeige, dem ToDo-Text und dem Mülleimer
         * 
         * Einfachheitshalber werden hier alle HTML-Elemente für ein ToDo
         * nicht DOM-Objekt-weise (wie oben, mit createElement), sondern als eine lange
         * HTML-Zeichenkette erstellt. An manchen Stellen der Zeichenkette wird
         * ein Wert einer Variablen benötigt (bspw. für die CSS Klasse oder für den ToDo-Text),
         * hier muss die Zeichenkette unterbrochen werden.
         */
        todo.innerHTML =  "<span class='check " + todosArray[index].checked + "'><i class='fas fa-check'></i></span>"
                            + todosArray[index].text +
                            "<span class='trash fas fa-trash-alt'></span>";

        // Zuweisen der Event-Listener für den Check- und den Trash-Button
        todo.querySelector(".check").addEventListener("click", function(): void {
            // hier wird der Index, also die aktuelle Stelle im Array dieses ToDos,
            // übergeben, damit an der entsprechenden Stelle im Array der Wert geändert werden kann.
            toggleCheckState(index);
        });
        todo.querySelector(".trash").addEventListener("click", function(): void {
            // hier wird der Index, also die aktuelle Stelle im Array dieses ToDos,
            // übergeben, damit die entsprechende Stelle im Array gelöscht werden kann.
            deleteTodo(index);
        });

        // Bis hier hin wurde das neue Todo "zusammengebaut", jetzt wird es in den DOM gerendert.
        todosDOMElement.appendChild(todo);
        
        //Localstorage:
        const key: string = inputDOMElement.value;
        const storageValue: string = inputDOMElement.value;
        localStorage.setItem(key, storageValue);
    }

    updateCounter();
}

//done / open-Task Variablen für den Counter:
var done: number = 1;
var openTask: number = 2;

function updateCounter(): void {
    counterDOMElement.innerHTML = todosArray.length + " in total";
    openDOMElement.innerHTML = openTask + " tasks open";
    doneDOMElement.innerHTML = done + " tasks done";
}

/**
 * Ein neues ToDo wird folgendermaßen erstellt:
 */
function addTodo(text: string): void {
    /**
     * Zunächst wird geprüft, ob das Input-Feld nicht leer ist
     * (ansonsten würde ein leerer ToDo-Text erstellt werden,
     * wenn man, ohne zu Tippen, den Add-Button gedrückt hätte)
     */
    if (inputDOMElement.value != "") {
        /**
        Text + checked/unchecked status wird in das todosArray als Objekt geschoben
         */
        todosArray.unshift({
            text: inputDOMElement.value,
            checked: false
        });
        
        // Jetzt wird der Text aus dem Eingabefeld gelöscht
        inputDOMElement.value = "";

        /**
         * Die zentrale Funktion, um die Liste des ToDo-Arrays in den DOM zu rendern
         * wird wieder getriggert
         */
        openTask ++;
        drawListToDOM();
    }
    if (artyomOn == true) {
        todosArray.unshift({
            text: text,
            checked: false
        });
        artyomOn = false;
        openTask++;
        drawListToDOM();
    }
}

/**
 * Der check- / unchecked Zustand eines ToDo wird wie folgt gesetzt:
 */
function toggleCheckState(index: number): void {

    /**
     * Das Array, , das den Checked- / Uncheck-Status der ToDos abbildet,
     * muss an jener Stelle, an der das entsprechende ToDo steht (nämlich
     * an der übergebenen Index-Stelle) geändert werden.
     * Von checked zu unchecked bzw. von unchecked zu checked
     * Hier wird ein Boolean für den Zustand checked/unchecked genutzt,
     * der Boolean muss also von true zu false bzw. false zu true gestellt werden.
     * Ein toggle (also Welchseln zwischen zwei Zuständen) lässt sich folgendermaßen
     * kurz schreiben: wert = !wert
     * Bedeutet: der Wert soll das Gegenteil von seinem Wert annehmen.
     * Alternativ könnte man hier natürlich auch andere Schreibweisen (wie sie im
     * Kurs behandelt wurden) nutzen.
     */
    if (todosArray[index].checked == true) {
        todosArray[index].checked = false;
        done--;
        openTask++;
    }
    else if (todosArray[index].checked == false) {
        todosArray[index].checked = true;
        done++;
        openTask--;
    }
    /**
     * Die zentrale Funktion, um die Liste des ToDo-Arrays in den DOM zu rendern
     * wird wieder getriggert
     */
    drawListToDOM();
}

/**
 * Diese Funktion löscht ein ToDo
 */
function deleteTodo(index: number): void {
    /**
     * Durch "index" ist die entsprechende Stelle im Array
     * bekannt, an der das ToDo steht.
     * Jetzt muss diese Stelle beider Arrays gelöscht werden,
     * das ToDo-Text-Array und das Checked/Unchecked-Array
     */
    if (todosArray[index].checked == true) {
        done--;
    }
    else if (todosArray[index].checked == false) {
        openTask--;
    }
    
    todosArray.splice(index, 1);
    
    /**
     * Die zentrale Funktion, um die Liste des ToDo-Arrays in den DOM zu rendern
     * wird wieder getriggert
     */
    drawListToDOM();
}

//Sprachbefehl

window.addEventListener("load", function(): void {
    const artyom: any = new Artyom();
    artyom.addCommands({
        smart: true,
        indexes: ["Erstelle Aufgabe *"],
        action: function (i: any, wildcard: string): void {
            artyomOn = true;
            addTodo(wildcard);
        }
    });

    document.querySelector("#start-voice").addEventListener("click", function(): void {
        artyom.dontObey();
        artyom.initialize({
            lang: "de-DE"
        });
        artyom.say("Hallo wie geht's! Ich bin Artyom, sag mir mit dem Schlüsselwort Erstelle Aufgabe was ich zur Liste hinzufügen soll.");
        setTimeout(function (): void {
            artyom.obey();
        }, 8000);
        startArtyom();
    });
    document.querySelector("#stop-voice").addEventListener("click", function(): void {
        stopArtyom();
        artyom.say("Und tschüss!");
    });

    function startArtyom(): void {
        artyom.initialize({
                lang: "de-DE",
                continuous: true,
                listen: true,
                interimResults: true,
                debug: true,
                speed: 1
        });
    }
    function stopArtyom(): void {
        artyom.fatality();
    }
});