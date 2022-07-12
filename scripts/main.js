import {Board} from './board.js';

let  mode = '2player';

const characters = [
    {
        name: 'Scrappy',
        college: 'University of North Texas', 
        info: 'Scrappy is the mascot of the University of North Texas. The name Scrappy wsa chosen by students in 1995.' 
    },

]

const game = {
    player1: { 
        id: 1, 
        character: null
    },
    player2: {
        id: 2,
        character: null,
        difficulty: null,
    },
    board: new Board(),
}

const table = document.getElementById('table');
const cols = table.getElementsByTagName('td');
for(let i = 0; i < cols.length; i++) {
    cols[i].addEventListener('mouseover', (event) => {
        const col = event.target.id;
        const id = 'h' + col[1];
        document.getElementById(id).className = 'rounded-circle bg-danger mx-auto';
    })

    cols[i].addEventListener('mouseout', (event) => {
        const col = event.target.id;
        const id = 'h' + col[1];
        document.getElementById(id).className = 'rounded-circle bg-danger mx-auto invisible';
    })

    cols[i].addEventListener('click', (event) => {
        const col = event.target.id[1];
        game.board.placeTile(col, 1);
        renderGame(game);
    })
}

if(mode === '2player') {
    
}

