import { v4 as uuidv4 } from "uuid";

// Initialise a Task type
type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

// Function declarations
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("tasks");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addListItem(task: Task) {
  const item = document.createElement('li');
  item.id = task.id; // Set the id of the list item to the task id
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  const removeButton = document.createElement('button');

  // Set up the remove button
  removeButton.textContent = "X";

  // Add event listener to the remove button
  removeButton.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent click event from bubbling to the list's click listener
    const taskItem = removeButton.parentElement?.parentElement as HTMLLIElement;
    const taskId = taskItem.id;
    removeTask(taskId);
    taskItem.remove();
  });

  checkbox.addEventListener("change", (e) => {
    task.completed = checkbox.checked;
    console.log(tasks) // log the tasks array to see the changes
    saveTasks(); // Save the tasks to local storage
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title, removeButton);
  item.append(label);
  list?.append(item); // Question mark is used to avoid null error
}

function removeTask(id: string) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1); // Splice method removes the element from the array
    saveTasks();
  }
}

// DOM elements
const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');

// Load tasks from local storage and display them
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

// Event listener for adding a new task
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  addListItem(newTask);
  saveTasks(); // Save the new task to local storage
  input.value = "";  // Clear the input field after adding the task
});