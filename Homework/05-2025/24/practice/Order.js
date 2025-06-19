export class Order {
    #id;
    #customer;
    #products;
    #orderDate;


    constructor(id, customer, orderDate) {
        this.#id = id;
        this.#customer = customer;
        this.#products = [];
        this.#orderDate = orderDate;
    }

    getId() {
        return this.#id;
    }

    setId(id) {
        this.#id = id;
    }

    getCustomer() {
        return this.#customer;
    }

    setCustomer(customer) {
        this.#customer = customer;
    }

    getProducts() {
        return this.#products;
    }

    setProducts(product) {
        this.#products = product;
    }

    getOrderDate() {
        return this.#orderDate;
    }

    setOrderDate(orderDate) {
        this.#orderDate = orderDate;
    }

    addProduct(product) {
        this.#products.push(product)
    }

    removeProduct(productId) {
        this.#products = this.#products.filter(p => p.id !== productId)
    }

    calculateTotal() {
        return this.#products.reduce((total, product) => total + product.getPrice(), 0)
    }

    toString() {
        return `Đơn hàng #${this.#id}, khách hàng: ${this.#customer.getName()}, ngày đặt: ${this.#orderDate.toLocaleDateString('vi-VN')}`;
    }

}