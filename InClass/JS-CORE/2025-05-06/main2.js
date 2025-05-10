const arr = [1, 7, 3, 2, 5, 8, 2]
/*
log ra nhung phep cong co ket qua bang 4
 */

for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] + arr[j] === 4) {
            console.log(`${arr[i]} + ${arr[j]} = 4`)
        }
    }
}


/*
log ra vi tri cac so cong lai bang 4
 */

for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] + arr[j] === 4) {
            console.log(`vi tri ${i} + vi tri ${j} = 4`)
        }
    }
}

/*
tim so tu nhien lon hon 0 nho nhat khong nam trong array
 */

// arr.sort((a, b) => a - b)
// console.log(arr)
// for (let i = 0; i < arr.length - 1; i++) {
//     if (arr[i] + 1 !== arr[i + 1] && arr[i] !== arr[i+1]) {
//         console.log(arr[i] + 1)
//         break
//     }
// }

// arr.sort((a, b) => a - b);
// console.log(arr);
// let c = 1;
//
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] < c) {
//         continue;
//     }
//     if (arr[i] === c) {
//         c++;
//     } else if (arr[i] > c) {
//         break;
//     }
// }
//
// console.log(c)

let arr2 = new Set(arr)
console.log(arr2)


const map={}
arr.forEach((e,i) => {
    map[e] = i
})
console.log(map)




/*
bai 3
 */
let result = 1
while ((arr.includes(result))){
    result += 1
}

console.log(result)