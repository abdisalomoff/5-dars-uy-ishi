let elForm = document.querySelector(".form");
let elInput = document.querySelector(".input");
let elList = document.querySelector(".list");
let elAll = document.querySelector(".all");
let elCompleted = document.querySelector(".completed");
let elUncompleted = document.querySelector(".uncompleted");

let todos = [];

let renderTodo = (array, node) => {
  let result1 = 0;
  let result2 = 0;
  array.forEach((element) => {

    let newItem = document.createElement("li");
    let newSpan = document.createElement("span");
    let newBtn = document.createElement("button");
    let newCheckbox = document.createElement("input");

    newSpan.textContent = element.name;
    newBtn.textContent = "Delete";
    newBtn.setAttribute("class", "delete-btn");
    newBtn.setAttribute("type", "submit");
    newBtn.dataset.todoId = element.id;
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("class", "todo-check");
    newCheckbox.dataset.todoId = element.id;

    if (element.isComplete) {

      newSpan.style.textDecoration = "line-through";
      newCheckbox.checked = true;
      result1 += 1;
    } else {
      result2 += 1;
    }

    newItem.appendChild(newCheckbox);
    newItem.appendChild(newSpan);
    newItem.appendChild(newBtn);
    node.appendChild(newItem);
  });

  elCompleted.textContent = result1;
  elUncompleted.textContent = result2;
};

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".delete-btn")) {

    let deletedId = evt.target.dataset.todoId;
    elList.innerHTML = "";
    let findedIndex = todos.findIndex((todo) => todo.id == deletedId);

    todos.splice(findedIndex, 1);
    renderTodo(todos, elList);
    elAll.textContent = todos.length;
    elUncompleted.textContent = todos.length;
  } else if (evt.target.matches(".todo-check")) {

    let checkedId = evt.target.dataset.todoId;
    elList.innerHTML = "";
    let findedElement = todos.find((todo) => todo.id == checkedId);

    findedElement.isComplete = !findedElement.isComplete;
    renderTodo(todos, elList);
  }
});

elForm.addEventListener("submit", function (evt) {

  evt.preventDefault();
  elList.innerHTML = "";
  let elInputVal = elInput.value;
  elAll.textContent = todos.length + 1;
  elUncompleted.textContent = todos.length + 1;
  let obj = {

    id: todos.length ? todos[todos.length - 1].id + 1 : 0,
    name: elInputVal,
    isComplete: false,
  };
  todos.push(obj);
  renderTodo(todos, elList);
  elInput.value = "";
});
