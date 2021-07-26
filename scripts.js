// I was able to understand everything that was happening with the example that Jeanette provided.
// I typed that out here as I worked to understand it.
// Unfortunately this weekend I was sick and wasn't able to go the next step of writing my own version.
// I did make attempts to work through the logic of making the edit button function more intuitively but did not finish.

const url = "http://localhost:3000/notes";
const form = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoText = document.getElementById("todo-text").value;
  console.log(todoText);
  createTodo(todoText);
  form.reset();
});

todoList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    deleteTodo(event.target);
  }
  if (event.target.classList.contains("edit")) {
    // let editTodoPlaceholder = document.getElementById("todo-text").placeholder;
    // console.log(editTodoPlaceholder);
    // const itemInList = notes.body;
    // console.log(itemInList);
    // editTodoPlaceholder = itemInList;
    updateTodo(event.target);
    form.reset();
  }
});

// function hide(event) {
//   event.target.style.visibility = "hidden";
// }

// form.addEventListener("submit", function (event) {
//   // updateTodo(event.target);
//   // form.reset();
// });

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
      for (const todo of data) {
        console.log(todo);
        renderTodoItem(todo);
      }
    });
}

// POST request
function createTodo(todoText) {
  fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      title: todoText,
      body: todoText,
      created_at: moment().format(),
    }),
  })
    .then((response) => response.json())
    .then((data) => renderTodoItem(data));
}

// DELETE request
function deleteTodo(element) {
  const todoId = element.parentElement.id;
  fetch(url + "/" + `${todoId}`, {
    method: "DELETE",
  }).then(() => element.parentElement.remove());
}

// UPDATE todo
function updateTodo(element) {
  const todoId = element.parentElement.id;
  const todoText = document.getElementById("todo-text").value;
  fetch(url + "/" + `${todoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: todoText,
      body: todoText,
      updated_at: moment().format(),
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);

      renderTodoText(element.parentElement, data);
    });
}

listTodos();
