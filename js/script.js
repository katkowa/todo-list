{
    let tasks = [];

    const addNewTask = (taskContent) => {
        tasks = [
            ...tasks, 
            { content: taskContent }
        ];
        render();
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {...tasks[taskIndex], done:!tasks[taskIndex].done},
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const renderTasksList = () => {
        let tasksListElementContent = "";
        for (const task of tasks) {
            tasksListElementContent += `
            <li
            class=\"tasksList__item\">
                <button class="tasksList__button tasksList__button--toggleDone js-done">
                    ${task.done ? "✔" : ""}
                </button>
                <span class="tasksList__taskContent${task.done ? " tasksList__taskContent--done\"" : "\""}">
                    ${task.content}
                </span>
                <button class="tasksList__button tasksList__button--remove js-remove"></button>
            </li>
            `;
        }

        document.querySelector(".js-tasksList").innerHTML = tasksListElementContent;
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
        renderTasksList();
        bindEvents();
    }

    const onFormSubmit = () => {
        event.preventDefault();

        const taskInput = document.querySelector(".js-taskInput")
        const taskContent = taskInput.value.trim();

        if (taskContent !== "") {
            addNewTask(taskContent);
            taskInput.value = "";
        }

        taskInput.focus();
    }

    const init = () => {
        render();
        document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
    };

    init();
}