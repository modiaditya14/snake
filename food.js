import { onSnake, expandSnake } from "./snake.js";
import { randomGridPos } from "./grid.js";

let food = randomFood();
const EXPANSION_RATE = 1;

export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = randomFood();
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.x;
    foodElement.style.gridColumnStart = food.y;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

function randomFood() {
    let newFoodPos;
    while (newFoodPos == null || onSnake(newFoodPos))
        newFoodPos = randomGridPos();
    return newFoodPos;
}

