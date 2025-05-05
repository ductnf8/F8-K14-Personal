/*


                                                                                  ┌───────────────┐
                                                                                  │productObj = {}│
                                                                                  └───────┬───────┘
                                                                                          │
                                                                                          │
                                                                                          │
                                                                                          │
                                                                                          │
                                                                                          │                         ┌──────────────────────────────────────────────────────┐
                                                                                  ┌───────▼─────────┐               │                                                      │
                                                                                  │for of           │               │┌──────────────┐                                      │
                                                                                  │'id':{name,price}┼               ││tạo groupOrder│                                      │
                                                                                  └─────┬───────────┘               │└──────┬───────┘                                      │
                                                                                        │                           │       │                                              │
                                                                                        │                           │       │                                              │
                                                                                        │                           │       │                                              │
                                                                                        │                           │┌──────▼──────┐                                       │
                                                                                        │                           ││object result│                                       │
                                                                                  ┌─────▼─────┐                     │└───────┬─────┘                                       │
                                                                                  │nhóm       ┼─────────────────────►        │                                             │
                                                                                  │groupOrder │                     │        │                                             │
                                                                                  └─────┬─────┘                     │        │                                             │
                                                                                        │                           │        │                                             │
         ┌────────────────────────────────────────────────┐                             │                           │┌───────▼────────────┐                                │
         │                                                │                             │                           ││duyệt qua orderItems│                                │
         │                                                │                             │                           │└─────────┬──────────┘                                │
         │                                                │                             │                           │          │                                           │
         │           ┌───────────────────┐                │                      ┌──────▼───────┐                   │          │                                           │
         │           │ result = customers│                │                      │Tạo danh sách │                   │          │                                           │
         │           │ .map              │                ◄──────────────────────┼khách hàng    │                   │          │                                           │
         │           └─────────┬─────────┘                │                      └───────┬──────┘                   │┌─────────▼─────────────┐  yes   ┌─────────────────┐  │
         │                     │                          │                              │                          ││!result[item.productId]┼────────►gán item.quantity│  │
         │                     │                          │                              │                          │└───────────┬───────────┘        └────────┬────────┘  │
         │                     │                          │                              │                          │            │                             │           │
         │       ┌─────────────▼────────────────┐         │                              │                          │            │no                           │           │
         │       │customerOrders = orders.filter│         │                              │                          │            │                             │           │
         │       │customerId=customer.id        │         │                              │                          │ ┌──────────▼────────┐                    │           │
         │       └─────────────┬────────────────┘         │                       ┌──────▼────────────┐             │ │Cộng thêm quantity │                    │           │
         │                     │                          │                       │totalSpent =       │             │ └────────┬──────────┘                    │           │
         │                     │                          │                       │productsList.reduce│             │          │                               │           │
         │                     │                          │                       └─────────┬─────────┘             │          ◄───────────────────────────────┘           │
         │            ┌────────▼─────────┐                │                                 │                       │          │                                           │
         │            │tạo mảng          │                │                                 │                       │          │                                           │
         │            │customerOrderItems│                │                                 │                       │   ┌──────▼──────┐                                    │
         │            └────────┬─────────┘                │                                 │                       │   │return result│                                    │
         │                     │                          │                       ┌─────────▼────────┐              │   └─────────────┘                                    │
         │                     │                          │                       │return result     │              │                                                      │
         │            ┌────────▼──────┐                   │                       │(id,name,...)     │              └──────────────────────────────────────────────────────┘
         │            │forEach        │                   │                       │.sort totalSpent  │
         │            │customerOrders │                   │                       └─────────┬────────┘
         │            └────────┬──────┘                   │                                 │
         │                     │                          │                                 │
         │                     │                          │                                 │
         │            ┌────────▼──────────────┐           │                                 │
         │            │sao chép               │           │                                 │
         │            │customerOrderItems     │           │                           ┌─────▼─────┐
         │            │và customerOrder.items │           │                           │log result │
         │            │vào mảng               │           │                           └───────────┘
         │            └────────────┬──────────┘           │
         │                         │                      │
         │                         │                      │
         │                         │                      │
         │            ┌────────────▼─────────────────┐    │
         │            │groupedOrderItems =           │    │
         │            │groupOrder(customerOrderItems)│    │
         │            └───────────┬──────────────────┘    │
         │                        │                       │
         │                        │                       │
         │                        │                       │
         │                        │                       │
         │            ┌───────────▼───────┐               │
         │            │productsList=      │               │
         │            │Object.entries,.map│               │
         │            └───────────┬───────┘               │
         │                        │                       │
         │                        │                       │
         │                        │                       │
         │                        │                       │
         │            ┌───────────▼────────────────────┐  │
         │            │product = productObj[productId] │  │
         │            └──────────┬─────────────────────┘  │
         │                       │                        │
         │                       │                        │
         │                       │                        │
         │            ┌──────────▼─────┐                  │
         │            │return name,    │                  │
         │            │quantity, cost  │                  │
         │            └────────────────┘                  │
         └────────────────────────────────────────────────┘


*/

const customers = [
    {id: 1, name: "John Doe"},
    {id: 2, name: "Jane Smith"},
    {id: 3, name: "Alice Johnson"},
    {id: 4, name: "Bob Brown"},
    {id: 5, name: "Charlie Green"},
];

const products = [
    {id: 101, name: "Laptop", price: 1200},
    {id: 102, name: "Phone", price: 800},
    {id: 103, name: "Tablet", price: 500},
    {id: 104, name: "Smartwatch", price: 300},
    {id: 105, name: "Headphones", price: 150},
];

const orders = [
    {id: 1001, customerId: 1, items: [{productId: 101, quantity: 2}, {productId: 102, quantity: 1}]},
    {id: 1002, customerId: 2, items: [{productId: 102, quantity: 1}, {productId: 103, quantity: 3}]},
    {id: 1003, customerId: 3, items: [{productId: 104, quantity: 5}, {productId: 105, quantity: 2}]},
    {id: 1004, customerId: 4, items: [{productId: 101, quantity: 1}, {productId: 103, quantity: 2}]},
    {id: 1005, customerId: 5, items: [{productId: 105, quantity: 10}]},
    {id: 1006, customerId: 1, items: [{productId: 101, quantity: 1}, {productId: 105, quantity: 3}]},
    {id: 1007, customerId: 2, items: [{productId: 104, quantity: 2}, {productId: 103, quantity: 1}]},
    {id: 1008, customerId: 3, items: [{productId: 102, quantity: 2}]},
    {id: 1009, customerId: 4, items: [{productId: 101, quantity: 1}, {productId: 102, quantity: 1}]},
    {id: 1010, customerId: 5, items: [{productId: 103, quantity: 4}, {productId: 104, quantity: 3}]},
];

const productObj = {}
for (const product of products) {
    productObj[product.id] = {name: product.name, price: product.price}
}
// console.log(productObj)

const groupOrder = (OrderItems) => {
    const result = {}
    for (const item of OrderItems) {
        if (!result[item.productId]) result[item.productId] = item.quantity
        else result[item.productId] += item.quantity
    }
    return result;
}
// console.log(groupOrder())

const result = customers.map(customer => {
    const customerOrders = orders.filter(o => o.customerId === customer.id)
    // console.log(customer.id, customerOrders)
    let customerOrderItems = []
    customerOrders.forEach(customerOrder => {
        customerOrderItems = [...customerOrderItems, ...customerOrder.items]
    })
    // console.log(customer.id, customerOrderItems)
    const groupedOrderItems = groupOrder(customerOrderItems)
    // console.log(customer.id, groupedOrderItems)

    const productsList = Object.entries(groupedOrderItems).map(([productId, quantity]) => {
        const product = productObj[productId]
        return {
            name: product.name,
            quantity,
            totalSpent: product.price * quantity
        }
    })
    // console.log(productsList)
    const totalSpent = productsList.reduce((sum, p) => sum + p.totalSpent, 0)
    // console.log(totalSpent)

    return {
        id: customer.id,
        name: customer.name,
        totalSpent: totalSpent,
        products: productsList
    }
}).sort((a, b) => b.totalSpent - a.totalSpent)

for (const r of result) {
    console.log(r)
}