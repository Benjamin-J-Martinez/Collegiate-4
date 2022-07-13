import {Board} from './board.js';

const game = JSON.parse(localStorage.getItem("game"));
game.board = new Board();

document.getElementById('player1').src = game.player1.character.imgSrc;
document.getElementById('player2').src = game.player2.character.imgSrc;

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
        game.board.placeTile(col, 1);
        
        //game.board.placeTile(makeMove(), 2);
        const clonedBoard = [...game.board.board];
        //let clone = new Board();
        //clone.placeTile(4, 2);
        console.log(clonedBoard === game.board.board);
        console.log(clonedBoard);

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
            document.getElementById('winner').innerHTML = 'Player 2 Wins!!!';
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



function makeMove() {
    let clone = game.board.clone(game.board.board);
    const valid = [0, 0, 0, 0, 0, 0, 0];

    let maxConts = 0;
    let bestCol = -1;

    for(let i = 0; i < 7; i++)
    {
        clone = game.board.clone(game.board.board);

        valid[i] = clone.placeTile(i, 2);
        if(clone.getStatus() == 2)
            return i;

        let continues = 7;
        for(let j = 0; j < 7; j++)
        {
            const clone2 = clone.clone(clone.board);
            let valid2 = clone2.placeTile(j, 1);

            if(clone2.getStatus() == 1 && valid2)
                continues--;
        }

        if(continues > maxConts)
        {
            maxConts = continues;
            bestCol = i;
        }
    }

    if(valid[bestCol])
        return bestCol;
    else
    {
        for(let i = 0; i < 7; i++)
        {
            if(valid[i])
                return i;
        }
    }

    return bestCol;
}
