import {Board} from './board.js';

const game = JSON.parse(localStorage.getItem("game"));
game.board = new Board();

document.getElementById('player1').src = game.player1.character.imgSrc;

const table = document.getElementById('table');
const cols = table.getElementsByTagName('td');

let p1Turn = true;

for(let i = 0; i < cols.length; i++) {
    cols[i].addEventListener('mouseover', (event) => {
        if(game.board.getStatus())
            return;

        const col = event.target.id;
        const id = 'h' + col[1];
        if(p1Turn)
            document.getElementById(id).className = 'rounded-circle bg-danger mx-auto';
        else 
            document.getElementById(id).className = 'rounded-circle bg-warning mx-auto';
    })

    cols[i].addEventListener('mouseout', (event) => {
        const col = event.target.id;
        const id = 'h' + col[1];
        document.getElementById(id).className = 'rounded-circle bg-danger mx-auto invisible';
    })

    cols[i].addEventListener('click', (event) => {
        const col = event.target.id[1];
        if(p1Turn)
            game.board.placeTile(col, 1);
        else
            game.board.placeTile(col, 2);

        renderGame(game);
        p1Turn = !p1Turn;
        if(game.board.getStatus() === 1) {
          const menuButton = document.getElementById('menu');
          document.getElementById('winner').innerHTML = 'Player 1 Wins!!!';
          menuButton.className = 'btn btn-dark fs-4 mt-4';
          removeListeners();
          delete game.board;
        }
        else if(game.board.getStatus() === 2) {
            const menuButton = document.getElementById('menu');
            menuButton.className = 'btn btn-dark fs-4 mt-4';
            document.getElementById('winner').innerHTML = 'Player 12Wins!!!';
            removeListeners();
            delete game.board;
        }
            
    })
}


function removeListeners() {
    for(let i = 0; i < cols.length; i++) {
        cols[i].removeEventListener('click', );
    }
}