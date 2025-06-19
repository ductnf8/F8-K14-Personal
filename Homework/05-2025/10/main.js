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

  ┌────────────────────┐
  │filter              │
  │e.status = 'working'│
  └───────┬────────────┘
          │
          │
  ┌───────▼──────┐
  │log ra result │
  └──────────────┘

*/
console.log('Bai 1:')
const workingEmployees = employees.filter(e => e.status === 'working');
console.log(workingEmployees);


/*

Bai 2:
Lay ra nhan vien lon tuoi nhat


     ┌─────────────────────┐
     │maxAge = Math.max(   │
     │employees.map =>e.age│
     └─────────┬───────────┘
               │
               │
               │
               │
     ┌─────────▼────────┐
     │oldestEmployees   │
     │= employees.filter│
     │(e.age = maxAge)  │
     └────────┬─────────┘
              │
              │
              │
              │
     ┌────────▼──────┐
     │log ra         │
     │oldestEmployees│
     └───────────────┘

*/
console.log('Bai 2:')
const maxAge = Math.max(...employees.map(e => e.age))
console.log(maxAge);
const oldestEmployees = employees.filter(e => e.age === maxAge)
console.log(oldestEmployees);


/*


Bai 3:
Lay ra san phan gia re nhat


   ┌───────────────────────┐
   │minPrice=Math.min      │
   │(products.map =>p.price│
   └──────────┬────────────┘
              │
              │
              │
              │
   ┌──────────▼─────────┐
   │cheapestProducts    │
   │=products.filter    │
   │(p.price = minPrice)│
   └────────┬───────────┘
            │
            │
            │
            │
            │
            │
   ┌────────▼──────┐
   │log ra         │
   │oldestEmployees│
   └───────────────┘

*/

console.log('Bai 3:')
const minPrice = Math.min(...products.map(p => p.price))
console.log(minPrice);
const cheapestProducts = products.filter(p => p.price === minPrice)
console.log(cheapestProducts);

/*


Bai 4:
Tim ra san pham ban chay nhat ( ban nhieu nhat ve bat so luong )


    ┌───────────────┐
    │obj productData│
    └───────┬───────┘
            │
            │
    ┌───────▼───────┐
    │for of orders  │
    └───────┬───────┘
            │
            │
   ┌────────▼─────────┐
   │ orderCount       │
   │ =order.productId │
   └────────┬─────────┘
            │
            │
    ┌───────▼────────────────┐
    │productData[orderCount] │
    │{id, quantity}          │
    └────────────┬───────────┘
                 │
                 │
                 │
   ┌─────────────▼──────────────┐
   │ quantity += order.quantity │
   └───────────┬────────────────┘
               │
               │
               │
   ┌───────────▼────────────┐
   │ groupedProducts=       │
   │ Obj.value(productData) │
   └──────────┬─────────────┘
              │
              │
              │
    ┌─────────▼───────┐
    │tìm maxQuantity  │
    └────────┬────────┘
             │
             │
             │
   ┌─────────▼────────────┐
   │ topProducts=         │
   │ groupedProducts      │
   │ .filter(quantity     │
   │ =maxQuantity)        │
   │ .map(product.find(id)│
   └──────────┬───────────┘
              │
              │
              │
   ┌──────────▼────────┐
   │ in ra t2pProducts │
   └───────────────────┘


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
const groupedProducts = Object.values(productData)
// console.log(groupedProducts)
const maxQuantity = Math.max(...groupedProducts.map(g => g.quantity))

const topProducts = groupedProducts.filter(p => p.quantity === maxQuantity)
    .map(product => products.find(p => p.id === product.id))
console.log(topProducts);

/*


Bai 5:
Tim ra san phan doanh thu cao nhat ( nhieu tien nhat )



   ┌────────────────┐
   │ obj revenueData│
   └────────┬───────┘
            │
            │
            │
            │
    ┌───────▼───────┐
    │for of orders  │
    └───────┬───────┘
            │
            │
            │
    ┌───────▼─────────────┐
    │pid = order.productId│
    └──────────┬──────────┘
               │
               │
               │
   ┌───────────▼─────────┐
   │ product = products  │
   │          .find(id)  │
   └─────────┬───────────┘
             │
             │
             │
    ┌────────▼───────┐
    │orderRevenue    │
    │=quantity*price │
    └────────┬───────┘
             │
             │
             │
             │
    ┌────────▼────────┐
    │revenueData[pid] │
    │{id, revenue }   │
    └────────┬────────┘
             │
             │
             │
             │
    ┌────────▼─────────────┐
    │revenue +=orderRevenue│
    └────────┬─────────────┘
             │
             │
             │
  ┌──────────▼─────────────┐
  │ groupRevenue=obj.value │
  │ (revenueData)          │
  └──────────┬─────────────┘
             │
             │
             │
   ┌─────────▼─────┐
   │tìm maxRevenue │
   └────────┬──────┘
            │
            │
            │
            │
  ┌─────────▼─────────────┐
  │ tìm topRevenueProducts│
  │ bằng filter, map, find│
  │ như bài trên          │
  └───────────────────────┘

*/
console.log('Bai 5:')
const revenueData = {}
for (const order of orders) {
    const pid = order.productId
    const product = products.find(p => p.id === pid)
    const orderRevenue = order.quantity * product.price
    console.log(product)

    if (!revenueData[pid]) {
        revenueData[pid] = {
            id: pid,
            revenue: 0
        }
    }
    revenueData[pid].revenue += orderRevenue
}
// console.log(revenueData)
const groupRevenue = Object.values(revenueData)
console.log(groupRevenue)

const maxRevenue = Math.max(...groupRevenue.map(g => g.revenue))
console.log(maxRevenue)

const topRevenueProducts = groupRevenue.filter(g => g.revenue === maxRevenue)
    .map(p => products.find(product => p.id === product.id))
console.log(topRevenueProducts)
/*


Bai 6:
Tim ra nhan vien ban nhieu hang nhat



   ┌─────────────────────────┐
   │ Giống bài 4             │
   │ nhưng thay              │
   │ productId -> employeeId │
   └─────────────────────────┘


*/
console.log('Bai 6:')
const employeeData = {}
for (const order of orders) {
    const eid = order.employeeId
    if (!employeeData[eid]) {
        employeeData[eid] = {
            id: eid,
            quantity: 0,
        }
    }
    employeeData[eid].quantity += order.quantity
}
console.log(employeeData)

const groupEmployees = Object.values(employeeData)
console.log(groupEmployees)

const maxQuantity6 = Math.max(...groupEmployees.map(g => g.quantity))
// console.log(maxQuantity6)

const topEmployees = groupEmployees.filter(e => e.quantity === maxQuantity6)
    .map(e => employees.find(employee => employee.id === e.id))
console.log(topEmployees)
/*

Bai 7:
Tim ra nhan vien co doanh thu cao nhat


          ┌─────────────────────┐             ┌──────────────┐
          │obj revenueByEmployee┼─────────────►for of orders │
          └─────────────────────┘             └───────┬──────┘
                                                      │
                                                      │
                                                      │
                                                      │
                                                      │
                                          ┌───────────▼───────────────┐
       ┌────────────────────────┐         │ tạo eid,                  │
       │ revenueByEmployee[eid] ◄─────────┼ prod=products.find(id),   │
       │ ={id, totalRevenue=0}  │         │ orderAmount=quantity*price│
       └───────────┬────────────┘         └───────────────────────────┘
                   │
                   │
                   │
                   │
                   │
      ┌────────────▼────────────────┐         ┌────────────────────┐
      │revenueByEmployee[eid]       ┼─────────►tìm hightestRevenue │
      │.totalRevenue += orderAmount │         └───────────┬────────┘
      └─────────────────────────────┘                     │
                                                          │
                                                          │
                                                          │
                                                          │
                                               ┌──────────▼──────────────┐
     ┌────────────────────────────┐            │highestRevenueEmployee   │
     │in ra highestRevenueEmployee│◄───────────┼=revenueByEmployee.vlaue │
     └────────────────────────────┘            │.filter,.map,.find(id)   │
                                               └─────────────────────────┘



*/

console.log('Bai 7:')
const revenueByEmployee = {}
for (const order of orders) {
    const eid = order.employeeId
    const prod = products.find(p => p.id === order.productId)
    const orderAmount = order.quantity * prod.price

    if (!revenueByEmployee[eid]) {
        revenueByEmployee[eid] = {
            id: eid,
            totalRevenue: 0
        }
    }
    revenueByEmployee[eid].totalRevenue += orderAmount
}
console.log(revenueByEmployee)
const hightestRevenue = Math.max(...Object.values(revenueByEmployee).map(g => g.totalRevenue))
console.log(hightestRevenue)
const highestRevenueEmployee = Object.values(revenueByEmployee).filter(e => e.totalRevenue === hightestRevenue)
    .map(employee => employees.find((e => e.id === employee.id)))
console.log(highestRevenueEmployee)

/*

Bai 8:
Tim ra san pham ban co doanh thu nhat cua moi nhan vien





            ┌───────────────────┐       ┌──────────────┐
            │obj revenueProducts┼──────►│for of orders │
            └───────────────────┘       └───────┬──────┘
                                                │
                                                │
                                                │
                                                │
                                                │
                                        ┌───────▼──────────────┐
      ┌──────────────────────────┐      │tạo eid,pid,          │
      │revenueProducts[eid] = {} ◄──────┼productInfo=products  │
      └────────────┬─────────────┘      │.find(id=eid),        │
                   │                    │revenue=quantity*price│
                   │                    └──────────────────────┘
                   │
                   │
                   │
                   │
                   │
                   │
    ┌──────────────▼──────────────┐      ┌──────────────────────────┐
    │revenueProducts[eid][pid] = 0┼──────►revenueProducts[eid][pid] │
    └─────────────────────────────┘      │+= revenue                │
                                         └─────────────┬────────────┘
                                                       │
                                                       │
                                                       │
                                                       │
       ┌───────────────────────────┐      ┌────────────▼─────────────┐
       │grouped=proMap .entries.map◄──────┼for of [eIdStr, proMap]   │
       │(id:pidStr, revenue)       │      │of revenueProducts.entries│
       └────────────┬──────────────┘      └──────────────────────────┘
                    │
                    │
                    │
                    │                      ┌─────────────────────────┐
              ┌─────▼─────┐                │bestSeller=grouped.filter│
              │tìm maxRev ┼────────────────►.map.find(id)            │
              └───────────┘                └───────────┬─────────────┘
                                                       │
                                                       │
                                                       │
                                                       │
                                            ┌──────────▼───────────┐
                                            │tạo topPerEmployee    │
                                            │và push employeeId,   │
                                            │topProduct:bestSeller │
                                            └──────────────────────┘


*/

console.log('Bai 8:')
const revenueProducts = {}
for (const order of orders) {
    const eid = order.employeeId
    const pid = order.productId
    const productInfo = products.find(p => p.id === pid)
    const revenue = order.quantity * productInfo.price
    if (!revenueProducts[eid]) {
        revenueProducts[eid] = {}
    }
    if (!revenueProducts[eid][pid]) {
        revenueProducts[eid][pid] = 0
    }
    revenueProducts[eid][pid] += revenue
}
console.log(revenueProducts)

const topPerEmployee = [];
for (const [eIdStr, proMap] of Object.entries(revenueProducts)) {
    const grouped = Object.entries(proMap).map(([pidStr, revenue]) =>
        ({
            id: Number(pidStr),
            revenue
        }))
    console.log(grouped)
    const maxRev = Math.max(...grouped.map(g => g.revenue))
    // console.log(maxRev)
    const bestSeller = grouped.filter(g => g.revenue === maxRev)
        .map(g => products.find(p => p.id === g.id))
    console.log(bestSeller)
    topPerEmployee.push({
        employeeId: Number(eIdStr),
        topProducts: bestSeller

    })
}
// console.log(topPerEmployee)
console.log(JSON.stringify(topPerEmployee, null, 2))


/*


Bai 9:
Gia su nhan vien se nhan duoc hoa hong la 3%
-> tim hoa hong cho moi nhan vien




       ┌────────────┐
       │ array rose │
       └───────┬────┘
               │
               │
               │
               │
      ┌────────▼───────────┐
      │for [eId, revenue]  │
      │of revenueByEmployee│
      │.entries            │
      └──────────┬─────────┘
                 │
                 │
                 │
    ┌────────────▼─────────────┐
    │employee=employees.find(id│
    └────────────┬─────────────┘
                 │
                 │
  ┌──────────────▼───────────────┐
  │rose.push(...employee,revenue,│
  │roseMoney)                    │
  └──────────────┬───────────────┘
                 │
                 │
                 │
                 │
            ┌────▼──────┐
            │in ra rose │
            └───────────┘



*/

console.log('Bai 9:')
console.log(revenueByEmployee)
const rose = []
for (const [eId, revenue] of Object.entries(revenueByEmployee)) {
    const employee = employees.find(e => e.id === Number(eId))
    rose.push({
        // employeeId: Number(eId),
        // name,
        ...name,
        revenue: revenue.totalRevenue,
        roseMoney: revenue.totalRevenue * 0.03
    })
}
console.log(rose)
/*


Bai 10:
Sap xep nhan vien theo thu tu giam dan theo doanh thu

  ┌────────────────────────┐
  │sortedEmployees         │
  │=revenueByEmployee.value│
  │.map                    │
  └─────────────┬──────────┘
                │
                │
  ┌─────────────▼───────────────┐
  │employee = employees.find(id)│
  └─────────────┬───────────────┘
                │
                │
  ┌─────────────▼─────────────┐
  │return{...employee,revenue}│
  └─────────┬─────────────────┘
            │
            │
            │
  ┌─────────▼───────┐
  │sort theo revenue│
  └───────┬─────────┘
          │
          │
          │
  ┌───────▼────────┐
  │in ra kết quả   │
  └────────────────┘


*/

console.log('Bai 10:')
const sortedEmployees = Object.values(revenueByEmployee).map(e => {
    const employee = employees.find(employee => e.id === employee.id)
    return {
        ...employee,
        revenue: e.totalRevenue,
    }
}).sort((a, b) => b.revenue - a.revenue)
console.log(sortedEmployees)
/*

*/







