export default function pause(interval){
    interval == undefined ? interval = 0 : interval;
    const btnPlay = document.getElementById("play");
    const counter = document.getElementById("counter");

    btnPlay.classList.remove("active");
    btnPlay.title = "Tocar";
    setTimeout(()=>{counter.textContent = '--'}, interval);

    clearInterval(window.timer);
    clearInterval(window.cron);
};