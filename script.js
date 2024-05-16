const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskSet = new Set();

function addTask(callback) {
    const taskName = inputBox.value.trim();

    if (taskName === '') {
        alert("You must write something");
    } else if (taskSet.has(taskName)) {
        alert("Task with this name already exists");
        if (typeof callback === "function") {
            callback(taskName);
        }
    } else {
        let li = document.createElement("li");
        li.innerHTML = taskName;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        taskSet.add(taskName);
    }

    saveData();

    inputBox.value = '';
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        const taskName = e.target.parentElement.textContent.trim();
        e.target.parentElement.remove();
        taskSet.delete(taskName);
        saveData();
    }
}, false);

inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask(duplicateTaskCallback);
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

function duplicateTaskCallback(taskName) {
    console.log(`Duplicate task detected: ${taskName}`);
}
