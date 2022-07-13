function renderGame(game) {
    const currentBoard = game.board.board;
    for(let i = 0; i < currentBoard.length; i++) {
        for(let j = 0; j < currentBoard[0].length; j++) {
            const row = 'r' + i;
            const col = j;

            if(currentBoard[i][j] === 1) {
                const tile = document.getElementById(row).getElementsByTagName('td')[col];
                tile.innerHTML = '<div class="rounded-circle bg-danger mx-auto" style="width:5rem; height:5rem"></div>';
            }

            if(currentBoard[i][j] === 2) {
                const tile = document.getElementById(row).getElementsByTagName('td')[col];
                tile.innerHTML = '<div class="rounded-circle bg-warning mx-auto" style="width:5rem; height:5rem"></div>';
            }  
        }
    }
}

function addHoverListener(event) {
    
}

