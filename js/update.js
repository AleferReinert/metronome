import pause from './pause.js';
import play from './play.js';
import lights from './lights.js';

/* 
    Reinicia o metrônomo sempre que alguma opção for alterada
*/
export default function update(){
    const body = document.querySelector('body');
    const btn_play = document.getElementById('play');
    const bpm = document.getElementById('bpm');
    const beats = document.getElementById('beats');
    const note_value = document.getElementById('note-value');
    const accent_sound = document.getElementById('accent-sound');
    const click_sound = document.getElementById('click-sound');
    const bpm_text = document.getElementById('bpm-text');
    const advanced_mode = document.getElementById('advanced-mode');
    const measures_to_play = document.getElementById('measures-to-play');
    const minutes_to_play = document.getElementById('minutes-to-play');

    bpm.addEventListener('input', () => {
        bpm_text.value = bpm.value;
    });

    /* 
        Percorre cada elemento para ver se há mudanças
        Se houver mudanças, o metrônomo é pausado e iniciado novamente,
        além de fazer outras alterações dependendo do elemento alterado
    */
    const elements = [
        bpm, 
        beats, 
        note_value, 
        accent_sound, 
        click_sound, 
        bpm_text, 
        advanced_mode, 
        measures_to_play, 
        minutes_to_play
    ];
    for(let i = 0; i < elements.length; i++){
        elements[i].addEventListener('change', () => {
            const e = elements[i];

            // Numerador
            if(beats == e){
                lights(beats.value);
            }

            // Áudio de acentuação
            else if(accent_sound == e){
                document.getElementById('1-beat').src = accent_sound.value;
            }

            // Áudio de click normal
            else if(click_sound == e){
                for(let i = 2; i <= 12; i++){
                    document.getElementById(`${i}-beat`).src = click_sound.value;
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

            // Modo avançado
            else if(advanced_mode == e){
                if(advanced_mode.checked){
                    body.dataset.mode = 'advanced';
                } else {
                    body.dataset.mode = 'basic';
                }
            }

            /*
                Se for selecionado uma quantidade de compassos para reproduzir,
                volta a opção de minutes para 0
            */
            else if(measures_to_play == e && measures_to_play.value > 0){
                minutes_to_play.value = 0;
            }

            /*
                Se for selecionado uma quantidade de minutos para reproduzir,
                volta a opção de measures para 0
            */
                else if(minutes_to_play == e && minutes_to_play.value > 0){
                    console.log('measure maior que 0')
                    measures_to_play.value = 0;
                }

            // Definindo limites pra não bugar o áudio nos denominadores 16(0.25) e 8 (0.5)
            else if(note_value == e){
                if(note_value.value == 0.25) {
                    if(bpm.value > 100) {
                        console.log('denominador 16 e maior que 100');
                        bpm_text.value = 100;
                        bpm.value = 100;
                    }
                    bpm.max = 100;
                } else if(note_value.value == 0.5){
                    if(bpm.value > 200){
                        bpm.value = 200;
                        bpm_text.value = 200;
                    }
                    bpm.max = 200;
                } else {
                    bpm.max = 280;
                    bpm_text.value = bpm.value;
                }
            }
            
            if(btn_play.classList.contains('active')){
                pause(window.timer);
                play(bpm.value, beats.value, note_value.value);
            }
        });
    }
};