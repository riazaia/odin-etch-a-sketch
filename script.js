const container = document.querySelector("div.container");
let gridSize = "16";

container.style.cssText = `grid-template-columns: repeat(${+gridSize}, 1fr);`;

for (let i = 1; i <= +gridSize * +gridSize; i++) {
  let currentDiv = document.createElement(`div`);
  currentDiv.classList.add(`${i}`);
  container.appendChild(currentDiv);
}

const allDivs = container.querySelectorAll(`div`);

allDivs.forEach((div) =>
  div.addEventListener("mouseleave", (e) => {
    div.style.backgroundColor = "#333";
  })
);

const resetButton = document.querySelector("button.reset");

resetButton.addEventListener("click", () => {
  allDivs.forEach((div) => (div.style.backgroundColor = "#fff"));
});
