const refs = {
    bodyEl: document.querySelector("body"),
    startBtn: document.querySelector("[data-start]"),
    stopBtn: document.querySelector("[data-stop]"),
    resetBtn: document.querySelector("[data-reset]"),
}
let intervalId = null;

refs.startBtn.addEventListener("click", onClickStart)
refs.stopBtn.addEventListener("click", onClickStop)
refs.resetBtn.addEventListener("click", onClickReset)
refs.stopBtn.setAttribute('disabled', true)
refs.resetBtn.setAttribute('disabled', true)


function onClickStart() {
    refs.stopBtn.removeAttribute('disabled', false)
    refs.startBtn.setAttribute('disabled', true)
    refs.resetBtn.setAttribute('disabled', true)
    intervalId = setInterval(() => {
        refs.bodyEl.style.backgroundColor = getRandomHexColor()
    }, 1000);
}

function onClickStop() {
    refs.startBtn.removeAttribute('disabled', false)
    refs.resetBtn.removeAttribute('disabled', false)
    refs.stopBtn.setAttribute('disabled', true)
    clearInterval(intervalId) ;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onClickReset() {
    refs.bodyEl.style.backgroundColor = "transparent";
} 
