import pause from './pause.js';
import play from './play.js';
import load_lights from './load_lights.js';

/* 
    Reinicia o metrônomo sempre que alguma opção for alterada
*/
export default function update(){
    let btn             = document.getElementById("play"),
        e_tempo         = document.getElementById("tempo"),
        e_beats         = document.getElementById("beats"),
        e_note_value    = document.getElementById("note-value"),
        e_accent_sound  = document.getElementById("accent-sound"),
        e_click_sound   = document.getElementById("click-sound"),
        e_odd_beats     = document.getElementById("odd-beats"),
        tempo           = e_tempo.value,
        beats           = e_beats.value,
        note_value      = e_note_value.value;

    // Percorre cada elemento pra ver se tem mudança e fazer as atualizações necessárias
    const elements = [e_tempo, e_beats, e_note_value, e_accent_sound, e_click_sound, e_odd_beats];
    for(let i = 0; i < elements.length; i++){
        elements[i].onchange = function(){

            // Andamento
            if(elements[i] == e_tempo){
                tempo = this.value;
                document.getElementById('current-bpm').innerText = window.tempo;
            } 

            // Numerador
            else if(elements[i] == e_beats){
                beats = this.value;
                load_lights(beats);
            } 

            // Denominador
            else if(elements[i] == e_note_value){
                note_value = this.value;
            }

            // Áudio de acentuação
            else if(elements[i] == e_accent_sound){
                document.getElementById("beat-1").src = e_accent_sound.value;
            }

            // Áudio de click normal
            else if(elements[i] == e_click_sound){
                for(let i = 2; i <= 12; i++){
                    document.getElementById(`beat-${i}`).src = e_click_sound.value;
                }
            }

            // Tocar apenas tempos impares
            else if(elements[i] == e_odd_beats){
                
            }

            // Definindo limites pra não bugar o áudio nos denominadores 16(0.25) e 8 (0.5)
            if(note_value == 0.25) {
                e_tempo.max = 100;
                
                if(tempo > 100){
                    tempo = 100;
                    document.getElementById("current-bpm").value = 100;
                }
                
            } else if(note_value == 0.5){
                e_tempo.max = 200;

                if(tempo > 200){
                    tempo = 200;
                    document.getElementById("current-bpm").value = 200;
                }
            } else {
                e_tempo.max = 280;
                document.getElementById("current-bpm").value = tempo;
            }
            
            if(btn.classList.contains("active")){
                pause(window.timer);
                play(tempo, beats, note_value);
            }
        };
    }
};