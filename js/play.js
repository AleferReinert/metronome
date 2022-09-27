import pause from "./pause.js";

export default function play(bpm, beats, note_value){
    
    bpm         == undefined ? bpm = document.getElementById('bpm').value : bpm;
    beats       == undefined ? beats = document.getElementById('beats').value : beats;
    note_value  == undefined ? note_value = document.getElementById('note-value').value : note_value;

    const btn_play = document.getElementById('play');
    const odd_beats = document.getElementById('odd-beats')
    let interval_beat = Math.round((60000/bpm) * note_value);

    function play_beat(index){
        document.getElementById('counter').innerText = index;

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

        // Classe active do CSS
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

        // Reproduz se for impar
        if(counter % 2 != 0){
            play_beat(counter);
        } 
        
        // Reproduz se for par e se "play only odd beats" estiver desativada
        if(counter % 2 == 0 && !odd_beats.checked) {
            play_beat(counter);
        }

        if(counter >= beats){
            counter = 1;
        } else {
            counter++;
        }
    }

    if(btn_play.classList.contains('active')){
        pause(window.timer);
    } else {
        metronome();
        window.timer = setInterval(metronome, interval_beat);
        btn_play.classList.add('active');
        btn_play.title = 'Pausar';
    }
};