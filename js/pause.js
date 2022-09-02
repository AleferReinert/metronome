export default function pause(timer){
    let btn = document.getElementById("play");

    btn.classList.remove("active");
    btn.title = "Tocar";

    clearInterval(timer);
};