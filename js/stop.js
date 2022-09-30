export default function stop(interval){
    interval == undefined ? interval = 10 : interval;

    const btnPlay = document.getElementById("play");
    const counter = document.getElementById("counter");

    btnPlay.classList.remove("active");
    btnPlay.title = "Start";

    setTimeout(()=>{counter.textContent = '--'}, interval);
    clearInterval(window.stepTimeout);
    clearInterval(window.cron);
};