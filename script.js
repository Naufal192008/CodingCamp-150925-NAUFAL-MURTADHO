const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");

let todos = [];

function renderTasks(filterDate = null) {
  taskList.innerHTML = "";

  let filteredTodos = todos;
  if (filterDate) {
    filteredTodos = todos.filter(todo => todo.date === filterDate);
  }

  if (filteredTodos.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  filteredTodos.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td class="status">${todo.completed ? "Done" : "Pending"}</td>
      <td class="actions">
        <button class="complete" onclick="toggleComplete(${index})">✔</button>
        <button class="remove" onclick="deleteTask(${index})">✖</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

// Add 
function addTask() {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Please enter both task and date!");
    return;
  }

  todos.push({ task, date, completed: false });
  taskInput.value = "";
  dateInput.value = "";

  renderTasks();
}

// Toggle Complete
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTasks();
}

// Delete Task
function deleteTask(index) {
  todos.splice(index, 1);
  renderTasks();
}

// Delete All
function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todos = [];
    renderTasks();
  }
}

// Filter
function filterTask() {
  const filterDate = dateInput.value;
  if (!filterDate) {
    alert("Please select a date to filter!");
    return;
  }
  renderTasks(filterDate);
}

addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", deleteAll);
filterBtn.addEventListener("click", filterTask);

renderTasks();