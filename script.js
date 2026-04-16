// script.js - Complete Age Calculator with Zodiac, Fun Facts, Countdown & Share

(function() {
  // DOM elements
  const birthDateInput = document.getElementById('birthdate');
  const calculateBtn = document.getElementById('calculateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const errorMsgDiv = document.getElementById('errorMsg');
  const resultPanel = document.getElementById('resultPanel');
  const shareBtn = document.getElementById('shareBtn');

  // result fields
  const yearsSpan = document.getElementById('yearsCount');
  const monthsSpan = document.getElementById('monthsCount');
  const daysSpan = document.getElementById('daysCount');
  const totalMonthsSpan = document.getElementById('totalMonths');
  const totalWeeksDaysSpan = document.getElementById('totalWeeksDays');
  const nextBirthdaySpan = document.getElementById('nextBirthday');
  const ageSecondsSpan = document.getElementById('ageSeconds');
  const zodiacSignSpan = document.getElementById('zodiacSign');
  const funFactSpan = document.getElementById('funFactText');

  // Helper: validate date
  function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }

  // get today at midnight UTC normalization (for accurate diff)
  function getTodayUTC() {
    const today = new Date();
    return new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  }

  // precise age calculation in years, months, days
  function calculateExactAge(birthDate) {
    const today = getTodayUTC();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonthDate.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months, days };
  }

  // total months lived
  function getTotalMonths(birthDate, today) {
    return (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
  }

  // total weeks and remaining days
  function getTotalWeeksAndDays(birthDate, today) {
    const diffTime = today - birthDate;
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;
    return `${weeks} weeks, ${remDays} days`;
  }

  // next birthday countdown (days, months)
  function getNextBirthdayCountdown(birthDate, today) {
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
      nextBirthday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
    }
    const diffTime = nextBirthday - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (daysLeft === 0) return "🎉 Today! Happy Birthday! 🎉";
    if (daysLeft === 1) return "1 day";
    return `${daysLeft} days`;
  }

  // age in seconds (approximate up to second precision)
  function getAgeInSeconds(birthDate, today) {
    const diffMs = today - birthDate;
    return Math.floor(diffMs / 1000).toLocaleString();
  }

  // Zodiac sign based on month and day
  function getZodiacSign(month, day) {
    if ((month === 0 && day >= 20) || (month === 1 && day <= 18)) return "♒ Aquarius";
    if ((month === 1 && day >= 19) || (month === 2 && day <= 20)) return "♓ Pisces";
    if ((month === 2 && day >= 21) || (month === 3 && day <= 19)) return "♈ Aries";
    if ((month === 3 && day >= 20) || (month === 4 && day <= 20)) return "♉ Taurus";
    if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) return "♊ Gemini";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 22)) return "♋ Cancer";
    if ((month === 6 && day >= 23) || (month === 7 && day <= 22)) return "♌ Leo";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "♍ Virgo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "♎ Libra";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 21)) return "♏ Scorpio";
    if ((month === 10 && day >= 22) || (month === 11 && day <= 21)) return "♐ Sagittarius";
    return "♑ Capricorn";
  }

  // generate fun fact based on birth year
  function getFunFact(year) {
    const facts = [
      `✨ The year ${year}, a classic film "The Wizard of Oz" (1939) wasn't out yet — but tech was evolving!`,
      `📺 The first TV broadcast started around ${Math.max(1927, year-5)}–${year} era.`,
      `🎵 The top song in ${year}? Many classics were born!`,
      `🚀 In ${year}, space exploration was still a dream; now we've reached Mars.`,
      `💡 Fun: ${year} was ${(year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 'a leap year' : 'not a leap year'}.`,
      `📖 People born in ${year} share birth year with many innovators.`,
      `🌍 The world population in ${year} was around ${Math.floor(2.5 + (year - 1900) * 0.07)} billion.`
    ];
    const specialFact = (year % 100 === 0) ? `🎉 ${year} was a century year! Special celebrations globally.` : 
                        (year === 1969) ? `🚀 Moon landing year! 🌕` : 
                        (year === 2000) ? `📅 Millennium baby! Y2K era.` : null;
    if (specialFact) return specialFact;
    return facts[year % facts.length];
  }

  // clear error & hide previous results
  function clearErrors() {
    errorMsgDiv.innerText = '';
  }

  function showError(message) {
    errorMsgDiv.innerText = message;
    resultPanel.classList.add('hidden');
  }

  // main age calculation & UI update
  function computeAndDisplay() {
    clearErrors();
    const rawDate = birthDateInput.value;
    if (!rawDate) {
      showError("❌ Please select your birth date.");
      return;
    }

    const birthDateObj = new Date(rawDate);
    if (!isValidDate(birthDateObj)) {
      showError("⚠️ Invalid date format.");
      return;
    }

    const today = getTodayUTC();
    // set birth date to UTC midnight for consistency
    const birthUTC = new Date(Date.UTC(birthDateObj.getFullYear(), birthDateObj.getMonth(), birthDateObj.getDate()));
    
    // Validation: cannot be in future
    if (birthUTC > today) {
      showError("🔮 Birth date cannot be in the future! Please enter a valid date.");
      return;
    }
    // Validation: cannot be before year 1900
    if (birthUTC.getFullYear() < 1900) {
      showError("📜 Please enter a date after year 1900 (historical records limited).");
      return;
    }

    // calculate exact age (years, months, days)
    const { years, months, days } = calculateExactAge(birthUTC);
    
    // total months
    const totalMonthsVal = getTotalMonths(birthUTC, today);
    // weeks & days
    const weeksDaysStr = getTotalWeeksAndDays(birthUTC, today);
    // next birthday countdown
    const nextBdayStr = getNextBirthdayCountdown(birthUTC, today);
    // seconds lived
    const secondsLived = getAgeInSeconds(birthUTC, today);
    // zodiac sign
    const zodiac = getZodiacSign(birthUTC.getMonth(), birthUTC.getDate());
    // fun fact
    const fact = getFunFact(birthUTC.getFullYear());

    // update DOM
    yearsSpan.innerText = years;
    monthsSpan.innerText = months;
    daysSpan.innerText = days;
    totalMonthsSpan.innerText = `${totalMonthsVal} months`;
    totalWeeksDaysSpan.innerText = weeksDaysStr;
    nextBirthdaySpan.innerText = nextBdayStr;
    ageSecondsSpan.innerText = `${secondsLived} sec`;
    zodiacSignSpan.innerText = zodiac;
    funFactSpan.innerText = fact;

    // show panel with animation (re-trigger if already visible)
    resultPanel.classList.remove('hidden');
    // optional: store last calculation in localStorage (bonus)
    try {
      const lastCalc = {
        birthDate: rawDate,
        timestamp: Date.now(),
        ageSummary: `${years} years, ${months} months, ${days} days`
      };
      localStorage.setItem('ageCalculator_lastResult', JSON.stringify(lastCalc));
    } catch(e) { /* silent */ }
  }

  // Reset / Clear functionality
  function resetAll() {
    birthDateInput.value = '';
    clearErrors();
    resultPanel.classList.add('hidden');
    // optionally clear localStorage for this session? we keep last but not needed.
    // focus on input
    birthDateInput.focus();
  }

  // Share results using Web Share API (fallback clipboard)
  async function shareResults() {
    if (resultPanel.classList.contains('hidden')) {
      alert("✨ Calculate age first, then share your results!");
      return;
    }
    const yearsVal = yearsSpan.innerText;
    const monthsVal = monthsSpan.innerText;
    const daysVal = daysSpan.innerText;
    const zodiacVal = zodiacSignSpan.innerText;
    const totalMonthsValSpan = totalMonthsSpan.innerText;
    
    const shareText = `🎂 My exact age: ${yearsVal} years, ${monthsVal} months, ${daysVal} days. ${totalMonthsValSpan} total. ${zodiacVal} ✨ Calculated with Age Weaver!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Age Weaver Result',
          text: shareText,
        });
      } catch (err) {
        if (err.name !== 'AbortError') copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert("📋 Results copied to clipboard! Share anywhere.");
    }).catch(() => {
      alert("✅ Could not auto-copy, but you can manually share.");
    });
  }

  // Edge case: leap year, month length handled in calculateExactAge function
  // additionally, handle empty input, future dates already validated

  // Optional: add localStorage load of previous calculation if available (bonus: show last calc on page load)
  function loadLastCalculationIfAvailable() {
    try {
      const stored = localStorage.getItem('ageCalculator_lastResult');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.birthDate && new Date(parsed.birthDate) <= getTodayUTC() && new Date(parsed.birthDate).getFullYear() >= 1900) {
          birthDateInput.value = parsed.birthDate;
          computeAndDisplay(); // auto display previous result
        }
      }
    } catch(e) {}
  }

  // Event listeners
  calculateBtn.addEventListener('click', computeAndDisplay);
  resetBtn.addEventListener('click', resetAll);
  if (shareBtn) shareBtn.addEventListener('click', shareResults);
  
  // additional keyboard support: pressing Enter on input triggers calculation
  birthDateInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      computeAndDisplay();
    }
  });

  // initial load: if there's any last good calculation, show it (nice UX)
  loadLastCalculationIfAvailable();

  // manually hide error if user starts typing
  birthDateInput.addEventListener('focus', () => {
    clearErrors();
  });
})();