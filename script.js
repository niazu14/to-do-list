// Task Manager App JavaScript
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.editingTaskId = null;
        
        this.initializeElements();
        this.bindEvents();
        this.renderTasks();
        this.updateTaskCount();
        this.initializeTheme();
    }

    initializeElements() {
        // Form elements
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskInput');
        this.categorySelect = document.getElementById('categorySelect');
        
        // Filter elements
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.taskCount = document.getElementById('taskCount');
        
        // Task container
        this.tasksContainer = document.getElementById('tasksContainer');
        this.emptyState = document.getElementById('emptyState');
        
        // Theme toggle
        this.themeToggle = document.getElementById('themeToggle');
        
        // Modal elements
        this.editModal = document.getElementById('editModal');
        this.editForm = document.getElementById('editForm');
        this.editTaskInput = document.getElementById('editTaskInput');
        this.editCategorySelect = document.getElementById('editCategorySelect');
        this.closeModal = document.getElementById('closeModal');
        this.cancelEdit = document.getElementById('cancelEdit');
    }

    bindEvents() {
        // Add task form
        this.taskForm.addEventListener('submit', (e) => this.handleAddTask(e));
        
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });
        
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Modal events
        this.closeModal.addEventListener('click', () => this.closeEditModal());
        this.cancelEdit.addEventListener('click', () => this.closeEditModal());
        this.editForm.addEventListener('submit', (e) => this.handleEditTask(e));
        
        // Close modal on outside click
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) {
                this.closeEditModal();
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.editModal.classList.contains('show')) {
                this.closeEditModal();
            }
        });
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    handleAddTask(e) {
        e.preventDefault();
        
        const text = this.taskInput.value.trim();
        const category = this.categorySelect.value;
        
        if (!text) return;
        
        const task = {
            id: Date.now().toString(),
            text: text,
            category: category,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.unshift(task);
        this.saveTasks();
        this.renderTasks();
        this.updateTaskCount();
        
        // Clear form
        this.taskInput.value = '';
        this.categorySelect.value = 'personal';
        this.taskInput.focus();
        
        // Show success animation
        this.showTaskAddedAnimation();
    }

    handleEditTask(e) {
        e.preventDefault();
        
        const text = this.editTaskInput.value.trim();
        const category = this.editCategorySelect.value;
        
        if (!text) return;
        
        const taskIndex = this.tasks.findIndex(task => task.id === this.editingTaskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].text = text;
            this.tasks[taskIndex].category = category;
            this.tasks[taskIndex].updatedAt = new Date().toISOString();
            
            this.saveTasks();
            this.renderTasks();
            this.closeEditModal();
        }
    }

    handleFilter(e) {
        const filter = e.target.dataset.filter;
        this.currentFilter = filter;
        
        // Update active filter button
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        this.renderTasks();
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            this.saveTasks();
            this.renderTasks();
            this.updateTaskCount();
        }
    }

    editTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            this.editingTaskId = taskId;
            this.editTaskInput.value = task.text;
            this.editCategorySelect.value = task.category;
            this.editModal.classList.add('show');
            this.editTaskInput.focus();
        }
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.saveTasks();
            this.renderTasks();
            this.updateTaskCount();
        }
    }

    closeEditModal() {
        this.editModal.classList.remove('show');
        this.editingTaskId = null;
        this.editForm.reset();
    }

    getFilteredTasks() {
        if (this.currentFilter === 'all') {
            return this.tasks;
        }
        return this.tasks.filter(task => task.category === this.currentFilter);
    }

    renderTasks() {
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            this.tasksContainer.innerHTML = '';
            this.emptyState.style.display = 'block';
            return;
        }
        
        this.emptyState.style.display = 'none';
        
        this.tasksContainer.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
        
        // Bind task events
        this.bindTaskEvents();
    }

    createTaskHTML(task) {
        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" data-action="toggle">
                    ${task.completed ? '<i class="fas fa-check"></i>' : ''}
                </div>
                <div class="task-content">
                    <div class="task-text ${task.completed ? 'completed' : ''}">${this.escapeHtml(task.text)}</div>
                    <div class="task-category ${task.category}">${task.category}</div>
                </div>
                <div class="task-actions">
                    <button class="action-btn edit-btn" data-action="edit" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-action="delete" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    bindTaskEvents() {
        const taskItems = document.querySelectorAll('.task-item');
        
        taskItems.forEach(item => {
            const taskId = item.dataset.taskId;
            const actionButtons = item.querySelectorAll('[data-action]');
            
            actionButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const action = btn.dataset.action;
                    
                    switch (action) {
                        case 'toggle':
                            this.toggleTaskCompletion(taskId);
                            break;
                        case 'edit':
                            this.editTask(taskId);
                            break;
                        case 'delete':
                            this.deleteTask(taskId);
                            break;
                    }
                });
            });
            
            // Toggle completion on task item click
            item.addEventListener('click', (e) => {
                if (!e.target.closest('[data-action]')) {
                    this.toggleTaskCompletion(taskId);
                }
            });
        });
    }

    updateTaskCount() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        
        let countText = '';
        if (this.currentFilter === 'all') {
            countText = `${totalTasks} task${totalTasks !== 1 ? 's' : ''}`;
            if (completedTasks > 0) {
                countText += ` (${completedTasks} completed, ${pendingTasks} pending)`;
            }
        } else {
            const filteredTasks = this.getFilteredTasks();
            const filteredCompleted = filteredTasks.filter(task => task.completed).length;
            const filteredPending = filteredTasks.length - filteredCompleted;
            
            countText = `${filteredTasks.length} ${this.currentFilter} task${filteredTasks.length !== 1 ? 's' : ''}`;
            if (filteredCompleted > 0) {
                countText += ` (${filteredCompleted} completed, ${filteredPending} pending)`;
            }
        }
        
        this.taskCount.textContent = countText;
    }

    showTaskAddedAnimation() {
        // Add a subtle animation when a task is added
        const taskItems = document.querySelectorAll('.task-item');
        if (taskItems.length > 0) {
            const firstTask = taskItems[0];
            firstTask.style.transform = 'scale(1.05)';
            firstTask.style.boxShadow = '0 10px 25px -5px rgba(99, 102, 241, 0.3)';
            
            setTimeout(() => {
                firstTask.style.transform = '';
                firstTask.style.boxShadow = '';
            }, 300);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});

// Add some utility functions for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to add task
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const taskInput = document.getElementById('taskInput');
        if (document.activeElement === taskInput) {
            document.getElementById('taskForm').dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('editModal');
        if (modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    }
});

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added here for offline functionality
        console.log('Task Manager App loaded successfully!');
    });
}
