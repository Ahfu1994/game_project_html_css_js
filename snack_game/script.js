//board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

//snack
let snackX = blockSize * 5;
let snackY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snackBody = [];

//food

let foodX;
let foodY;

//game over
let gameOver = false;


window.onload = function() {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // used for drawing on the board

    placeFood();
    document.addEventListener('keyup', changeDirection);
    // update();
    setInterval(update, 1000 / 10); // 100 miliseconds
}

function update() {
    if (gameOver) {
        return;
    }


    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snackX == foodX && snackY == foodY) {
        snackBody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snackBody.length - 1; i > 0; i--) {
        snackBody[i] = snackBody[i - 1];

    }
    if (snackBody.length) {
        snackBody[0] = [snackX, snackY];
    }

    context.fillStyle = "lime";
    snackX += velocityX * blockSize;
    snackY += velocityY * blockSize;
    context.fillRect(snackX, snackY, blockSize, blockSize);

    for (let i = 0; i < snackBody.length; i++) {
        context.fillRect(snackBody[i][0], snackBody[i][1], blockSize, blockSize);

    }
    //game over condition
    if (snackX < 0 || snackX > cols * blockSize || snackY < 0 || snackY > rows * blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snackBody.length; i++) {
        if (snackX == snackBody[i][0] && snackY == snackBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }

    }

}

function changeDirection(e) {
    // e.preventDefault;
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

}

function placeFood() {
    // (0-1)*cols -> (0-19.999) -> (0-19)*25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;

}