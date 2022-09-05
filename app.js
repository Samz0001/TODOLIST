const clearBtn = document.querySelector(".clear");
const toDoList = document.querySelector("#list");
const toDoInput = document.querySelector("#input");
const toDoAddBtn = document.querySelector(".fa-plus-circle");
//-------------------------------------------

//Selecting the icon class names
const checkBtn = "fa-check-circle";
const uncheckBtn = "fa-circle-thin";
const textLineThrough = "line-through";

// To Do Container
//let toDoContainer = [];
//let id = 0;

let toDoContainer, id;
//----------------------------------------
let toDoData = localStorage.getItem("to-do-item");
if (toDoData) {
  toDoContainer = JSON.parse(toDoData);
  id = toDoContainer.length;
  loadToDoContainer(toDoContainer);
} else {
  toDoContainer = [];
  id = 0;
}

function loadToDoContainer(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//CLearing the local storage
clearBtn.addEventListener("click", function () {
  localStorage.clear();
  location.reload;
});
//---------------------------------------------------
//addTodo Function
function addToDo(toDo, id, done, trash) {
  if (trash) return;
  const todoDone = done ? checkBtn : uncheckBtn;
  const toDoLine = done ? textLineThrough : "";

  const item = `
        <li class ="item">
        <i class = "fa ${todoDone} complete" status="complete" id="${id}"></i>
        <p class = "text ${toDoLine}">${toDo}</p>
         <i class = "fa fa-trash-o delete" status ="delete" id="${id}"</i>
         </li>
             `;
  const toDoItemPosition = "beforeend";
  toDoList.insertAdjacentHTML(toDoItemPosition, item);
}
//addToDo("walk the dogs", 0, false, false);
// addToDo("walk the dogs", 0, true, false);
// addToDo("walk the dogs", 0, true, true);

//Adding a to-do the list when the  enter key is pressed
document.addEventListener("keyup", displayToDo);

//adding a to do list when plus icon is pressed
toDoAddBtn.addEventListener("click", displayToDo);

//displaytoDo FUnction
function displayToDo(event) {
  if (
    event.keyCode === 13 ||
    event.target.classList.value === "fa fa-plus-circle"
  ) {
    const toDo = input.value;
    //checking whether the input field is not empty
    if (toDo) {
      addToDo(toDo, id, false, false);
      toDoContainer.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      //Persisting to local storage -> updating the local storage

      localStorage.setItem("to-do-item", JSON.stringify(toDoContainer));

      id++;
    }
    input.value = "";
  }
}
//when the todo is completed

function completeTodo(toDoItem) {
  toDoItem.classList.toggle(checkBtn);
  toDoItem.classList.toggle(uncheckBtn);
  toDoItem.parentNode.querySelector(".text").classList.toggle(textLineThrough);
  toDoContainer[toDoItem.id].done = toDoContainer[toDoItem.id].done
    ? false
    : true;
}

// when a todo is removed

function removetoDo(toDoItem) {
  toDoItem.parentNode.parentNode.removeChild(toDoItem.parentNode);
  toDoContainer[toDoItem.id].trash = true;
}
//Targeting the dynamically created to do items
toDoList.addEventListener("click", function (evt) {
  if (
    evt.path[0].localName === "p" ||
    evt.path[0].localName === "li" ||
    evt.path[0].localName === "ul"
  )
    return;

  const toDoItem = evt.target;
  const toDoStatus = toDoItem.attributes.status.value;

  if (toDoStatus === "complete") {
    completeTodo(toDoItem);
  } else if (toDoStatus === "delete") {
    removetoDo(toDoItem);
  }
  localStorage.setItem("to-do-item", JSON.stringify(toDoContainer));
});
