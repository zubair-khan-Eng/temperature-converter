/* ========================================================
   Temperature Converter — Logic
   ======================================================== */

(function () {
  'use strict';

  // ── DOM refs ──────────────────────────────────────────
  const celsiusInput    = document.getElementById('celsius');
  const fahrenheitInput = document.getElementById('fahrenheit');
  const kelvinInput     = document.getElementById('kelvin');
  const btnReset        = document.getElementById('btn-reset');

  const groupCelsius    = document.getElementById('group-celsius');
  const groupFahrenheit = document.getElementById('group-fahrenheit');
  const groupKelvin     = document.getElementById('group-kelvin');
  const allGroups       = [groupCelsius, groupFahrenheit, groupKelvin];

  // formula elements
  const formulaCF = document.getElementById('formula-cf');
  const formulaFC = document.getElementById('formula-fc');
  const formulaCK = document.getElementById('formula-ck');
  const formulaKC = document.getElementById('formula-kc');
  const formulaFK = document.getElementById('formula-fk');
  const formulaKF = document.getElementById('formula-kf');
  const allFormulas = [formulaCF, formulaFC, formulaCK, formulaKC, formulaFK, formulaKF];

  // ── Helpers ───────────────────────────────────────────
  function round(value, decimals) {
    if (decimals === undefined) decimals = 4;
    var factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }

  /** Add a flash animation to an input to signal it was updated */
  function flashInput(inputEl) {
    inputEl.classList.remove('flash');
    // force reflow so the animation restarts
    void inputEl.offsetWidth;
    inputEl.classList.add('flash');
  }

  /** Mark the active input group */
  function setActiveGroup(activeGroup) {
    allGroups.forEach(function (g) {
      g.classList.remove('input-group--active');
    });
    if (activeGroup) {
      activeGroup.classList.add('input-group--active');
    }
  }

  /** Highlight the formulas used in the conversion */
  function highlightFormulas(ids) {
    allFormulas.forEach(function (f) {
      f.classList.remove('formula--active');
    });
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.classList.add('formula--active');
    });
  }

  // ── Conversion functions ──────────────────────────────
  function celsiusToFahrenheit(c) {
    return (c * 9 / 5) + 32;
  }

  function celsiusToKelvin(c) {
    return c + 273.15;
  }

  function fahrenheitToCelsius(f) {
    return (f - 32) * 5 / 9;
  }

  function fahrenheitToKelvin(f) {
    return (f - 32) * 5 / 9 + 273.15;
  }

  function kelvinToCelsius(k) {
    return k - 273.15;
  }

  function kelvinToFahrenheit(k) {
    return (k - 273.15) * 9 / 5 + 32;
  }

  // ── Event Handlers ────────────────────────────────────
  celsiusInput.addEventListener('input', function () {
    var val = celsiusInput.value;
    setActiveGroup(groupCelsius);

    if (val === '' || val === '-') {
      fahrenheitInput.value = '';
      kelvinInput.value = '';
      highlightFormulas([]);
      return;
    }

    var c = parseFloat(val);
    if (isNaN(c)) return;

    fahrenheitInput.value = round(celsiusToFahrenheit(c));
    kelvinInput.value     = round(celsiusToKelvin(c));

    flashInput(fahrenheitInput);
    flashInput(kelvinInput);
    highlightFormulas(['formula-cf', 'formula-ck']);
  });

  fahrenheitInput.addEventListener('input', function () {
    var val = fahrenheitInput.value;
    setActiveGroup(groupFahrenheit);

    if (val === '' || val === '-') {
      celsiusInput.value = '';
      kelvinInput.value  = '';
      highlightFormulas([]);
      return;
    }

    var f = parseFloat(val);
    if (isNaN(f)) return;

    celsiusInput.value = round(fahrenheitToCelsius(f));
    kelvinInput.value  = round(fahrenheitToKelvin(f));

    flashInput(celsiusInput);
    flashInput(kelvinInput);
    highlightFormulas(['formula-fc', 'formula-fk']);
  });

  kelvinInput.addEventListener('input', function () {
    var val = kelvinInput.value;
    setActiveGroup(groupKelvin);

    if (val === '' || val === '-') {
      celsiusInput.value    = '';
      fahrenheitInput.value = '';
      highlightFormulas([]);
      return;
    }

    var k = parseFloat(val);
    if (isNaN(k)) return;

    celsiusInput.value    = round(kelvinToCelsius(k));
    fahrenheitInput.value = round(kelvinToFahrenheit(k));

    flashInput(celsiusInput);
    flashInput(fahrenheitInput);
    highlightFormulas(['formula-kc', 'formula-kf']);
  });

  // ── Focus / Blur for pulse animation ──────────────────
  [celsiusInput, fahrenheitInput, kelvinInput].forEach(function (input) {
    input.addEventListener('focus', function () {
      input.classList.add('pulse');
    });
    input.addEventListener('blur', function () {
      input.classList.remove('pulse');
    });
  });

  // ── Reset ─────────────────────────────────────────────
  btnReset.addEventListener('click', function () {
    celsiusInput.value    = '';
    fahrenheitInput.value = '';
    kelvinInput.value     = '';
    setActiveGroup(null);
    highlightFormulas([]);

    // small visual feedback
    btnReset.style.transform = 'scale(.93)';
    setTimeout(function () {
      btnReset.style.transform = '';
    }, 150);

    celsiusInput.focus();
  });
})();
