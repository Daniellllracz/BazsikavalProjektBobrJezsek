// Várjuk meg, amíg a dokumentum betöltődik, mielőtt bármilyen műveletet végzünk
document.addEventListener("DOMContentLoaded", function () {
    // Betöltjük a feladatokat
    loadTasks();
});

// Új feladat hozzáadása
function addTask() {
    // Szerezzük be a felhasználó által megadott feladat szövegét
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    // Ellenőrizzük, hogy a beírt szöveg üres-e, ha igen, akkor kilépünk
    if (taskText === "") return;

    // Szerezzük be a feladatlistát és létrehozzuk a listaelemet
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.innerHTML = `
        ${taskText}
        <button onclick="removeTask(this)">Törlés</button>
        <button class="btn-primary" onclick="editTask(this)">Szerkesztés</button>
        <button onclick="completeTask(this)">Kész</button>
    `;

    // Adjuk hozzá az új feladatot a listához
    taskList.appendChild(li);

    // Mentjük a feladatokat a böngésző localStorage-ba
    saveTasks();

    // Töröljük az input mező tartalmát
    taskInput.value = "";
}

// Feladat törlése
function removeTask(button) {
    // Szerezzük be a feladatlistát és töröljük a kiválasztott listaelemet
    const taskList = document.getElementById("taskList");
    const li = button.parentElement;
    taskList.removeChild(li);

    // Mentjük a frissült feladatlistát
    saveTasks();
}

// Feladat szerkesztése
function editTask(button) {
    // Szerezzük be a kiválasztott feladat szövegét és kérjük meg a felhasználót, hogy szerkessze meg
    const taskText = button.parentElement.firstChild.textContent;
    const updatedText = prompt("Edit task:", taskText);

    // Ha a felhasználó megadott új szöveget, frissítjük a feladatot
    if (updatedText !== null) {
        button.parentElement.firstChild.textContent = updatedText;

        // Mentjük a frissült feladatlistát
        saveTasks();
    }
}

// Feladat kipipálása
function completeTask(button) {
    // Szerezzük be a feladatlistát és a kiválasztott listaelemet, majd állítsuk be a stílusjellemzőket
    const taskList = document.getElementById("taskList");
    const li = button.parentElement;
    li.style.textDecoration = "line-through";
    li.style.color = "gray";
}

// Feladatok mentése a böngésző localStorage-ba
function saveTasks() {
    // Szerezzük be a feladatlistát és mentjük a feladatokat JSON formátumban
    const taskList = document.getElementById("taskList");
    const tasks = [];

    for (let i = 0; i < taskList.children.length; i++) {
        const li = taskList.children[i];
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.style.textDecoration === "line-through"
        });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Betöltjük a mentett feladatokat a feladatlistába
function loadTasks() {
    // Szerezzük be a feladatlistát és a mentett feladatokat
    const taskList = document.getElementById("taskList");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Iteráljuk a mentett feladatokat és adjuk hozzá őket a listához
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task.text}
            <button onclick="removeTask(this)">Törlés</button>
            <button onclick="editTask(this)">Szerkesztés</button>
            <button onclick="completeTask(this)">Kész</button>
        `;

        // Ha a feladat befejezett, akkor alkalmazzuk a megfelelő stílusokat
        if (task.completed) {
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
        }

        // Adjuk hozzá a betöltött feladatot a listához
        taskList.appendChild(li);
    });
}

// Eseménykezelő hozzáadása az "Hozzáadás" gombhoz
const addTaskButton = document.getElementById("addTask");
addTaskButton.addEventListener("click", addTask);

// Eseménykezelő hozzáadása az input mezőhöz, hogy a "Enter" gomb lenyomásával is hozzáadhassunk feladatokat
const taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});