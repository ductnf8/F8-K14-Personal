import {useEffect, useState, useRef} from 'react';
import * as api from './utils/api.js';

export default function useTodos() {
    const [todos, setTodos] = useState([]);
    const inputRef = useRef();

    // ✅ Load danh sách todo khi app khởi động
    useEffect(() => {
        api.get('/')
            .then(setTodos)
            .catch(err => console.error("Lỗi tải danh sách:", err));
    }, []);

    const addTodo = async (text) => {
        if (!text.trim()) return;
        try {
            const newTodo = await api.post('/', {title: text, completed: false});
            setTodos(prev => [...prev, newTodo]);
            inputRef.current?.focus();
        } catch (err) {
            console.error("Lỗi thêm todo:", err);
        }
    };


    // ✅ Cập nhật nội dung hoặc trạng thái todo
    const updateTodo = async (id, updates) => {
        try {
            const updated = await api.put(`/${id}`, updates);
            setTodos(prev => prev.map(todo => todo.id === id ? updated : todo));
        } catch (err) {
            console.error("Lỗi cập nhật todo:", err);
        }
    };

    // ✅ Xoá todo
    const deleteTodo = async (id) => {
        try {
            await api.del(`/${id}`);
            setTodos(prev => prev.filter(todo => todo.id !== id));
        } catch (err) {
            console.error("Lỗi xoá todo:", err);
        }
    };

    // ✅ Toggle hoàn thành
    const toggleComplete = (id) => {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            updateTodo(id, {completed: !todo.completed});
        }
    };

    return {
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
        inputRef
    };
}
