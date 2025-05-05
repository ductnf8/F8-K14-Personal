// es5 es6
const a = {
    id: 1,
    name: 'A',
}

//nên dùng
const b = {...a}
b.id = 100
console.log(a, b)

const c = JSON.stringify(a)
const d = JSON.parse(JSON.stringify(a))
console.log(c, d )