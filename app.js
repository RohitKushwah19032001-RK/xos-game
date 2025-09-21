let boxes = document.querySelectorAll(".box");
let resetBtn =document.querySelector("#reset-btn");
let newGame = document.querySelector(".new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let drawMsg = document.querySelector("#draw");

let count = 0;

let playerX = document.getElementById("playerx");
let playerO = document.getElementById("playero");
let playerS = document.getElementById("players");


let playerscoreX = 0;
let playerscoreO = 0;
let playerscoreS = 0;

let currentTurn = "X";

const resetGame = () => {
    playerX.innerText=0;
    playerO.innerText=0;
    playerS.innerText=0;
 winPatterns = [...winpatternss]; 
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

let winpatternss = [
    // row
[0,1,2],
[6,7,8],
[12,13,14],
[18,19,20],
[24,25,26],
[30,31,32],
[1,2,3],
[7,8,9],
[13,14,15],
[19,20,21],
[25,26,27],
[31,32,33],
[2,3,4],
[8,9,10],
[14,15,16],
[20,21,22],
[26,27,28],
[32,33,34],
[3,4,5],
[9,10,11],
[15,16,17],
[21,22,23],
[27,28,29],
[33,34,35],
// coloumn
[0,6,12],
[1,7,13],
[2,8,14],
[3,9,15],
[4,10,16],
[5,11,17],
[6,12,18],
[7,13,18],
[8,14,20],
[9,15,21],
[10,16,22],
[11,17,23],
[12,18,24],
[13,19,25],
[14,20,26],
[15,21,27],
[16,22,28],
[17,23,29],
[18,24,30],
[19,25,31],
[20,26,32],
[21,27,33],
[22,28,34],
[23,29,35],
// diagonals top-right
[0,7,14],
[1,8,15],
[2,9,16],
[3,10,17],
[6,13,20],
[7,14,21],
[8,15,22],
[9,16,23],
[12,19,26],
[13,20,27],
[14,21,28],
[15,22,29],
[18,25,32],
[19,26,33],
[20,27,34],
[21,28,35],
[5,10,15],
[4,9,14],
[3,8,13],
[2,7,12],
[11,16,21],
[10,15,20],
[9,14,19],
[8,13,18],
[17,22,27],
[16,21,26],
[15,20,25],
[14,19,24],
[23,28,33],
[22,27,32],
[21,26,31],
[20,25,30]

];
let winPatterns = [...winpatternss];

boxes.forEach((box) => {
    box.addEventListener("click" , () => {
       
        if(currentTurn == "X"){
            box.innerText = "X";
           currentTurn="O";
            
        }
        else if(currentTurn == "O"){
            box.innerText= "O";
            currentTurn="S";
        }
       
        else{
            box.innerText= "S";
            currentTurn="X";

        }
        
        box.disabled = true;
        count++;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    };
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "" ;
    };
};


const showMaxWinner = () => {
     let maxWin = Math.max(playerscoreO, playerscoreS, playerscoreX);
     let winners = [];
     if(playerscoreX === maxWin){
        winners.push("X")
     }
      if(playerscoreO === maxWin){
        winners.push("O")
     }
      if(playerS === maxWin){
        winners.push("S")
     };

    if(winners.length === 1){
         msg.innerText = `Congratulation Winner ${winners[0]} , You Win the Maximun Game ${maxWin} `;
        
    }
    else{
        msg.innerText = `It's a tie between ${winners.join( "and ")} with ${maxWin}`;
         
    };
          msgContainer.classList.remove("hide");
         disableBoxes();
}

let winner = null;
let totalgameplayed = 0;
const gameToPlay = 5;



let updatescore = (winner) => {
    if(winner === "X"){
    playerscoreX++;
    playerX.innerText = playerscoreX;    
}

else if(winner === "O"){
    playerscoreO++;
    playerO.innerText = playerscoreO;
      
}

else if(winner === "S"){
    playerscoreS++;
    playerS.innerText = playerscoreS;
 
}


};

let checkWinner = () => {
   
    for( let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
      

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val ){
                console.log("Congrtulation Winner",pos1Val);
                winner = pos1Val;
               updatescore(winner); 
                alert(`Win this round ${pos1Val} `)  
               
               winPatterns = winPatterns.filter(p => p !== pattern);

            if(count === 35){
                         showMaxWinner();
            }    
                  
            };
    
          };
        
        };
       
             if(count === 35 && !winner){
                   msg.innerText = "Draw!";
                    msgContainer.classList.remove("hide");
                    disableBoxes();
                };
  
    };



newGame.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);




