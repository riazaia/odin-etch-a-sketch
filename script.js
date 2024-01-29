const container = document.querySelector("div.container");

let gridSize = 16;
let pencilColor = "hsla(0, 0%, 20%, 1)";
let allDivs = null;

function handleMouseEnter() {
  this.style.backgroundColor = "hsla(0, 0%, 20%, 0.6)";
}

function handleMouseLeave() {
  this.style.backgroundColor = pencilColor;
}

function handleNewGrid() {
  gridSize = dialog.returnValue === "default" ? gridSize : dialog.returnValue;

  drawGrid(gridSize);

  outputBox.value =
    dialog.returnValue === "default"
      ? "No return value."
      : `Size: ${dialog.returnValue}`; // Have to check for "default" rather than empty string
}

function drawGrid(size) {
  if (allDivs) {
    allDivs.forEach((div) => {
      div.remove();
    });
  }

  container.style.cssText = `grid-template-columns: repeat(${size}, 1fr);`;

  for (let i = 1; i <= size ** 2; i++) {
    let currentDiv = document.createElement(`div`);
    currentDiv.setAttribute("data-id", `${i}`);
    container.appendChild(currentDiv);
  }

  allDivs = container.querySelectorAll(`div`);
  allDivs.forEach((div) => {
    div.addEventListener("mouseenter", handleMouseEnter);
    div.addEventListener("mouseleave", handleMouseLeave);
  });
}

drawGrid(gridSize);

const resetButton = document.querySelector("button.reset");

resetButton.addEventListener("click", () => {
  allDivs.forEach((div) => (div.style.backgroundColor = "unset"));
});

const newButton = document.querySelector("button.new");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
newButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

const outputBox = document.querySelector("output");
const selectEl = dialog.querySelector("input");
const confirmBtn = dialog.querySelector("#confirmBtn");

selectEl.addEventListener("change", (e) => {
  confirmBtn.value = selectEl.value;
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
dialog.addEventListener("close", handleNewGrid);

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  dialog.close(selectEl.value); // Have to send the select box value here.
});

const colorPicker = document.querySelector("#pencil-color");

const input = document.querySelector("input.test");
const log = document.getElementById("values");

function updateValue(e) {
  console.log(e.target.value);
}

colorPicker.addEventListener("input", updateValue);
