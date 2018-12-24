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

const checkCondition = function(userLives, path) {
  if (userLives > 0) {
    console.log("you lose... \n better luck next time...\n");
    console.log("possible moves are", path, "\n");
  }
  return;
};

const checkUserMove = function(move, path, lives, object) {
  if (!isValidMove(move, path)) {
    console.log("\n ─ ─ ─ B O O O M ─ ─ ─ \n");
    Object.values(object).map(x => (object[x] = "  "));
    lives--;
    console.log("lives remain =", lives);
  } else {
    object[modifyMove(move)] = "()";
  }
  return;
};

const printMoves = function(filledArray, emptyArray) {
  for (let index = 0; index < filledArray.length; index++) {
    console.log(emptyArray[index], filledArray[index]);
  }
  return;
};

const playGame = function(side, userLives, emptyObject, path) {
  for (let count = 0; count < side * side; count++) {
    if (userLives < 1) checkCondition(userLives, path);
    if ( doPartition(range(1, side * side), side).every(
      x => x.some(y => emptyObject[modifyMove(y)] == "()"))) {
      console.log("\n- - CONGRATULATIONS YOU ESCAPED SUCCESSFULLY - -\n");
      return;
    };
    let move = read.questionInt("please enter your move: ");
    checkUserMove(move, path, userLives, emptyObject);
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
