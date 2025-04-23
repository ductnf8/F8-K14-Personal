/*

array: mang/list


const  numbers=[1,2,3,4,5]

const boxes =['A','B','C']

const a= [1,3,9,8]
console.log(a.length)
console.log(a.toString())
console.log(a[0])

a.push(88) // add more at last
a.unshift(0)  // add more at first
a[0] =98   //change value
console.log(a)

a.pop() // xóa phần tử cuối
console.log(a)

a.shift() // xóa phần tử đầu
console.log(a)

a.sort((a,b)=>a-b)
console.log(a)

delete a[2]

console.log(a.join(' - ')) // cho các phần tử liên kết nhau bằng kí tự trong ngoặc

const b = [1,2,3,4,5]
const c = ['mot', 'hai']
const d = [8,9]
console.log(c.concat(b,d))

 */


/*
Object
    group value into a variable
    array: a=[10,3,2] -> get value by index
 */

const info={
    name: 'duc',
    age: 22,
    address:'tb',
    favouriteNumber: [8,7]
}
console.log(info)
console.log(info.age)
console.log(info['age'])

const key = 'age'
console.log(info[key])


info.name = 'hoang' // sửa object
info.info = info
console.log(info)

const keys = Object.keys(info)
for(let i=0;i<keys.length;i++){
    console.log(info[keys[i]])
}