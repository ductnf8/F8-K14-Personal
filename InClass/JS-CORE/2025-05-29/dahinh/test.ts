class Animal {
    eat() {
        console.log('an')
    }

    go() {
        console.log('go')
    }

    doST() {
        this.eat()
        this.go()
    }
}

class Cat extends Animal {
}

const cat = new Cat()
cat.doST()

