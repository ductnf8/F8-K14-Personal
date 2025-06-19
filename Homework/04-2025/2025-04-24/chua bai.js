const students = [
    {name: "An", class: "12A1"},
    {name: "Bình", class: "12A2"},
    {name: "Cường", class: "12A1"},
    {name: "Dung", class: "12A3"},
    {name: "Em", class: "12A2"}
];

// const result = {}
// for (const student of students) {
//     const className = student.class;
//     const studentName = student.name;
//     if (!result[className]) result[className] = []
//     result[className].push(studentName);
// }
// console.log(result);


const students2 = [
    {name: "An", class: "12A1", score: 8.5},
    {name: "Bình", class: "12A1", score: 9.2},
    {name: "Cường", class: "12A2", score: 7.5},
    {name: "Dung", class: "12A2", score: 9.0},
    {name: "Em", class: "12A3", score: 8.0}
];

const result = {}
for (const student of students2) {
    const className = student.class;
    const studentName = student.name;
    const score = student.score;
    if (!result[className]) result[className] = []
    result[className].push({
        name: studentName,
        score: score
    });
}
// loop result
Object.keys(result).forEach(key => {
    const val = result[key];
    console.log(key, val);
    const score = val.map(e =>e.score);
    const maxScore = Math.max( score);
    const student = val.find(e =>e.score === maxScore);
    console.log(student);
})