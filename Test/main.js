function reverse(str) {
    let reverse = ''
    for (let i = str.length - 1; i >= 0; i--) {
        reverse += str[i]
    }
    return reverse
}

console.log(reverse("John Smith"));
console.log('=======')

function reverseStr(str) {
    return str.split('').reverse().join('')
}

console.log(reverseStr("John Smith"));
console.log('=======')


function findMax(a) {
    let max = a[0];
    for (let i = 1; i <= a.length; i++) {
        if (a[i] > max) max = a[i];
    }
    return max
}

console.log(findMax([1, 3, 5, 7]));
console.log('=======')


function listEvenNumbers(a, b) {
    for (let i = a; i <= b; i++) {
        if (i % 2 === 0) {
            console.log(i)
        }
    }
}

console.log(listEvenNumbers(1, 9))
console.log('=======')

function sumOddNumbers(a) {
    let sum = 0
    for (let i = 0; i < a.length; i++) {
        if (a[i] % 2 !== 0) {
            sum += a[i]
        }
    }
    return sum
}

console.log(sumOddNumbers([1, 2, 3, 4, 5, 6]))


function findMin(a) {
    let min = a[0]
    for (let i = 0; i < a.length; i++) {
        if (a[i] < min) min = a[i]
    }
    return min
}

console.log(findMin([8, 0, 7, 1, 2, 3, 4, 5, 6]))
console.log('=======')


function countPositiveNumbers(a) {
    let count = 0
    for (let i = 0; i < a.length; i++) {
        if (a[i] > 0) {
            count++
        }
    }
    return count
}


console.log(countPositiveNumbers([1, -2, 3, -4, 5, 6]))
console.log('=======')


function sumArray(a) {
    let sum = 0
    for (let i = 0; i < a.length; i++) {
        sum += a[i]
    }
    return sum
}

console.log(sumArray([1, 2, 3, 4, 5, 6]))
console.log('=======')


function calculateAverage(a) {
    let sum = 0
    for (let i = 0; i < a.length; i++) {
        sum += a[i]
    }
    // return sum / a.length
    return a.length > 0 ? sum / a.length : 0
}

console.log(calculateAverage([2, 4, 6]))
console.log('=======')



function isAscending(a){
    if(a.length<=1) return false
    for (let i = 0; i < a.length; i++) {
        if(a[i]>a[i+1]) return false
    }
    return true
}

console.log(isAscending([1, 2, 3,7, 4, 5, 6]))
console.log('=======')


function isPrime(n){
    if(n<=1) return false
    for(let i=2;i<=n**0.5;i++){
        if(n%i===0) return false
    }
    return true
}


console.log(isPrime(29))
console.log('=======')


function sumPrimes(a,b){
    if(a>b) [a,b] = [b,a]
    let sum = 0
    for (let i = a; i <= b; i++) {
        if(isPrime(i)){
            sum += i
        }
    }
    return sum
}

console.log(sumPrimes(20,10))
console.log('=======')


function repeatChar(char,n){
    let a=''
    for(let i = 1;i<= n;i++){
        a+= char
    }
    return a
}

console.log(repeatChar('*',10))
console.log('=======')


function linearSearch(arr,n){
    for(let i=0;i<arr.length;i++){
        if(arr[i]===n){
            return i
        }
    }
    return -1
}

console.log(linearSearch([1,2,3,4,5,6],4))
console.log('=======')


function fibonacci(n) {
    if (n <= 0) return []
    if (n === 1) return [0]
    if (n === 2) return [0, 1]

    let fib = []        // Khai báo mảng
    fib[0] = 0          // Phần tử đầu tiên
    fib[1] = 1          // Phần tử thứ hai

    for (let i = 2; i < n; i++) {
        fib[i] = fib[i-1] + fib[i-2]
    }

    return fib
}

console.log(fibonacci(10))
console.log('=======')
