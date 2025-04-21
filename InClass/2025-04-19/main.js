/*
*
* Conditional statement
*
* if / else / else if
*
* syntax
* if(condition <compare> ) {
*   code
* }
*
* {
*   code
* }
* */

/*
 if(condition) {
 your code      -----> if(condition) your code
 }
 */
//
// const name = '23'
// if (name == 23) {
//     console.log("ok")
// } else {
//     console.log("no")
// }
//
// const a = 100
// if (a % 2 === 0) {
//     console.log("ok")
// }
//
// console.log(a%2 ===0)
//
// console.log(Boolean(a%2))
//
// console.log(Boolean(a%2) == 'true')

// const b = false;
// if (b % 3 === 0) console.log("du 0");
// if (b % 3 === 1) console.log("du 1");
// if (b % 3 === 2) console.log("du 2");
//
// const a = 104;
// switch (new Date().getDay()) {
//     case 1:
//     case 4:
//         console.log('du a');
//         break;
//     case 2:
//     case 6:
//     case 19:
//         console.log('du b')
//         break;
//     default:
//         console.log('khong du')
// }
//
// console.log(new Date())
//

//ax2 +bx+c =0

// const a = 1, b = -5, c = 4;
//
// let delta = b ** 2 - 4 * a * c;
// if (delta < 0) {
//     console.log('vo nghiem')
// } else if (delta === 0) {
//     console.log('nghiem x =' + (-b / (2 * a)));
// } else {
//     console.log('nghiem 1:' + ((-b + delta ** (1 / 2)) / (2 * a)));
//     console.log('nghiem 2:' + ((-b - delta ** (1 / 2)) / (2 * a)));
// }
//
//
// const a = 120;


//chinh phuong
let x = 25
let y = x ** (1 / 2)
if (y % 1 === 0) console.log('x la chinh phuong')
else console.log('x k la chinh phuong')


// hoan hao
let z = 28
sum = 0
for (let i = 1; i <= z / 2; i++) {
    if (z % i === 0) {
        sum += i
    }
}
if (sum === z) console.log('hoan hao')
else console.log('no hoan hao')


// so nguyen to

let n = 9
// let dem = 1
 a=''
for (let i = 1; i <= n**(1/2); i++) {
    if (n % i === 0) a='k nguyen to'
    else a = 'nguyen to'
}

console.log(a)
// if (dem <= 2 && n > 1) console.log('nguyen to')
// else console.log('k nguyen to')


/*
syntax

for(innit; condition; next step){
    block code
}
 */

for (let i = 1; i < 5; i++) {
    console.log('hello ae')
}

let tong = 0
for (let i = 0; i >= -10; i--) {
    console.log('i=', i)
    tong += i
}
console.log(tong)

