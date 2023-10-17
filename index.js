import {customSize, customRanges, getDateOrTimeByStep, startAnimation} from './components.js'
let index = 0;
const mainList = document.getElementById("main-list");
const mainListContainer = document.getElementById('main-list-container');


let options = {};
function setCustomOptions(value) {
    options = Object.assign(options, value);
};
setCustomOptions(customRanges.day);
setCustomOptions(customSize.size3x6);


let indexChild = 0;
let watchStart, watchEnd, listCount;

let result = getDateOrTimeByStep(0, options.timeRange);
mainList.querySelector('.selected').id = `${result[0]}`;
mainList.querySelector('.selected').textContent = `${result[options.formatCount]}`;

const range = document.createRange();
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting || listCount <= 0) {
            return;
        } else if (entry.target === watchStart) {
            scrollUp();

        } else if (entry.target === watchEnd) {
            scrollDown();
        }
    });
});
function addItemsToEnd() {
    const fragment = document.createDocumentFragment();

    let i = 1;
    let startTime = new Date(+mainList.querySelector('li:last-child').id);
    while (i <= options.afterCount) {
        let result = getDateOrTimeByStep(options.timeStep, options.timeRange, startTime);
        const item = document.createElement("li");
        item.textContent = `${result[options.formatCount]}`;
        item.id = `${result[0]}`;
        fragment.appendChild(item);
        startTime = new Date(result[0]);
        i++;
    }
    mainList.append(fragment);
}

function addItemAfter() {
    const fragment = document.createDocumentFragment();
    const item = document.createElement("li");
    let startTime = new Date(+mainList.querySelector('li:last-child').id);
    let result = getDateOrTimeByStep(options.timeStep, options.timeRange, startTime);
    item.textContent = `${result[options.formatCount]}`;
    item.id = `${result[0]}`;
    fragment.appendChild(item);
    mainList.append(fragment);
}

function addItemsToStart() {
    const fragment = document.createDocumentFragment();

    let i = 1;
    let startTime = new Date(+mainList.querySelector('li:first-child').id);
    while (i <= options.beforeCount + 2) {
        const item = document.createElement("li");
        item.classList.add("before");
        let result = getDateOrTimeByStep(-options.timeStep, options.timeRange, startTime);
        item.textContent = `${result[options.formatCount]}`;
        item.id = `${result[0]}`;
        startTime = new Date(result[0]);
        fragment.prepend(item);
        i++;
    }
    mainList.prepend(fragment);
}

function addItemBefore() {
    const fragment = document.createDocumentFragment();
    const item = document.createElement("li");
    let startTime = new Date(+mainList.querySelector('li:first-child').id);
    let result = getDateOrTimeByStep(-options.timeStep, options.timeRange, startTime);
    item.classList.add("before");
    item.textContent = `${result[options.formatCount]}`;
    item.id = `${result[0]}`;
    fragment.prepend(item);
    mainList.prepend(fragment);
    index++;
}

function updateSelect() {
    if (mainList.querySelectorAll('li').length > 1) {
        sliceList();
        updateSelect();
    } else {
        addItemsToStart();
        addItemsToEnd();
        mainList.querySelector('.selected').scrollIntoView();
        watchStart = mainList.firstChild;
        watchEnd = mainList.lastChild;
        observer.observe(watchStart);
        observer.observe(watchEnd);
        listCount = 50;
    }
}

startAnimation(updateSelect);
// updateSelect();

function scrollUp() {
    addItemBefore();
    watchStart = mainList.firstChild;
    observer.observe(watchStart);
    listCount--;
}

function scrollDown() {
    addItemAfter();
    watchEnd = mainList.lastChild;
    observer.observe(watchEnd);
    listCount--;
}

function openSelect() {
    if (mainList.children[indexChild - options.beforeCount]) {
        mainList.children[indexChild - options.beforeCount].scrollIntoView();
    }
    mainListContainer.classList.replace('default-size', options.size);
}
function closeSelect() {
    if (mainList.children[indexChild - options.beforeCount]) {
        mainList.children[indexChild - options.beforeCount].scrollIntoView();
    }
    mainListContainer.classList.replace(options.size, 'default-size');
}

mainList.addEventListener('click', (e) => {
    const parent = e.target.parentNode;
    indexChild = Array.prototype.indexOf.call(parent.children, e.target);
    if (mainListContainer.classList.contains('default-size')) {
        startAnimation(openSelect);
    } else {
        mainList.querySelector('.selected').classList.remove('selected');
        e.target.classList.add('selected');
        startAnimation(closeSelect);
        e.target.classList.remove("before");
        startAnimation(updateSelect);
    }
})

function sliceList() {
    listCount = 50;
    range.setStartBefore(mainList.firstChild);
    range.setEndBefore(mainList.querySelector('.selected'));
    range.deleteContents();
    range.setStartAfter(mainList.querySelector('.selected'));
    range.setEndAfter(mainList.lastChild);
    range.deleteContents();
}