const fs = require('fs');
let orbits = {};
let totalOrbits = 0;

 const run = () => fs.readFile('input.txt', (err, data) => {
    if(err){ throw err };
  
    let intData = data.toString().replace(/\n/g, ' ').split(' ');

    readOrbits(intData);
    // countOrbits('COM', 0);
    // console.log(orbits);
    // console.log(totalOrbits);
    countTransfers('YOU',0);
});

const readOrbits = (arr) => {

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

let total = 0;

const santaCheck = (node) => {
    if(node.children.includes('SAN')){
        return true;
    }
    node.children.forEach(child => {
        santaCheck(child);
    })
}

const countTransfers = (node, count) => {

    if(orbits[node].children.includes('SAN')){
        console.log('COUNT', count);
        return count;
    }

    for(let orbit in orbits){
        let children = orbits[orbit].children;
        if(children.includes(node) && children.length > 1){
            santaCheck()
            countTransfers(check[0], count+1);
            total++;
        } else if(children.includes(node)){
            countTransfers(orbit, count+1);
        }
    }
    return;
}

run();