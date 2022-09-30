export default function volume(volumeId, audioId){
    const range = document.querySelector(`#${volumeId} [type="range"]`);
    const text = document.querySelector(`#${volumeId} .volume-value`);
    const audio = document.getElementById(audioId);
    const accent = document.getElementById('accent');

    range.addEventListener('input', () => {
        audio.muted = false;
        audio.volume = range.value;

        // Primeiro beat
        if(audioId == 'quarter-note') {
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