const createObject = function(length, width){
  let result = {};
  for(let count=1; count<=length*width; count++){
    result[count] = count;
  };
  return result;
};

const createBorder = function(firstChar,middleChar,endChar,lineType,length){
  let line = ' ' + firstChar;
  for (let count = 1; count < length; count++){
    line += lineType + middleChar;
  };
  return line + lineType + endChar + ' ';
};

const isValidMove = function(move,array){
  return array.includes(move);
};

const modifyMove = function(move){
  if(move < 10){
    move = '0'+move;
  };
  return ''+move;
};

const creteAP = function(length){
  let list = [];
  let index = length-1;
  for(let count=0; count<length; count++){
    list.push(index);
    index-=2;
  };
  return list;
};

const isOdd = function(number){
  return number%2!=0;
};

const incrementBy1 = number => number+1;

const defaultValues = function(length,width){
  let firstLine = createBorder('╔','╤','╗','════',length);
  let APList = creteAP(width);
  let delimeter = ' ║ ';
  let board = [];
  let index = 0;
  let indexToStart = 1;
  return {firstLine, APList, delimeter, board, index, indexToStart};
};

const makeBoard = function(length, width, object){
  let {firstLine, APList, delimeter, board, index, indexToStart}
   = defaultValues(length, width);
  while(index < width){
    board.push(firstLine);
    let sampleLine = "";
    for(let count = 0; count < length ; count++){
      let value = object[count*width + indexToStart];
      if(isOdd(count)) value = value + APList[index];
      sampleLine += delimeter + modifyMove(value);
      delimeter = ' │ ';
    };
    delimeter = ' ║ ';
    firstLine = createBorder('╟','┼','╢','────',length);
    sampleLine += ' ║ ';
    board.push(sampleLine);
    index = incrementBy1(index);
    indexToStart = incrementBy1(indexToStart);
  };
  board.push(createBorder('╚','╧','╝','════',length));
  return board;
};

const minusPower = function(move){
  return move>0 && move<6;
};

const crossPower = function(move){
  return -6 < move < 6;
};

console.log(makeBoard(8,6,createObject(8,6)).join('\n'));