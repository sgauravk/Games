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

module.exports = {createObject, createBorder, makeBoard,
  doPartition, range, randomGenerator, 
  randomPath, isValidMove, modifyMove};
