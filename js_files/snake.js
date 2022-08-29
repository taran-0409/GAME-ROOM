//constants

let dirn={x:0,y:0};
const eatsound= new Audio('eat.wav');
const movesound= new Audio('move.wav');
const loosesound= new Audio('win.wav');
const gamesound =new Audio('game.wav');
let speed=3;
let score=0;
let lastpaintTime=0;
let highest=document.getElementById("highscore");
//let scoreshow=Document.getElementById('netscore')
let snakearr=[
    {x:13, y:15}
];
food={x:8,y:4};
highest.innerHTML=localStorage.getItem("highest");
//functions
function main(ctime){
    window.requestAnimationFrame(main);
   
    if((ctime-lastpaintTime)/1000 <1/speed){
        return;
    }
    lastpaintTime=ctime;
    gameEngine();
}

function iscollide(sarr){
    //if snake bumps into itself
        for(let i=1;i<snakearr.length;i++){
           if(snakearr[0].x===snakearr[i].x && snakearr[0].y===snakearr[i].y){
                highscore();
                return true;
            }
        }

    // if snake bumps into wall
    if(snakearr[0].x>=20||snakearr[0].x<=0||snakearr[0].y>=18||snakearr[0].y<=0){
        highscore();
    return true;
    
    }
   //otherwise
        return false;
}
//ADDING HIGH SCORE
    //set default highscore in local storage
    
    function highscore(){
        
        //check condition for highscore
        if(localStorage.getItem("highscore")<score ){
            localStorage.setItem("highscore", score);
            highest.innerHTML=localStorage.getItem("highscore");
            alert("CONGRATULATIONS!!You made new High Score")

        }
    }
function gameEngine(){
    //snake array and food update
    if (iscollide(snakearr)){
        gamesound.pause();
        loosesound.play();
        dirn={x:0,y:0};
        alert("Game over!! press any key to play again");
        snakearr=[
            {x:13, y:15}
        ];
        score=0;
        gamesound.play();

    }
    //if food eaten,score+1 and regenerate food.
    if(snakearr[0].x===food.x && snakearr[0].y===food.y){
        snakearr.unshift({x:snakearr[0].x+dirn.x , y:snakearr[0].y+dirn.y});
        eatsound.play();
        score++;
        netscore.innerHTML=score;
        let a=3;
        let b=17;
       
            food={
                x:Math.round(a+(b-a)*Math.random()) ,y:Math.round(a+(b-a)*Math.random())
            };
        
    }
    //moving the snake
    for(let i=snakearr.length-2;i>=0;i--){
        snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x+=dirn.x;
    snakearr[0].y+=dirn.y;
    
    //display snake and food
    board.innerHTML=("");
    //snake display
    snakearr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
        snakeElement.classList.add('head');}
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
        
    })
    //food display
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

    
//main logic 

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    dirn={x:0,y:1};//start game
    gamesound.play();
    movesound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("up");
            dirn.x=0;
            dirn.y=-1;
            break;
        case "ArrowDown":
            console.log("down");
            dirn.x=0;
            dirn.y=1;
            break;
        case "ArrowLeft":
            console.log("left");
            dirn.x=-1;
            dirn.y=0;
            break;
        case "ArrowRight":
            console.log("right");
            dirn.x=1;
            dirn.y=0;
            break;
        default:
            break;
    }
})
