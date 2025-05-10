// const students = [
//     { name: "An", class: "12A1" },
//     { name: "Bình", class: "12A2" },
//     { name: "Cường", class: "12A1" },
//     { name: "Dung", class: "12A3" },
//     { name: "Em", class: "12A2" }
// ];
//
// // Kết quả mong muốn:
// // {
// //   "12A1": ["An", "Cường"],
// //   "12A2": ["Bình", "Em"],
// //   "12A3": ["Dung"]
// // }
//
// let result = {}
// for(const student of students){
//     if(!result[student.class]) result[student.class] = []
//     result[student.class].push(student.name)
// }
// console.log(result)
//
//
// const group = students.reduce((acc, student) => {
//     if(!acc[student.class]) acc[student.class] = []
//     acc[student.class].push(student.name)
//     return acc
// },{})
// console.log(group)


// const students = [
//     {name: "An", class: "12A1", score: 8.5},
//     {name: "Bình", class: "12A1", score: 9.2},
//     {name: "Cường", class: "12A2", score: 7.5},
//     {name: "Dung", class: "12A2", score: 9.0},
//     {name: "Em", class: "12A3", score: 8.0}
// ];

// Kết quả mong muốn:
// [
//   { class: "12A1", topStudent: "Bình", score: 9.2 },
//   { class: "12A2", topStudent: "Dung", score: 9.0 },
//   { class: "12A3", topStudent: "Em", score: 8.0 }
// ]


// const topStudents = students.reduce((acc, student) => {
//     if (!acc[student.class] || student.score > acc[student.class].score) {
//         acc[student.class] = {
//             class: student.class,
//             topStudent: student.name,
//             score:student.score,
//         }
//     }
//     return acc
// }, {})
//
// const result = Object.values(topStudents)
// console.log(result)
//
//
// const classTop ={}
// students.forEach(student => {
//     const className = student.class
//     if(!classTop[className]){
//         classTop[className] = student
//     }
//     if(student.score>classTop[className].score){
//         classTop[className] = student
//     }
// })
// console.log(classTop)
//
// const rult2 = Object.keys(classTop)
// console.log(rult2)


const students = [
    {name: "An", class: "12A1", score: 8.5},
    {name: "Bình", class: "12A1", score: 9.2},
    {name: "Cường", class: "12A2", score: 7.5},
    {name: "Dung", class: "12A2", score: 9.0},
    {name: "Em", class: "12A3", score: 8.0}
];

// Kết quả:
// [
//   { class: "12A1", averageScore: 8.85 },
//   { class: "12A2", averageScore: 8.25 },
//   { class: "12A3", averageScore: 8.0 }
// ]


const classData = {}
for (const student of students) {
    const className = student.class;
    if (!classData[className]) {
        classData[className] = {
            class: className,
            score: 0,
            count: 0
        }
    }
    classData[className].score += student.score;
    classData[className].count += 1
}
console.log(classData)

const result = []
const classList = Object.values(classData);
console.log(classList)
for (const list of classList) {
    // const avg = list.score / list.count
    result.push({
        class: list.class,
        averageScore: list.score / list.count
    })
}
console.log(result)


function isPrime(num) {
    if (num < 2) return false
    for (let i = 2; i <= num ** 0.5; i++) {
        if (num % i === 0) return false
    }
    return true
}

console.log(isPrime(2))
const arr = [1, 2, 3, 4, 5, 6, 7]
let sum = 0
for (let i = 0; i < arr.length; i++) {
    if (isPrime(arr[i])) {
        sum += arr[i]
    }
}
console.log(sum)

function findPairsWithSum(arr, sum) {
    const result = [];
    const seen = {}; // Dùng object như một Map đơn giản

    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const complement = sum - current; // Số cần tìm để cộng với current ra sum

        // Nếu đã gặp complement trước đó, tức là có cặp hợp lệ
        if (seen[complement]) {
            result.push([complement, current]);
        }

        // Đánh dấu số hiện tại là đã thấy
        seen[current] = true;
    }

    return result;
}

console.log(findPairsWithSum([1,2,3,4,5,6,7,8],6))