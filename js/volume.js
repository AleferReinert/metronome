export default function volume(){

    // Controlador de volume
    function volume_control(range, text, audio){
        range.addEventListener('input', () => {
            for(let i = 1; i <=12; i++){
                const e = document.getElementById(`${i}${audio}`);
                e.muted = false;
                e.volume = range.value;
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

    const range_1  = document.getElementById('range-1');
    const volume_1 = document.getElementById('volume-1');
    const range_2  = document.getElementById('range-2');
    const volume_2 = document.getElementById('volume-2');
    const range_3  = document.getElementById('range-3');
    const volume_3 = document.getElementById('volume-3');
    const range_4  = document.getElementById('range-4');
    const volume_4 = document.getElementById('volume-4');

    volume_control(range_1, volume_1, '-beat');
    volume_control(range_2, volume_2, '-beat-middle');
    volume_control(range_3, volume_3, '-beat-triplet-2');
    volume_control(range_4, volume_4, '-beat-triplet-3');
};