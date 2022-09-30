/* 
    Ao alterar o numerador do compasso, 
    as luzes são recarregadas com a quantidade selecionada
*/
export default function lights(max){
    const lights = document.getElementById('lights');

    lights.style.gridTemplateColumns = `repeat(${max}, 1fr)`;
    lights.innerHTML = '';
    
    for(let i = 1; i <= max; i++){
        lights.insertAdjacentHTML('beforeend', `<li></li>`);
    }

    if(max >= 5 && max < 9){
        lights.classList.value = 'sm'
    } else if(max >= 9){
        lights.classList.value = 'xs'
    } else {
        lights.classList.value = ''
    }
};