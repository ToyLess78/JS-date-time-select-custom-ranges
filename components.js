/*
Overview
This code exports a set of functions and objects related to date and time manipulation. It includes functions for rendering selectable options for date ranges and sizes, as well as functions for date and time formatting.
*/
export {
    customSize,
    customRanges,
    getDateOrTimeByStep,
    renderOptimize,
    renderRangesSelect,
    renderSizesSelect}

// Exported reused functions:

/*
Description: This function provides an optimized rendering mechanism for animations by utilizing the requestAnimationFrame API.
Parameters:
animate: A function that contains the animation logic to be executed.
 */
function renderOptimize(animate) {
    let start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;

        if (progress < 500) {
            animate();
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

/*
Description: Renders a list of selectable date ranges.
Parameters:
customRangesSelect: The DOM element to which the ranges will be appended.
options: An object containing information about the selected option.
 */
function renderRangesSelect(customRangesSelect, options) {
    const rangesFragment = document.createDocumentFragment();
    let i = 1;
    Object.values(customRanges).forEach(el => {
        const item = document.createElement("li");
        if (i > 0 && el.value !== options.value) {
            item.classList.add('before');
        } else if (el.value === options.value) {
            item.classList.add('selected');
            i = 0;
        }
        item.textContent = el.textContent;
        item.dataset.value = el.value;
        rangesFragment.appendChild(item);
    })
    customRangesSelect.append(rangesFragment);
    customRangesSelect.querySelector('.selected').scrollIntoView();
}

/*
Description: Renders a list of selectable sizes.
Parameters:
customSizesSelect: The DOM element to which the sizes will be appended.
options: An object containing information about the selected option.
 */
function renderSizesSelect(customSizesSelect, options) {
    const fragment = document.createDocumentFragment();
    let i = 1;
    Object.values(customSize).forEach(el => {
        const item = document.createElement("li");
        if (i > 0 && el.size !== options.size) {
            item.classList.add('before');
        } else if (el.size === options.size) {
            item.classList.add('selected');
            i = 0;
        }
        item.textContent = el.textContent;
        item.dataset.size = el.size;
        fragment.appendChild(item);
    })
    customSizesSelect.append(fragment);
    customSizesSelect.querySelector('.selected').scrollIntoView();
}

// Default settings objects:

/*
Description: An object containing predefined size options with associated properties (e.g., beforeCount, afterCount, size, textContent).
 */
const customSize = {
    size3x6:  {
        beforeCount: 3,
        afterCount: 6,
        size: 'size3x6',
        textContent: 'Before 3, After 6',
    },
    size3x3:  {
        beforeCount: 3,
        afterCount: 3,
        size: 'size3x3',
        textContent: 'Before 3, After 3',
    },
    size0x6:  {
        beforeCount: 0,
        afterCount: 6,
        size: 'size0x6',
        textContent: 'Before 0, After 6',
    }
};

/*
Description: An object containing predefined date range options with associated properties (e.g., timeRange, timeStep, formatCount, textContent, value).
 */
const customRanges = {
    minutes7:  {
        timeRange: 'minutes',
        timeStep: 7,
        formatCount: 3,
        textContent: '7 Minutes',
        value: 'minutes7',
    },
    hour:{
        timeRange: 'hours',
        timeStep: 1,
        formatCount: 3,
        textContent: '1 Hour',
        value: 'hour',
    },
    hours6:  {
        timeRange: 'hours',
        timeStep: 6,
        formatCount: 3,
        textContent: '6 Hours',
        value: 'hours6',
    },
    day:  {
        timeRange: 'days',
        timeStep: 1,
        formatCount: 1,
        textContent: '1 Day',
        value: 'day',
    },
    days3:  {
        timeRange: 'days',
        timeStep: 3,
        formatCount: 1,
        textContent: '3 Days',
        value: 'days3',
    },
    week:  {
        timeRange: 'weeks',
        timeStep: 1,
        formatCount: 2,
        textContent: '1 Week',
        value: 'week',
    },
    weeks3:  {
        timeRange: 'weeks',
        timeStep: 3,
        formatCount: 2,
        textContent: '3 Weeks',
        value: 'weeks3',
    },
    month:  {
        timeRange: 'months',
        timeStep: 1,
        formatCount: 2,
        textContent: '1 Month',
        value: 'month',
    },
    months2:  {
        timeRange: 'months',
        timeStep: 2,
        formatCount: 2,
        textContent: '2 Months',
        value: 'months2',
    },
    months6:  {
        timeRange: 'months',
        timeStep: 6,
        formatCount: 2,
        textContent: '6 Months',
        value: 'months6',
    }
};


// Date and Time settings for Vanilla JS:

/* Date and Time Formatting
The code also defines several formatting objects for date and time:

dateFormatLong: A long date format.
timeFormat: A format for displaying time.
dateFormat: A format for displaying dates.*/
const dateFormatLong = new Intl.DateTimeFormat("en-gb", {
    "timeZone": "Europe/Kyiv",
    "day": "numeric",
    "month": "short",
    "year": "numeric"
});
const timeFormat = new Intl.DateTimeFormat("en-gb", {
    "timeZone": "Europe/Kyiv",
    "hour12": false,
    "hour": "numeric",
    "minute": "numeric",
    "day": "numeric",
    "month": "short"
});
const dateFormat = new Intl.DateTimeFormat("en-gb",
    {"timeZone": "Europe/Kyiv",
        "day": "numeric",
        "month": "long"});


/*
Description: Calculates a new date or time based on a specified step and type (e.g., days, weeks, months, hours, minutes).
Parameters:
step: The amount by which the date or time will be adjusted.
dateType: The type of adjustment (e.g., 'days', 'weeks', 'months', 'hours', 'minutes').
result (optional): The starting date or time. Defaults to the current date and time.
 */
function getDateOrTimeByStep(step, dateType, result = new Date()) {
    switch (dateType) {
        case 'days':
            result.setDate(result.getDate() + step);
            break;
        case 'weeks':
            result.setDate(result.getDate() + (7 * step));
            break;
        case 'months':
            result.setMonth(result.getMonth() + step);
            break;
        case 'hours':
            result.setHours(result.getHours() + step);
            break;
        case 'minutes':
            result.setMinutes(result.getMinutes() + step);
            break;
    }
    return [
        result.getTime(),
        dateFormat.format(result),
        dateFormatLong.format(result),
        timeFormat.format(result)
    ];
}
