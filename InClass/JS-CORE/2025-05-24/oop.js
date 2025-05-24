class Person {
    name;
    age;
    girlFriend;

    constructor(name, age) {
        this.name = name;
        this.age = age
    }

    eat(){
        console.log('eat')
    }
}

const duc = new Person('duc', 22)

class NewPerson{
    name;
    age;
    gender;
}

class Male extends Person{
    constructor(name,age) {
        super(name,age);
    }

    eat() {
        super.eat();
        console.log('eat at male')
    }
}

const male = new Male()
male.eat()