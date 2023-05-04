const container = document.querySelector("div.container");
let gridSize = 16;
let pencilColor = "hsla(0, 0%, 20%, 1)";

container.style.cssText = `grid-template-columns: repeat(${gridSize}, 1fr);`;

for (let i = 1; i <= gridSize ** 2; i++) {
  let currentDiv = document.createElement(`div`);
  currentDiv.setAttribute("data-id", `${i}`);
  container.appendChild(currentDiv);
} 

const allDivs = container.querySelectorAll(`div`);

allDivs.forEach((div) =>
  div.addEventListener("mouseleave", (e) => {
    div.style.backgroundColor = pencilColor;
  })
);

const resetButton = document.querySelector("button.reset");

resetButton.addEventListener("click", () => {
  allDivs.forEach((div) => (div.style.backgroundColor = "unset"));
});
