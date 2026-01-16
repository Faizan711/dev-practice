const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const todoList = document.getElementById("todo-list");

function createTaskElement(taskText) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;
  span.className = "item-content";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

// Event Delegation: Handle clicks on the entire list
todoList.addEventListener("click", (e) => {
  const target = e.target;
  const li = target.closest("li");

  if (!li) return;

  if (target.classList.contains("item-content")) {
    li.classList.toggle("completed");
  } else if (target.classList.contains("delete-btn")) {
    li.remove();
  }
});

// Handle form submission
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const newTaskElement = createTaskElement(taskText);
    todoList.appendChild(newTaskElement);
    taskInput.value = "";
    taskInput.focus();
  }
});