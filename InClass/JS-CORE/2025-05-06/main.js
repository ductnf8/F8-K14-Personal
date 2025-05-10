const arr = [1, 2, 3, 4, 5]
const sum = arr.reduce((a, b) => {
    return a + b
}, 0)
console.log(sum)

const array = [
    ['id', 1],
    ['name', 'test'],
    ['age', 20]
]

/*
{
    id:1,
    name:'test',
    age:20
}
 */

const obj = {}
for (const [key, value] of array) {
    obj[key] = value
}
// console.log(obj)

const result3 = array.reduce((a, [key, value]) => {
    a[key] = value
    return a
}, {})
console.log(result3)


const a = [1, 1, 2, 2, 3, 4]
const c = Array.from(new Set(a))
console.log(c)