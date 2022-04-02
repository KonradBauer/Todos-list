{
  const tasks = [
    {
      content: "zjeść obiad",
      done: true,
    },
    {
      content: "zrobić listę zadań",
      done: false,
    },
  ];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;

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
        <li
            class="tasks__item${task.done ? " tasks__item--done" : ""}"
        </li>    
            <button class="js-done button"></button>  
            ${task.content}
            <button class="js-remove button--remove">🗑️</button>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskContent = document.querySelector(".js-input").value.trim();

    if (newTaskContent === "") {
      return;
    };

    addNewTask(newTaskContent);
  };

  const init = () => {

    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}