const { wire1Array, wire2Array } = require('./input.js');

function buildWire(arr){
  let wireCoords = new Set();

  let x = 0;
  let y = 0;

  arr.forEach(input => {
    let direction = input.slice(0,1)[0][0];
    let units = parseInt(input.slice(1));

    if(direction === 'R'){
      for(i=0; i<units; i++){
        x++;
        wireCoords.add(JSON.stringify({x,y}));
      }
    }

    if(direction === 'L'){
      for(i=0; i<units; i++){
        x--;
        wireCoords.add(JSON.stringify({x,y}));
        // wireCoords.add({x,y})
      }
    }

    if(direction === 'U'){
      for(i=0; i<units; i++){
        y++;
        wireCoords.add(JSON.stringify({x,y}));
        // wireCoords.add({x, y})
      }
    }

    if(direction === 'D'){
      for(i=0; i<units; i++){
        y--;
        wireCoords.add(JSON.stringify({x,y}));

        // wireCoords.add({x, y})
      }
    }
  })

  return wireCoords;
}

function crossCheck(set1, set2){
  let intersections = [];

  for(let obj1 of set1){
    for(let obj2 of set2){
      if(obj1 === obj2){
        intersections.push(obj1);
      }
    }
  }
  return intersections;
}

function manhattan(arr){
    let distances = [];

    arr.forEach(input => {
        let coord = JSON.parse(input);
        distances.push(Math.abs(coord.x) + Math.abs(coord.y));
    });

    const reducer = ((acc, curr) => {
        return acc < curr ? acc : curr;
    })
    
    console.log(distances.reduce(reducer));
}

function fewestSteps(wire1, wire2, intersections){
    let totalSteps = [];

    for(let i=0; i<intersections.length; i++){
        let wire1Steps = wireSteps(wire1, intersections[i]);
        let wire2Steps = wireSteps(wire2, intersections[i]);
        totalSteps.push(wire1Steps + wire2Steps);
    }
    const reducer = ((acc, curr) => {
        return acc < curr ? acc : curr;
    })
    
    console.log(totalSteps.reduce(reducer));
}

function wireSteps(wire, coords){
    let steps = 0;

    for(let coord of wire){
        steps++;
        if(coord.x === coords.x && coord.y === coords.y){
            return steps;
        }
    }
}


let wire1 = buildWire(wire1Array);
let wire2 = buildWire(wire2Array);
manhattan(crossCheck(wire1, wire2));
// fewestSteps(wire1, wire2, crossCheck(wire1, wire2));