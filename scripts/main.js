import {Game} from './game.js';
import {characters} from './character.js';

let difficulty; //global variable to determine the difficulty of the bot
let mode; //global variable to store the mode the user selects to be in.

function setMode(selectedMode) { mode = selectedMode; }

//Sets the difficulty to easy if the user selects the easy button
function setDifficulty(diff) { difficulty = diff; }

function changeSelected(imgPath) {
    const selected = document.getElementById('selected');
    selected.src = imgPath;
}

function placeTile(col) {

}

function playGame() {
    let game = new Game();
    while(1) {

    }
}

