const provinceUrl = 'https://api01.f8team.dev/api/address/provinces'
const districtUrl = 'https://api01.f8team.dev/api/address/districts'

async function fetchDatas(url) {
    try {
        const response = await fetch(url)
        const result = await response.json()
        return result.data
    } catch (error) {
        console.log(error)
    }
}

async function fetchAndJoin() {
    const provinces = await fetchDatas(provinceUrl)
    const districts = await fetchDatas(districtUrl)

    const fullDistricts = districts.map(d => {
        const province = provinces.find(p => p.province_id === d.province_id)
        return {
            ...d,
            province_name: province.name
        }
    })
    console.log(fullDistricts)
}


function renderProvinces(provinces) {
    // console.log(provinces)
    const listProvinces = document.querySelector('.autocomplete')
    const input = document.querySelector('.province')

    input.addEventListener('input', () => {
        const keyword = input.value.trim().toLowerCase()
        listProvinces.innerHTML = ''
        if (!keyword) return
        const filtered = provinces.filter(p => p.name.toLowerCase().includes(keyword))

        filtered.forEach(f => {
            const item = document.createElement('div')
            item.className = 'province-item'
            item.innerText = f.name
            item.addEventListener('click', () => {
                input.value = f.name
                listProvinces.innerHTML = ''
            })
            listProvinces.appendChild(item)
        })
    })


    document.addEventListener('click', function (e) {
        if (!e.target.closest('.autocomplete') && e.target !== input) {
            listProvinces.innerHTML = ''
        }
    })
}

async function start() {
    const provinces = await fetchDatas(provinceUrl)
    renderProvinces(provinces)
}

start()