import update_bpm from './update_bpm.js';
import update from './update.js';
import play from './play.js';
import pause from './pause.js';
import volume from './volume.js';

// Variáveis globais que vão receber setInterval e set Timeout, respectivamente
//var timer_measure;
var timer;

window.onload = function(){
    update();
    update_bpm();
    volume();

    // Função do botão play
    document.getElementById('play').onclick = function(){
        if(!this.classList.contains('active')){
            play();
        } else {
            pause(window.timer);
        }
    }

    /* Menu */
    const btn = document.getElementById('btn-menu');
    const menu = document.getElementById('menu');
    btn.onclick = function(){
        if(!menu.classList.contains('active')){
            menu.classList.add('active');
            btn.classList.add('active');
            btn.title = 'Close menu'
        } else {
            menu.classList.remove('active');
            btn.classList.remove('active');
            btn.title = 'Menu'
        }
    }
}