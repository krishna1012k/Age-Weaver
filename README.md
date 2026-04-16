# Age Weaver - Precision Age Calculator

A beautiful, feature-rich age calculator web application that calculates exact age in years, months, days, and much more. Built with vanilla HTML, CSS, and JavaScript.

## Features

### Core Functionality
- **Exact Age Calculation** - Years, months, and days with leap year awareness
- **Date Validation** - Prevents future dates and dates before 1900
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Modern UI** - Glass-morphism design with smooth animations

### Detailed Metrics
- Total months lived
- Total weeks and days
- Countdown to next birthday
- Age in seconds (for fun!)

### Bonus Features
- **Zodiac Sign** - Automatically displays zodiac sign based on birth date
- **Fun Facts** - Interesting fact about the birth year
- **Share Results** - Share age calculation via Web Share API or clipboard
- **Local Storage** - Remembers last calculation on page reload
- **Keyboard Support** - Press Enter to calculate

## Technologies Used

- **HTML5** - Semantic markup, responsive meta tags
- **CSS3** - Flexbox, Grid, animations, glass-morphism, media queries
- **JavaScript (ES6+)** - Vanilla JS, no frameworks or libraries

## Installation

1. Download all three files:
   - `index.html`
   - `style.css`
   - `script.js`

2. Place them in the same folder/directory

3. Open `index.html` in any modern web browser

## File Structure

```
age-calculator/
├── index.html      # Main HTML structure
├── style.css       # All styling and animations
├── script.js       # JavaScript logic and calculations
└── README.md       # This file
```

## Usage

1. **Select Birth Date** - Click the date picker and choose your birth date
2. **Calculate** - Click the "Calculate Age" button or press Enter
3. **View Results** - See detailed age breakdown including:
   - Years, months, days
   - Total months
   - Weeks and days
   - Next birthday countdown
   - Age in seconds
   - Zodiac sign
   - Fun fact about your birth year
4. **Share** - Click the share icon (📤) to share results
5. **Clear** - Use the "Clear" button to reset and start over

## Edge Cases Handled

- ✅ Leap years (February 29 birthdays)
- ✅ Different month lengths (30, 31, 28/29 days)
- ✅ Future dates (blocked with error message)
- ✅ Dates before 1900 (blocked)
- ✅ Empty input validation
- ✅ Invalid date formats

## Browser Compatibility

Compatible with all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Responsive Breakpoints

- **Desktop** (> 580px) - Full layout with side-by-side elements
- **Tablet** (420px - 580px) - Adjusted spacing and font sizes
- **Mobile** (< 420px) - Stacked layout, larger touch targets

## Customization

### Colors
The color scheme can be modified in `style.css`:
- Background gradient: Lines 8-10
- Card background: Line 27
- Primary button gradient: Lines 133-134

### Date Range
To change the minimum year (currently 1900), edit line 112 in `script.js`:
```javascript
if (birthUTC.getFullYear() < 1900) { // Change 1900 to desired year
```

### Fun Facts
Add or modify fun facts in the `getFunFact()` function in `script.js` (around line 121).

## Known Limitations

- The age in seconds is approximate (based on day boundaries, not exact milliseconds)
- Requires JavaScript to be enabled in the browser
- Local storage is limited to ~5-10MB (standard browser limit)

## Future Enhancements Ideas

- Dark mode toggle
- Export results as image
- Compare ages between multiple people
- Historical events on birth date
- Timezone-aware precise age calculation

## License

Free to use for personal and commercial projects.


**Enjoy calculating your precise age journey! 🎂✨**
