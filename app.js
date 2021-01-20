// Variables
const taskInput = document.querySelector("#task");
const form = document.querySelector("#task-form");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getItems);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTask);
}

function getItems() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.classList = "delete-item secondary-content";
    link.innerHTML = '<li class="fa fa-remove"></li>';
    li.appendChild(link);

    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add task");
  } else {
    const li = document.createElement("li");
    li.classList = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a");
    link.classList = "delete-item secondary-content";
    link.innerHTML = '<li class="fa fa-remove"></li>';
    li.appendChild(link);

    taskList.appendChild(li);

    storeTaskInLS(taskInput.value);
  }

  taskInput.value = "";

  e.preventDefault();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      removeFromLS(e.target.parentElement.parentElement);
    }
  }
}

function removeFromLS(item) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (item.textContent === task) {
      tasks.splice(index, 1);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

function clearTasks(e) {
  // let lis = Array.from(taskList.children);
  // lis.forEach((item) => {
  //   item.remove();
  // });

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearFromLS();
}

function clearFromLS() {
  localStorage.clear();
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function storeTaskInLS(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
