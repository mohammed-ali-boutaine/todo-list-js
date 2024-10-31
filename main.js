import "./style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { v4 as uuidv4 } from "uuid";


const form = document.getElementById("form")

document.getElementById("add-task").addEventListener("click", (event) => {
  // event.stopPropagation(); // Prevent body click event from firing immediately
  form.classList.toggle("h-0");
  // form.classList.toggle("overflow-hidden");
  // form.classList.toggle("p-3");
});

// document.querySelector("body").addEventListener("click", () => {
//   form.classList.remove("h-0");
//   form.classList.remove("overflow-hidden");
//   form.classList.remove("p-3");
// });


// dark mode stuff
// Check and apply the user's stored preference or the system preference on page load
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// User actions to explicitly choose themes
function toggleTheme(isDark) {
  localStorage.theme = isDark ? "dark" : "light"; // Save preference
  document.documentElement.classList.toggle("dark", isDark);
}

const darkModeBtn = document.getElementById("dark-mode");
darkModeBtn.addEventListener("click", () => {
  const isDark = !document.documentElement.classList.contains("dark");
  toggleTheme(isDark);
});

// DOM variables
const addTaskButton = document.querySelector("#add-task");
const output = document.querySelector("#output");

// form stuff
const title = document.getElementById("title");
const description = document.getElementById("description");
const status = document.getElementById("status");
const date = document.getElementById("date");
const time = document.getElementById("time");
const priorite = document.getElementById("priorite");

// tasks variable
let tasks = localStorage.getItem("tasks");

// get tasks from local storag and handl it
if (tasks == "" || tasks == null) {
  tasks = [
    {
      id: "1",
      title: "gym",
      description: "go to the gym and worout legs",
      status: "todo",
      date: "2024-10-29",
      time: "12:55:44",
      priorite: "p1",
    },
  ];
} else {
  tasks = JSON.parse(tasks);
}

// add tasks precedure
function addTask() {
  const task = {
    id: uuidv4(),
    title: title.value,
    description: description.value,
    status: status.value,
    date: date.value,
    time: time.value,
    priorite: priorite.value,
  };

  title.value = "";
  description.value = "";
  status.value = "";
  date.value = "";
  time.value = "";
  priorite.value = "";

  tasks.push(task);
  //   tasks = [...tasks , task]
  localStorage.setItem("tasks", JSON.stringify(tasks));

  showData();
  //   console.log(tasks);
}
// function to delete all
function deleteAll() {
  tasks = [];
  localStorage.removeItem("tasks");
}

function deleteOne(id) {
  console.log(id);


  tasks = tasks.filter((task) => task.id != id);
  showData();
}

const deleteBtns = document.querySelectorAll(".delete-btn")
for(let element of deleteBtns){
  element.addEventListener("click",()=>{
    console.log(element.id)
    const id = element.id
    deleteOne(id)
  })
}

// show data
function showData() {
  const ul = document.createElement("li");
  console.log(tasks);

  if (tasks.length !== 0) {
    ul.innerHTML = tasks.map((task) => {
      return `
                <li class="w-56 bg-cyan-950  task-item flex flex-col justify-between items-center p-4 border rounded-md shadow-sm">
                <div>
                  <h3 class="text-lg font-semibold">${task.title}</h3>
                  <p class="text-gray-600">${task.description}</p>
                  <p class="text-sm text-gray-500">Due: ${task.time} ${task.date}</p>
                  <p class="text-sm text-gray-500">Priority: ${task.priorite}</p>
                  <p class="text-sm text-gray-500">status: ${task.status}</p>
                </div>
                <div class="flex gap-2">
                  <button class="text-white bg-green-500 hover:bg-green-600  px-3 py-1 rounded-md">Edit</button>
                  <button id="${task.id}" class=" delete-btn text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md">Delete</button>
                </div>
              </li>
                `;
    });
    output.appendChild(ul);
  } else {
    ul.innerHTML = `<div>nothing to show</div>`;
  }
}
// add events
// addTaskButton.addEventListener("click", addTask);
// showData();
