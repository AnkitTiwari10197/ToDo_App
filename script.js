let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const taskCounter = document.getElementById("task-counter");
const btnDisplay = document.getElementById("btn");

function showNotification(text){
    alert(text);
}


function addTask(task){
    if (task){
        tasks.push(task);
        renderList();
        showNotification("Task added successfully");
        return;
    }

    showNotification("Task cannot be added")
}



function handleInputKeyPress(event){
    if (event.key === "Enter"){
        const text = event.target.value;

        if (!text){
            showNotification("Text cannot be empty");
            return;
        }
        const task = {
            text,
            id: Date.now().toString(),
            completed: false
        }
    
        event.target.value = "";
        addTask(task);
        return;

    }
}



function deleteTask(taskId){
    const newTask = tasks.filter(function(task){
        return task.id !== taskId;

    })

    tasks = newTask;
    renderList();
    showNotification("Task Deleted Successfully")

}

function toggleTask(taskId){
    const task = tasks.filter(function(task){
        return task.id === taskId;
    })

    if (task.length>0){
        const currentTask = task[0];
        currentTask.completed = !currentTask.completed;
        renderList();
        showNotification("Task Toggled Successfully");
        return;
    }

    showNotification("Couldn't toggle the task");
}


function renderList(){
    taskList.innerHTML = " ";
    for (let i=0; i<tasks.length; i++){
        addTaskToDom(tasks[i]);
    }
    taskCounter.innerHTML = tasks.length;
}

function addTaskToDom(task){
    const li = document.createElement("li");
    li.innerHTML = ` <div class = "box1"> <input type = "checkbox" id = "${task.id}" ${task.completed ? "checked" : " "}
    class = "custom-checkbox" />
    <label for = "${task.id}" class="displaymsg"> ${task.text} </label>
    </div>
    <div class="box2">
    <img src = "./Images/trash-solid.svg" class = "delete" data-id= "${task.id}"/>
    </div>
    
    `;

    taskList.append(li);
}

function handleClickListener(e){
    const target = e.target;
    if (target.className === "custom-checkbox"){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    } else if(target.className === "delete"){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
}

// Adding the Task using Add Button

btnDisplay.addEventListener('click', handleClick);
    function handleClick(e){
        const msg = this.innerText;
        console.log(msg);
        if (msg === "Add"){
            const text = addTaskInput.value;
            if (!text){
                showNotification("Task cannot be empty");
                return;
            }
            const task = {
                text,
                id: Date.now().toString(),
                completed: false
            }
        
            addTaskInput.value = "";
            addTask(task);
            return;
        }
    }

 
function initializeApp(){
    addTaskInput.addEventListener("keyup", handleInputKeyPress);
    document.addEventListener('click', handleClickListener);
}

initializeApp();

