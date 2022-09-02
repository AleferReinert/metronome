export default function volume(){

    // Altera o texto do volume conforme o range muda
    function text(element, text){
        if(element.value == 0){
            text.textContent = "muted";
        } else if(element.value == 1){
            text.textContent = "max";
        } else {
            text.textContent = element.value;
        }
    }

    // Volume 1 (tempos)
    let range_1  = document.getElementById("range-1"),
        volume_1 = document.getElementById("volume-1");

    range_1.addEventListener("input", () => {
        for(let i = 1; i <=12; i++){
            document.getElementById(`beat-${i}`).volume = range_1.value;
        }
        text(range_1, volume_1);
    });


    // Volume 2 (contratempos)
    let range_2  = document.getElementById("range-2"),
        volume_2 = document.getElementById("volume-2");

    range_2.addEventListener("input", () => {
        for(let i = 1; i <=12; i++){
            let e = document.getElementById(`beat-${i}-middle`);
            e.muted = false;
            e.volume = range_2.value;
        }
        text(range_2, volume_2);
    });

    // Volume 3 (segunda nota da tercina)
    let range_3  = document.getElementById("range-3"),
        volume_3 = document.getElementById("volume-3");

    range_3.addEventListener("input", () => {
        for(let i = 1; i <=12; i++){
            let e = document.getElementById(`beat-${i}-triplet-2`);
            e.muted = false;
            e.volume = range_3.value;
        }
        text(range_3, volume_3);
    });

    // Volume 4 (terceira nota da tercina)
    let range_4  = document.getElementById("range-4"),
        volume_4 = document.getElementById("volume-4");

        range_4.addEventListener("input", () => {
        for(let i = 1; i <=12; i++){
            let e = document.getElementById(`beat-${i}-triplet-3`);
            e.muted = false;
            e.volume = range_4.value;
        }
        text(range_4, volume_4);
    });
};