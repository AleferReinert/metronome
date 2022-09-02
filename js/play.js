import pause from "./pause.js";
/* 
    Inicia o metronomo
*/
export default function play(tempo, beats, note_value){
    
    // Se não for passado os parâmetros
    tempo       == undefined ? tempo = document.getElementById("tempo").value : tempo;
    beats       == undefined ? beats = document.getElementById("beats").value : beats;
    note_value  == undefined ? note_value = document.getElementById("note-value").value : note_value;

    let btn                 = document.getElementById("play"),
        interval_beat       = Math.round((60000/tempo) * note_value);

    function play_beat(index){

        // Tempo principal
        let beat = document.getElementById(`beat-${index}`);
        beat.play();

        // Contratempo
        let middle_beat = document.getElementById(`beat-${index}-middle`);
        setTimeout(function(){
            middle_beat.play();
        }, interval_beat / 2);

        // Segunda nota da tercina
        let triplet_2 = document.getElementById(`beat-${index}-triplet-2`);
        setTimeout(function(){
            triplet_2.play();
        }, interval_beat / 3);

        // Terceira nota da tercina
        let triplet_3 = document.getElementById(`beat-${index}-triplet-3`);
        setTimeout(function(){
            triplet_3.play();
        }, (interval_beat / 3) * 2);

        // Classe CSS de ativo
        let e = document.querySelector(`#lights li:nth-child(${index})`);
        e.classList.add("active");
        if(beats > 1){
            setTimeout(function(){
                e.classList.remove("active");
            }, interval_beat);
            
        }
        if(beats == 1 && !btn.classList.contains('active')){
            e.classList.remove("active");
        }
    }
    
    let counter = 1;
    function metronome(){

        // Reproduz os tempos impares
        if(counter % 2 != 0){
            play_beat(counter);
        } 
        
        // Toca os tempos pares apenas se a opção "play only odd beats" estiver desativada
        let odd_beats = document.getElementById("odd-beats");
        if(counter % 2 == 0 && !odd_beats.checked) {
            play_beat(counter);
        }

        // Conta os tempos de cada compasso
        if(counter >= beats){
            counter = 1;
        } else {
            counter++;
        }
    }

    if(btn.classList.contains("active")){
        pause(window.timer);
    } else {
        
        // Reproduz
        metronome();
        window.timer = setInterval(metronome, interval_beat);

        // Atualiza o botão
        btn.classList.add("active");
        btn.title = "Pausar";
    }
};