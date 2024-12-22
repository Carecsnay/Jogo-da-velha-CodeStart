const dqs = (element) => document.querySelector(element);
const dqsa = (element) => document.querySelectorAll(element);

let isCircleTurn;

const boardElement = dqs("[data-board]");
const cellElements = dqsa("[data-cell]");
const turnMessageELement = dqs("[data-turn-message]");
const winnerMessageTextElement = dqs("[data-winner-message-text]");
const winnerMessage = dqs("[data-winner-message]");
const turnContainer = dqs("[data-turn-container]");
const restartButton = dqs("[data-restart-button]");

//Possibilidade de vitórias.
const winnerCombinations = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        turnContainer.classList.remove("hidden-turn-container");
        winnerMessage.classList.remove("show-winner-message");

        cell.addEventListener("click", handleClick, { once: true }); //permitir clicar uma vez
    }

    boardElement.classList.add("x");
    turnMessageELement.classList.add("x");

    isCircleTurn = false;
};

// Marca a celular com x ou circulo (adicionando a class)
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

//Verifica possível ganhador
const checkForWin = (currentPlayer) => {
    return winnerCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

//Verificar empate
const endGame = (isDraw) => {
    if (isDraw) {
        winnerMessageTextElement.innerText = "Empatou!";
    } else {
        winnerMessageTextElement.innerText = isCircleTurn ? `"Círculo" venceu!` : `"X" venceu!`;
        turnContainer.classList.add("hidden-turn-container");
    }

    winnerMessage.classList.add("show-winner-message");
};

function handleClick(element) {
    // Marcar na célula (x ou círculo)
    const cell = element.target; //target faz referencia ao elemento clicado
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);
    // Verificar vitória
    const isWin = checkForWin(classToAdd);

    if (isWin) {
        endGame(false);
    }

    // Verificar empate
    // Mudar jogador
    swapTurns();
}

startGame();

restartButton.addEventListener("click", () => {
    startGame();
});
