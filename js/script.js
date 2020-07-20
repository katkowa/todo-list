{
    let tasks = [];
    let isDoneHide = false;

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
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const renderTasksList = () => {
        let tasksListElementContent = "";

        for (const task of tasks) {
            tasksListElementContent += `
            <li
            class=\"tasksList__item${isDoneHide && task.done ? " tasksList__item--hidden\"" : "\""}\">
                <button class="tasksList__button tasksList__button--toggleDone js-done">
                    ${task.done ? "✔" : ""}
                </button>
                <span class="tasksList__taskContent${task.done ? " tasksList__taskContent--done\"" : "\""}">
                    ${task.content}
                </span>
                <button class="tasksList__button tasksList__button--remove js-remove">🗑</button>
            </li>
            `;
        }

        document.querySelector(".js-tasksList").innerHTML = tasksListElementContent;
    }

    const renderButtons = () => {
        if (tasks.length > 0) {
            document.querySelector(".js-buttons").innerHTML = `
            <button class="section__button js-hideDoneTasksButton">
                ${isDoneHide ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="section__button js-toggleAllDoneButton"${tasks.every(({ done }) => done === true) ? " disabled" : ""}>
                Ukończ wszystkie
            </button>
            `;
        }
    }

    const bindButtonsEvents = () => {
        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasksButton");
        if (hideDoneTasksButton) {
            hideDoneTasksButton.addEventListener("click", () => {
                isDoneHide = !isDoneHide;
                render();
            });
        }

        const toggleAllTasksDoneButton = document.querySelector(".js-toggleAllDoneButton");
        if (toggleAllTasksDoneButton) {
            toggleAllTasksDoneButton.addEventListener("click", () => {
                tasks = tasks.map(task => ({ ...task, done: true }));
                render();
            });
        }
    }

    const bindTaskItemsEvents = () => {
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
        bindTaskItemsEvents();

        renderButtons();
        bindButtonsEvents();
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