

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');


function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please Enter a Task !");
        return;
    }

    
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

 
const deleteBtn = document.createElement('button');
deleteBtn.classList.add('deleteBtn');
deleteBtn.innerHTML = '<i class="fas fa-times"></i>'; 
deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    saveTasks();
});


    taskItem.appendChild(deleteBtn);

    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        saveTasks();
    });

    taskList.appendChild(taskItem);

    taskInput.value = '';

    saveTasks();
}


addTaskBtn.addEventListener('click', addTask);


taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});


function saveTasks() {
    const tasks = [];
    taskList.childNodes.forEach(taskItem => {
        tasks.push({
            text: taskItem.firstChild.textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.text;

        if (task.completed) {
            taskItem.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(deleteBtn);

        taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        taskList.appendChild(taskItem);
    });
}

window.addEventListener('load', loadTasks);
