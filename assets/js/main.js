const btnStart = document.querySelector('.controls__play');
const btnReset = document.querySelector('.controls__reset');
const display = document.querySelector('.display');
const progress = document.querySelector('.progress')
const audio = document.querySelector('.audio');
const setTimePomo = 60 * 25 - 1;
const setTimeBreak = 60 * 5;
const setTimeLongBreak = 60 * 15;
let progressHeight = 0;
let pomo = 0;
let setnterval;

function reset() {
  display.textContent = '25:00';
  progress.style.Height = 0;
  progressHeight = 0;
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

    progress.style.height = (progressHeight * 100) / setTimePomo + '%';
    ++progressHeight;

    if (--timer < 0) {
      pomo++
      console.log('Pomo: ' + pomo)
      clearInterval(setnterval);

      if (pomo === 4) {
        audio.play();
        audio.play();
        return timerLongBreak();
      }

      audio.play();
      audio.play();
      return timerBreak();
    }
  }, 1000);
}

function timerBreak() {
  let timer = setTimeBreak;

  progressHeight = timer; 
  setnterval = setInterval(function() {
    timerConfig(timer);

    progress.style.height = ((progressHeight * 100) / setTimeBreak) + '%';
    progressHeight--;

    if (--timer < 0) {
      clearInterval(setnterval);
      audio.play();
      audio.play();
      return timerPomo();
    }
  }, 1000);
}

function timerLongBreak() {
  let timer = setTimeLongBreak;

  progressHeight = timer; 
  setnterval = setInterval(function() {
    timerConfig(timer);

    progress.style.height = (progressHeight * 100) / setTimeLongBreak + '%';
    progressHeight--;

    if (--timer < 0) {
      clearInterval(setnterval);
      audio.play();
      audio.play();
      reset()
    }
  }, 1000);
}

function startTimer() {
  timerPomo()
}

btnStart.addEventListener('click', function(){
  clearInterval(setnterval);
  reset();
  startTimer();
});

btnReset.addEventListener('click', function(){
  clearInterval(setnterval);
  reset();
});