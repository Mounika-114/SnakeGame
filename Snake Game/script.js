let inputDir = { x: 0, y: 0 };
const moveSound = new Audio("move.mp3");
const foodSound = new Audio("food.mp3");
const gameoverSound = new Audio("gameover.mp3");
let speed = 9;
let lastPaintTime = 0;
snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };
let Score=0;




//Game functions 
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function collide(snake){
    for(let i=1; i<snakeArr.length; i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    if(snake[0].x>=18|| snake[0].x<=0||snake[0].y>=18|| snake[0].y<=0){
        return true;
    }
    return false;
}
function gameEngine() {
    //part1--> Updating snake & food
    if(collide(snakeArr)){
        gameoverSound.play();
        inputDir={x:0,y:0};
        alert("GameOver:(Press ctrl+r to refresh the game");
        snakeArr = [{ x: 13, y: 15 }];
        Score=0;
    }
    // if you have easten the food then regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        Score +=1;
        if (Score>HighScoreValue) {
            HighScoreValue=Score;
            localStorage.setItem("HighScore",JSON.stringify(HighScoreValue));
            HighScoreBox.innerHTML="HighScore:"+HighScoreValue;
        }
        ScoreBox.innerHTML="Score:"+Score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2, b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    //Move the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //part2-->Display rather render your snake and food
    //For Displaying your snake
    playArea.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        playArea.appendChild(snakeElement);
    });
    //For Displaying food
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        playArea.appendChild(foodElement);
}

//Main logic behind runnig the game
let HighScore=localStorage.getItem("HighScore");

if (HighScore===null) {
    HighScoreValue=0;
    localStorage.setItem("highscore",JSON.stringify(HighScoreValue))
}else{
    HighScoreValue=JSON.parse(HighScore);
    HighScoreBox.innerHTML="HighScore:"+HighScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir={x:0,y:0}
    switch (e.key) {
        case "ArrowLeft":
            console.log("Arrow Left ");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("Arrow Right ");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowDown":
            console.log("Arrow Down ");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowUp":
            console.log("Arrow up ");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        default:
            break;
    }
})