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

    const addNewTask = (taskContent) => {
        tasks.push({
            content: taskContent
        });
        render();
    }

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li
            ${task.done ? " class=\"task-done\"" : ""} >
            <button class="js-remove">Usuń</button>
                ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasksList").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-remove");
        console.log(removeButtons);

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
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