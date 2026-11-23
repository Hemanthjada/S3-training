
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        // Create task text
        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task-text";

        if (task.completed) {
            span.classList.add("completed");
        }

        // Complete task
        checkbox.addEventListener("change", function() {

            tasks[index].completed = checkbox.checked;

            saveTasks();
            displayTasks();

        });

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        // Delete task
        deleteBtn.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();

        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });
}

// Add new task
function addTask() {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: task,
        completed: false
    });

    saveTasks();

    taskInput.value = "";

    displayTasks();
}

// Add button event
addBtn.addEventListener("click", addTask);

// Enter key event
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// Load saved tasks
displayTasks();
