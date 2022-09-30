export default function pause(){
    const btn_play = document.getElementById("play");
    const counter = document.getElementById("counter");

    btn_play.classList.remove("active");
    btn_play.title = "Tocar";
    counter.textContent = '--';

    clearInterval(window.timer);
    clearInterval(window.cron);
};