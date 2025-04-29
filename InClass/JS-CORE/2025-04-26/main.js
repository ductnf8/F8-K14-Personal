// const arr = [1, 2, 3, 4]
//
// // create new array
// // formula new e = 2 * old e
// // array map
//
// //filter
// const func = (e) => {
//     console.log(e)
//     return e * 2
// }
//
// const getAvg = () => {
//     let sum = 0
//     for (const e of arr) {
//         sum += e
//     }
//     return sum / arr.length
// }
//
// // map
// const newArr = arr.map(e => e * 2)
// console.log(newArr)
//
// // get element > 15 - filter
// const result = newArr.filter((e) => {
//     return e > 7
// })
// console.log(result)
//
// const students = [
//     {name: "An", class: "12A1", score: 8.5},
//     {name: "Bình", class: "12A1", score: 9.2},
//     {name: "Cường", class: "12A2", score: 7.5},
//     {name: "Dung", class: "12A2", score: 9.0},
//     {name: "Em", class: "12A3", score: 8.0}
// ];
//
// const studentNames = students.filter(e => e.score > 8).map(e => e.name)
//
// students.forEach((e, i) => {
//     console.log(e, i)
// })
//
// console.log(studentNames)
//
//


const colors = [
    { id: 1, name: 'Red' },
    { id: 2, name: 'Blue' },
];

const flowers = [
    { id: 1, name: 'Rose', colorId: 1 },      // Red
    { id: 2, name: 'Tulip', colorId: 2 },     // Blue
    { id: 3, name: 'Carnation', colorId: 1 }, // Red
];
// [
//     { id: 1, name: 'Rose', colorId: 1, color: 'Red' },
//     { id: 2, name: 'Tulip', colorId: 2, color: 'Blue' },
//     { id: 3, name: 'Carnation', colorId: 1, color: 'Red' }
// ]



const result =[]
flowers.forEach(flower => {
    const color = colors.find(c => c.id === flower.colorId)
    result.push({
        id: flower.id,
        name: flower.name,
        colorId: flower.colorId,
        colorName: color.name
    })
});
console.log(result);




const colorObj ={}

colors.forEach(color => {
    colorObj[color.id] = color.name
})

flowers.forEach(flower => {
    const colorName = colorObj[flower.colorId]
    flower.colorName = colorName
})
console.log(flowers);

// merge
//merge join
// hash join