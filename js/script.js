{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {
        content: newTaskContent,
      },
    ];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1)
    ];

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map(task => {
      return {
        ...task,
        done: !tasks[taskIndex].done,
      }
    });
    console.log(tasks);
    render();
  };

  bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const render = () => {

    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="task">    
          <button class="js-done button ">${task.done ? "✓" : ""}</button>  
          <span class="task${task.done ? " task--done" : ""}">${task.content}</span>
          <button class="js-remove button--remove">🗑️</button>
        </li>  
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const formEvents = () => {
    const focusInput = document.querySelector(".js-input").focus();
    const resetForm = document.querySelector(".form").reset();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskContent = document.querySelector(".js-input").value.trim();

    if (newTaskContent === "") {
      return;
    };

    addNewTask(newTaskContent);
    formEvents();
  };

  const init = () => {

    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}