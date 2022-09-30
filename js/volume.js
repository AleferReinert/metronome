export default function volume(volume, audio){
    const range = document.querySelector(`${volume} [type="range"]`);
    const text = document.querySelector(`${volume} .volume-value`);
    const e = document.getElementById(audio);

    range.addEventListener('input', () => {
        e.muted = false;
        e.volume = range.value;

        // Primeiro beat
        if(audio == 'quarter-note') {
            const accent = document.getElementById('accent');
            accent.muted = false;
            accent.volume = range.value;
        }

        // Altera o texto do volume conforme o range muda
        if(range.value == 0){
            text.textContent = 'muted';
        } else if(range.value == 1){
            text.textContent = 'max';
        } else {
            text.textContent = range.value;
        }
    });
};