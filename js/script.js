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

        const setTaskDoneButtons = document.querySelectorAll(".js-doneAllButton");
        setTaskDoneButtons.forEach((setTaskDoneButton, index) => {
            setTaskDoneButton.addEventListener("click", () => {
                setTasksDone(index);
            });
        });

        const setHideDoneTasksButtons = document.querySelectorAll(".js-hideDoneTasks");
        setHideDoneTasksButtons.forEach((setHideDoneTasksButton, index) => {
            setHideDoneTasksButton.addEventListener("click", () => {
                toggleTasks(index);
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

        const buttonSetDoneAll = document.querySelector(".js-doneAllButton");
        
        if (tasks.length !== 0) {
            buttonSetDoneAll.innerHTML = `<button class="setDoneButton"${tasks.every(({ done }) => done) === true ? "disabled" : ""}>Ukończ wszystkie</button>`;
        } else {
            if (tasks.length === 0) {
                buttonSetDoneAll.innerHTML = "";
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