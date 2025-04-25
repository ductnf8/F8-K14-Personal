// /*
// Bài 1:
//
//
//
//             ┌────────────┐
//             │tạo object  │
//             │groupClass  │
//             └──────┬─────┘
//                    │
//                    │
//                    │
//             ┌──────▼───────┐
//             │duyệt student │
//             │từ students   │
//             └──────┬───────┘
//                    │
//                    │
//             ┌──────▼────────┐
//             │tạo className  │
//             │và studentName │
//             │cho groupClass │
//             └───────┬───────┘
//                     │
//                     │
//                     │
//            ┌────────▼──────────┐
//            │ kiểm tra className│   yes   ┌───────┐
//            │ trong groupClass  ┼─────────►bỏ qua │
//            │ đã tồn tại chưa   │         └───────┘
//            └───────┬───────────┘
//                    │
//                    │no
//                    │
//                    │
//             ┌──────▼─────┐
//             │tạo mảng mới│
//             └───────┬────┘
//                     │
//                     │
//                     │
//            ┌────────▼────────┐
//            │ push studentName│
//            │ tương ứng cho   │
//            │ từng className  │
//            └───────┬─────────┘
//                    │
//                    │
//                    │
//                    │
//                    │
//           ┌────────▼─────┐
//           │ in ra        │
//           │ GroupClass   │
//           └──────────────┘
//
//  */
//
// const students = [
//     {name: "An", class: "12A1"},
//     {name: "Bình", class: "12A2"},
//     {name: "Cường", class: "12A1"},
//     {name: "Dung", class: "12A3"},
//     {name: "Em", class: "12A2"}
// ];
//
// groupClass={}
// for (student of students) {
//     const className = student.class;
//     const studentName = student.name
//     if(!groupClass[className]) {
//         groupClass[className] = [];
//     }
//     groupClass[className].push(studentName);
// }
// console.log(groupClass)

/*
Bài 2:

      ┌──────────────┐
      │tạo danh sách │
      │topStudents   │
      └──────┬───────┘
             │
             │
             │
             │
      ┌──────▼───┐
      │duyệt từng│
      │student   │
      └────┬─────┘
           │
           │
           │
           │
      ┌────▼─────┐
      │gán class │
      │vào cls   │
      └─────┬────┘
            │
            │
            │
     ┌──────▼───────────────┐
     │ tên class kh tồn tại │      no      ┌───────┐
     │ || hs khác có điểm   ┼──────────────►bỏ qua │
     │ cao hơn hs trong lớp │              └───────┘
     └───────┬──────────────┘
             │
             │yes
             │
             │
     ┌───────▼───────┐
     │ gán thông tin │
     │ mới cho       │
     │ topStudents   │
     └───────┬───────┘
             │
             │
             │
             │
      ┌──────▼──────┐
      │chuyển object│
      │thành mảng   │
      │result       │
      └─────┬───────┘
            │
            │
            │
            │
      ┌─────▼──────┐
      │in ra result│
      └────────────┘

 */

// const students = [
//     { name: "An", class: "12A1", score: 8.5 },
//     { name: "Bình", class: "12A1", score: 9.2 },
//     { name: "Cường", class: "12A2", score: 7.5 },
//     { name: "Dung", class: "12A2", score: 9.0 },
//     { name: "Em", class: "12A3", score: 8.0 }
// ];
//
// const topStudents = {};
//
// for (const student of students) {
//     const cls = student.class;
//
//     if (
//         !topStudents[cls] ||
//         student.score > topStudents[cls].score
//     ) {
//         topStudents[cls] = {
//             class: cls,
//             topStudent: student.name,
//             score: student.score
//         };
//     }
// }
//
// const result = Object.values(topStudents);
//
// console.log(result);


/*
Bài 3:



        ┌────────────┐
        │tạo object  │
        │classData   │
        └──────┬─────┘
               │
               │
               │
        ┌──────▼───────┐
        │duyệt student │
        │từ students   │
        └──────┬───────┘
               │
               │
        ┌──────▼────────┐
        │tạo className  │
        │               │
        │cho classData  │
        └───────┬───────┘
                │
                │
                │
       ┌────────▼──────────┐
       │ kiểm tra className│   yes   ┌───────┐
       │ trong classData   ┼─────────►bỏ qua │
       │ đã tồn tại chưa   │         └───────┘
       └───────┬───────────┘
               │
               │no
               │
               │
        ┌──────▼─────┐
        │tạo mảng mới│
        └───────┬────┘
                │
                │
                │
                │
         ┌──────▼──┐
         │tạo score│
         │và count │
         └────┬────┘
              │
              │
              │
         ┌────▼─────┐
         │tạo mảng  │
         │result in │
         │kết quả   │
         └─────┬────┘
               │
               │
               │
               │
        ┌──────▼───────┐
        │ duyệt từng   │
        │ giá trị trong│
        │ classData    │
        └───────┬──────┘
                │
                │
                │
         ┌──────▼─────┐
         │tính        │
         │avgscore    │
         └─────┬──────┘
               │
               │
               │
               │
         ┌─────▼──────┐
         │push class  │
         │và avgscore │
         │vào result  │
         └───┬────────┘
             │
             │
             │
         ┌───▼───┐
         │in ra  │
         │result │
         └───────┘


 */
const students = [
    {name: "An", class: "12A1", score: 8.5},
    {name: "Bình", class: "12A1", score: 9.2},
    {name: "Cường", class: "12A2", score: 7.5},
    {name: "Dung", class: "12A2", score: 9.0},
    {name: "Em", class: "12A3", score: 8.0}
];

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
    classData[className].score += student.score
    classData[className].count += 1
}

const result = []
for (const info of Object.values(classData)) {
    const avgScore = info.score / info.count
    result.push({
        class: info.class,
        averageScore: avgScore
    })
}

console.log(result)