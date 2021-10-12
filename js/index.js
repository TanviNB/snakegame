//game constants and variables
let inputDir ={x:0 , y:0};
const foodsound= new Audio('food.wav');
const gameover= new Audio('gameover.wav');
const movesound= new Audio('movement.wav');
const musicsound= new Audio('angrybird.mp3')
let speed=5;
let score=0;
let lastPaintTime=0;
let snakearr=[
    {x:13, y:15}
]

food={x:6, y:7};


//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime- lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime= ctime;
    gameEngine();
}

function isCollide(sarr){
    //if the snake bumps into itself
    for(let i=1; i< snakearr.length; i++){
        if(snakearr[i].x=== snakearr[0].x && snakearr[i].y=== snakearr[0].y){
            return true;
        }
    }

    //if the snake bumps into the wall
    if(snakearr[0].x >= 18 || snakearr[0].x<=0  || snakearr[0].y>=18 || snakearr[0].y<=0){
        return true;
    }
    
}

function gameEngine(){
    //part1: Updating the snake array and food
    if(isCollide(snakearr)){
        gameover.play();
        musicsound.pause();
        inputDir= {x:0, y:0};
        alert("Game Over! Press any key to play again!");
        snakearr=[{x:13, y:15}];
        musicsound.play();
        score=0;
    }

    //if snake has eaten the food then increment thefood and regenerate the food
    if(snakearr[0].y===food.y && snakearr[0].x===food.x){
        foodsound.play();
        score += 1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscorebox.innerHTML="High Score :"+ highscoreval;
        }
        scorebox.innerHTML= "Score : "+ score;
        snakearr.unshift({x: snakearr[0].x+ inputDir.x, y: snakearr[0].y+inputDir.y })
        let a=2;
        let b=16;
        food= {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    //moving the snake
    for(let i=snakearr.length-2; i>=0; i--){
        snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;

    //part2: Render the snake and food
    //displaying the snake
    board.innerHTML= "";
    snakearr.forEach((e, index)=>{
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart= e.y;
        snakeelement.style.gridColumnStart= e.x;
        
        if(index===0){
            snakeelement.classList.add('head');
        }
        else{
            snakeelement.classList.add('snake');
        }
        
        board.appendChild(snakeelement);
    })

    //displaying the food
    foodelement = document.createElement('div');
    foodelement.style.gridRowStart= food.y;
    foodelement.style.gridColumnStart= food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);
}

//main logic starts here
let highscore= localStorage.getItem("highscore");
if(highscore=== null){
    highscoreval=0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else{
    highscoreval= JSON.parse(highscore);
    highscorebox.innerHTML="High Score :"+ highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir={x:0, y:1} //start the game when a key is press
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x= 0;
            inputDir.y= -1;
            break;
    
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x= 0;
            inputDir.y= 1;
            break;    

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x= -1;
            inputDir.y= 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
    }
})