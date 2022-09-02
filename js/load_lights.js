/* 
    Carrega os blocos de tempos que ficarão piscando enquanto o metrônomo é reproduzido
*/
export default function load_lights(max){
    let el = document.getElementById("lights");

    // Limpa o conteúdo anterior
    el.innerHTML = '';

    // Carrega o novo conteúdo
    for(let i = 1; i <= max; i++){
        let html = `<li>
                        <span class="number">${i}</span>
                        <span class="light"></span>
                    </li>`;

        el.insertAdjacentHTML('beforeend', html);
    }
};