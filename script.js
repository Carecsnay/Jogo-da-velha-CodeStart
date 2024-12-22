const dqs = (element) => document.querySelector(element);
const dqsa = (element) => document.querySelectorAll(element);

let isCircleTurn = false;

const cellElements = dqsa("[data-cell]");
const boardElement = dqs("[data-board]");

// Marca a celular com x ou circulo (adionando a class)
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);

    boardElement.classList.remove("x");
    boardElement.classList.remove("circle");

    if (isCircleTurn) {
        boardElement.classList.add("x");
    } else {
        boardElement.classList.add("circle");
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
