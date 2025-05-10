// const tom = {
//     name: 'Tom',
//     hp: 1000,
//     atk: 100,
//     def: 30,
//     attatk(target) {
//         const dmg = this.atk - target.def
//         target.hp -= dmg > 0 ? dmg : 0
//         console.log(`${this.name} phang ${target.name} gay ${this.atk} máu, ${target.name} còn ${target.hp} máu`)
//     },
//     isAlive() {
//         return this.hp > 0
//     }
// }
// const jerry = {
//     name: 'Jerry',
//     hp: 350,
//     atk: 50,
//     def: 10,
//     attatk(target) {
//         const dmg = this.atk - target.def
//         target.hp -= dmg > 0 ? dmg : 0
//         console.log(`${this.name} phang ${target.name} gay ${this.atk} máu, ${target.name} còn ${target.hp} máu`)
//     },
//     isAlive() {
//         return this.hp > 0
//     }
// }
//
// //Tom phang jerry
// let round = 1
// while (tom.isAlive() && jerry.isAlive()) {
//     console.log(`Round ${round}`)
//     if (round % 2 !== 0) jerry.attatk(tom)
//     else tom.attatk(jerry)
//     round++
// }
//
// if (tom.isAlive()) console.log('tom win')
// else console.log('tom lose')


function Character(name, hp, atk, def) {
    this.name = name
    this.hp = hp
    this.atk = atk
    this.def = def
    this.attack = function (target) {
        const dmg = this.atk - target.def
        target.hp -= dmg > 0 ? dmg : 0
        console.log(`${this.name} phang ${target.name} gay ${this.atk} máu, ${target.name} còn ${target.hp} máu`)
    }
    this.isAlive = function () {
        return this.hp > 0
    }
}

const tom = new Character('Tom', 1000, 50, 5)
const jerry = new Character('Jerry', 1000, 50, 5)