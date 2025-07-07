const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const addTodoBtn = document.getElementById('add-todo-btn') as HTMLButtonElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

let todos: Todo[] = [];

const renderTodos = () => {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            renderTodos();
        });

        li.addEventListener('click', () => {
            todos = todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t);
            renderTodos();
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
};

addTodoBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ id: Date.now(), text, completed: false });
        todoInput.value = '';
        renderTodos();
    }
});

renderTodos();
