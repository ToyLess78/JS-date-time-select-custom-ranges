/*
Introduction:
JavaScript program that manipulates and interacts with a list of elements in a web page. It uses various event listeners and functions to handle user interactions and update the list dynamically. Below is a detailed documentation of the code*/

import {
    customSize,
    customRanges,
    getDateOrTimeByStep,
    renderOptimize,
    renderRangesSelect,
    renderSizesSelect
} from './components.js';

// HTML DOM Variables:
const mainList = document.getElementById("main-list"),
    mainListContainer = document.getElementById('main-list-container'),
    rangesListContainer = document.getElementById('ranges-list-container'),
    sizesListContainer = document.getElementById('sizes-list-container'),
    customRangesSelect = document.getElementById('custom-ranges'),
    customSizesSelect = document.getElementById('custom-sizes'),
    spanSelect = document.getElementById('span-select'),
    spanRange = document.getElementById('span-range'),
    spanSize = document.getElementById('span-size'),
    output = document.getElementById('output'),
    countInput = document.getElementById('list-count');

// JS Variables:
/*
containersArray: An array containing references to the containers for ranges, sizes, and the main list.
watchStart, watchEnd: Variables for tracking the start and end elements in the list.
listCount: Tracks the current count of items in the list.
result: Stores the result of a function call.
indexChild: Stores the index of the selected item in the list.
options: An object used to store various options.
index: A counter variable.
*/

const containersArray = [rangesListContainer, sizesListContainer, mainListContainer];

let watchStart, watchEnd, listCount, result, indexChild = 0, options = {}, index = 0;

// Default settings:
/*Sets default options for custom ranges and sizes.*/
setCustomOptions(customRanges.day);
setCustomOptions(customSize.size3x6);

// Default render:
/*Renders select elements and optimizes rendering for better performance.*/
renderSizesSelect(customSizesSelect, options);
renderRangesSelect(customRangesSelect, options);
renderOptimize(preventSelectRender);
renderOptimize(updateSelect);

// Implementation Range and IntersectionObserver:

/*Creates a range object for manipulating the document's content.*/
const range = document.createRange();

/*Initializes an IntersectionObserver to monitor elements' visibility.*/
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

// Configuring Event Listeners:
/*These event listeners respond to user interactions with the custom sizes and ranges select elements, as well as the main list.*/
customSizesSelect.addEventListener('click', (e) => {
    if (sizesListContainer.classList.contains('default-size')) {
        unusedClose();
        renderOptimize(openSizes);
    } else {
        customSizesSelect.querySelector('.selected').classList.remove('selected');
        e.target.classList.add('selected');
        if (e.target.dataset.size) {
            renderOptimize(closeSizes);
            setCustomOptions(customSize[e.target.dataset.size]);
            renderOptimize(updateSelect);
        }
    }
})
customRangesSelect.addEventListener('click', (e) => {
    if (rangesListContainer.classList.contains('default-size')) {
        unusedClose();
        renderOptimize(openRanges);
    } else {
        customRangesSelect.querySelector('.selected').classList.remove('selected');
        e.target.classList.add('selected');

        if (e.target.dataset.value) {
            renderOptimize(closeRanges);
            setCustomOptions(customRanges[e.target.dataset.value]);
            renderOptimize(preventSelectRender);
            renderOptimize(updateSelect);
        }
    }
})
mainList.addEventListener('click', (e) => {
    const parent = e.target.parentNode;
    indexChild = Array.prototype.indexOf.call(parent.children, e.target);
    if (mainListContainer.classList.contains('default-size')) {
        unusedClose();
        renderOptimize(openSelect);
    } else {
        output.textContent = e.target.textContent;
        mainList.querySelector('.selected').classList.remove('selected');
        e.target.classList.add('selected');
        renderOptimize(closeSelect);
        e.target.classList.remove("before");
        renderOptimize(updateSelect);
    }
})

// Dependent Function Block:
/*This block contains various functions used by the event listeners and other parts of the program.*/

// Closes containers that are not currently in use
function unusedClose() {
    containersArray.forEach((el, index) => {
        if (!el.classList.contains('default-size')) {
            switchClose(index)
        }
    })
}

// Closes a specific container based on the provided index
function switchClose(x) {
    switch (x) {
        case 0:
            renderOptimize(closeRanges);
            break;
        case 1:
            renderOptimize(closeSizes);
            break;
        case 2:
            renderOptimize(closeSelect);
            renderOptimize(updateSelect);
            break;
        default:
            console.log('No value found');
    }
}

// Sets custom options based on the provided value
function setCustomOptions(value) {
    options = Object.assign(options, value);
}

// Renders and updates the select element
function preventSelectRender() {
    result = getDateOrTimeByStep(0, options.timeRange)
    mainList.querySelector('.selected').id = `${result[0]}`;
    mainList.querySelector('.selected').textContent = `${result[options.formatCount]}`;
    output.textContent = `${result[options.formatCount]}`;
}

// Adds block of items to the end of the list
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

// Adds 1 item after the last child of the list
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

// Adds block of items to the start of the list
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

// Adds 1 item before the first child of the list
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

// Updates the select element based on the current list state
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
        listCount = countInput.value;
    }
}

// Scrolls up in the list
function scrollUp() {
    addItemBefore();
    watchStart = mainList.firstChild;
    observer.observe(watchStart);
    listCount--;
}

// Scrolls down in the list
function scrollDown() {
    addItemAfter();
    watchEnd = mainList.lastChild;
    observer.observe(watchEnd);
    listCount--;
}

// Opens the select element.
function openSelect() {
    if (mainList.children[indexChild - options.beforeCount]) {
        mainList.children[indexChild - options.beforeCount].scrollIntoView();
    }
    listCount = countInput.value;
    mainListContainer.classList.replace('default-size', options.size);
    spanSelect.classList.add(options.size);
}

// Opens the ranges list container
function openRanges() {
    const count = customRangesSelect.querySelectorAll('.before').length;
    const classCount = 'custom-ranges-' + count;
    rangesListContainer.classList.replace('default-size', classCount);
    spanRange.classList.add(classCount);
}

// Opens the sizes list container
function openSizes() {
    const count = customSizesSelect.querySelectorAll('.before').length;
    const classCount = 'custom-sizes-' + count;
    sizesListContainer.classList.replace('default-size', classCount);
    spanSize.classList.add(classCount);
}

// Closes the select element
function closeSelect() {
    if (mainList.children[indexChild - options.beforeCount]) {
        mainList.children[indexChild - options.beforeCount].scrollIntoView();
    }
    mainListContainer.classList.replace(options.size, 'default-size');
    spanSelect.classList.remove(options.size);
}

// loses the ranges list container
function closeRanges() {
    rangesListContainer.className = 'default-size list-container';
    spanRange.className = '';
    let reverse = false;
    customRangesSelect.querySelectorAll('li').forEach(el => {
        !reverse ? el.classList.add('before') : el.classList.remove('before');
        if (el.classList.contains('selected')) {
            reverse = true;
            el.classList.remove('before');
        }
    });
    (function scrollEl() {
        if (rangesListContainer.classList.contains('default-size')) {
            customRangesSelect.querySelector('.selected').scrollIntoView();
        } else {
            scrollEl();
        }
    })();
}

// Closes the sizes list container
function closeSizes() {
    sizesListContainer.className = 'default-size list-container';
    spanSize.className = '';
    let reverse = false;
    customSizesSelect.querySelectorAll('li').forEach(el => {
        !reverse ? el.classList.add('before') : el.classList.remove('before');
        if (el.classList.contains('selected')) {
            reverse = true;
            el.classList.remove('before');
        }
    });
    (function scrollEl() {
        if (sizesListContainer.classList.contains('default-size')) {
            customSizesSelect.querySelector('.selected').scrollIntoView();
        } else {
            scrollEl();
        }
    })()
}

// Slices the list based on the selected item
function sliceList() {
    listCount = countInput.value;
    range.setStartBefore(mainList.firstChild);
    range.setEndBefore(mainList.querySelector('.selected'));
    range.deleteContents();
    range.setStartAfter(mainList.querySelector('.selected'));
    range.setEndAfter(mainList.lastChild);
    range.deleteContents();
}

/* Conclusion:

* This code provides a detailed set of functionalities for manipulating and interacting with a list in a web page. It utilizes event listeners and functions to handle user interactions and dynamically update the list. The provided documentation gives an overview of the code's structure, variables, functions, and their purposes.*/
