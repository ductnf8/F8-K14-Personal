const postList = document.getElementById('posts')

const fetchPost = async () => {
    const access_token = localStorage.getItem('access_token')

    try {
        const response = await fetch('https://8fty49z8qb.execute-api.ap-southeast-1.amazonaws.com/post/',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

        if (response.status === 401) {
            console.warn('Access token experied')
            const refresh_token = localStorage.getItem('refresh_token')

            const refreshRes = await fetch('https://8fty49z8qb.execute-api.ap-southeast-1.amazonaws.com/login/get_new_token/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({refresh_token})
                })
            if (refreshRes.ok) {
                const refreshData = await refreshRes.json()
                localStorage.setItem('access_token', refreshData.access_token)
                return await fetchPost()
            } else {
                throw new Error('Refresh token experid')
            }
        }

        const data = await response.json()

        data.forEach(p => {
            const li = document.createElement('li')
            li.textContent = p.title
            postList.appendChild(li)
        })

    } catch (e) {
        console.log(e)
        postList.innerHTML = `<li style="color:red;">${e.message}</li>`; // hiển thị lỗi cho người dùng
    }
}
const logoutBtn = document.getElementById('logout-btn')
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.href = 'index.html' // chuyển về trang đăng nhập
})

window.addEventListener('DOMContentLoaded', fetchPost)