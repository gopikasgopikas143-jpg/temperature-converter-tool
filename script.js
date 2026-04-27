
    const input    = document.getElementById('tempInput');
    const errorEl  = document.getElementById('errorMsg');
    const resultBox = document.getElementById('resultBox');
    const resultVal = document.getElementById('resultValue');
    const resultUnitEl = document.getElementById('resultUnit');

    function getUnit() {
      return document.querySelector('input[name="unit"]:checked').value;
    }

    function convert() {
      const raw = input.value.trim();

      if (raw === '' || isNaN(Number(raw))) {
        input.classList.add('error');
        errorEl.style.display = 'block';
        resultBox.style.display = 'none';
        input.addEventListener('animationend', () => input.classList.remove('error'), {once:true});
        return;
      }

      errorEl.style.display = 'none';
      input.classList.remove('error');

      const val  = parseFloat(raw);
      const unit = getUnit();
      let results = [];

      if (unit === 'C') {
        results = [
          { v: (val * 9/5 + 32).toFixed(2), u: '°F', label: 'Fahrenheit' },
          { v: (val + 273.15).toFixed(2),   u: 'K',  label: 'Kelvin' }
        ];
      } else if (unit === 'F') {
        results = [
          { v: ((val - 32) * 5/9).toFixed(2),         u: '°C', label: 'Celsius' },
          { v: ((val - 32) * 5/9 + 273.15).toFixed(2), u: 'K',  label: 'Kelvin' }
        ];
      } else {
        results = [
          { v: (val - 273.15).toFixed(2),              u: '°C', label: 'Celsius' },
          { v: ((val - 273.15) * 9/5 + 32).toFixed(2), u: '°F', label: 'Fahrenheit' }
        ];
      }

      const unitNames = { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' };
      resultVal.textContent = `${results[0].v} ${results[0].u}`;
      resultUnitEl.innerHTML = `
        <strong>${val} ${unitNames[unit]}</strong> converted to:<br>
        ${results[0].v} ${results[0].label} &nbsp;|&nbsp; ${results[1].v} ${results[1].label}
      `;

      resultBox.style.display = 'block';
      resultBox.style.animation = 'none';
      void resultBox.offsetWidth;
      resultBox.style.animation = '';
    }

    input.addEventListener('keydown', e => { if (e.key === 'Enter') convert(); });
  