/* 
    Carrega as bolinhas que ficarão piscando enquanto o metrônomo é reproduzido
*/
export default function lights(max){
    const el = document.getElementById('lights');

    // Atualiza o column grid do css
    el.style.gridTemplateColumns = `repeat(${max}, 1fr)`;

    // Trata os tamanhos das luzes ativas
    if(max >= 5 && max < 9){
        el.classList.value = 'sm'
    } else if(max >= 9){
        el.classList.value = 'xs'
    } else {
        el.classList.value = ''
    }

    // Limpa o conteúdo anterior
    el.innerHTML = '';

    // Carrega o novo conteúdo
    for(let i = 1; i <= max; i++){
        el.insertAdjacentHTML('beforeend', `<li></li>`);
    }
};