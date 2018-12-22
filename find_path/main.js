const read = require('readline-sync');

const {createObject, createBorder, makeBoard,doPartition,
  range, randomGenerator, randomPath, isValidMove, modifyMove} = require('./src/lib.js');

const playGame = function(side,userLives,emptyObject,path){
  for (let count=0; count<side*side; count++){
    if(userLives < 1){
      console.log('you lose... \n better luck next time...\n');
      console.log('possible moves are',path,'\n');
      process.exit();
    }
    if (doPartition(range(1,side*side),side).every(x=>x.some(y=>emptyObject[modifyMove(y)] == '()'))){
      console.log('\n- - CONGRATULATIONS YOU ESCAPED SUCCESSFULLY - -\n');
      process.exit();
    }
    let move = read.questionInt('please enter your move: ');
    if (!isValidMove(move,path)){
      console.log('\n ─ ─ ─ B O O O M ─ ─ ─ \n');
      Object.values(emptyObject).map(x=>emptyObject[x] = '  ');
      userLives--;
      console.log('lives remain =',userLives);
    } else {
      emptyObject[modifyMove(move)] = '()';
    }
    console.log('\n'+makeBoard(side,createObject(side)));
    console.log('\n'+makeBoard(side,emptyObject)+'\n');
  }
};

const main = function(){
  let side = +process.argv[2] || 4;
  let emptyObject = Object.assign(createObject(side));
  Object.values(emptyObject).map(x=>emptyObject[x] = '  ');
  let userLives = side-1;
  console.log('\n╟═════ welcome to find path ═════╢\n');
  let path = randomPath(doPartition(range(1,side*side),side),side);
  console.log('\n'+makeBoard(side,createObject(side)));
  console.log('\n'+makeBoard(side,emptyObject)+'\n');
  playGame(side,userLives,emptyObject,path);
}

main();
