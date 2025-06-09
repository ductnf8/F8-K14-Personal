const API_URL = "https://api-todolist-multiuser.onrender.com/Duc/todos";
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

async function fetchTodos() {
    try {
        const response = await fetch(API_URL);
        const todos = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách todos:", error);
    }
}

function renderTodos(todos) {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.className = "todo-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        const content = document.createElement("div");
        content.className = "todo-content";
        content.textContent = todo.title;
        if (todo.completed) {
            content.classList.add("completed");
        }

        const delBtn = document.createElement("button");
        delBtn.className = "del-btn fa-solid fa-trash";
        delBtn.type = 'button'

        // ✅ Xử lý đánh dấu hoàn thành
        checkbox.addEventListener("change", async () => {
            try {
                await fetch(`${API_URL}/${todo.id}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({...todo, completed: checkbox.checked})
                });
                content.classList.toggle("completed", checkbox.checked);
            } catch (err) {
                console.error("Lỗi cập nhật trạng thái:", err);
            }
        });

        // ✅ Xử lý xóa công việc
        delBtn.addEventListener("click", async () => {
            try {
                await fetch(`${API_URL}/${todo.id}`, {method: "DELETE"});
                todoItem.remove();
                alert('Delete successful!!')
            } catch (err) {
                console.error("Lỗi khi xóa công việc:", err);
            }
        });

        todoItem.append(checkbox, content, delBtn);
        todoList.appendChild(todoItem);
    });
}

// ✅ Xử lý thêm công việc mới
todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const task = todoInput.value.trim();
    if (task === "") {
        alert("Vui lòng nhập nội dung công việc!");
        return;
    }

    try {
        const newTodo = {
            title: task,
            completed: false,
        };
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTodo),
        });

        if (!response.ok) throw new Error("Không thể thêm công việc");

        // Sau khi thêm thành công
        todoInput.value = "";
        todoInput.focus();
        fetchTodos();
    } catch (err) {
        console.error("Lỗi khi thêm công việc:", err);
    }
});

// ✅ Tải dữ liệu ban đầu
fetchTodos();
