import {Employee} from "./employee.js";
import {Product} from "./product.js";
import {Customer} from "./Customer.js";
import {Order} from "./Order.js";


// Tạo khách hàng
const customer1 = new Customer(1, "Nguyễn Văn An", "nguyenan@example.com", "0912345678");
const customer2 = new Customer(2, "Trần Thị Bình", "tranbinh@example.com", "0987654321");
const customer3 = new Customer(3, "Lê Hoàng Cường", "lecuong@example.com", "0978123456");

const customers = [customer1, customer2, customer3];

// Tạo sản phẩm
const product1 = new Product(1, "Laptop Dell XPS", 25000000);
const product2 = new Product(2, "Điện thoại Samsung Galaxy", 12000000);
const product3 = new Product(3, "Tai nghe Sony", 3000000);
const product4 = new Product(4, "Chuột Logitech", 800000);
const product5 = new Product(5, "Bàn phím cơ", 1500000);

const products = [product1, product2, product3, product4, product5];

// Tạo đơn hàng
const order1 = new Order(1, customer1, new Date("2023-05-15"));
order1.addProduct(product1);
order1.addProduct(product3);

const order2 = new Order(2, customer2, new Date("2023-05-16"));
order2.addProduct(product2);
order2.addProduct(product4);
order2.addProduct(product5);

const order3 = new Order(3, customer1, new Date("2023-05-17"));
order3.addProduct(product2);
order3.addProduct(product5);

const order4 = new Order(4, customer3, new Date("2023-05-18"));
order4.addProduct(product1);
order4.addProduct(product2);
order4.addProduct(product3);
order4.addProduct(product4);

const orders = [order1, order2, order3, order4];

// Hiển thị thông tin
console.log("=== DANH SÁCH KHÁCH HÀNG ===");
customers.forEach(customer => console.log(customer.toString()));

console.log("\n=== DANH SÁCH SẢN PHẨM ===");
products.forEach(product => console.log(product.toString()));

console.log("\n=== DANH SÁCH ĐƠN HÀNG ===");
orders.forEach(order => console.log(order.toString()));

// Bài 2: Liệt kê đơn hàng theo khách hàng

const listOrdersByCustomer = (customers, orders) => {
    return customers.map(customer => {
        const customerOrders = orders.filter(o => o.getCustomer().getId() === customer.getId())
        const totalAmount = customerOrders.reduce((sum, order) => sum + order.calculateTotal(), 0)

        return {
            customer: customer,
            orders: customerOrders,
            totalOrders: customerOrders.length,
            totalAmount: totalAmount
        }
    })
}

const displayOrdersByCustomer = (data) => {
    data.forEach(entry => {
        console.log(`\nKhách hàng: ${entry.customer.getName()} (ID: ${entry.customer.getId()})`);
        console.log(`Tổng số đơn hàng: ${entry.totalOrders}`);
        console.log(`Tổng tiền: ${entry.totalAmount.toLocaleString('vi-VN')} VNĐ`);
        console.log("Danh sách đơn hàng:");
        entry.orders.forEach(o =>{
            console.log(`  - ${o.toString()}`);
            o.getProducts().forEach((product, idx) => {
                console.log(`    + ${idx + 1}. ${product.toString()}`);
            });
            console.log(`    => Tổng đơn: ${o.calculateTotal().toLocaleString('vi-VN')} VNĐ`);
        })
    })
}

console.log("\n=== THỐNG KÊ ĐƠN HÀNG THEO KHÁCH HÀNG ===");
const ordersByCustomer = listOrdersByCustomer(customers, orders);
displayOrdersByCustomer(ordersByCustomer);

// Bài 3: Tìm đơn hàng có giá trị cao nhất

const findHighestValueOrder =(orders) =>{
    if(!orders || orders.length===0) return null

    let highestOrder = null
    let maxTotal = 0

    for(const order of orders){
        const total = order.calculateTotal()
        if(total> maxTotal){
            highestOrder = order
            maxTotal = total
        }
    }
    return highestOrder
}

console.log("\n=== ĐƠN HÀNG CÓ GIÁ TRỊ CAO NHẤT ===");
const highestOrder = findHighestValueOrder(orders);
if (highestOrder) {
    console.log(`Đơn hàng có giá trị cao nhất: ${highestOrder.toString()}`);
    console.log(`Khách hàng: ${highestOrder.getCustomer().toString()}`);
    console.log(`Giá trị: ${highestOrder.calculateTotal().toLocaleString('vi-VN')} VNĐ`);
    console.log("Sản phẩm trong đơn hàng:");
    highestOrder.getProducts().forEach((product, index) => {
        console.log(`${index + 1}. ${product.toString()}`);
    });
} else {
    console.log("Không có đơn hàng nào.");
}
