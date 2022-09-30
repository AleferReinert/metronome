import stop from './stop.js';
import start from './start.js';
import lights from './lights.js';

/* 
    Reinicia o metrônomo sempre que alguma opção for alterada
*/
export default function update(){
    const body = document.querySelector('body');
    const btnPlay = document.getElementById('play');
    const bpm = document.getElementById('bpm');
    const beats = document.getElementById('beats');
    const noteValue = document.getElementById('note-value');
    const firstBeatSound = document.getElementById('first-beat-sound');
    const beatSound = document.getElementById('beat-sound');
    const bpmText = document.getElementById('bpm-text');
    const advancedMode = document.getElementById('advanced-mode');
    const measuresToPlay = document.getElementById('measures-to-play');
    const minutesToPlay = document.getElementById('minutes-to-play');

    bpm.addEventListener('input', () => {
        bpmText.value = bpm.value;
    });

    /* 
        Percorre cada elemento para ver se há mudanças
        Se houver mudanças, o metrônomo é pausado e iniciado novamente,
        além de fazer outras alterações dependendo do elemento alterado
    */
    const elements = [
        bpm, 
        beats, 
        noteValue, 
        firstBeatSound, 
        beatSound, 
        bpmText, 
        advancedMode, 
        measuresToPlay, 
        minutesToPlay
    ];
    for(let i = 0; i < elements.length; i++){
        elements[i].addEventListener('change', () => {
            const e = elements[i];

            // Numerador
            if(beats == e){
                lights(beats.value);
            }

            // Áudio do primeiro beat
            else if(firstBeatSound == e){
                document.getElementById('1-beat').src = firstBeatSound.value;
            }

            // Áudio do beat normal
            else if(beatSound == e){
                for(let i = 2; i <= 12; i++){
                    document.getElementById(`${i}-beat`).src = beatSound.value;
                }
            }
            
            // Texto do BPM
            else if(bpmText == e){
                if(bpmText.value < 30) {
                    bpm.value = 30;
                } else if(bpmText.value > 280){
                    bpm.value = 280;
                } else {
                    bpm.value = bpmText.value;
                }
            }

            // Modo avançado
            else if(advancedMode == e){
                if(advancedMode.checked){
                    body.dataset.mode = 'advanced';
                } else {
                    body.dataset.mode = 'basic';
                }
            }

            /*
                Se for selecionado uma quantidade de compassos para reproduzir,
                volta a opção de minutes para 0
            */
            else if(measuresToPlay == e && measuresToPlay.value > 0){
                minutesToPlay.value = 0;
            }

            /*
                Se for selecionado uma quantidade de minutos para reproduzir,
                volta a opção de measures para 0
            */
            else if(minutesToPlay == e && minutesToPlay.value > 0){
                measuresToPlay.value = 0;
            }

            // Definindo limites pra não bugar o áudio nos denominadores 16(0.25) e 8 (0.5)
            else if(noteValue == e){
                if(noteValue.value == 0.25) {
                    if(bpm.value > 100) {
                        bpmText.value = 100;
                        bpm.value = 100;
                    }
                    bpm.max = 100;
                } else if(noteValue.value == 0.5){
                    if(bpm.value > 200){
                        bpm.value = 200;
                        bpmText.value = 200;
                    }
                    bpm.max = 200;
                } else {
                    bpm.max = 280;
                    bpmText.value = bpm.value;
                }
            }
            
            if(btnPlay.classList.contains('active')){
                stop(window.timer);
                start(bpm.value, beats.value, noteValue.value);
            }
        });
    }
};