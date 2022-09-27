import update from './update.js';
import play from './play.js';
import pause from './pause.js';
import volume from './volume.js';

window.addEventListener('DOMContentLoaded', () => {
    const btn_play = document.getElementById('play');
    const btn_menu = document.getElementById('btn-menu');
    const menu = document.getElementById('menu');
    const theme = document.getElementById('theme');
    const body = document.querySelector('body');

    update();
    volume();

    btn_play.addEventListener('click', () => {
        if(btn_play.classList.contains('active')){
            pause(window.timer);
        } else {
            play();
        }
    });

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

    theme.addEventListener('change', () => {
        if (theme.value == 'dark') {
            body.classList.add('dark')
        } else {
            body.classList.remove('dark')
        }
    });
});