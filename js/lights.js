/* 
    Ao alterar o numerador do compasso, 
    as luzes são recarregadas com a quantidade selecionada
*/
export default function lights(max){
    const e = document.getElementById('lights');

    e.style.gridTemplateColumns = `repeat(${max}, 1fr)`;
    e.innerHTML = '';
    
    for(let i = 1; i <= max; i++){
        e.insertAdjacentHTML('beforeend', `<li></li>`);
    }

    if(max >= 5 && max < 9){
        e.classList.value = 'sm'
    } else if(max >= 9){
        e.classList.value = 'xs'
    } else {
        e.classList.value = ''
    }
};