const url = 'https://api-todolist-multiuser.onrender.com/Duc/todos'
const todoForm = document.querySelector('.todo-form')
const input = document.querySelector('.todo-input')
const todoList = document.querySelector('.todo-list')

async function fetchUrl() {
    try {
        const response = await fetch(url)
        const result = response.json()
        renderTodos(result)
    } catch (err) {
        console.log('error:', err)
    }
}

async function renderTodos(api) {
    todoList.innerHTML = ''
    api.forEach(a => {
        const todoItem = document.createElement('div')
        todoItem.className = 'todo-item'

        const checkbox = document.createElement('input')
        checkbox.checked = a.completed

        const content = document.createElement('div')
        content.className = 'todo-content'
        content.textContent = a.title

        if (a.checked) todoItem.classList.add('completed')

        const delBtn = document.createElement('button')
        delBtn.className = 'del-btn fa-solid fa-trash'
        delBtn.type = 'button'

        // nút check
        checkbox.addEventListener('change', async () => {
            try {
                await fetch(`${url}/${a.id}`, {
                    method: 'PUT'
                })
            } catch (e) {
                console.log('error:', e)
            }
        })

        // nút delete
        delBtn.addEventListener('click', async () => {
            try {
                await fetch(`${url}/${a.id}`, {
                    method: 'DELETE',
                })
                todoItem.remove()
                alert('Delete successfully!!')
            } catch (e) {
                console.log('error:', e)
            }
        })

        todoItem.append(todoItem, checkbox, content)
        todoList.appendChild(todoItem)
    })
}

fetchTodos();
