const assert = require('assert');

const {createObject, createBorder, makeBoard,doPartition,
  range, randomGenerator, isValidMove, modifyMove,
  findNeighbours, validateNeighbours } = require('../src/lib.js');

describe('createObject', function(){

  it('should create an object according to given number', function(){
    let expectedOutput = {'01':'01','02':'02','03':'03','04':'04'}
    assert.deepEqual(createObject(2),expectedOutput);
  });

  it('should return sigle key and value for 1', function(){
    assert.deepEqual(createObject(1),{'01':'01'});
  });

  it('should return empty array for 0', function(){
    assert.deepEqual(createObject(0),{});
  });

});


describe('createBorder', function(){

  it('should create a border line according to input', function(){
    assert.equal(createBorder('╔','╤','╗','════',2),' ╔════╤════╗ ');
  });

  it('should work for 1 also', function(){
    assert.equal(createBorder('╚','╧','╝','════',1),' ╚════╝ ');
  });

});


describe('doPartition', function(){

  it('should do the partitian of an given array according to side', function(){
    assert.deepEqual(doPartition([1,2,3,4],2),[[1,2],[3,4]]);
  });

  it('should return empty array for empty array', function(){
    assert.deepEqual(doPartition([],2),[[],[]]);
  });

});


describe('range', function(){

  it('should gives us the range beetween two numbers', function(){
    assert.deepEqual(range(2,5),[2,3,4,5]);
  })

  it('should return one number when same numbers are given', function(){
    assert.deepEqual(range(8,8),[8]);
  });

});


describe('randomGenerator', function(){

  it('should return a random number from the given array', function(){
    assert.equal(randomGenerator([4]),4);
  });

});


describe('isValidMove', function(){

  it('should check the move is valid or not', function(){
    assert.equal(isValidMove(3,[1,2,3]),true);
    assert.equal(isValidMove(3,[1,2,4]),false);
  });

});


describe('modifyMove', function(){

  it('should modify the move by putting zero for numbers less then 10', function(){
    assert.equal(modifyMove(1),'01');
    assert.equal(modifyMove(9),'09');
  });

  it('should return the same number when it is grater then 10', function(){
    assert.equal(modifyMove(11),'11');
    assert.equal(modifyMove(99),'99');
  });

});

describe('findNeighbours', function(){

  it('should return all Neighbours of a specific posotion in array' ,function(){
    assert.deepEqual(findNeighbours(3,1),[2,4,-2]);
  });

  it('should return the possible neighbours list when middle count is given', function(){
    assert.deepEqual(findNeighbours(3,5),[4,6,8,2]);
  });

});

describe('validateNeighbours', function(){

  it('should resturn the filtered list of neighbours of a specific count' ,function(){
    assert.deepEqual(validateNeighbours(3, 1), [2,4]);
  });
  
});
