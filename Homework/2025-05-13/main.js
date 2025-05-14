const datas = [
    {id: 1, name: 'Nguyễn Văn A', age: 22, email: 'a@example.com'},
    {id: 2, name: 'Trần Thị B', age: 21, email: 'b@example.com'},
    {id: 3, name: 'Lê Văn C', age: 23, email: 'c@example.com'}
];

const positions = [
    {id: 1, position: 'Giám đốc'},
    {id: 2, position: 'Nhân viên'},
    {id: 3, position: 'Quản lý'}
];

const fullData = []
for (const data of datas) {
    const did = data.id;
    const position = positions.find(p => p.id === did)
    fullData.push({
        ...data,
        position: position.position
    })
}

fullData.forEach(h =>{

})

const head = Object.keys(fullData[0])
console.log(head)