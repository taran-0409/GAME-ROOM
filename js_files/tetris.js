//constants
const grid=document.querySelectorAll('#gameGrid');
let score=document.getElementById('scored');
let btn=document.getElementById('btn');
let squares= Array.from(document.querySelectorAll('#gameGrid div'));
//console.log(squares);
let points=0;
const wid=10;
const loosesound= new Audio('win.wav');
//shapes
//L
const lshape=[[ 1,wid+1,wid*2+1,wid*2],
[wid,wid+1,wid+2,wid*2+2],
[ 0,wid,wid*2,wid*2+1],
[wid,wid*2,wid*2+1,wid*2+2]];
//Z
const zshape=[[ wid+1,wid+2,wid*2,wid*2+1],
[0,wid,wid+1,wid*2+1],
[ wid+1,wid+2,wid*2,wid*2+1],
[0,wid,wid+1,wid*2+1]];
//T
const tshape=[[ 1,wid,wid+1,wid+2],
[ 0,wid,wid*2,wid+1],
[wid,wid+1,wid+2,wid*2+1],
[1,wid,wid+1,wid*2+1]];
//O
const oshape=[[0,1,wid,wid+1],
[0,1,wid,wid+1],
[0,1,wid,wid+1],
[0,1,wid,wid+1]];
//|
const ishape=[
    [1,wid+1,wid*2+1,wid*3+1],
    [wid,wid+1,wid+2,wid+3],
    [1,wid+1,wid*2+1,wid*3+1],
    [wid,wid+1,wid+2,wid+3]
]
const allShapes=[ishape,oshape,lshape,tshape,zshape];
const color=["red","skyblue","pink","green","yellow"]
//drawing random shapes
let random= Math.floor(Math.random()*allShapes.length);//selects num between 0-4
let currentPosition=4;
let currentRotation=0;

let selectedshape=allShapes[random][currentRotation];
let randomclr=Math.floor(Math.random()*allShapes.length);

function draw(){
    selectedshape.forEach((index)=>{
        
        squares[currentPosition + index].style.background = color[randomclr];
        
    })

}
draw();
function erase(){
    selectedshape.forEach((index)=>{
        squares[currentPosition + index].style.background = "";
       
    })

}
//moving functions
function down(){
    erase();
    currentPosition+= wid;
    draw();
    stop();


}
let timer=setInterval(down, 1000);
function stop(){
    //stops the tetris as soon as it reaches bottom
    if(selectedshape.some(index=>squares[currentPosition+index+wid].classList.contains('freeze'))){

        selectedshape.forEach(index=>squares[currentPosition+index].classList.add('freeze'));
        //generate a new tetris
        random= Math.floor(Math.random()*allShapes.length);//selects num between 0-4
        currentPosition=4;
        points++;
        score.innerHTML=points
        currentRotation=0;
        randomclr=Math.floor(Math.random()*allShapes.length);
        selectedshape=allShapes[random][currentRotation];
        gameover();


    }

}
function control(e){
    if(e.keyCode===37){
        moveLeft();  
    }
    else if(e.keyCode===39){
        moveRight();  
    }
    else if(e.keyCode===40){
        down();  
    }
    else if(e.keyCode===13){
        rotate();  
    }

}
window.addEventListener("keydown",control);
 function moveLeft(){
    erase();
    let notleft=selectedshape.some(index=> (currentPosition+index)%wid===0);
    
    let block=selectedshape.some(index=>squares[currentPosition+index-1].classList.contains('freeze'))
   
    if(!notleft && !block){
        currentPosition--;
    }
    
    draw();
 }

 
 function moveRight(){
    erase();
    let notRight=selectedshape.some(index=> (currentPosition+index)%wid===wid-1);
   
    let block=selectedshape.some(index=>squares[currentPosition+index+1].classList.contains('freeze'))
    
    if(!notRight && !block){
        currentPosition++;
    }
    
    draw();
 }
 function rotate(){
    erase();
    currentRotation++;
    if(currentRotation===4){
        currentRotation=0;
    }
    selectedshape=allShapes[random][currentRotation];
    draw();
 }
 function pause(){
    if(timer){
        clearInterval(timer);
        timer=null;
        btn.src="images/play.jpg"
    }
    else{
        timer=setInterval(down, 1000);
        btn.src="images/pause.png"
    }
 }
 btn.addEventListener("click",pause);
 function gameover(){
    if(selectedshape.some(index => squares[currentPosition + index].classList.contains('freeze'))){
        score.innerHTML = "Game Over!!!!"
        clearInterval(timer)
        loosesound.play();
        alert('click ok to play again.')
        window.location.reload();
    }
}

 