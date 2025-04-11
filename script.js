document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
  
    // Загрузка задач из localStorage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    // Отображение задач
    const renderTodos = () => {
      todoList.innerHTML = '';
      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
          <span>${todo.text}</span>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        li.addEventListener('click', () => toggleTodo(index));
        todoList.appendChild(li);
      });
    };
  
    // Добавление новой задачи
    const addTodo = () => {
      const text = input.value.trim();
      if (text) {
        todos.push({ text, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        input.value = '';
        renderTodos();
      }
    };
  
    // Переключение статуса задачи
    const toggleTodo = (index) => {
      todos[index].completed = !todos[index].completed;
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    };
  
    // Удаление задачи
    const deleteTodo = (index) => {
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    };
  
    // Обработчики событий
    addBtn.addEventListener('click', addTodo);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTodo();
    });
  
    todoList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        e.stopPropagation();
        deleteTodo(parseInt(e.target.dataset.index));
      }
    });
  
    // Первоначальная загрузка
    renderTodos();
  });