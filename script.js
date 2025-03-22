const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", showTasks);

function addTask() {
    if (inputBox.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    let li = document.createElement('li');

    // Checkbox
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", toggleTask);

    let span = document.createElement('span');
    span.textContent = inputBox.value;

    let deleteButton = document.createElement('button');
    deleteButton.textContent = "❌";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", deleteTask);

    // Append elements
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    listContainer.appendChild(li);

    saveData();
    inputBox.value = '';
}

// Toggle Task Completion
function toggleTask(event) {
    let taskItem = event.target.parentElement;
    taskItem.classList.toggle('checked');
    saveData();
}

// Delete Task
function deleteTask(event) {
    event.target.parentElement.remove();
    saveData();
}

// Save to Local Storage as an Array
function saveData() {
    let tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        let taskText = li.querySelector("span").textContent;
        let isChecked = li.querySelector("input").checked;
        tasks.push({ text: taskText, checked: isChecked });
    });

    if (tasks.length === 0) {
        localStorage.removeItem("tasks"); // Remove empty storage entry
    } else {
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Store tasks as JSON
    }
}

// Load Tasks from Local Storage
function showTasks() {
    let savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        let tasks = JSON.parse(savedTasks);
        listContainer.innerHTML = ''; // Clear old list before loading

        tasks.forEach(task => {
            let li = document.createElement('li');

            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.checked = task.checked;
            checkbox.addEventListener("change", toggleTask);

            let span = document.createElement('span');
            span.textContent = task.text;

            let deleteButton = document.createElement('button');
            deleteButton.textContent = "❌";
            deleteButton.className = "delete-btn";
            deleteButton.addEventListener("click", deleteTask);

            // If task was checked, add class
            if (task.checked) {
                li.classList.add("checked");
            }

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteButton);
            listContainer.appendChild(li);
        });
    }
}
