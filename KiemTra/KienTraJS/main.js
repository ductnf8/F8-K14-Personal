// Teams
const teams = [
    {id: 1, name: "Reactjs"},
    {id: 2, name: "Expressjs"},
    {id: 3, name: "Nestjs"}
];

// Employees
const employees = [
    {id: 1, name: "Nguyen Minh Viet", teamId: 1},
    {id: 2, name: "Tran Thuy Quynh", teamId: 2},
    {id: 3, name: "Tran Cong Tin", teamId: 1},
    {id: 4, name: "Nguyen Nam Tao", teamId: 2},
    {id: 5, name: "Bui Kong Minh", teamId: 3}
];

// Absence Times
const absences = [
    {id: 1, employeeId: 1, date: "mon", time: "8:00-9:00"},
    {id: 2, employeeId: 1, date: "tue", time: "16:00-17:00"},
    {id: 3, employeeId: 3, date: "thu", time: "11:00-12:00"},
    {id: 4, employeeId: 2, date: "wed", time: "11:00-12:00"},
    {id: 5, employeeId: 5, date: "fri", time: "9:00-11:00"},
    {id: 6, employeeId: 3, date: "mon", time: "8:00-9:00"}
];


const teamsSearch = []
for (const team of teams) {
    teamsSearch.push(team.name)
}
console.log(teamsSearch);

const teamsAutocomplete = (autocomplete) => {

    const autoSelect = document.querySelector(autocomplete)
    const inputTeams = autoSelect.querySelector('input[name="Teams"]')
    const dropdown = autoSelect.querySelector('.dropdown')
    let cursor = null
    // autoSelect.innerHTML = ''

    // thêm province vào dropdown
    const renderDropdown = (teamsSearch) => {
        dropdown.innerHTML = ''
        teamsSearch.forEach(team => {
            const div = document.createElement('div')
            div.className = 'dropdown-item'
            div.textContent = team
            dropdown.appendChild(div)

            div.addEventListener('click', () => {
                inputTeams.value = team
                dropdown.style.display = 'none'
                cursor = null
            })
        })
    }


    inputTeams.addEventListener('input', (e) => {
        cursor = null
        dropdown.style.display = 'block'
        const searchStr = inputTeams.value.toLowerCase()
        const filteredItems = teamsSearch.filter(team => team.toLowerCase().includes(searchStr))
        renderDropdown(filteredItems)
    })

    document.addEventListener('click', function (e) {
        if (e.target !== inputTeams && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none'
            cursor = null
        }
    });

    inputTeams.addEventListener('keydown', (e) => {
        const teamsE = dropdown.querySelectorAll('.dropdown-item')

        if (e.key === 'ArrowDown') {
            if (cursor === null) cursor = 1
            else if (cursor > items.length) cursor = 1
            else cursor++

            resetBackground()
            const teamSelect = document.querySelector(`.dropdown-item:nth-child(${cursor})`)
            teamSelect.style.background = '#ccc'
        }

        if (e.key === "Enter") {
            if (cursor !== null && cursor <= teamsE.length && cursor > 0) {
                const teamSelect = document.querySelector(`.dropdown-item:nth-child(${cursor})`)
                inputTeams.value = teamSelect.textContent
                dropdown.style.display = 'none'
                cursor = null
            }
        }
    })
}
const resetBackground = () => {
    const teamsE = document.querySelectorAll('.dropdown-item')
    teamsE.forEach(item => {
        item.style.background = 'white'
    })
}
const sort = absences.sort((a, b) => a.employeeId - b.employeeId)
console.log(sort);

const groupDate = []
sort.forEach(s => {
    const a = employees.find(e => e.id === s.employeeId)
    groupDate.push({
        employeeId: s.employeeId,
        date: s.date,
        time: s.time
    })
})
console.log(groupDate)

const datee = []
for (const group of groupDate) {
    datee.push(group.date)
}
console.log('datee:')
console.log(datee)


for (const employee of employees) {
    // for (const dateI of datee) {
    //     employee.dateI = absences.find(a => a.employeeId === employee.id && a.date === dateI);
    // }
    employee.mon = absences.find(a => a.employeeId === employee.id && a.date === 'mon')?.time || 'Full day'
    employee.tue = absences.find(a => a.employeeId === employee.id && a.date === 'tue')?.time || 'Full day'
    employee.wed = absences.find(a => a.employeeId === employee.id && a.date === 'wed')?.time || 'Full day'
    employee.thu = absences.find(a => a.employeeId === employee.id && a.date === 'thu')?.time || 'Full day'
    employee.fri = absences.find(a => a.employeeId === employee.id && a.date === 'fri')?.time || 'Full day'
}
console.log(employees)

const fullData = []
for (const emp of employees) {
    const eid = emp.teamId;
    const team = teams.find(t => t.id === eid)
    fullData.push({
        Name: emp.name,
        Team: team.name,
        Mon: emp.mon,
        Tue: emp.tue,
        Wed: emp.wed,
        Thu: emp.thu,
        Fri: emp.fri,

    })
}
console.log(fullData);
// nút search
// const inputSearch = document.querySelector('input[name="Search"]')
// inputSearch.addEventListener('input', (e) => {
//     const keyword = e.target.value.toLowerCase()
//     const filteredEmployees = employees.filter(e => e.name.includes(keyword))
// })

const header = Object.keys(fullData[0])
console.log(header)

const table = document.querySelector('table')
const thead = document.createElement('thead')
const headRow = document.createElement('tr')
headRow.style.borderBottom = '1px solid #ccc'
headRow.style.borderTop = '1px solid #ccc'

header.forEach(h => {
    const th = document.createElement('th')
    th.innerText = h
    headRow.appendChild(th)
})
thead.appendChild(headRow)
table.appendChild(thead)


const tbody = document.createElement('tbody')

fullData.forEach(f => {
    const tr = document.createElement('tr')
    header.forEach(h => {
        const td = document.createElement('td')
        td.style.borderBottom = '1px solid #ccc'
        td.innerText = f[h]

        tr.appendChild(td)
        if (f[h] === "Full day") {
            td.innerHTML = `
            <span class="mdi mdi-office-building
            "></span>
            <span>Full day</span>
            `
        }

    })
    tbody.appendChild(tr)
})

table.appendChild(tbody)