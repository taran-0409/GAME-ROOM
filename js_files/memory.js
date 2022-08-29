
let grid=document.querySelector('#grid');
let moves=document.querySelector('#moves');
let scored=document.querySelector('#scored');
let timer=document.querySelector('#time');
let leastTime=document.getElementById("timehighscore");
let leastMoves=document.getElementById("moveshighscore");
let chosencard=[];
let chosencardid=[];
const won=[];
const win=new Audio('win.wav');
const swap=new Audio("swap.mp3");
let score=0;
let move=0;
let count=0;
leastTime.innerHTML=localStorage.getItem("lowesttime");
leastMoves.innerHTML=localStorage.getItem("leastmove");
const cardarr=[
    {
        name:'img1',
        img: 'images/image1.jpg'
    },
    {
        name:'img2',
        img: 'images/image2.jpg'
    },
    {
        name:'img3',
        img: 'images/image3.jpg'
    },
    {
        name:'img4',
        img: 'images/image4.png'
    },
    {
        name:'img5',
        img: 'images/image5.png'
    },
    {
        name:'img6',
        img: 'images/image6.jpg'
    },
    {
        name:'img7',
        img: 'images/image7.jpg'
    },
    {
        name:'img8',
        img: 'images/image8.jpg'
    },
    {
        name:'img9',
        img: 'images/image9.jpg'
    },
    {
        name:'img1',
        img: 'images/image1.jpg'
    },
    {
        name:'img2',
        img: 'images/image2.jpg'
    },
    {
        name:'img3',
        img: 'images/image3.jpg'
    },
    {
        name:'img4',
        img: 'images/image4.png'
    },
    {
        name:'img5',
        img: 'images/image5.png'
    },
    {
        name:'img6',
        img: 'images/image6.jpg'
    },
    {
        name:'img7',
        img: 'images/image7.jpg'
    },
    {
        name:'img8',
        img: 'images/image8.jpg'
    },
    {
        name:'img9',
        img: 'images/image9.jpg'
    }
];
cardarr.sort(()=>Math.random() - 0.5);
console.log(cardarr);
//adding cards to screen
function gameBoard(){
    for(let i=0;i<cardarr.length;i++){
        const card=document.createElement('img');
        card.setAttribute('src','images/CARDBG1.jpg');
        card.setAttribute('data-id',i);
        card.setAttribute('class','card');
        grid.appendChild(card);
        console.log(card)
        card.addEventListener('click',flip)
        

    }
}
gameBoard();
//card game logic
function match(){
    const cards=document.querySelectorAll('#grid img')
    console.log('check')
    if(chosencardid[0]==chosencardid[1]){
        alert("You clicked the same image")
    }

    
    if(chosencard[0]==chosencard[1]){
    swap.play();
    cards[chosencardid[0]].setAttribute('src','images/membg.jpg');
    cards[chosencardid[0]].setAttribute('class','matched');
    cards[chosencardid[1]].setAttribute('src','images/membg.jpg');
    cards[chosencardid[1]].setAttribute('class','matched');
    cards[chosencardid[0]].removeEventListener('click',flip);
    cards[chosencardid[1]].removeEventListener('click',flip);
    score++;
    scored.innerHTML=score;
    won.push(chosencard);
    }
    else{
        cards[chosencardid[0]].setAttribute('src','images/CARDBG1.jpg');
        cards[chosencardid[1]].setAttribute('src','images/CARDBG1.jpg');
    }
    move++;
    moves.innerHTML=move;
    chosencard=[];
    chosencardid=[];
    if(score==9){
        clearInterval(timer);
        win.play();
        alert('YOU WON!!   TIME TAKEN: '+count +' SECONDS AND NUMBER OF MOVES: '+move);
        highscore();
        alert('click ok to play again.')
        window.location.reload();
    }

}
//flipping the cards
function flip(){
    const cardid=this.getAttribute('data-id');    
    chosencard.push(cardarr[cardid].name);
    chosencardid.push(cardid)
    this.setAttribute('src',cardarr[cardid].img)
    if(chosencard.length===2){
        setTimeout(match,500)
    }
}
//adding timer



    interval = setInterval(()=>{
        timer.innerHTML=count;
        count++;
        if (count === 180){
            clearInterval(interval);
            alert("You're out of time!");
        }
    }, 1000);

    //ADDING HIGH SCORE
    //set default highscore in local storage
    
    function highscore(){
        
        //check condition for highscore
        if(localStorage.getItem("lowesttime")>count && localStorage.getItem("leastmove")>move){
            localStorage.setItem("lowesttime", count);
            localStorage.setItem("leastmove", move);
            leastTime.innerHTML=localStorage.getItem("lowesttime");
            leastMoves.innerHTML=localStorage.getItem("leastmove");
            alert("CONGRATULATIONS!! NEW HIGH SCORE OF TIME AND MOVES")

        }
        else if(localStorage.getItem("lowesttime")>count && localStorage.getItem("leastmove")<=move){
            localStorage.setItem("lowesttime", count);
            leastTime.innerHTML=localStorage.getItem("lowesttime");
            alert("CONGRATULATIONS!! NEW HIGH SCORE OF TIME ")

        }
        else if(localStorage.getItem("lowesttime")<=count && localStorage.getItem("leastmove")>move){
            localStorage.setItem("leastmove", move);
            leastMoves.innerHTML=localStorage.getItem("leastmove");
            alert("CONGRATULATIONS!! NEW HIGH SCORE OF MOVES")

        }
        

    }


