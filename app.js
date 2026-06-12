// ============================================
// TODO APP - LOCAL STORAGE FUNCTIONALITY
// ============================================

// STATE - Store all tasks in memory
let tasks = [];
let currentFilter = 'all';

// DOM ELEMENTS
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalCount = document.getElementById('totalCount');
const activeCount = document.getElementById('activeCount');
const completedCount = document.getElementById('completedCount');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

// ============================================
// INITIALIZATION - Run on page load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage();
    renderTasks();
    updateStats();
    setupEventListeners();
});

// ============================================
// LOCAL STORAGE FUNCTIONS
// ============================================

/**
 * SAVE tasks to browser's local storage
 * This runs after every change to tasks array
 */
function saveTasksToLocalStorage() {
    // Convert tasks array to JSON string
    const tasksJSON = JSON.stringify(tasks);
    
    // Save to localStorage with key 'todoTasks'
    localStorage.setItem('todoTasks', tasksJSON);
    
    console.log('✅ Tasks saved to local storage');
}

/**
 * LOAD tasks from browser's local storage
 * This runs on page load
 */
function loadTasksFromLocalStorage() {
    // Get tasks from localStorage
    const tasksJSON = localStorage.getItem('todoTasks');
    
    // If tasks exist, parse them from JSON
    if (tasksJSON) {
        tasks = JSON.parse(tasksJSON);
        console.log('✅ Tasks loaded from local storage:', tasks);
    } else {
        tasks = [];
        console.log('📝 No saved tasks found');
    }
}

// ============================================
// EVENT LISTENERS - Wire up buttons
// ============================================

function setupEventListeners() {
    // ADD TASK button
    addBtn.addEventListener('click', addTask);
    
    // ENTER key in input field
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    
    // FILTER buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });
    
    // CLEAR COMPLETED button
    clearCompletedBtn.addEventListener('click', clearCompleted);
    
    // CLEAR ALL button
    clearAllBtn.addEventListener('click', clearAll);
}

// ============================================
// ADD TASK FUNCTION
// ============================================

/**
 * CREATE a new task and add to tasks array
 */
function addTask() {
    const taskText = todoInput.value.trim();
    
    // Validation: Check if input is empty
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }
    
    // Create new task object
    const newTask = {
        id: Date.now(), // Unique ID using timestamp
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleDateString()
    };
    
    // Add to tasks array
    tasks.push(newTask);
    
    // Clear input field
    todoInput.value = '';
    todoInput.focus();
    
    // Save to local storage
    saveTasksToLocalStorage();
    
    // Re-render the list
    renderTasks();
    updateStats();
    
    console.log('✅ Task added:', newTask);
}

// ============================================
// RENDER TASKS - Display tasks on page
// ============================================

/**
 * RENDER tasks to the DOM based on current filter
 */
function renderTasks() {
    // Clear the list
    todoList.innerHTML = '';
    
    // Filter tasks based on current filter
    let filteredTasks = tasks;
    
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    // Show/hide empty state
    if (filteredTasks.length === 0) {
        emptyState.style.display = 'block';
        return;
    } else {
        emptyState.style.display = 'none';
    }
    
    // Create HTML for each task
    filteredTasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = `todo-item ${task.completed ? 'completed' : ''}`;
        listItem.dataset.id = task.id;
        
        // Checkbox for marking complete
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleComplete(task.id));
        
        // Task text
        const textSpan = document.createElement('span');
        textSpan.className = 'todo-text';
        textSpan.textContent = task.text;
        
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'icon-btn edit-btn';
        editBtn.textContent = '✏️';
        editBtn.addEventListener('click', () => editTask(task.id));
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'icon-btn delete-btn';
        deleteBtn.textContent = '🗑️';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        // Actions container
        const actions = document.createElement('div');
        actions.className = 'todo-actions';
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        // Append all to list item
        listItem.appendChild(checkbox);
        listItem.appendChild(textSpan);
        listItem.appendChild(actions);
        
        // Add to list
        todoList.appendChild(listItem);
    });
}

// ============================================
// TASK ACTIONS - Complete, Edit, Delete
// ============================================

/**
 * TOGGLE task complete status
 */
function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage();
        renderTasks();
        updateStats();
        console.log(`✅ Task ${taskId} toggled to: ${task.completed}`);
    }
}

/**
 * EDIT a task
 */
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Prompt user for new text
    const newText = prompt('Edit your task:', task.text);
    
    // If user didn't cancel and text is not empty
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        saveTasksToLocalStorage();
        renderTasks();
        console.log(`✏️ Task ${taskId} edited to: ${newText}`);
    }
}

/**
 * DELETE a single task
 */
function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        // Remove task from array
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasksToLocalStorage();
        renderTasks();
        updateStats();
        console.log(`🗑️ Task ${taskId} deleted`);
    }
}

/**
 * CLEAR all completed tasks
 */
function clearCompleted() {
    const completedCount = tasks.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        alert('No completed tasks to clear');
        return;
    }
    
    if (confirm(`Clear ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasksToLocalStorage();
        renderTasks();
        updateStats();
        console.log(`✅ Cleared ${completedCount} completed tasks`);
    }
}

/**
 * CLEAR all tasks
 */
function clearAll() {
    if (tasks.length === 0) {
        alert('No tasks to clear');
        return;
    }
    
    if (confirm(`Delete all ${tasks.length} tasks? This cannot be undone!`)) {
        tasks = [];
        localStorage.removeItem('todoTasks');
        renderTasks();
        updateStats();
        console.log('🗑️ All tasks deleted');
    }
}

// ============================================
// UPDATE STATS - Show counts
// ============================================

/**
 * UPDATE the stat counters
 */
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    
    totalCount.textContent = total;
    activeCount.textContent = active;
    completedCount.textContent = completed;
}
