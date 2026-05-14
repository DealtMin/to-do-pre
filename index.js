let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

items = loadTasks();
items.forEach(function(item) {
	createItem(item);
})

formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    
    createItem(inputElement.value);
    items = getTasksFromDOM();
    saveTasks(items);
    
    inputElement.value = '';
});


function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return [...JSON.parse(savedTasks)].reverse();
    } else {
      return items;
    }
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");
	editButton.addEventListener('click', function(event) {
        event.preventDefault();
        const index = items.indexOf(textElement.textContent);
        textElement.contentEditable = 'true';
        textElement.focus();
        textElement.addEventListener('blur', function(event) {
            event.preventDefault();
            textElement.contentEditable = 'false';
            items[index] = textElement.textContent;
            saveTasks(items);
        })
    })

    deleteButton.addEventListener('click', function(event) {
        event.preventDefault();
        items.splice(items.indexOf(textElement.textContent), 1);
        clone.remove();
        saveTasks(items);
    })

    duplicateButton.addEventListener('click', function(event) {
        event.preventDefault();
        createItem(textElement.textContent);
    })

    textElement.textContent = item;
    document.querySelector(".to-do__list").prepend(clone);
    items = getTasksFromDOM();
    saveTasks(items);
}

function getTasksFromDOM() {
    const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
    const tasks = [];
    itemsNamesElements.forEach(function(item) {
        tasks.push(item.textContent);
    })
    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if (tasks.length === 0)
        localStorage.removeItem('tasks');
}

