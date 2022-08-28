console.log("hello");
const swap=new Audio("swap.mp3");
const win=new Audio("win.wav");
let turn="X";
let gameover=false;
let reset= document.getElementById("reset");
const changeTurn = () =>{
  return  turn==="X"?"O":"X";
}
reset.addEventListener('click', clrall);
function clrall(){
   console.log("reset");
   document.querySelector('img').style.visibility="hidden";
    let turn="X";
   document.querySelector("#notify").innerHTML="Turn of "+turn;
   let text=document.querySelectorAll(".content");
   Array.from(text).forEach( element =>{
    element.innerHTML="";
   }
   )
}
const winCheck =() =>{
    let boxText=document.getElementsByClassName("content");
    let wins  =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    wins.forEach(e =>{

       if((boxText[e[0]].innerText===boxText[e[1]].innerText)&&(boxText[e[0]].innerText===boxText[e[2]].innerText)&&(boxText[e[0]].innerText!=="")) {
        document.querySelector("#notify").innerHTML=boxText[e[0]].innerText+" WON";
        gameover=true;
        win.play();
        
        document.querySelector('img').style.visibility="visible";
        
       }
    })
}
//game logic
let boxes=document.querySelectorAll(".border");
console.log(boxes);
Array.from(boxes).forEach( element =>{
    let boxText=element.querySelector(".content");
    element.addEventListener('click',()=>{
        if (boxText.innerText===""){
            boxText.innerText= turn;
            turn =changeTurn();
            swap.play();
            winCheck();
            if(gameover==false){
                document.querySelector("#notify").innerHTML="Turn of "+turn;
            }
            
        }
    } )
})

