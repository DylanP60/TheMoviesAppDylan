document.getElementById('durationRange').addEventListener('input', function () {
  const duration = this.value;
  if (parseInt(this.value, 10) === 0) {
    document.getElementById('duration').innerHTML = '< 1h';
  } else if (parseInt(this.value, 10) === 4) {
    document.getElementById('duration').innerHTML = '> 4h';
  } else {
    document.getElementById('duration').innerHTML = `${duration}h`;
  }
});
