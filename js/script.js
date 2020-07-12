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

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

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
    }

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li
            ${task.done ? " class=\"task-done\"" : ""} >
            <button class="js-done">zrobione?</button>
            <button class="js-remove">Usuń</button>
                ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasksList").innerHTML = htmlString;
        bindEvents();
    }

    const clearAndGetFocusOnInputField = (inputField) => {
        inputField.value = "";
        inputField.focus();
    }

    const onFormSubmit = () => {
        event.preventDefault();

        const taskInput = document.querySelector(".js-taskInput")
        const taskContent = taskInput.value.trim();
        if (taskContent === "") {
            return;
        }

        addNewTask(taskContent);
        clearAndGetFocusOnInputField(taskInput);
    }

    const init = () => {
        render();
        document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
    };

    init();
}