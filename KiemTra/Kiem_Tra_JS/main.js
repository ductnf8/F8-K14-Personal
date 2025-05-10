const employees = [
    {id: 1, name: "Alice", age: 23, status: 'working'},
    {id: 2, name: "Bob", age: 25, status: 'working'},
    {id: 3, name: "John", age: 27, status: 'working'},
    {id: 4, name: "David", age: 23, status: 'quited'},
    {id: 5, name: "Eve", age: 20, status: 'working'},
];


const products = [
    {id: 1, name: "Phone", price: 1200},
    {id: 2, name: "Laptop", price: 3000},
    {id: 3, name: "Tab", price: 2000},
    {id: 4, name: "PC", price: 800},
    {id: 5, name: "Monitor", price: 1500},
]


const orders = [
    {id: 1, employeeId: 1, productId: 4, quantity: 1},
    {id: 2, employeeId: 2, productId: 2, quantity: 4},
    {id: 3, employeeId: 1, productId: 5, quantity: 1},
    {id: 4, employeeId: 3, productId: 1, quantity: 2},
    {id: 5, employeeId: 2, productId: 5, quantity: 3},
    {id: 6, employeeId: 4, productId: 1, quantity: 1},
    {id: 7, employeeId: 5, productId: 3, quantity: 2},
];


/*
Bai: 1
Lay ra ds nhan vien dang lam viec

*/
const result1 = employees.filter(e => e.status === 'working');
console.log('Bai 1:')
console.log(result1);
/*
Bai 2:
Lay ra nhan vien lon tuoi nhat
*/

const result2 = employees.sort((a, b) => b.age - a.age)[0]
console.log('Bai 2:')
console.log(result2)

/*
Bai 3:
Lay ra san phan gia re nhat
*/
const result3 = products.sort((a, b) => a.price - b.price)[0]
console.log('Bai 3:')
console.log(result3)
/*

Bai 4:
Tim ra san phan ban chay nhat ( ban nhieu nhat ve bat so luong )
*/

console.log('Bai 4:')
const productData = {}
for (const order of orders) {
    const orderCount = order.productId
    if (!productData[orderCount]) {
        productData[orderCount] = {
            id: order.productId,
            quantity: 0,
        }
    }
    productData[orderCount].quantity += order.quantity
}
// console.log(productData)
const grouped4 = Object.values(productData)
console.log(grouped4)
const result4 = grouped4.sort((a, b) => b.quantity - a.quantity)[0]
console.log(result4)
/*

Bai 5:
Tim ra san phan doanh thu cao nhat ( nhieu tien nhat )
*/
console.log('Bai 5:')
const group = []
products.forEach(product => {
    const a = grouped4.find(t => t.id === product.id)
    group.push({
        productId: product.id,
        name: product.name,
        sum: product.price * a.quantity,
    })
});
const result5 = group.sort((a, b) => b.sum - a.sum)[0]
console.log('group:')
console.log(group);
console.log(result5)
/*

Bai 6:
Tim ra nhan vien ban nhieu hang nhat
*/

console.log('Bài 6:')
const ordersData = {}
for (const order of orders) {
    const orderCount = order.employeeId
    if (!ordersData[orderCount]) {
        ordersData[orderCount] = {
            employeeId: order.employeeId,
            quantity: 0,
        }
    }
    ordersData[orderCount].quantity += order.quantity
}
const grouped6 = Object.values(ordersData)
console.log(grouped6)
const result6 = grouped6.sort((a, b) => b.quantity - a.quantity)[0]
const result6a = employees.find((e) => e.id === result6.employeeId)
console.log(result6a)

/*
Bai 7:
Tim ra nhan vien co doanh thu cao nhat
*/
console.log('Bai 7:')
const test7 = orders.sort((a, b) => a.employeeId - b.employeeId)
console.log(test7)

const group7 = []
test7.forEach(test => {
    const a = products.find(p => p.id === test.productId)
    group7.push({
        employeeId: test.employeeId,
        productId: test.id,
        // quantity: test.quantity,
        // price: a.price,
        sum: test.quantity * a.price
    })
});
console.log(group7)

const ordersData7 = {}
for (const group of group7) {
    const orderCount = group.employeeId
    if (!ordersData7[orderCount]) {
        ordersData7[orderCount] = {
            employeeId: group.employeeId,
            sum: 0,
        }
    }
    ordersData7[orderCount].sum += group.sum
}
console.log(ordersData7)
const grouped7 = Object.values(ordersData7)
console.log(grouped7)
const result7 = grouped7.sort((a, b) => b.sum - a.sum)[0]
// console.log(result7)
const result7a = employees.find((e) => e.id === result7.employeeId)
console.log(result7a)


/*


Bai 8:
Tim ra san pham ban co doanh thu nhat cua moi nhan vien


Bai 9:
Gia su nhan vien se nhan duoc hoa hong la 3%
-> tim hoa hong cho moi nhan vien
*/
// const group9 = []
// employees.forEach(employee => {
//     const a = group7.find(g => g.i === employee.productId)
//     group9.push({
//         ...employee,
//         sum:
//     })
// });
// console.log(group9)
/*

Bai 10:
Sap xep nhan vien theo thu tu giam dan theo doanh thu
* */





