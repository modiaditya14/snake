
import { getInputDirection } from "./input.js";
export var SNAKE_SPEED = 10;
export function updateSnakeSpeed(newSpeed) {
    SNAKE_SPEED = newSpeed;
}
const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

export function getScore() {
    return snakeBody.length;
}

export function update() {
    addSegments();
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    snakeBody[0].y += inputDirection.x;
    snakeBody[0].x += inputDirection.y;
}
export function draw(gameBoard) {
    snakeBody.forEach((segment,index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.x;
        snakeElement.style.gridColumnStart = segment.y;
        snakeElement.classList.add("snake");
        if(index==0){snakeElement.setAttribute("id","snake1")}
        gameBoard.appendChild(snakeElement);
    });
}
export function expandSnake(amount) {
    newSegments += amount;
}
export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return EqualPositions(segment, position);
    });
}
let EqualPositions = (pos1, pos2) => {
    return pos1.y == pos2.y && pos1.x == pos2.x;

};
function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }
    newSegments = 0;
}
export function getSnakeHead() {
    return snakeBody[0];
}
export function snakeIntersection() {
    return (onSnake(getSnakeHead(), { ignoreHead: true }));
}