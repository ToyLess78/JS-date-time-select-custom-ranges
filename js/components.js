export {
    customSize,
    customRanges,
    getDateOrTimeByStep,
    renderOptimize,
    renderRangesSelect,
    renderSizesSelect}

// Exported reused functions:
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