/* 
    Atualiza o texto do BPM e o range se algum dos dois forem alterados
*/
export default function update_bpm(){
    const range = document.getElementById('tempo');
    const text = document.getElementById('current-bpm');

    // Atualiza o texto
    range.addEventListener('input', () => {
        text.value = range.value;
    });

    // Atualiza o range
    text.onchange = function(){
        range.value = text.value;
    }
}