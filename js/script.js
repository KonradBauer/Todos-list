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
        tasks = tasks.map((task, index) => {
            if (index === taskIndex) {
                return {
                    ...task,
                    done: !task.done,
                }
            }
            return task;
        });

        render();
    };

    const setTasksDone = () => {
        tasks = tasks.map(task => {
            return {
                ...task,
                done: true,
            }
        });

        render();
    };

    const isEveryTasksDone = () => {
        tasks = tasks.every(({ done }) => done);
        if (isEveryTasksDone === true) {
            return buttonsSetDoneAll.innerHTML = `<button class="js-setDone setDone--off">Ukończ wszystkie</button>`;
        };
        console.log(tasks)
        render();
    };

    const bindEvents = () => {
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

    const bindButtonsEvents = () => {

        const showTaskButtons = document.querySelectorAll(".js-showTasksButtons");
        showTaskButtons.forEach((showTaskButton, index) => {
            showTaskButton.addEventListener("click", () => {
                setTasksDone(index);
            });
        });

    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
    <li class="task">    
      <button class="js-done button ">${task.done ? "✔" : ""}</button>  
      <span class="task${task.done ? " task--done" : ""}">${task.content}</span>
      <button class="js-remove button--remove">🗑️</button>
    </li>  
    `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsSetDoneAll = document.querySelector(".js-setDone");
        if (tasks.length !== 0) {
            buttonsSetDoneAll.innerHTML = `<button class="js-setDone setDone">Ukończ wszystkie</button>`;
        } else {
            if (tasks.length === 0) {
                buttonsSetDoneAll.innerHTML = ""
            }
        }
    };

    const render = () => {

        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvents();
    };

    const formEvents = () => {
        document.querySelector(".js-input").focus();
        document.querySelector(".form").reset();
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