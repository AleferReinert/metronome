import update from './update.js';
import start from './play.js';
import volume from './volume.js';
import pause from './pause.js';

window.addEventListener('DOMContentLoaded', () => {
    const btn_play = document.getElementById('play');
    const btn_menu = document.getElementById('btn-menu');
    const menu = document.getElementById('menu');
    const theme = document.getElementById('theme');
    const body = document.querySelector('body');
    const measures_to_play = document.getElementById('measures-to-play');
    const minutes_to_play = document.getElementById('minutes-to-play');
    
    update();
    volume('#volume-1', 'quarter-note');
    volume('#volume-2', 'eighth-note');
    volume('#volume-3', 'second-triplet');
    volume('#volume-4', 'third-triplet');

    // Measures e Minutes do topo
    for(let i = 1; i <= 90; i++){
        measures_to_play.insertAdjacentHTML('beforeend', `<option value="${i}">${i}</option>`);
    }
    for(let i = 1; i <= 90; i++){
        minutes_to_play.insertAdjacentHTML('beforeend', `<option value="${i}">${i}</option>`);
    }

    // Botão de iniciar/parar
    btn_play.addEventListener('click', () => {
        if(!btn_play.classList.contains('active')){
            start();
        } else {
            pause();
        }
    });

    // Botão de abrir/fechar menu
    btn_menu.addEventListener('click', () => {
        if(menu.classList.contains('active')){
            menu.classList.remove('active');
            btn_menu.classList.remove('active');
            btn_menu.title = 'Menu';
        } else {
            menu.classList.add('active');
            btn_menu.classList.add('active');
            btn_menu.title = 'Close menu';
        }
    });

    // Alteração do tema
    theme.addEventListener('change', () => {
        body.dataset.theme = theme.value;
    });
});