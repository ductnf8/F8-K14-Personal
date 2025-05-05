/*
* Bien : Variable
* use to store ant temp value
* store on RAM
* reset -> remove
*
* declare a variable -> 4 ways
* var(<2015)
* /let/const (>2015 - EC6)
* Syntax
* */


// declare variable
// var a
// a=1
// console.log(a)
//
// // initial variable
// var b = 1
// console.log(b)

/*
* RAW STRING
* number +- number = number
* string + string =string
* string - string = NaN
*
* STRING LINK NUMBER
* string +string = string
* string - string = number
* string * string = number
* string / string = number
*
* JS try to convert your operator to correct operator -> shouldn't depend on it
*
* */

/*
* a ** 2 = a * a
* */

// let a = 1
// a++
// ++a
// console.log(a)


// let a = 5
// const b = a + ++a + a++ + ++a +a-- - --a
//  console.log(b)

/*
* comparison operator
* ==/===
* >
* <
* >=
* <=
* !=/!==
* ?
* */


/*
* data type
* string
* number
* bool
* null/ undefine / unknow
* object
* function
* to check data type : typeof(<variable>)
* */

// const a='test'
// console.log(typeof a)

/*
* Concat: convert data type
* DataType(<variable>)
*
* string <-> number -> ok
* string ->bool
* length of string >0 --->true, else -> false
*
* number ->bool
* 0 ->false else true
*
* bool -> string
* true->true
* false -> false
*
* bool ->number
* true -> 1
* false -> 0
* */


let a = 123
a = String(a)