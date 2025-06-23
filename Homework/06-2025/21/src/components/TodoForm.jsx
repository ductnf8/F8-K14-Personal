import React, {useState} from 'react';

function TodoForm({onAdd, inputRef}) {
    const [input, setInput] = useState('');

    const handleSubmit = () => {
        if (!input.trim()) return;
        onAdd(input);
        setInput('');
    };

    return (
        <div className="add-todo">
            <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                type="text"
                className="todo-input"
                placeholder="What is the task today?"
            />
            <button type="button" className="add-btn" onClick={handleSubmit}>
                Add Task
            </button>
        </div>
    );
}

export default TodoForm;
