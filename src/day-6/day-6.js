const fs = require('fs');
let orbits = {};

 const run = async () => fs.readFile('input.txt', (err, data) => {
    if(err){ throw err };
  
    let intData = data.toString().replace(/\n/g, ' ').split(' ');

    readOrbits(intData);
    checkIntersection(buildOrbitMap('YOU'), buildOrbitMap('SAN'));
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

const buildOrbitMap = async (node, currentOrbits=[]) => {
    let allOrbits = [...currentOrbits];

    allOrbits.push(node);

    if(node === 'COM'){
        return new Promise(resolve => resolve(allOrbits));
    }

    for(let orbit in orbits){
        let children = orbits[orbit].children;
        if(children.includes(node)){
            return await buildOrbitMap(orbit, allOrbits);
        }
    }
}

const checkIntersection = async (orb1, orb2) => {
    let arr1Intersection;
    const arr1 = Object.values(await orb1);
    const arr2 = Object.values(await orb2);

    for(let i=0; i<arr1.length; i++){
        if(arr2.includes(arr1[i])){
            arr1Intersection = i;
            break;
        }
    };

    let arr2Intersection = arr2.indexOf(arr1[arr1Intersection]);

    //Subtract 2 orbits from total to account for starting at 'YOU' and 'SAN'
    console.log(arr1Intersection + arr2Intersection - 2);
}

run();