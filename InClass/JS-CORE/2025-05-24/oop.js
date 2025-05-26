import {Male} from './male.js'

class BoyStudent extends Male{}

const duc = new BoyStudent('duc', 22,'huyen')

duc.setName('viet')
duc.setGirlFriend('huyen')
console.log(duc.getGirlFriend())