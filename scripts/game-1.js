import {Board} from './board.js';

const game = JSON.parse(localStorage.getItem("game"));
game.board = new Board();

document.getElementById('player1').src = game.player1.character.imgSrc;
document.getElementById('player2').src = game.player2.character.imgSrc;

const table = document.getElementById('table');
const cols = table.getElementsByTagName('td');

let p1Turn = true;
let numTurns = 1;

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
        numTurns++;
        
        if(numTurns <= 4){
            let randCol = Math.floor(Math.random() * 7);
            game.board.placeTile(randCol, 2);
            numTurns++;
        } else {
            switch(game.player2.difficulty) {
                case 'easy':
                   game.board.placeTile(makeEasyMove(), 2);
                   break;
                case 'normal':
                    game.board.placeTile(makeNormalMove(), 2);
                    break;
                case 'hard':
                    console.log('we are hard');
                    game.board.placeTile(makeHardMove(), 2);
                    break;
            }
            
            numTurns++;
        }
        

        renderGame(game);

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

function makeEasyMove() {
    let strBoard = JSON.stringify(game.board.board);
    let clone = new Board(JSON.parse(strBoard));

    const valid = [0, 0, 0, 0, 0, 0, 0];

    let maxConts = 0;
    let bestCol = -1;

    let randNum = Math.random() * 1;

    for(let i = 0; i < 7; i++)
    {
        clone = new Board(JSON.parse(strBoard));

        valid[i] = clone.placeTile(i, 2);
        if(clone.getStatus() == 2) {
            if(randNum <= 0.40) {
               return i; 
            }
            else {
                return Math.floor(Math.random() * 7);
            }
        }
            

        let continues = 7;
        for(let j = 0; j < 7; j++)
        {
            const strClone2 = JSON.stringify(clone.board);
            const clone2 = new Board(JSON.parse(strClone2));
            let valid2 = clone2.placeTile(j, 1);

            if(clone2.getStatus() == 1 && valid2) {
                continues--;
            }
                
        }

        if(continues > maxConts)
        {
            maxConts = continues;
            bestCol = i;
        }
    }

    if(valid[bestCol] && randNum <= 0.50) {
        return bestCol;
    }   
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

function makeNormalMove() {
    let strBoard = JSON.stringify(game.board.board);
    let clone = new Board(JSON.parse(strBoard));

    const valid = [0, 0, 0, 0, 0, 0, 0];

    let maxConts = 0;
    let bestCol = -1;

    for(let i = 0; i < 7; i++)
    {
        clone = new Board(JSON.parse(strBoard));

        valid[i] = clone.placeTile(i, 2);
        if(clone.getStatus() == 2)
            return i;

        let continues = 7;
        for(let j = 0; j < 7; j++)
        {
            const strClone2 = JSON.stringify(clone.board);
            const clone2 = new Board(JSON.parse(strClone2));
            let valid2 = clone2.placeTile(j, 1);

            if(clone2.getStatus() == 1 && valid2) {
                continues--;
            }
                
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

function makeHardMove() {
    let strBoard = JSON.stringify(game.board.board);
    let clone = new Board(JSON.parse(strBoard));

    const valid = [0, 0, 0, 0, 0, 0, 0];

    let maxConts = 0;
    let bestCol = -1;

    for(let i = 0; i < 7; i++)
    {
        clone = new Board(JSON.parse(strBoard));

        valid[i] = clone.placeTile(i, 2);
        if(clone.getStatus() == 2)
            return i;

        let continues = 7;
        for(let j = 0; j < 7; j++)
        {
            const strClone2 = JSON.stringify(clone.board);
            const clone2 = new Board(JSON.parse(strClone2));
            let valid2 = clone2.placeTile(j, 1);

            for(let k = 0; k < 7; k++) {
                const strClone3 = JSON.stringify(clone2.board);
                const clone3 = new Board(JSON.parse(strClone3));
                let valid3 = clone3.placeTile(j, 2);
                if(clone3.getStatus() == 2 && valid3) {
                    continues++;
                }
                else {
                    
                }
            }

            if(clone2.getStatus() == 1 && valid2) {
                continues--;
            }
                
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