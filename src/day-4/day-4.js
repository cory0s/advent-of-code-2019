const range = [246515, 739105];
let allPasswords = arrayBuilder(range);

function arrayBuilder(arr){
  let allValues = [];

  for(let i=arr[0]; i<=arr[1]; i++){
    allValues.push(i);
  }
  return allValues;
}

function passwordChecker(arr){
  let count = 0;
  arr.forEach(num => {
    if(acceptabilityScreener(num)){
      count++;
    }
  })
  console.log('COUNT', count);
}

function acceptabilityScreener(num){
  let digits = num.toString().split('');
  let duplicateCheck = { value: null, duplicates: 0, oneSet: false };

  for(let i=0; i<digits.length; i++){
    duplicateCheck.value = parseInt(digits[i]);

    //Check for increasing values
    if(digits[i]>digits[i+1]){
      return false;
    }

    //Check for at least (1) set of values
    if(duplicateCheck.value === parseInt(digits[i+1])){
      duplicateCheck.duplicates++;

      if(duplicateCheck.duplicates === 1 && duplicateCheck.value != parseInt(digits[i+2])){
        duplicateCheck.oneSet = true;
      }
    } else {
      duplicateCheck.duplicates = 0;
    }
  }

  //Check for at least one set
  if(duplicateCheck.oneSet === true){
    return true;
  } else {
    return false;
  }
}

passwordChecker(arrayBuilder(range));