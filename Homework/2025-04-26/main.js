/*
Bài 1:

                           ┌──────────────┐
                           │sort theo     │
                           │colorId       │
                           │sortedFlowers │
                           └──────┬───────┘
                                  │
                                  │
                                  │
                          ┌───────▼──────────┐
                          │ tạo mảng merged  │
                          │ dặt con trỏ      │
                          │ i,j cho flo, col │
                          └────────┬─────────┘
                                   │
                                   │
                                   │
                                   │
  ┌───────────┐     no     ┌───────▼──────────────┐
  │thoát while◄────────────┼i<sortedFlowers.length│
  └───────────┘            │j<color.length        │
                           └───────┬──────────────┘
               ┌───────────────────►
               │                   │◄───────────────────────────────────────────────┐
               │               yes │                                                │
               │                   │                                                │
               │           ┌───────▼────┐   yes    ┌────────────────────┐           │
               │           │colorId hoa ┼──────────► push info của hoa  │        ┌──┼──┐
               │           │= id màu    │          │ và color của colors┼────────► i++ │
               │           └──────┬─────┘          │ vào merged 2       │        └──▲──┘
               │                  │                └────────────────────┘           │
               │                  │                                                 │
               │                  │no                                               │
               │                  │                                                 │
               │                  │                                                 │
               │                  │                                                 │
               │          ┌───────▼───────┐                                         │
               │          │colorId của hoa│           yes                           │
               │          │< id của màu   ┼─────────────────────────────────────────┘
               │          └──────┬────────┘
               │                 │
               │                 │
               │                 │no
               │                 │
               │              ┌──▼─┐
               └──────────────┼j++ │
                              └──┬─┘
                                 │
                                 │
                                 │
                                 │
                                 │
                              ┌──▼─────────┐
                              │log(merged) │
                              └────────────┘



 */

console.log('Bài 1:')
const colors = [
    {id: 1, name: 'Red'},
    {id: 2, name: 'Blue'},
    {id: 3, name: 'Yellow'},
    {id: 4, name: 'White'},
    {id: 5, name: 'Pink'},
];

const flowers = [
    {id: 1, name: 'Rose', colorId: 1},
    {id: 2, name: 'Tulip', colorId: 2},
    {id: 3, name: 'Carnation', colorId: 1},
    {id: 4, name: 'Sunflower', colorId: 3},
    {id: 5, name: 'Daisy', colorId: 4},
    {id: 6, name: 'Lily', colorId: 4},
    {id: 7, name: 'Peony', colorId: 5},
    {id: 8, name: 'Orchid', colorId: 5},
];

console.time('do st')

// Step 1: Sort flowers by colorId
const sortedFlowers = [...flowers].sort((a, b) => a.colorId - b.colorId);

// Step 2: Merge join
const merged = [];
let i = 0;
let j = 0;

while (i < sortedFlowers.length && j < colors.length) {
    if (sortedFlowers[i].colorId === colors[j].id) {
        merged.push({
            ...sortedFlowers[i],
            color: colors[j].name
        });
        i++;
    } else if (sortedFlowers[i].colorId < colors[j].id) {
        i++;
    } else {
        j++;
    }
}

console.log(merged);

console.timeEnd('do st')

/*
bài 2:



      ┌────────────┐
      │function    │
      │(arr, index)│
      └───────┬────┘
              │
              │
              │
              │
              │
      ┌───────▼─────────────┐
      │left=0               │
      │right = arr.length-1 │
      └───────┬─────────────┘
              │
              │
              │
              │
              │
     ┌────────▼──────┐     no       ┌───────┐
     │ left <= right ┼─────────────►│ bỏ qua│
     └──────┬────────┘              └───────┘
            │
            │
            │
            │no
            │
            │
      ┌─────▼──────────┐
      │mid = left      │
      │+(right-left)/2 │
      └────────────────┘
              │
              │
              │
              │
              │
              │
      ┌───────▼───────┐   yes   ┌──────────┐
      │arr[mid]=index ┼─────────►return mid│
      └───────┬───────┘         └──────────┘
              │
              │
              │no
              │
              │
      ┌───────▼─────────┐ yes  ┌───────────────┐
      │arr[mid] < index ┼──────► tìm bên phải  │
      └───────┬─────────┘      │ left = mid + 1│
              │                └───────┬───────┘
              │                        │
              │no                      │
              │                        │
              │                        │
      ┌───────▼───────┐                │
      │right = mid - 1│                │
      └────┬──────────┘                │
           │                           │
           ◄───────────────────────────┘
           │
           │
     ┌─────▼────┐    yes   ┌─────────┐
     │ result=-1┼──────────►khong tìm│
     └───────┬──┘          │thấy     │
             │             └─────────┘
             │no
             │
      ┌──────▼─────┐
      │log(result) │
      └────────────┘


 */
console.log('Bài 2:')

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = left + ((right - left) >> 1);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

const arr = [1, 3, 5, 7, 9, 11, 13]
const index = 7
const result = binarySearch(arr, index);

if (result === -1) {
    console.log(`${index} không tồn tại`);

} else {
    console.log(` ${index} ở vị trí  ${result}`);
}
