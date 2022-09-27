import pause from './pause.js';
import play from './play.js';
import lights from './lights.js';

/* 
    Reinicia o metrônomo sempre que alguma opção for alterada
*/
export default function update(){
    const btn_play = document.getElementById('play');
    const bpm = document.getElementById('bpm');
    const e_beats = document.getElementById('beats');
    const e_note_value = document.getElementById('note-value');
    const e_accent_sound = document.getElementById('accent-sound');
    const e_click_sound = document.getElementById('click-sound');
    const e_odd_beats = document.getElementById('odd-beats');
    const bpm_text = document.getElementById('bpm-text');

    bpm.addEventListener('input', () => {
        bpm_text.value = bpm.value;
    });

    // Percorre cada elemento para ver se há mudanças
    const elements = [bpm, e_beats, e_note_value, e_accent_sound, e_click_sound, e_odd_beats, bpm_text];
    for(let i = 0; i < elements.length; i++){
        elements[i].addEventListener('change', () => {
            const e = elements[i];

            // Numerador
            if(e_beats == e){
                lights(e_beats.value);
            }

            // Áudio de acentuação
            else if(e_accent_sound == e){
                document.getElementById('1-beat').src = e_accent_sound.value;
            }

            // Áudio de click normal
            else if(e_click_sound == e){
                for(let i = 2; i <= 12; i++){
                    document.getElementById(`${i}-beat`).src = e_click_sound.value;
                }
            }
            
            // Texto do BPM
            else if(bpm_text == e){
                if(bpm_text.value < 30) {
                    bpm.value = 30;
                } else if(bpm_text.value > 280){
                    bpm.value = 280;
                } else {
                    bpm.value = bpm_text.value;
                }
            }

            // Definindo limites pra não bugar o áudio nos denominadores 16(0.25) e 8 (0.5)
            if(e_note_value.value == 0.25) {
                bpm.max = 100;
                
                if(bpm.value > 100){
                    bpm.value = 100;
                    bpm_text.value = 100;
                }
                
            } else if(e_note_value.value == 0.5){
                bpm.max = 200;

                if(bpm.value > 200){
                    bpm.value = 200;
                    bpm_text.value = 200;
                }
            } else {
                bpm.max = 280;
                bpm_text.value = bpm.value;
            }
            
            if(btn_play.classList.contains('active')){
                pause(window.timer);
                play(bpm.value, e_beats.value, e_note_value.value);
            }
        });
    }
};