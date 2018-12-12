const read = require('readline-sync');
const colours = ['Red', 'Blue', 'Pink', 'Yellow', 'Green', 'Purple', 'Orange', 'Black', 'White', 'Gold'];
const codes = [245, 145, 234, 135, 134, 125, 345, 123, 235, 124];

const makeList = function(){
  let allList = {};
  allList.list1 = ['Black', 'Green', 'Yellow', 'Purple', 'Gold', 'Blue'];
  allList.list2 = ['Black', 'Purple', 'Gold', 'Pink', 'White', 'Red'];
  allList.list3 = ['Black', 'Green', 'Yellow', 'pink', 'White', 'Orange'];
  allList.list4 = ['Green', 'Gold', 'Blue', 'Pink', 'Red', 'Orange'];
  allList.list5 = ['Yellow', 'Purple', 'Blue', 'White', 'Red', 'Orange'];
  return allList;
};

const getUserChoice = function(){
  return read.questionInt('\nDoes your colour present in the list..? enter 1 for YES or 0 for NO: ');
};

const playGame = function(colours,codes){
  let output = '';
  let lists = makeList();
  console.log('\n select any colours from the given list and keep it in your mind\n');
  console.log(colours.join('\n'));
  read.question('\n * PRESS ENTER TO BEGIN * \n');
  for (let count=1; count<6; count++){
    console.log('\n'+lists['list'+count].join('\n'));
    let input = getUserChoice();
    if(input == '1'){
      output = output+count;
    }
  }
  read.question('\n + ---- + PRESS ENTER TO GET YOUR COLOUR + ---- +  \n');
  console.log('*******',colours[codes.indexOf(+output)],'*******\n');
};

playGame(colours,codes);
