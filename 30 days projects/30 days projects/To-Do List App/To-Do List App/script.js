document.addEventListener("DOMContentLoaded", () => {

  const todoInput = document.getElementById("todoInput"); 
  const addTodoBtn = document.getElementById("addTodo"); 
  const todoList = document.getElementById("todoList"); 
  const todos = JSON.parse(localStorage.getItem("todos")) || [];


  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos)); 
  }

  function renderTodos() {
    todoList.innerHTML = ""; 

  
    todos.forEach((todo, index) => {
      const li = document.createElement("li"); 

   
     li.className =
  "d-flex align-items-center justify-content-between bg-light p-3 rounded shadow-sm";


      li.innerHTML = `
  <div class="d-flex justify-content-between align-items-center w-100">
    <div class="d-flex align-items-center gap-2">
      <input 
        type="checkbox" 
        class="form-check-input"
        ${todo.completed ? "checked" : ""}
      >
      <span class="todo-text ${todo.completed
          ? "text-decoration-line-through text-secondary"
          : "text-dark"
        }">
        ${todo.text}
      </span>
    </div>

    <div class="d-flex gap-2">
      <button class="btn btn-link text-primary p-0 edit-btn">Edit</button>
      <button class="btn btn-link text-danger p-0 delete-btn">Delete</button>
    </div>
  </div>
`;


 
      const checkbox = li.querySelector('input[type="checkbox"]');

      checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked; 
        saveTodos(); 
        renderTodos(); 
      });

   
      const editBtn = li.querySelector(".edit-btn");

 
      editBtn.addEventListener("click", () => {
        const newText = prompt("Edit task:", todo.text); 
        if (newText !== null) {
          todo.text = newText.trim(); 
          saveTodos();
          renderTodos(); 
        }
      });

      
      const deleteBtn = li.querySelector(".delete-btn");

      
      deleteBtn.addEventListener("click", () => {
        todos.splice(index, 1); 
        saveTodos();
        renderTodos(); 
      });

      todoList.appendChild(li);
    });
  }

  addTodoBtn.addEventListener("click", () => {
    const text = todoInput.value.trim(); 
    if (text) {
      todos.push({ text, completed: false }); 
      todoInput.value = ""; 
      saveTodos(); 
      renderTodos(); 
    }
  });


  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodoBtn.click(); 
    }
  });


  renderTodos();
});
