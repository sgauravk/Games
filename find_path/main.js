const read = require("readline-sync");

const {
  createObject, makeBoard, doPartition, range,
  randomPath, modifyMove, findCheatMove,
  validateNeighbours, checkCondition, checkUserMove,
  printMoves, checkWinningCondition, initialPossibleMoves,
  checkMove } = require("./src/lib.js");

const winningMsg = () => '\n- - CONGRATULATIONS YOU ESCAPED SUCCESSFULLY - -\n'; 

const getUserMove = () => read.questionInt("please enter your move: ");

const userMove = function(possibleMoves){
  console.log('\npossible moves are ==> ', possibleMoves,'\n');
  move = getUserMove();
  if (move == 1997) return move;
  if(!checkMove(possibleMoves, move)) userMove(possibleMoves);
  return move;
};

const checkDifficulty = function(userMove){
  if(![1,2,3].includes(userMove)){
    console.log('\nyou have only 3 choises, please select a valid option.');
    return difficultyLevel();
  };
};

const difficultyLevel = function(){
  const levels = '\n1 - Easy \n2 - Medium \n3 - Hard\n';
  let side = {1: 4, 2: 6, 3: 8};
  console.log('\nplease select a difficulty level -:\n' + levels);
  let userChoise = read.questionInt( 'select difficulty level: ');
  checkDifficulty(userChoise);
  return side[userChoise];
};

const playGame = function(side, userLives, emptyObject, path) {
  let possibleMoves = initialPossibleMoves(side);
  for (let count = 0; count < side * side; count++) {
    if (userLives < 1)
      return checkCondition(side, userLives, path)
    if(checkWinningCondition(side, emptyObject))
      return console.log(winningMsg());
    move = userMove(possibleMoves);
    if (move == 1997) move = findCheatMove(path, possibleMoves);
    userLives = checkUserMove(move, path, userLives, emptyObject);
    let filledBoxArray = makeBoard(side, createObject(side));
    let emptyBoxArray = makeBoard(side, emptyObject);
    printMoves(filledBoxArray, emptyBoxArray);
    if(emptyObject[modifyMove(move)]=='🚴'){
      possibleMoves = validateNeighbours(side, move);
    };
  };
};

const main = function() {
  let side = +process.argv[2] || difficultyLevel();
  if (side > 9){
    console.log('\nside should be less then 10\n');
    process.exit();
  };
  let emptyObject = Object.assign(createObject(side));
  Object.values(emptyObject).map(x => (emptyObject[x] = "  "));
  let userLives = side - 1;
  console.log("\n╟═════ welcome to find path ═════╢\n");
  let path = randomPath(doPartition(range(1, side * side), side), side);
  console.log("\n" + makeBoard(side, createObject(side)).join("\n"), "\n");
  playGame(side, userLives, emptyObject, path);
};

main();
