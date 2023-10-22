# Custom Select README

## Overview


https://github.com/ToyLess78/JS-date-time-select-custom-ranges/assets/121128928/05a3bf37-31f8-4017-8e49-056182d3e60b


This code is an implementation of a custom select menu using HTML, CSS, and Vanilla JavaScript. It provides a user interface for selecting options from predefined ranges and sizes.

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To use this custom select menu, you can follow these steps:

1. Create an HTML file and paste the provided code into it.
2. Save the file with a `.html` extension.
3. Open the HTML file in a web browser.

The custom select menu should now be displayed in your browser.

## Usage

The custom select menu allows users to choose options from predefined ranges and sizes. Here's how to use it:

1. Scroll Length:
   - Use the input field labeled "Scroll length" to set the number of options visible in the select menu at a time. The maximum value is 50, and the minimum is 5.

2. Range Select:
   - Click on the "Range" tab to display a list of predefined ranges. Selecting a range will update the output value.

3. Size Select:
   - Click on the "Size" tab to display a list of predefined sizes. Selecting a size will update the output value.

4. Main Select:
   - Click on the "Select" tab to display the main select menu. Clicking on an option will update the output value.

5. Output:
   - The selected value will be displayed in the header under "Custom Ranges Select Vanilla JS Only Output".

## Configuration

The code provides options for customizing the behavior and appearance of the select menu. These configurations can be found in the JavaScript section of the code. The following objects allow for customization:

### Custom Sizes

- `size3x6`: Before 3, After 6
- `size3x3`: Before 3, After 3
- `size0x6`: Before 0, After 6

### Custom Ranges

- `minutes7`: 7 Minutes
- `hour`: 1 Hour
- `hours6`: 6 Hours
- `day`: 1 Day
- `days3`: 3 Days
- `week`: 1 Week
- `weeks3`: 3 Weeks
- `month`: 1 Month
- `months2`: 2 Months
- `months6`: 6 Months

### Date and Time Formats

The code uses specific date and time formats for display purposes. These formats can be customized by modifying the `dateFormatLong`, `timeFormat`, and `dateFormat` variables.

## Dependencies

This code does not have any external dependencies. It utilizes Vanilla JavaScript for functionality.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Your feedback and contributions are highly appreciated.

## License

This code is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as per the terms of the license.
