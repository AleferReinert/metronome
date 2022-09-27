/* 
    Inicia o metronomo
*/

import pause from "./pause.js";

export default function play(tempo, beats, note_value){
    
    // Se não for passado os parâmetros
    tempo       == undefined ? tempo = document.getElementById('tempo').value : tempo;
    beats       == undefined ? beats = document.getElementById('beats').value : beats;
    note_value  == undefined ? note_value = document.getElementById('note-value').value : note_value;

    const btn = document.getElementById('play');
    let interval_beat = Math.round((60000/tempo) * note_value);

    function play_beat(index){
        
        // Contador
        document.getElementById('count').innerText = index;

        // Semínimas
        document.getElementById(`${index}-beat`).play();

        // Contratempos
        setTimeout(function(){
            document.getElementById(`${index}-beat-middle`).play();
        }, interval_beat / 2);

        // Segunda nota da tercina
        setTimeout(function(){
            document.getElementById(`${index}-beat-triplet-2`).play();
        }, interval_beat / 3);

        // Terceira nota da tercina
        setTimeout(function(){
            document.getElementById(`${index}-beat-triplet-3`).play();
        }, (interval_beat / 3) * 2);

        // Classe CSS de ativo
        const e = document.querySelector(`#lights li:nth-child(${index})`);
        e.classList.add('active');
        if(beats > 1){
            setTimeout(function(){
                e.classList.remove('active');
            }, interval_beat);
            
        }
    }
    
    let counter = 1;
    function metronome(){

        // Reproduz os tempos impares
        if(counter % 2 != 0){
            play_beat(counter);
        } 
        
        // Reproduz os tempos pares apenas se a opção "play only odd beats" estiver desativada
        if(counter % 2 == 0 && !document.getElementById('odd-beats').checked) {
            play_beat(counter);
        }

        // Conta os tempos de cada compasso
        if(counter >= beats){
            counter = 1;
        } else {
            counter++;
        }
    }

    if(btn.classList.contains('active')){
        pause(window.timer);
    } else {
        
        // Reproduz
        metronome();
        window.timer = setInterval(metronome, interval_beat);

        // Atualiza o botão
        btn.classList.add('active');
        btn.title = 'Pausar';
    }
};