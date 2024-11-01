import "./style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { v4 as uuidv4 } from "uuid";

// ------------------------------------
const todoSection = document.getElementById("todo");
const doingSection = document.getElementById("doing");
const doneSection = document.getElementById("done");

// ------------------------------------
const form = document.getElementById("form");

document.getElementById("add-task").addEventListener("click", (event) => {
  form.classList.toggle("h-0");
});

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
const submitBtn = document.querySelector("#submit-task");

// form stuff
const title = document.getElementById("title");
const description = document.getElementById("description");
const status = document.getElementById("status");
const date = document.getElementById("date");
const time = document.getElementById("time");
const priority = document.getElementById("priority");

let tasks = localStorage.getItem("tasks");
if (!tasks) {
  tasks = {
    todo: [
      {
        id: "1",
        title: "gym",
        description: "go to the gym and workout legs",
        status: "todo",
        date: "2024-10-29",
        time: "12:55:44",
        priority: "p1",
      },
    ],
    doing: [],
    done: [],
  };
} else {
  tasks = JSON.parse(tasks);
}

// show data function:
function showData() {
  for (let key in tasks) {
    if (tasks[key].length !== 0) {
      const sectionCards = tasks[key]
        .map((task) => {
          return `
          <div
             class="card border-2 border-gray-600 rounded-lg px-4 pt-4 mb-4 bg-white dark:bg-slate-500"
             draggable="true"
           >
             <!-- Date and Time -->
             <p class="font-light text-right text-gray-500 flex justify-end items-center gap-4 mb-2">
               <span>${task.date}</span>
               <span>${task.time}</span>
             </p>
   
             <!-- Title -->
             <p class="text-gray-700 font-semibold text-lg mb-1">${task.title}</p>
             <p class="text-gray-700 mb-4">${task.description}</p>
   
             <!-- Priority -->
             <p class="inline-block p-1 rounded text-red-600 bg-red-300 border-2 border-red-600 mb-4">
               ${task.priority}
             </p>
   
             <!-- Buttons -->
             <div class="flex justify-between gap-2 border-t-2 -mx-4 px-4 py-2">
               <button class="inline-block rounded-md bg-yellow-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-yellow-400">Edit</button>
               <button id="${task.id}" class="inline-block rounded-md bg-red-500 px-6 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400 delete-btn">Delete</button>
             </div>
           </div>
          `;
        })
        .join("");

      if (key === "todo") {
        todoSection.innerHTML += sectionCards;
      } else if (key === "doing") {
        doingSection.innerHTML += sectionCards;
      } else if (key === "done") {
        doneSection.innerHTML += sectionCards;
      } else {
        console.error("wrong key in tasks object");
      }
    }
  }

  // Add event listeners for delete buttons
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const taskId = event.target.id;
      for (let key in tasks) {
        tasks[key] = tasks[key].filter((task) => task.id !== taskId);
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Remove the task from the DOM
      const taskCard = event.target.closest(".card");
      if (taskCard) {
        taskCard.remove();
      }

      // removed this and just delete current card from dom
      //  showData();
    });
  });
}

// Initial call to display data

// add tasks precedure
function addTask() {
  const task = {
    id: uuidv4(),
    title: title.value,
    description: description.value,
    status: status.value,
    date: date.value,
    time: time.value,
    priority: priority.value,
  };

  console.log("task:", task);
  console.log("tasks:", tasks);

  title.value = "";
  description.value = "";
  // status.value = "";
  date.value = "";
  time.value = "";
  // priority.value = "";

  // tasks.push(task);
  console.log(task.status);

  tasks[task.status].push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  showData();
}

function deleteOne(id) {
  console.log(id);

  // Check in each category (todo, doing, done) and filter out the task with the given id
  tasks.todo = tasks.todo.filter((task) => task.id != id);
  tasks.doing = tasks.doing.filter((task) => task.id != id);
  tasks.done = tasks.done.filter((task) => task.id != id);

  // Save updated tasks object to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showData();
}
document.querySelectorAll(".delete-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const taskId = event.target.id;
    deleteOne(taskId);  // Use the deleteOne function to handle deletion

    // Optionally, remove the task card from the DOM immediately for smoother UX
    const taskCard = event.target.closest(".card");
    if (taskCard) {
      taskCard.remove();
    }
  });
});


// const deleteBtns = document.querySelectorAll(".delete-btn");
// for (let element of deleteBtns) {
//   element.addEventListener("click", () => {
//     console.log(element.id);
//     const id = element.id;
//     deleteOne(id);
//   });
// }

// show data

// add events
submitBtn.addEventListener("click", addTask);
// showData();

showData();
