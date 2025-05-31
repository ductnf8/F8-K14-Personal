const data = [
    {id: 1, name: 'Nguyễn Văn A', age: 22, email: 'a@example.com'},
    {id: 2, name: 'Trần Thị B', age: 21, email: 'b@example.com'},
    {id: 3, name: 'Lê Văn C', age: 23, email: 'c@example.com'}
];

const positions = [
    {id: 1, position: 'Giám đốc'},
    {id: 2, position: 'Nhân viên'},
    {id: 3, position: 'Quản lý'}
];

const datas = data.map(d => {
    const matched = positions.find(p => p.id === d.id)
    return {
        ...d,
        position: matched.position
    }
})

const header = Object.keys(datas[0])
// console.log(header)

const table = document.querySelector('table')
const thead = document.createElement('thead')
const headRow = document.createElement('tr')

header.forEach(h => {
    const th = document.createElement('th')
    th.textContent = h
    headRow.appendChild(th)
})
thead.appendChild(headRow)
table.appendChild(thead)
const tbody = document.createElement('tbody')
datas.forEach(d => {
    const tr = document.createElement('tr')
    header.forEach(h => {
        const td = document.createElement('td')
        td.textContent = d[h]
        tr.appendChild(td)
    })
    tbody.appendChild(tr)
})

table.appendChild(tbody)
