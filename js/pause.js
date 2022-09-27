export default function pause(timer){
    const btn = document.getElementById("play");
    const count = document.getElementById("count");

    btn.classList.remove("active");
    btn.title = "Tocar";
    count.textContent = '--';

    clearInterval(timer);
};