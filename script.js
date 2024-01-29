import { getRandomInt, createHslString, hexToHSL } from "./lib/utils.js";

const container = document.querySelector("div.container");

let controls = {
  grid: {
    size: 16,
  },
  pencil: {
    h: 0,
    s: 0,
    l: 20,
  },
};

let pencil = {
  h: 0,
  s: 0,
  l: 20,
};

let eraser = false;
let rainbow = false;

let allDivs = null;

function handleMouseEnter() {
  if (eraser) {
    this.style.backgroundColor = "transparent";
  } else {
    this.style.backgroundColor = createHslString(
      controls.pencil.h,
      controls.pencil.s,
      controls.pencil.l,
      0.6
    );
  }
}

function handleMouseLeave() {
  if (eraser) {
    this.style.backgroundColor = "transparent";
  } else if (rainbow) {
    this.style.backgroundColor = createHslString(
      getRandomInt(0, 360),
      controls.pencil.s,
      controls.pencil.l,
      1
    );
  } else {
    this.style.backgroundColor = createHslString(
      controls.pencil.h,
      controls.pencil.s,
      controls.pencil.l,
      1
    );
  }
}

function handleNewGrid() {
  controls.grid.size =
    dialog.returnValue === "default" ? controls.grid.size : dialog.returnValue;

  drawGrid(controls.grid.size);

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

drawGrid(controls.grid.size);

const rainbowButton = document.querySelector("button.rainbow");
const resetButton = document.querySelector("button.reset");
const eraserButton = document.querySelector("button.eraser");

rainbowButton.addEventListener("click", () => {
  rainbow = !rainbow;
  eraser = false;
});

resetButton.addEventListener("click", () => {
  allDivs.forEach((div) => (div.style.backgroundColor = "transparent"));
});

eraserButton.addEventListener("click", () => {
  eraser = !eraser;
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

function updateValue(e) {
  console.log(hexToHSL(e.target.value));
  [controls.pencil.h, controls.pencil.s, controls.pencil.l] = hexToHSL(
    e.target.value
  );
}

colorPicker.addEventListener("change", updateValue);
