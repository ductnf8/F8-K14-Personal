const colors = Array.from({length: 5}, (_, i) => ({
    id: i + 1,
    name: `color ${i + 1}`
}));
const flowers = Array.from({length: 5}, (_, i) => ({
    id: i + 1,
    name: `flower ${i + 1}`,
    colorId: Math.floor(Math.random() * 20000) + 1 // random colorId between 1 and 2000
}));

console.log(colors)
console.log(flowers)


flowers.sort((a, b) => a.colorId - a.colorId);

let colorStartIndex = 0, flowerStartIndex = 0;

for (let flowerIndex = flowerStartIndex; flowerIndex < flowers.length; flowerIndex++) {
    for (let colorIndex = colorStartIndex; colorIndex < flowers.length; colorIndex++) {

    }
}