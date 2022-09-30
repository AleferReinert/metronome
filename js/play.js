import pause from "./pause.js";

export default function start(bpm, beats, note_value){
    bpm         == undefined ? bpm = document.getElementById('bpm').value : bpm;
    beats       == undefined ? beats = document.getElementById('beats').value : beats;
    note_value  == undefined ? note_value = document.getElementById('note-value').value : note_value;

    const btn_play = document.getElementById('play');
    const counter = document.getElementById('counter');
    const first_beat = document.getElementById('first-beat');
    const quarter_note = document.getElementById('quarter-note');
    const eighth_note = document.getElementById('eighth-note');
    const second_triplet = document.getElementById('second-triplet');
    const third_triplet = document.getElementById('third-triplet');
    const beats_to_play = document.getElementById('beats-to-play');
    const measures_to_play = document.getElementById('measures-to-play');
    const minutes_to_play = document.getElementById('minutes-to-play');
    const counter_timer = document.querySelector('#counters .timer');
    let interval = Math.round((60000/bpm) * note_value);
    let beatsPerMeasure = 1;
    let totalBeats = 0;
    let totalMeasures = 0;

    /* Timer */
    let mm = 0,
        ss = 0;
    function timer() {
        ss++;
        if (ss == 60) {
            ss = 0;
            mm++;
            mm == 60 ? mm = 0 : '';
        }
        let mmFormat = mm.toString().padStart(2, '0'),
            ssFormat = ss.toString().padStart(2, '0'),
            timeFormat = `${mmFormat}:${ssFormat}`;
            counter_timer.innerText = timeFormat;
    }
    function play_beat(){
        counter.innerText = beatsPerMeasure;
        if(beatsPerMeasure % 2 == 1 || (beatsPerMeasure % 2 == 0) && beats_to_play.value != 'odd'){
            if(beatsPerMeasure == 1){
                first_beat.play();
                totalMeasures++;
            } else {
                quarter_note.play();
            }
            
            setTimeout(() => {eighth_note.play()}, interval / 2);
            setTimeout(() => {second_triplet.play()}, interval / 3);
            setTimeout(() => {third_triplet.play()}, (interval / 3) * 2);

            // Luz ativa
            const e = document.querySelector(`#lights li:nth-child(${beatsPerMeasure})`);
            e.classList.add('active');
            setTimeout(() => {e.classList.remove('active')}, interval);
        }
        totalBeats++;
        document.querySelector('#counters .beats').innerText = totalBeats;
        document.querySelector('#counters .measures').innerText = totalMeasures;
        beatsPerMeasure >= beats ? beatsPerMeasure = 1 : beatsPerMeasure++;

        // Quantidade de compassos para reproduzir (também toca o primeiro click para finalizar)
        if(totalBeats == (measures_to_play.value * beats)+1){
            pause();
        }

        // Quantidade de minutos para reproduzir (também toca o primeiro click para finalizar)
        if(minutes_to_play.value > 0 && mm == minutes_to_play.value){
            if(beatsPerMeasure == 2){
                pause();
            }
        }
    }

    if(btn_play.classList.contains('active')){
        pause();
    } else {
        play_beat();
        btn_play.classList.add('active');
        btn_play.title = 'Pausar';
        counter_timer.innerText = '00:00';
        window.timer = setInterval(play_beat, interval);
        window.cron = setInterval(() => {timer()}, 1000);
    }
};