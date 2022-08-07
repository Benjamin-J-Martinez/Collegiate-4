function renderGame(game) {
    const currentBoard = game.board.board;
    for(let i = 0; i < currentBoard.length; i++) {
        for(let j = 0; j < currentBoard[0].length; j++) {
            const row = 'r' + i;
            const col = j;
            const tile = document.getElementById(row).getElementsByTagName('td')[col].getElementsByTagName('div')[0];

            if(currentBoard[i][j] === 1) {
                tile.className = 'rounded-circle bg-danger mx-auto';
            }

            if(currentBoard[i][j] === 2) {
                tile.className = 'rounded-circle bg-warning mx-auto';
            }  
        }
    }
}


