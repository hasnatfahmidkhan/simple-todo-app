const inputTask = document.getElementById("inputTask");
const addTask = document.getElementById("addTask");
const taskContainer = document.getElementById("taskContainer");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);
addTask.addEventListener("click", () => {
  const inpValue = inputTask.value.trim();

  if (inpValue !== "") {
    tasks.push({
      id: crypto.randomUUID(),
      task: inpValue,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTask();
  }
  inputTask.value = "";
});

const showTask = () => {
  taskContainer.innerHTML = "";
  tasks.forEach((task) => {
    taskContainer.innerHTML += `
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
    <li class="text-xl md:text-3xl">${task.task}</li>
    <button onclick="DeleteTask('${task.id}')" class="btn btn-error text-amber-50">Delete Task</button>
    </div>
    `;
  });
};

function DeleteTask(id) {
  const filteredTasks = tasks.filter((task) => id !== task.id);
  tasks = filteredTasks;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTask();
}

showTask();
