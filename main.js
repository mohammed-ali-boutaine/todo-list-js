import "./style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { v4 as uuidv4 } from "uuid";

// counter
function updateCounter() {
  document.getElementById("todo-counter").textContent = tasks.todo.length;
  document.getElementById("doing-counter").textContent = tasks.doing.length;
  document.getElementById("done-counter").textContent = tasks.done.length;
  // console.log("counetr gunction");
}
// menu

document.getElementById("menu").addEventListener("click", () => {
  document.getElementById("navbar-default").classList.toggle("hidden");
});

// ------------------------------------
const todoSection = document.querySelector("#todo .cards");
const doingSection = document.querySelector("#doing .cards");
const doneSection = document.querySelector("#done .cards");

// ------------------------------------
const form = document.getElementById("form");

document.getElementById("add-task").addEventListener("click", (event) => {
  form.classList.toggle("hidden");
  document.body.classList.toggle("transparent-body");
  document.getElementById("nav").style.opacity = 0.8;
  document.getElementById("sections-container").style.opacity = 0.8;
});
document.getElementById("submit-task").addEventListener("click", function () {
  // this.enterKeyHint.predefualt()
  // document.getElementById('form').style.display = 'none';
  form.classList.add("hidden");

  document.body.classList.remove("transparent-body");
  document.getElementById("nav").classList.remove("transparent-body");
  document.getElementById("nav").style.opacity = 1;
  document.getElementById("sections-container").style.opacity = 1;
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
    // let div = document.createElement("div");

    if (tasks[key].length !== 0) {
      const sectionCards = tasks[key]
        .map((task) => {
          // let priorityClasses = "";
          let color =" "

          if (task.priority === "p1") {
            // priorityClasses = 'border-red-600 bg-red-100';
            color = "red"
          } else if (task.priority === "p2") {
            // priorityClasses = 'border-orange-600 bg-orange-100';
            color = "orange"

          } else if (task.priority === "p3") {
            // priorityClasses = 'border-green-600 bg-green-100';
            color = "green"

          }

          return `
          <div
               class="${task.status} pop-up box-border duration-500 card border-2 rounded-lg px-4 pt-4 mb-4 border-${color}-600 bg-${color}-300 bg-${color}-300"
             draggable="true"
             id="card${task.id}"
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
             <p class="inline-block p-1 rounded bg-${color}-600 text-${color}-600 mb-4">
               ${task.priority}
             </p>
   
             <!-- Buttons -->
             <div class=" box-border flex justify-between gap-2 border-t-2 -mx-4 px-4 py-2">
               <button class="inline-block rounded-md bg-yellow-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-yellow-400">Edit</button>
               <button id="${task.id}" class="inline-block rounded-md bg-red-500 px-6 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400 delete-btn">Delete</button>
             </div>
           </div>
          `;
        })
        .join("");
      // div.innerHTML = sectionCards;
      if (key === "todo") {
        // todoSection.appendChild(div);
        todoSection.innerHTML = sectionCards;
      } else if (key === "doing") {
        // doingSection.appendChild(div);
        doingSection.innerHTML = sectionCards;
      } else if (key === "done") {
        // doneSection.appendChild(div);
        doneSection.innerHTML = sectionCards;
      } else {
        console.error("wrong key in tasks object");
      }
    }

    updateCounter();
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
        updateCounter();
        taskCard.style.height = "100px";
        taskCard.style.opacity = 0.7;
        taskCard.remove();
      }

      
    });
  });
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
    priority: priority.value,
  };
 
  // rest form
  title.value = "";
  description.value = "";
  date.value = "";
  time.value = "";


  tasks[task.status].push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  showData();
}

// add events
submitBtn.addEventListener("click", addTask);
// showData();

showData();



document.querySelectorAll(".card").forEach( (element)=>{
  element.addEventListener("dragstart",function(ev){
    ev.dataTransfer.setData("text", ev.target.id);


  })
} )


document.querySelectorAll("main > section").forEach( element =>{
  element.addEventListener("ondragover",(ev)=>{
    allowDrop(ev)
  })
  element.addEventListener("ondrop",(ev)=>{
    drop(ev)
  })
})
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));

  const id = data.replace("card","")
  const oldState = document.getElementById(data)
  console.log(oldState);
  
  const newState = ev.target.id;


  

  
  for (let key in tasks) {

    let currentTask = tasks[key].find( task => task.id == id)
    console.log(currentTask);
    

  }
}
