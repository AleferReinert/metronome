import update from './update.js';
import start from './metronome.js';
import volume from './volume.js';
import pause from './pause.js';

window.addEventListener('DOMContentLoaded', () => {
    const btnPlay = document.getElementById('play');
    const btnMenu = document.getElementById('btn-menu');
    const menu = document.getElementById('menu');
    const theme = document.getElementById('theme');
    const body = document.querySelector('body');
    const measuresToPlay = document.getElementById('measures-to-play');
    const minutesToPlay = document.getElementById('minutes-to-play');
    
    update();
    volume('volume-1', 'quarter-note');
    volume('volume-2', 'eighth-note');
    volume('volume-3', 'second-triplet');
    volume('volume-4', 'third-triplet');

    // Measures e Minutes do topo
    for(let i = 0; i <= 90; i++){
        measuresToPlay.insertAdjacentHTML('beforeend', `<option value="${i}">${i}</option>`);
    }
    for(let i = 0; i <= 90; i++){
        minutesToPlay.insertAdjacentHTML('beforeend', `<option value="${i}">${i}</option>`);
    }

    // Botão de iniciar/parar
    btnPlay.addEventListener('click', () => {
        if(!btnPlay.classList.contains('active')){
            start();
        } else {
            pause();
        }
    });

    // Botão de abrir/fechar menu
    btnMenu.addEventListener('click', () => {
        if(menu.classList.contains('active')){
            menu.classList.remove('active');
            btnMenu.classList.remove('active');
            btnMenu.title = 'Menu';
        } else {
            menu.classList.add('active');
            btnMenu.classList.add('active');
            btnMenu.title = 'Close menu';
        }
    });

    // Alteração do tema
    theme.addEventListener('change', () => {
        body.dataset.theme = theme.value;
    });
});