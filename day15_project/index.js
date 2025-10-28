document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // State
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    // Initialize the app
    renderTasks();

    // Event Listeners
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Set current filter and re-render
            currentFilter = this.getAttribute('data-filter');
            renderTasks();
        });
    });

    // Functions
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();

        // Clear input
        taskInput.value = '';
        taskInput.focus();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }

    function toggleComplete(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        saveTasks();
        renderTasks();
    }

    function editTask(id) {
        const taskItem = document.querySelector(`[data-id="${id}"]`);
        const taskText = taskItem.querySelector('.task-text');
        const task = tasks.find(t => t.id === id);

        // Create input field
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = task.text;

        // Create save button
        const saveBtn = document.createElement('button');
        saveBtn.className = 'save-btn';
        saveBtn.textContent = 'Save';

        // Replace task text with input and save button
        taskItem.querySelector('.task-text').replaceWith(editInput);
        taskItem.querySelector('.task-actions').replaceWith(saveBtn);

        // Focus and select text in input
        editInput.focus();
        editInput.select();

        // Save on Enter key
        editInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                saveEdit(id, editInput.value);
            }
        });

        // Save on button click
        saveBtn.addEventListener('click', function () {
            saveEdit(id, editInput.value);
        });

        // Cancel on Escape key
        editInput.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                renderTasks();
            }
        });
    }

    function saveEdit(id, newText) {
        if (newText.trim() === '') {
            alert('Task cannot be empty!');
            return;
        }

        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, text: newText.trim() };
            }
            return task;
        });

        saveTasks();
        renderTasks();
    }

    function renderTasks() {
       
        let filteredTasks = tasks;

        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }

        // Clear task list
        taskList.innerHTML = '';

        // Show empty state if no tasks
        if (filteredTasks.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';

            if (tasks.length === 0) {
                emptyState.textContent = 'No tasks yet. Add a task to get started!';
            } else {
                emptyState.textContent = `No ${currentFilter} tasks.`;
            }

            taskList.appendChild(emptyState);
            return;
        }

        // Render tasks
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.setAttribute('data-id', task.id);

            taskItem.innerHTML = `
                        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                        <div class="task-actions">
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        </div>
                    `;

            taskList.appendChild(taskItem);

            // Add event listeners to the new task
            const checkbox = taskItem.querySelector('.task-checkbox');
            const editBtn = taskItem.querySelector('.edit-btn');
            const deleteBtn = taskItem.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => toggleComplete(task.id));
            editBtn.addEventListener('click', () => editTask(task.id));
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});