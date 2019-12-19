const fs = require('fs');
let orbits = {};

 const run = async () => fs.readFile('input.txt', (err, data) => {
    if(err){ throw err };
  
    let intData = data.toString().replace(/\n/g, ' ').split(' ');

    readOrbits(intData);
    // let orb1 = countTransfers('YOU',0);
    checkIntersection(countTransfers('YOU',0), countTransfers('SAN',0));
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

const countTransfers = async (node, count, currentOrbits=[]) => {
    let allOrbits = [...currentOrbits];

    if(node === 'COM'){
        // console.log('ALL ORBITS', allOrbits);
        return new Promise(resolve => resolve(allOrbits));
    }

    allOrbits.push(node);

    for(let orbit in orbits){
        let children = orbits[orbit].children;
        if(children.includes(node)){
            return await countTransfers(orbit, count+1, allOrbits);
        }
    }
}

const checkIntersection = async (orb1, orb2) => {
    let intersection;
    const arr1 = Object.values(await orb1);
    const arr2 = Object.values(await orb2);
    console.log(arr1, arr2);

    arr1.forEach(planet => {
        if(arr2.includes(planet)){
            intersection = planet;
        }
    });
    console.log(intersection);
    console.log(arr1.indexOf(intersection));
    console.log(arr2.indexOf(intersection));

}

run();