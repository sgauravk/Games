const createObject = function(number){
  let result = {};
  let string = '0';
  for(let count=01; count<=number*number; count++){
    if ((''+count).length > 1){ string = ''; }
    result[string+count] = string+count;
  }
  return result;
};

const createBorder = function(firstChar,middleChar,endChar,lineType,length){
  let line = ' ' + firstChar;
  for (let count = 1; count < length; count++){
    line += lineType + middleChar;
  }
  return line + lineType + endChar + ' ';
};

const isValidMove = function(move,array){
  return array.includes(move);
};

const modifyMove = function(move){
  if(move < 10){
    move = '0'+move;
  }
  return ''+move;
};

const makeBoard = function(length, object){
  let firstLine =  createBorder('╔','╤','╗','════',length);
  let delimeter = ' ║ ';
  let board = [];
  let index = 1;
  let indexToStart = 1;
  while(index <= length){
    board.push(firstLine);
    let sampleLine = "";
    for(let count = indexToStart; count <= length*index; count++){
      sampleLine += delimeter + object[modifyMove(count)];
      delimeter = ' │ ';
    };
    delimeter = ' ║ ';
    firstLine = createBorder('╟','┼','╢','────',length);
    sampleLine += ' ║ ';
    board.push(sampleLine);
    index++;
    indexToStart += length;
  }
  board.push(createBorder('╚','╧','╝','════',length));
  return board;
};

const doPartition = function(array,length){
  let result = [];
  let indexToStart = 0;
  for(let index=0; index<length; index++){
    let sampleArray = array.slice(0);
    result.push(sampleArray.splice(indexToStart,length));
    indexToStart+=length;
  }
  return result;
};

const range = function(num1,num2){
  let result = [];
  let max = Math.max(num1,num2);
  let min = Math.min(num1,num2);
  for(let count=min; count<=max; count++){
    result.push(count);
  }
  return result;
};

const randomGenerator = function(array){
  return array[Math.floor(Math.random()*array.length)];
};

const randomPath = function(twoDArray, side){
  let firstElement = randomGenerator(twoDArray[0]);
  let result = [firstElement];
  for (let count=1; count<side; count++){
    let secondElement = randomGenerator(twoDArray[count]);
    result = result.concat(range(firstElement+side,secondElement));
    firstElement = secondElement;
  }
  return result;
};

const findNeighbours = function(side, count){
  let result = [count-1, count+1, count+side, count-side];
  if(count%side == 0) result = [count-1, count+side, count-side];
  if((count-1)%side == 0) result = [count+1, count+side, count-side];
  return result;
};

const validateNeighbours = function(side, count){
  let neighboursArray = findNeighbours(side, count);
  return neighboursArray.filter(x => x <= side*side && x > 0);
};

const checkCondition = function(side, userLives, path) {
  if (userLives < 1) {
    console.log("\n ════ BETTER LUCK NEXT TIME ════ \n");
    let object = createObject(side);
    Object.values(object).map(x => (object[x] = "  "));
    path.map(x => object[modifyMove(x)] = '()');
    console.log('possible paths are ...\n');
    console.log(makeBoard(side, object).join('\n'),'\n');
  }
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

const initialPossibleMoves = function(side){
  let rangeStartFrom = (side*(side-1)+1);
  return range(rangeStartFrom, side*side);
};

const checkMove = function(possibleMoves, move){
  if(!possibleMoves.includes(move)){
    console.log('\n => ...... INVALID move ...... <=');
    return false;
  }
  return true;
};

module.exports = {createObject, createBorder, makeBoard,
  findNeighbours, doPartition, range, randomGenerator, 
  randomPath, isValidMove, modifyMove, validateNeighbours,
  checkCondition, checkUserMove, printMoves,
   checkWinningCondition, initialPossibleMoves, checkMove};
