# 📝 Complete To-Do List App - Step by Step Guide

## Overview
You'll create a fully functional to-do list app with 3 files. Each file is provided in full below with explanations.

---

## STEP 1: Create `todo-index.html`

### What it does:
- Creates the structure and layout for your to-do app
- Includes input field, buttons, and task list container

### Where to create it:
Create a new file in your repository called `todo-index.html`

### The Complete HTML Code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📝 To-Do List App</title>
    <link rel="stylesheet" href="todo-styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>📝 My To-Do List</h1>
            <p class="subtitle">Stay organized and productive</p>
        </header>

        <main>
            <!-- INPUT SECTION: User types task here -->
            <div class="input-section">
                <div class="input-group">
                    <input 
                        type="text" 
                        id="todoInput" 
                        placeholder="Add a new task..." 
                        class="todo-input"
                    >
                    <button id="addBtn" class="add-btn">Add Task</button>
                </div>

                <!-- FILTER BUTTONS: Filter tasks by status -->
                <div class="filter-buttons">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="active">Active</button>
                    <button class="filter-btn" data-filter="completed">Completed</button>
                </div>
            </div>

            <!-- STATS SECTION: Show counts -->
            <div class="stats">
                <div class="stat">
                    <span class="stat-label">Total:</span>
                    <span class="stat-value" id="totalCount">0</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Active:</span>
                    <span class="stat-value" id="activeCount">0</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Completed:</span>
                    <span class="stat-value" id="completedCount">0</span>
                </div>
            </div>

            <!-- TASKS LIST: Where tasks appear -->
            <div class="tasks-container">
                <ul id="todoList" class="todo-list"></ul>
                <div id="emptyState" class="empty-state">
                    <p>✨ No tasks yet. Add one to get started!</p>
                </div>
            </div>

            <!-- ACTION BUTTONS: Delete/Clear functions -->
            <div class="action-buttons">
                <button id="clearCompletedBtn" class="action-btn secondary">Clear Completed</button>
                <button id="clearAllBtn" class="action-btn danger">Clear All</button>
            </div>
        </main>

        <footer>
            <p>💾 Your tasks are automatically saved</p>
        </footer>
    </div>

    <!-- Link to JavaScript files -->
    <script src="todo-app.js"></script>
</body>
</html>
```

### Key Elements Explained:
- `id="todoInput"` - Text input where user types tasks
- `id="addBtn"` - Button to add task
- `class="filter-btn"` - Buttons to filter tasks
- `id="todoList"` - Container where tasks will appear
- `id="totalCount", id="activeCount", id="completedCount"` - Display stats

---

## STEP 2: Create `todo-styles.css`

### What it does:
- Styles the entire app with colors, layout, and responsive design

### Where to create it:
Create a new file in your repository called `todo-styles.css`

### The Complete CSS Code:

```css
/* RESET & BASICS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

/* CONTAINER */
.container {
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    width: 100%;
    overflow: hidden;
}

/* HEADER */
header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 40px 30px;
    text-align: center;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
}

/* MAIN CONTENT */
main {
    padding: 30px;
}

/* INPUT SECTION */
.input-section {
    margin-bottom: 30px;
}

.input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}

.todo-input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s;
}

.todo-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.add-btn {
    padding: 12px 24px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.add-btn:hover {
    background: #5568d3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.add-btn:active {
    transform: translateY(0);
}

/* FILTER BUTTONS */
.filter-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.filter-btn {
    padding: 8px 16px;
    background: #f0f0f0;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.3s;
}

.filter-btn:hover {
    border-color: #667eea;
    color: #667eea;
}

.filter-btn.active {
    background: #667eea;
    border-color: #667eea;
    color: white;
}

/* STATS SECTION */
.stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-bottom: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
}

.stat {
    text-align: center;
}

.stat-label {
    display: block;
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 5px;
}

.stat-value {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: #667eea;
}

/* TASKS CONTAINER */
.tasks-container {
    min-height: 200px;
    margin-bottom: 20px;
}

.todo-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

/* EMPTY STATE */
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #999;
    font-size: 1.1rem;
}

/* TASK ITEM */
.todo-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #667eea;
    transition: all 0.3s;
}

.todo-item:hover {
    background: #f0f0f0;
    transform: translateX(4px);
}

.todo-item.completed {
    opacity: 0.6;
    border-left-color: #27ae60;
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
    color: #999;
}

/* CHECKBOX */
.todo-checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: #667eea;
}

/* TODO TEXT */
.todo-text {
    flex: 1;
    font-size: 1rem;
    color: #333;
    word-break: break-word;
}

/* ACTION ICONS */
.todo-actions {
    display: flex;
    gap: 8px;
}

.icon-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s;
    border-radius: 4px;
}

.icon-btn:hover {
    background: rgba(102, 126, 234, 0.1);
}

.edit-btn:hover {
    color: #3498db;
}

.delete-btn:hover {
    color: #e74c3c;
}

/* ACTION BUTTONS */
.action-buttons {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    margin-bottom: 20px;
}

.action-btn {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.action-btn.secondary {
    background: #f0f0f0;
    color: #333;
    border: 2px solid #e0e0e0;
}

.action-btn.secondary:hover {
    background: #e0e0e0;
}

.action-btn.danger {
    background: #e74c3c;
    color: white;
}

.action-btn.danger:hover {
    background: #c0392b;
}

/* FOOTER */
footer {
    background: #f8f9fa;
    text-align: center;
    padding: 20px;
    color: #999;
    font-size: 0.9rem;
    border-top: 1px solid #e0e0e0;
}

/* RESPONSIVE */
@media (max-width: 600px) {
    header h1 {
        font-size: 2rem;
    }

    main {
        padding: 20px;
    }

    .stats {
        grid-template-columns: 1fr;
    }

    .action-buttons {
        flex-direction: column;
    }

    .action-btn {
        width: 100%;
    }
}
```

### Key Styling Sections:
- **Header** - Purple gradient background
- **Input Group** - Text input + Add button
- **Filter Buttons** - Active state styling
- **Stats** - Grid layout showing counts
- **Todo Items** - List item styling with hover effects
- **Completed Tasks** - Strikethrough styling

---

## STEP 3: Create `todo-app.js`

### What it does:
- Handles all the app logic
- Saves tasks to local storage
- Loads tasks when page opens
- Handles add, edit, delete, complete functions

### Where to create it:
Create a new file in your repository called `todo-app.js`

### The Complete JavaScript Code:

```javascript
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
```

### Key JavaScript Sections Explained:

**1. LOCAL STORAGE FUNCTIONS:**
- `saveTasksToLocalStorage()` - Converts tasks to JSON and saves
- `loadTasksFromLocalStorage()` - Loads tasks from JSON on page load

**2. ADD TASK:**
- Creates task object with unique ID
- Adds to tasks array
- Saves to localStorage
- Re-renders list

**3. RENDER TASKS:**
- Filters tasks based on current filter (All/Active/Completed)
- Creates HTML for each task
- Adds event listeners to each task

**4. TASK ACTIONS:**
- `toggleComplete()` - Mark task done/undone
- `editTask()` - Edit task text
- `deleteTask()` - Delete single task
- `clearCompleted()` - Delete all completed tasks
- `clearAll()` - Delete all tasks

**5. UPDATE STATS:**
- Counts total, active, and completed tasks
- Updates display numbers

---

## HOW TO SET UP

### Step 1: Create Files
1. Go to https://github.com/mdcowan79/Biblical-Discernment-System
2. Click "Add file" → "Create new file"
3. Name it `todo-index.html` and paste the HTML code above
4. Click "Commit"

### Step 2: Create Styles File
1. Click "Add file" → "Create new file"
2. Name it `todo-styles.css` and paste the CSS code above
3. Click "Commit"

### Step 3: Create JavaScript File
1. Click "Add file" → "Create new file"
2. Name it `todo-app.js` and paste the JavaScript code above
3. Click "Commit"

### Step 4: Test It
Open in browser: `https://mdcowan79.github.io/Biblical-Discernment-System/todo-index.html`

---

## HOW IT WORKS

### Local Storage Explained:
```javascript
// SAVE to local storage
localStorage.setItem('todoTasks', JSON.stringify(tasks));

// LOAD from local storage
const loadedTasks = JSON.parse(localStorage.getItem('todoTasks'));
```

**What happens:**
1. User adds a task
2. Task gets added to `tasks` array in memory
3. `saveTasksToLocalStorage()` converts array to JSON string
4. JSON string is saved to browser's local storage
5. When user refreshes page, `loadTasksFromLocalStorage()` runs
6. Tasks are restored from local storage automatically

### Features:
✅ Add tasks
✅ Edit tasks (click pencil icon)
✅ Delete tasks (click trash icon)
✅ Mark complete (check checkbox)
✅ Filter tasks (All/Active/Completed)
✅ Clear completed tasks
✅ Auto-save to local storage
✅ Persists on page refresh
✅ Stats tracking

---

## TESTING CHECKLIST

- [ ] Add a task - verify it appears in the list
- [ ] Refresh page - verify task is still there (local storage works!)
- [ ] Edit a task - click pencil icon
- [ ] Mark complete - click checkbox, verify strikethrough
- [ ] Delete a task - click trash icon
- [ ] Filter by "Active" - only incomplete tasks show
- [ ] Filter by "Completed" - only completed tasks show
- [ ] Clear Completed - removes all completed tasks
- [ ] Check stats - counts update correctly
- [ ] Close browser tab and reopen - tasks still there!

---

Done! Your to-do list app is complete with full local storage functionality.
