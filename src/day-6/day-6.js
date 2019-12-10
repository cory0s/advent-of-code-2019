const fs = require('fs');
let orbits = {};
let totalOrbits = 0;

 const run = () => fs.readFile('input.txt', (err, data) => {
    if(err){ throw err };
  
    let intData = data.toString().replace(/\n/g, ' ').split(' ');

    readOrbits(intData);
    countOrbits('COM', 0);
    console.log(totalOrbits);
});

const readOrbits = async (arr) => {

    arr.forEach(orbit => {
        [parent, child] = orbit.split(')');
        
        if(!orbits[parent]){
            orbits[parent] = { children: [] };
        }
        if(!orbits[child]){
            orbits[child] = { children: [] };
        }
        orbits[parent].children.push(child);
    });
}

const countOrbits = (node, level) => {
    totalOrbits += level;

    for(let child of orbits[node].children) {
        countOrbits(child, level + 1);
    }
}

run();