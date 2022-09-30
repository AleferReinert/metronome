import pause from "./pause.js";

export default function start(bpm, beats, noteValue){
    
    bpm         == undefined ? bpm = document.getElementById('bpm').value : bpm;
    beats       == undefined ? beats = document.getElementById('beats').value : beats;
    noteValue   == undefined ? noteValue = document.getElementById('note-value').value : noteValue;

    const btnPlay = document.getElementById('play');
    const counter = document.getElementById('counter');
    const firstBeat = document.getElementById('first-beat');
    const quarterNote = document.getElementById('quarter-note');
    const eighthNote = document.getElementById('eighth-note');
    const secondTriplet = document.getElementById('second-triplet');
    const thirdTriplet = document.getElementById('third-triplet');
    const beatsToPlay = document.getElementById('beats-to-play');
    const measuresToPlay = document.getElementById('measures-to-play');
    const minutesToPlay = document.getElementById('minutes-to-play');
    const counterTimer = document.querySelector('#counters .timer');
    let interval = Math.round((60000/bpm) * noteValue);
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
            counterTimer.innerText = timeFormat;
    }
    function playBeat(){
        counter.innerText = beatsPerMeasure;
        if(beatsPerMeasure % 2 == 1 || (beatsPerMeasure % 2 == 0) && beatsToPlay.value != 'odd'){
            if(beatsPerMeasure == 1){
                firstBeat.play();
                totalMeasures++;
            } else {
                quarterNote.play();
            }
            
            setTimeout(() => {eighthNote.play()}, interval / 2);
            setTimeout(() => {secondTriplet.play()}, interval / 3);
            setTimeout(() => {thirdTriplet.play()}, (interval / 3) * 2);

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
        if(measuresToPlay.value > 0 && totalBeats == (measuresToPlay.value * beats)+1){
            pause(interval);
        }

        // Quantidade de minutos para reproduzir (também toca o primeiro click para finalizar)
        if(minutesToPlay.value > 0 && mm == minutesToPlay.value){
            if(beatsPerMeasure == 2){
                pause(interval);
            }
        }
    }

    btnPlay.classList.add('active');
    btnPlay.title = 'Pausar';
    counterTimer.innerText = '00:00';
    playBeat();
    window.timer = setInterval(playBeat, interval);
    window.cron = setInterval(() => {timer()}, 1000);
};