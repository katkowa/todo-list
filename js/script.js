{
    const tasks = [
        {
            content: "Obejrzeć lekcję",
            done: false,
        },
        {
            content: "zjeść kolację",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li
            ${task.done ? " class=\"task-done\"" : ""} >
                ${task.content}
            </li>
            `; 
        }

        document.querySelector(".js-tasksList").innerHTML = htmlString;
    }

    const addNewTask = (taskContent) => {
        tasks.push({
            content: taskContent
        });
        render();
    }

    const onFormSubmit = () => {
        event.preventDefault();

        const taskContent = document.querySelector(".js-taskInput").value.trim();
        if (taskContent === "") {
            return;
        }

        addNewTask(taskContent);
    }

    const init = () => {
        render();
        document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
    };

    init();
}