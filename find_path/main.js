const read = require("readline-sync");

const {
  createObject,
  makeBoard,
  doPartition,
  range,
  randomPath,
  isValidMove,
  modifyMove
} = require("./src/lib.js");

const checkCondition = function(side, userLives, path) {
  if (userLives < 1) {
    console.log("\n ════ BETTER LUCK NEXT TIME ════ \n");
    let object = createObject(side);
    Object.values(object).map(x => (object[x] = "  "));
    path.map(x => object[modifyMove(x)] = '()');
    console.log('possible paths are ...\n');
    console.log(makeBoard(side, object).join('\n'),'\n');
  }
  return;
};

const checkUserMove = function(move, path, lives, object) {
  if (!isValidMove(move, path)) {
    console.clear();
    console.log("\n ─ ─ ─ B O O O M ─ ─ ─ \n");
    lives--;
    console.log("lives remain =", lives);
  } else {
    console.clear();
    object[modifyMove(move)] = "()";
  }
  return lives;
};

const printMoves = function(filledArray, emptyArray) {
  console.log();
  for (let index = 0; index < filledArray.length; index++) {
    console.log(emptyArray[index], filledArray[index]);
  }
  console.log();
  return;
};

const checkWinningCondition = function(side, object){
  let userRange = range(1, side * side);
  let partitionArray = doPartition(userRange, side);
  return partitionArray.every(x => x.some(y => object[modifyMove(y)] == "()"));
};

const winningMsg = () => '\n- - CONGRATULATIONS YOU ESCAPED SUCCESSFULLY - -\n'; 

const getUserMove = () => read.questionInt("please enter your move: ");

const playGame = function(side, userLives, emptyObject, path) {
  for (let count = 0; count < side * side; count++) {
    if (userLives < 1)
      return checkCondition(side, userLives, path)
    if(checkWinningCondition(side, emptyObject))
     return console.log(winningMsg());
    let move = getUserMove();
    userLives = checkUserMove(move, path, userLives, emptyObject);
    let filledBoxArray = makeBoard(side, createObject(side));
    let emptyBoxArray = makeBoard(side, emptyObject);
    printMoves(filledBoxArray, emptyBoxArray);
  }
};

const main = function() {
  let side = +process.argv[2] || 4;
  let emptyObject = Object.assign(createObject(side));
  Object.values(emptyObject).map(x => (emptyObject[x] = "  "));
  let userLives = side - 1;
  console.log("\n╟═════ welcome to find path ═════╢\n");
  let path = randomPath(doPartition(range(1, side * side), side), side);
  console.log("\n" + makeBoard(side, createObject(side)).join("\n"), "\n");
  playGame(side, userLives, emptyObject, path);
};

main();
