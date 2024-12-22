const dqs = (element) => document.querySelector(element);
const dqsa = (element) => document.querySelectorAll(element);

let isCircleTurn = false;

const cellElements = dqsa("[data-cell]");
const turnMessageELement = dqs("[data-turn-message]");
const boardElement = dqs("[data-board]");

window.addEventListener("load", () => {
    boardElement.classList.add("x");
    turnMessageELement.classList.add("x");
});

// Marca a celular com x ou circulo (adionando a class)
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);

    boardElement.classList.remove("circle");
    boardElement.classList.remove("x");
    turnMessageELement.classList.add("x");

    if (isCircleTurn) {
        boardElement.classList.add("x");
        turnMessageELement.classList.add("x");
        turnMessageELement.classList.remove("circle");
        turnMessageELement.textContent = "X";
    } else {
        boardElement.classList.add("circle");
        turnMessageELement.classList.remove("x");
        turnMessageELement.classList.add("circle");
        turnMessageELement.textContent = "Círculo";
    }
};

// Mudar o jogador
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
};

for (const cell of cellElements) {
    cell.addEventListener("click", handleClick, { once: true }); //permitir clicar uma vez
}

function handleClick(element) {
    // Marcar na célula (x ou círculo)
    const cell = element.target; //target faz referencia ao elemento clicado
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);
    // Verificar vitória
    // Verificar empate
    // Mudar jogador

    swapTurns();
}
