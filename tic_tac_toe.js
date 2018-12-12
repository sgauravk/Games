const readline = require("readline-sync");
const lib = require("say");

let object = {1:" ",2:" ",3:" ",
  4:" ",5:" ",6:" ",
  7:" ",8:" ",9:" "}

let winningPattern = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let firstPlayerInput = [];
let secondPlayerInput = [];

console.log("\n+-----------WELCOME TO TIC TAC TOE-----------+\n");
lib.speak("WELCOME TO TIC TAC TOE");
let initialPattern = " 1 | 2 | 3 \n---+---+---\n 4 | 5 | 6 \n---+---+---\n 7 | 8 | 9 \n"
console.log("\n"+initialPattern);

let firstPlayer = readline.question("\nEnter first player name: ");
let secondPlayer = readline.question("\nEnter second player name: ");

let firstPlayerSymbol = readline.question("\n"+firstPlayer+" select your symbol 0 or X: ");

while(firstPlayerSymbol != "X"){ 
  if(firstPlayerSymbol == 0){
    break;
  }
  console.log("\ninvalid symbol, select your symbol 0 or X.");
  firstPlayerSymbol = readline.question("\n"+firstPlayer+" select your symbol 0 or X: ");
}

if(firstPlayerSymbol == 0){
  secondPlayerSymbol = "X";
} else {
  secondPlayerSymbol = 0;
}
console.log("\n"+secondPlayer,"your symbol is",secondPlayerSymbol,"\n");

const isEven = function(num){
  return num%2==0;
};

const isSubset = function(number){
  return playerInput.includes(""+number);
}

for (let turn=0; turn<9; turn++){
  if (isEven(turn)){
    symbol = firstPlayerSymbol;
    player = firstPlayer;
    playerInput = firstPlayerInput;
  } else {
    symbol = secondPlayerSymbol;
    player = secondPlayer;
    playerInput = secondPlayerInput;
  }
  let number = readline.question(player+" select a number between 1 to 9: ");

  while(object[number] !== " "){
    console.log("\nbox is already allocate OR invalid input, please try again.\n");
    number = readline.question(player+" select a number between 1 to 9: ");
  }

  object[number] = symbol;

  playerInput.push(number);

  console.clear();
  console.log("\n"+initialPattern,"\n "+object[1]+" | "+object[2]+" | "+object[3]
    +"\n---+---+---\n"+" "+object[4]+" | "+object[5]+" | "+object[6]
    +"\n---+---+---\n"+" "+object[7]+" | "+object[8]+" | "+object[9]+"\n");

  for (index=0; index<winningPattern.length; index++){
    if(winningPattern[index].every(isSubset)){
      console.log("Congratulations",player,"you won\n");
      lib.speak("Congratulations "+player+" you won.",'lekha');
      process.exit();
    }
  }
}
console.log("------- Match Draw -------\n");
lib.speak("MATCH DRAW",'a');
