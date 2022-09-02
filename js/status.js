export default function status(){
    // Play Button
    let btn = document.getElementById("play");

    if(btn.classList.contains("active")){
        btn.classList.remove("active");
        
        return false;
    } else {
        btn.classList.add("active");
        return true;
    }
};