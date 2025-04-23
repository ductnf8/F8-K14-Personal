/*
Bài 1:


                                  ┌───────────┐
                                  │a = [...]  │
                                  └─────┬─────┘
                                        │
                                        │
                                        │
                                        │
                                  ┌─────▼─────┐           ┌───────────┐
                                  │mảng rỗng  ┼────yes────► in ra lỗi │
                                  │a.length=1 │           └───────────┘
                                  └─────┬─────┘
                                        │
                                        │no
                                        │
                                        │
                                 ┌──────▼─────┐
                                 │max = a[0]  │
                                 │min = a[0]  │
                                 └───────┬────┘
                                         │
                                         │
                                         │
                                 ┌───────▼────────────┐
                                 │i=1, duyệt          ◄────┐
                     ┌───────────┼i từ 1 đến a.length │    │
                     │           └─────┬──────────────┘    │
                     │                 │                   │
                     │                 │                   │
                     │                 │                   │
               ┌─────▼─────┐     ┌─────▼───┐            ┌──┼──┐
               │a[i]<min   │     │a[i]>max │────no──────►i++  │
               └────┬───┬──┘     └─────┬───┘            └──▲──┘
                    │   │              │                   │
                    │   └────no────────┼───────────────────┘
                    │                  │
                    │yes               │
                    │                  │yes
                    │                  │
                    │                  │
              ┌─────▼──────┐      ┌────▼──────┐
              │ min=a[i]   │      │max=a[i]   │
              └──────┬─────┘      └────┬──────┘
                     │                 │
                     │                 │
                     │                 │
                     │                 │
                     │                 │
                  ┌──▼────────┐        │
                  │ in ra min ◄────────┘
                  │ và max    │
                  └───────────┘


 */

console.log('Bài 1:')
const a1 = [1, 0, 2, 3, 5, 4, 9, 8]

if (a1.length === 0) console.log('mang rong')
else {
    let max1 = a1[0]
    let min1 = a1[0]
    for (let i = 1; i < a1.length; i++) {
        if (a1[i] > max1) {
            max1 = a1[i]
        }
        if (a1[i] < min1) {
            min1 = a1[i]
        }
    }
    console.log(`so lon nhat trong mang: ${max1}`)
    console.log(`so nho nhat trong mang: ${min1}`)
}


/*
Bài 3:

                  ┌─────────┐
                  │a3=[...] │
                  │obj={}   │
                  │result=[]│
                  └─────┬───┘
                        │
                        │
                        │
                        │
                        │
                  ┌─────▼───┐   yes     ┌───────────┐
                  │ a3 rỗng ┼───────────► in ra lỗi │
                  └─────┬───┘           └───────────┘
                        │
                        │
                        │no
                        │
                        │
                        │
                  ┌─────▼───────┐
                  │duyệt i từ 0 │
                  │đến a3.length│
                  └───────┬─────┘
                          │
     ┌────────────────────►
     │                    │
     │                    │
     │            ┌───────▼────────────┐    no       ┌─────────────┐
     │            │kiểm tra obj3[a3[i]]┼─────────────►bỏ qua a3[i] │
     │            │có phải undefined   │             └──────┬──────┘
     │            └─────────┬──────────┘                    │
     │                      │                               │
     │                      │yes                            │
     │                      │                               │
     │                      │                               │
     │           ┌──────────▼─────────────┐                 │
     │           │ Thêm a3[i] vào result3 │             ┌───▼───┐
     │           │  Gán obj3[a3[i]] = true┼─────────────►i++    │
     │           └────────────────────────┘             └───────┘
     │                                                      │
     │                                                      │
     │                                                      │
     │                                                      │
     │                                                      │
     │      yes     ┌─────────────┐                         │
     └──────────────┤ i<a3.length ◄─────────────────────────┘
                    └─────────┬───┘
                              │
                              │
                              │no
                              │
                              │
                       ┌──────▼──────┐
                       │in ra result │
                       └─────────────┘

 */


let a3 = [1, 1, 2, 2, 3, 4, 4, 5, 6]
let obj3 = {}
let result3 = []
if (a3.length === 0) console.log('mang rong')
else {
    for (let i = 0; i < a3.length; i++) {
        if (!obj3[a3[i]]) {
            obj3[a3[i]] = true;
            // result3[result3.length] = a3[i];
            result3.push(a3[i])
        }
    }
}

console.log('Bài 3:')
console.log(result3)



/*
Bài 4:

       ┌──────────┐
       │a4=[...]  │
       │n = number│
       └───┬──────┘
           │
           │
       ┌───▼────┐
       │sort a4 │
       └────┬───┘
            │
            │
            │
       ┌────▼───────────┐
       │tạo             │
       │insertIndex = -1│
       └───────┬────────┘
               │
               │
       ┌───────▼────────┐
       │duyệt i từ      │
       │0 đến a4.length │
       └───────┬────────┘
               │
               ◄──────────────┐
               │              │
       ┌───────▼───┐       ┌──┼──┐
       │arr[i] > n ┼───────► i++ │
       └─────┬─────┘ no    └─────┘
             │
             │yes
             │
             │
      ┌──────▼─────────┐
      │ insertIndex = i│
      └─────────┬──────┘
                │
                │
                │
                │
       ┌────────▼─────────┐        ┌───────────────┐
       │insertIndex === -1┼───yes──► thêm vào cuối │
       └─────────┬────────┘        │ mảng          │
                 │                 └───────┬───────┘
                 │                         │
                 │no                       │
                 │                         │
                 │                         │
         ┌───────▼──────────┐              │
         │chèn vào vị trí i │              │
         └───────┬──────────┘              │
                 │                         │
                 │                         │
                 │                         │
                 │                         │
         ┌───────▼────────┐                │
         │in ra mảng mới  ◄────────────────┘
         └────────────────┘


 */

function insertIntoSortedArray(a4, n) {
    // Sắp xếp mảng a4
    a4.sort((a, b) => a - b);

    // Khởi tạo insertIndex
    let insertIndex = -1;

    // Duyệt mảng để tìm vị trí chèn
    for (let i = 0; i < a4.length; i++) {
        if (a4[i] > n) {
            insertIndex = i;
            break;
        }
    }

    // Chèn n vào mảng
    if (insertIndex === -1) {
        a4.push(n);
    } else {
        a4.splice(insertIndex, 0, n);
    }

    // Trả về mảng mới
    return a4;
}

// Ví dụ sử dụng
let a4 = [1, 3, 5, 7];
let n = 4;
console.log('Bài 4:')
console.log('from GPT with love')
console.log(insertIntoSortedArray(a4, n)); // Output: [1, 3, 4, 5, 7]