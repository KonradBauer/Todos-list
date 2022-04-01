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

    const render = () => {

        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li
            ${task.done ? " style=\"text-decoration: line-through\"" : ""}
        >
            ${task.content}
        </li >
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString.trim();
    };

    const init = () => {

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-input").value.trim();

            if (newTaskContent === "") {
                return;
            };

            addNewTask(newTaskContent);
        });

    };

    init();
}