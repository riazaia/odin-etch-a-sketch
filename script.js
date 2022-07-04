let gridSize = prompt("size?", "16");

const container = document.querySelector("div.container");

let gridItems = [];

container.style.cssText = `grid-template-columns: repeat(${+gridSize}, 1fr);`;

for (let i = 1; i <= +gridSize * +gridSize; i++) {
  let currentDiv = document.createElement(`div`);
  currentDiv.classList.add(`${i}`);
  container.appendChild(currentDiv);
  console.log(currentDiv);
}
console.log(container);
