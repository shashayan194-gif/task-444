let tasks = [];
let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let resetBtn = document.getElementById("resetBtn");
let taskList = document.getElementById("taskList");
let emptyMsg = document.getElementById("emptyMsg");

addBtn.addEventListener("click", addTask);
resetBtn.addEventListener("click", resetAll);

input.addEventListener("keypress", function(e){
  if(e.key === "Enter") addTask();
});

function addTask(){
  let value = input.value.trim();
  if(value === ""){
    alert("Pehle koi kaam likhen!");
    return;
  }
  tasks.push({text: value, done: false});
  input.value = "";
  showTasks();
}

function showTasks(){
  taskList.innerHTML = "";
  if(tasks.length === 0){
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    if(task.done) li.classList.add("done");
    li.innerHTML = `
      <div class="task-left">
        <div class="num">${index + 1}</div>
        <span class="task-text">${task.text}</span>
      </div>
      <div class="btn-group">
        <button class="doneBtn" onclick="toggleDone(${index})">✓ Done</button>
        <button class="editBtn" onclick="editTask(${index})">✏️ Edit</button>
        <button class="delBtn" onclick="deleteTask(${index})">🗑️ Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  let done = tasks.filter(t => t.done).length;
  document.getElementById("totalCount").innerText = tasks.length;
  document.getElementById("doneCount").innerText = done;
  document.getElementById("pendingCount").innerText = tasks.length - done;
}

function editTask(index){
  let newText = prompt("Task edit karen:", tasks[index].text);
  if(newText !== null && newText.trim() !== ""){
    tasks[index].text = newText.trim();
    showTasks();
  }
}

function deleteTask(index){
  tasks.splice(index, 1);
  showTasks();
}

function toggleDone(index){
  tasks[index].done = !tasks[index].done;
  showTasks();
}

function resetAll(){
  if(tasks.length === 0){
    alert("List pehle se hi khaali hai!");
    return;
  }
  if(confirm("Kya aap saari list saaf karna chahte hain?")){
    tasks = [];
    showTasks();
  }
}

showTasks();