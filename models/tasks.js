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

export { tasks };
