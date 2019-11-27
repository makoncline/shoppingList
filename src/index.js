const list = document.querySelector(".list");
const itemInput = document.querySelector(".item-input");
const buttons = document.querySelectorAll(".controls button");

let items = JSON.parse(window.localStorage.getItem("items")) || [];

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name = item]").value;
  if (!text) return;
  const item = {
    text,
    done: false
  };
  items.push(item);
  window.localStorage.setItem("items", JSON.stringify(items));
  displayItems(items, list);
  e.target.reset();
}

function displayItems(items = [], list) {
  list.innerHTML = items
    .map((item, i) => {
      return `
      <li>
        <input 
          type='checkbox' 
          data-index='${i}' 
          id='item${i}' 
          ${item.done ? "checked" : ""}
        >
        <label for='item${i}'>${item.text}</label>
      </li>
    `;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const index = e.target.dataset.index;
  items[index].done = !items[index].done;
  window.localStorage.setItem("items", JSON.stringify(items));
  displayItems(items, list);
}

function handleButton(e) {
  switch (e.target.id) {
    case "clear":
      items = [];
      break;
    case "check":
      items.forEach(item => (item.done = true));
      break;
    case "uncheck":
      items.forEach(item => (item.done = false));
      break;
    default:
      break;
  }
  window.localStorage.setItem("items", JSON.stringify(items));
  displayItems(items, list);
}

itemInput.addEventListener("submit", addItem);
list.addEventListener("click", toggleDone);
buttons.forEach(button => addEventListener("click", handleButton));
displayItems(items, list);
