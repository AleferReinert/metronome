import pause from './pause.js';
import play from './play.js';
import lights from './lights.js';

/* 
    Reinicia o metrônomo sempre que alguma opção for alterada
*/
export default function update(){
    const btn             = document.getElementById('play');
    const e_tempo         = document.getElementById('tempo');
    const e_beats         = document.getElementById('beats');
    const e_note_value    = document.getElementById('note-value');
    const e_accent_sound  = document.getElementById('accent-sound');
    const e_click_sound   = document.getElementById('click-sound');
    const e_odd_beats     = document.getElementById('odd-beats');
    const theme           = document.getElementById('theme');
    const current_bpm     = document.getElementById('current-bpm');
    let tempo           = e_tempo.value;
    let beats           = e_beats.value;
    let note_value      = e_note_value.value;

    // Percorre cada elemento pra ver se tem mudança e fazer as atualizações necessárias
    const elements = [e_tempo, e_beats, e_note_value, e_accent_sound, e_click_sound, e_odd_beats, theme];
    for(let i = 0; i < elements.length; i++){
        elements[i].onchange = function(){

            // Andamento
            if(elements[i] == e_tempo){
                tempo = this.value;
                current_bpm.innerText = window.tempo;
            } 

            // Numerador
            else if(elements[i] == e_beats){
                beats = this.value;
                lights(beats);
            } 

            // Denominador
            else if(elements[i] == e_note_value){
                note_value = this.value;
            }

            // Áudio de acentuação
            else if(elements[i] == e_accent_sound){
                document.getElementById('1-beat').src = e_accent_sound.value;
            }

            // Áudio de click normal
            else if(elements[i] == e_click_sound){
                for(let i = 2; i <= 12; i++){
                    document.getElementById(`${i}-beat`).src = e_click_sound.value;
                }
            }

            // Theme
            else if(elements[i] == theme){
                if (theme.value == 'dark') {
                    document.querySelector('body').classList.add('dark')
                } else {
                    document.querySelector('body').classList.remove('dark')
                }
            }

            // Definindo limites pra não bugar o áudio nos denominadores 16(0.25) e 8 (0.5)
            if(note_value == 0.25) {
                e_tempo.max = 100;
                
                if(tempo > 100){
                    tempo = 100;
                    current_bpm.value = 100;
                }
                
            } else if(note_value == 0.5){
                e_tempo.max = 200;

                if(tempo > 200){
                    tempo = 200;
                    current_bpm.value = 200;
                }
            } else {
                e_tempo.max = 280;
                current_bpm.value = tempo;
            }
            
            if(btn.classList.contains("active")){
                pause(window.timer);
                play(tempo, beats, note_value);
            }
        };
    }
};