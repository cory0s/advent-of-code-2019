const input = require('./input.js')

function opCode(arr){

  for(let i=0; i<arr.length; i=i+4){
    if(arr[i]===1){
      let sum = arr[arr[i+1]] + arr[arr[i+2]];
      arr[arr[i+3]] = sum;
    }else if(arr[i]===2){
      let mult = arr[arr[i+1]] * arr[arr[i+2]];
      arr[arr[i+3]] = mult;
    }else if(arr[i]===99){
      return arr;
    }else{
      return arr;
    }
  }
  return arr;
}

function inputGuesser(verb, noun){
  let guessArray =  [...input];
  guessArray[1] = verb;
  guessArray[2] = noun;
  let code = opCode(guessArray);

  if(code[0]===19690720){
    return true;
  } else {
    return false;
  }
}

function numberCruncher(){
  for(i=0; i<=99; i++){
    for(j=0; j<=99; j++){
      if(inputGuesser(i,j)){
        console.log('FOUNDIT',i,j);
        return [i,j];
      }
    }
  }
}

numberCruncher();

module.exports = { opCode };