export {customSize, customRanges, getDateOrTimeByStep, startAnimation}

function startAnimation(animate) {
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
const customSize = {
    size3x6:  {
        beforeCount: 3,
        afterCount: 6,
        size: 'size3x6',
    },
    size3x3:  {
        beforeCount: 3,
        afterCount: 3,
        size: 'size3x3',
    },
    size0x6:  {
        beforeCount: 0,
        afterCount: 6,
        size: 'size0x6',
    }
};

const customRanges = {
    minutes7:  {
        timeRange: 'minutes',
        timeStep: 7,
        formatCount: 3,
    },
    hour:{
        timeRange: 'hours',
        timeStep: 1,
        formatCount: 3,
    },
    hours6:  {
        timeRange: 'hours',
        timeStep: 6,
        formatCount: 3,
    },
    day:  {
        timeRange: 'days',
        timeStep: 1,
        formatCount: 1,
    },
    days3:  {
        timeRange: 'days',
        timeStep: 3,
        formatCount: 1,
    },
    week:  {
        timeRange: 'weeks',
        timeStep: 1,
        formatCount: 2,
    },
    weeks3:  {
        timeRange: 'weeks',
        timeStep: 3,
        formatCount: 2,
    },
    month:  {
        timeRange: 'months',
        timeStep: 1,
        formatCount: 2,
    },
    months2:  {
        timeRange: 'months',
        timeStep: 2,
        formatCount: 2,
    },
    months6:  {
        timeRange: 'months',
        timeStep: 6,
        formatCount: 2,
    }
};
// Date and Time

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
const dateFormat = new Intl.DateTimeFormat("en-gb", {"timeZone": "Europe/Kyiv", "day": "numeric", "month": "long"});

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
    return [result.getTime(), dateFormat.format(result), dateFormatLong.format(result), timeFormat.format(result)];
}