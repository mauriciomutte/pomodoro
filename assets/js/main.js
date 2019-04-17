const btnStart = document.querySelector('.controls__play');
const btnReset = document.querySelector('.controls__reset');
const display = document.querySelector('.display');
const setTimePomo = 60 * 25 - 1;
const setTimeBreak = 60 * 5;
const setTimeLongBreak = 60 * 15;
let pomo = 0;

function reset() {
  display.textContent = '25:00';
  document.title = 'Pomodoro';
}

function timerConfig(timer) {
  minutes = parseInt(timer / 60, 10)
  seconds = parseInt(timer % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  display.textContent = minutes + ":" + seconds;
  document.title = minutes + ":" + seconds + ' | Pomodoro';
}

function timerPomo() {
  let timer = setTimePomo;

  setnterval = setInterval(function() {
    timerConfig(timer);

    if (timer-- < 0) {
      pomo++
      console.log('Pomo: ' + pomo)
      clearInterval(setnterval);

      if (pomo === 1) {
        return timerLongBreak();
      }

      return timerBreak();
    }
  }, 1000);
}

function timerBreak() {
  let timer = setTimeBreak;

  setnterval = setInterval(function() {
    timerConfig(timer);

    if (--timer < 0) {
      clearInterval(setnterval);
      return timerPomo();
    }
  }, 1000);
}

function timerLongBreak() {
  let timer = setTimeLongBreak;

  setnterval = setInterval(function() {
    timerConfig(timer);

    if (--timer < 0) {
      clearInterval(setnterval);
      reset()
    }
  }, 1000);
}

function startTimer() {
  timerPomo()
  
}

btnStart.addEventListener('click', function(){
  startTimer();
});

btnReset.addEventListener('click', function(){
  clearInterval(setnterval);
  reset();
});