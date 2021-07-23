const url = "http://localhost:3000/notes";
const form = document.querySelector("#todo-form");
const todoList = document.querySelector("todo-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const todoText = document.getElementById("todo-text").value;
  console.log(todoText);
  createTodo(todoText);
  // this will clear my input after submitting a todo
  form.reset();
});

// Adds list items to the DOM
function renderTodoItem(todoObj) {
  const itemInList = document.createElement("li");
  itemInList.id = todoObj.id;
  itemInList.classList.add(
    "lh-copy",
    "pv3",
    "ba",
    "bl-0",
    "bt-0",
    "br-0",
    "b--dotted",
    "b--black-3"
  );
  renderTodoText(itemInList, todoObj);
  console.log(itemInList);
  todoList.appendChild(itemInList);
}

// Puts together the list item text and buttons
function renderTodoText(itemInList, todoObj) {
  itemInList.innerHTML = `<span class="dib w-60">${todoObj.body}</span><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`;
}

// GET request
function listTodos() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (todo of data);
      console.log(todo);
      renderTodoItem(todo);
    });
}

listTodos();
