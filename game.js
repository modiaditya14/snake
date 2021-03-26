import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, getScore, updateSnakeSpeed } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

const gameBoard = document.getElementById("game-board");
let lastRenderTime = 0;
let gameOver = false;
function updateSpeed(e) {
   updateSnakeSpeed(e)
    console.log(SNAKE_SPEED)
}
window.updateSpeed = updateSpeed;
function main(currentTime) {
    if (gameOver) {
        if (confirm(`You Lost. Score: ${getScore()}.Press ok to restart`)) window.location.reload();
        return;
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    lastRenderTime = currentTime;
    update();
    draw();
}
window.requestAnimationFrame(main);

function update() {
    let scoreText = document.querySelector("#score");
    scoreText.innerHTML = `Score: ${getScore()}`;
    updateSnake();
    updateFood();
    checkDeath();
}
function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);

}
function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}