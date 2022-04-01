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

    const render = () => {

        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li>
            ${task.content}
        </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString.trim();
    };

    const init = () => {
        render();
    };

    init();
}